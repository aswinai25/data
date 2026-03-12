/**
 * Dashboard Component - Analytics and visualizations
 */
import React, { useState, useEffect } from 'react';
import { analyticsAPI } from '../services/api';
import Analytics from './Analytics';
import SalesTable from './SalesTable';
import './Dashboard.css';

const Dashboard = ({ refreshTrigger }) => {
  const [summary, setSummary] = useState(null);
  const [salesByRegion, setSalesByRegion] = useState([]);
  const [salesByMonth, setSalesByMonth] = useState([]);
  const [profitByRegion, setProfitByRegion] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('analytics');

  const loadAnalytics = async () => {
    try {
      setLoading(true);
      setError('');
      
      const [summaryData, regionData, monthData, profitData] = await Promise.all([
        analyticsAPI.getSummary(),
        analyticsAPI.getSalesByRegion(),
        analyticsAPI.getSalesByMonth(),
        analyticsAPI.getProfitByRegion(),
      ]);

      setSummary(summaryData);
      setSalesByRegion(regionData);
      setSalesByMonth(monthData);
      setProfitByRegion(profitData);
    } catch (err) {
      setError('Error loading analytics: ' + (err.response?.data?.detail || err.message));
      console.error('Analytics error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAnalytics();
  }, [refreshTrigger]);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Sales Analytics Dashboard</h1>
        <button onClick={loadAnalytics} className="btn-refresh">
          Refresh Data
        </button>
      </div>

      {error && (
        <div className="alert alert-error" style={{ marginBottom: '1.5rem' }}>
          {error}
        </div>
      )}

      {loading && summary === null ? (
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading dashboard...</p>
        </div>
      ) : (
        <>
          {/* Summary Cards */}
          {summary && (
            <div className="summary-cards">
              <div className="card metric-card">
                <h3>Total Sales</h3>
                <p className="metric-value">${summary.total_sales?.toFixed(2) || '0.00'}</p>
                <span className="metric-label">{summary.record_count || 0} records</span>
              </div>
              <div className="card metric-card">
                <h3>Total Profit</h3>
                <p className="metric-value profit">${summary.total_profit?.toFixed(2) || '0.00'}</p>
                <span className="metric-label">Net earnings</span>
              </div>
              <div className="card metric-card">
                <h3>Avg Discount</h3>
                <p className="metric-value discount">{summary.average_discount?.toFixed(2) || '0.00'}%</p>
                <span className="metric-label">Per transaction</span>
              </div>
            </div>
          )}

          {/* Tab Navigation */}
          <div className="tab-navigation">
            <button
              className={`tab ${activeTab === 'analytics' ? 'active' : ''}`}
              onClick={() => setActiveTab('analytics')}
            >
              Analytics Charts
            </button>
            <button
              className={`tab ${activeTab === 'table' ? 'active' : ''}`}
              onClick={() => setActiveTab('table')}
            >
              Sales Records
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === 'analytics' && (
            <Analytics
              salesByRegion={salesByRegion}
              salesByMonth={salesByMonth}
              profitByRegion={profitByRegion}
            />
          )}

          {activeTab === 'table' && (
            <SalesTable onRecordDeleted={loadAnalytics} />
          )}
        </>
      )}
    </div>
  );
};

export default Dashboard;

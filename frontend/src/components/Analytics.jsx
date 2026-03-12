/**
 * Analytics Component - Charts and visualizations
 */
import React from 'react';
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell
} from 'recharts';
import './Analytics.css';

const COLORS = ['#3498db', '#27ae60', '#e74c3c', '#f39c12'];

const Analytics = ({ salesByRegion, salesByMonth, profitByRegion }) => {
  return (
    <div className="analytics-container">
      <div className="charts-grid">
        {/* Bar Chart - Sales by Region */}
        <div className="chart-card">
          <h3>Sales by Region</h3>
          {salesByRegion && salesByRegion.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salesByRegion}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="region" />
                <YAxis />
                <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
                <Legend />
                <Bar dataKey="sales" fill="#3498db" name="Sales Amount" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="no-data">No data available</p>
          )}
        </div>

        {/* Line Chart - Monthly Sales Trend */}
        <div className="chart-card">
          <h3>Monthly Sales Trend</h3>
          {salesByMonth && salesByMonth.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesByMonth}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" angle={-45} textAnchor="end" height={80} />
                <YAxis />
                <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="sales"
                  stroke="#27ae60"
                  name="Sales Amount"
                  strokeWidth={2}
                  dot={{ fill: '#27ae60', r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <p className="no-data">No data available</p>
          )}
        </div>

        {/* Pie Chart - Profit Distribution by Region */}
        <div className="chart-card">
          <h3>Profit Distribution by Region</h3>
          {profitByRegion && profitByRegion.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={profitByRegion}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ region, value }) => `${region}: $${value.toFixed(0)}`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="profit"
                >
                  {profitByRegion.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <p className="no-data">No data available</p>
          )}
        </div>

        {/* Summary Stats Card */}
        <div className="chart-card stats-card">
          <h3>Regional Summary</h3>
          <div className="stats-list">
            {salesByRegion && salesByRegion.length > 0 ? (
              salesByRegion.map((region, index) => (
                <div key={index} className="stat-item">
                  <div className="stat-header">
                    <span className="stat-color" style={{ backgroundColor: COLORS[index % COLORS.length] }}></span>
                    <span className="stat-region">{region.region}</span>
                  </div>
                  <div className="stat-details">
                    <div className="stat-row">
                      <span>Sales:</span>
                      <span className="stat-value">${region.sales.toFixed(2)}</span>
                    </div>
                    <div className="stat-row">
                      <span>Transactions:</span>
                      <span className="stat-value">{region.count}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="no-data">No data available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;

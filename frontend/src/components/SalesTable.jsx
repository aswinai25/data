/**
 * SalesTable Component - Display and manage sales records
 */
import React, { useState, useEffect } from 'react';
import { salesAPI, analyticsAPI } from '../services/api';
import './SalesTable.css';

const SalesTable = ({ onRecordDeleted }) => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'desc' });
  const [filterRegion, setFilterRegion] = useState('');

  const loadRecords = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await salesAPI.getAll(0, 1000);
      setRecords(data);
    } catch (err) {
      setError('Error loading records: ' + (err.response?.data?.detail || err.message));
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRecords();
  }, []);

  // Filter records
  const filteredRecords = filterRegion
    ? records.filter(r => r.region === filterRegion)
    : records;

  // Sort records
  const sortedRecords = [...filteredRecords].sort((a, b) => {
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];

    if (typeof aValue === 'string') {
      return sortConfig.direction === 'asc'
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    return sortConfig.direction === 'asc'
      ? aValue - bValue
      : bValue - aValue;
  });

  // Pagination
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedRecords = sortedRecords.slice(startIndex, endIndex);
  const totalPages = Math.ceil(sortedRecords.length / itemsPerPage);

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this record?')) {
      return;
    }

    try {
      await salesAPI.delete(id);
      setRecords(records.filter(r => r.id !== id));
      setCurrentPage(1);
      if (onRecordDeleted) {
        onRecordDeleted();
      }
    } catch (err) {
      setError('Error deleting record: ' + (err.response?.data?.detail || err.message));
    }
  };

  const handleExport = async () => {
    try {
      const result = await analyticsAPI.exportToExcel();
      alert(`Exported ${result.count} records to ${result.filename}`);
    } catch (err) {
      setError('Error exporting to Excel: ' + (err.response?.data?.detail || err.message));
    }
  };

  const SortIcon = ({ column }) => {
    if (sortConfig.key !== column) return <span className="sort-icon">↕</span>;
    return <span className="sort-icon">{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>;
  };

  return (
    <div className="sales-table-container">
      <div className="table-header">
        <h3>Sales Records</h3>
        <div className="table-controls">
          <select
            value={filterRegion}
            onChange={(e) => {
              setFilterRegion(e.target.value);
              setCurrentPage(1);
            }}
            className="filter-select"
          >
            <option value="">All Regions</option>
            <option value="East">East</option>
            <option value="West">West</option>
            <option value="North">North</option>
            <option value="South">South</option>
          </select>

          <select
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(parseInt(e.target.value));
              setCurrentPage(1);
            }}
            className="items-select"
          >
            <option value="5">5 per page</option>
            <option value="10">10 per page</option>
            <option value="25">25 per page</option>
            <option value="50">50 per page</option>
          </select>

          <button onClick={handleExport} className="btn-export">
            Export to Excel
          </button>
          <button onClick={loadRecords} className="btn-refresh">
            Refresh
          </button>
        </div>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      {loading ? (
        <div className="loading">Loading records...</div>
      ) : (
        <>
          <div className="table-wrapper">
            <table className="sales-table">
              <thead>
                <tr>
                  <th onClick={() => handleSort('id')} className="sortable">
                    ID <SortIcon column="id" />
                  </th>
                  <th onClick={() => handleSort('region')} className="sortable">
                    Region <SortIcon column="region" />
                  </th>
                  <th onClick={() => handleSort('sales_amount')} className="sortable">
                    Sales Amount <SortIcon column="sales_amount" />
                  </th>
                  <th onClick={() => handleSort('price')} className="sortable">
                    Price <SortIcon column="price" />
                  </th>
                  <th onClick={() => handleSort('profit')} className="sortable">
                    Profit <SortIcon column="profit" />
                  </th>
                  <th onClick={() => handleSort('discount')} className="sortable">
                    Discount <SortIcon column="discount" />
                  </th>
                  <th onClick={() => handleSort('date')} className="sortable">
                    Date <SortIcon column="date" />
                  </th>
                  <th onClick={() => handleSort('month')} className="sortable">
                    Month <SortIcon column="month" />
                  </th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedRecords.map((record) => (
                  <tr key={record.id}>
                    <td className="id-cell">{record.id}</td>
                    <td>
                      <span className="region-badge">
                        {record.region}
                      </span>
                    </td>
                    <td className="amount-cell">
                      ${record.sales_amount.toFixed(2)}
                    </td>
                    <td>${record.price.toFixed(2)}</td>
                    <td className="profit-cell">
                      ${record.profit.toFixed(2)}
                    </td>
                    <td>{record.discount.toFixed(2)}%</td>
                    <td>{record.date}</td>
                    <td>{record.month}</td>
                    <td>
                      <button
                        onClick={() => handleDelete(record.id)}
                        className="btn-delete"
                        title="Delete record"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="pagination">
            <span className="record-count">
              Showing {startIndex + 1}-{Math.min(endIndex, sortedRecords.length)} of {sortedRecords.length} records
            </span>
            <div className="pagination-controls">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="btn-pagination"
              >
                Previous
              </button>
              <span className="page-info">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="btn-pagination"
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SalesTable;

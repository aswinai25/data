/**
 * DataEntry Component - Form for entering sales data
 */
import React, { useState } from 'react';
import { salesAPI } from '../services/api';
import './DataEntry.css';

const DataEntry = ({ onRecordAdded }) => {
  const [formData, setFormData] = useState({
    region: 'East',
    sales_amount: '',
    price: '',
    profit: '',
    discount: '',
    date: new Date().toISOString().split('T')[0],
    month: 'March',
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const regions = ['East', 'West', 'North', 'South'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear messages on change
    setSuccessMessage('');
    setErrorMessage('');
  };

  const handleDateChange = (e) => {
    const date = new Date(e.target.value);
    const monthIndex = date.getMonth();
    const monthName = months[monthIndex];
    
    setFormData(prev => ({
      ...prev,
      date: e.target.value,
      month: monthName
    }));
  };

  const validateForm = () => {
    if (!formData.region.trim()) return 'Region is required';
    if (!formData.sales_amount || parseFloat(formData.sales_amount) <= 0) 
      return 'Sales amount must be greater than 0';
    if (!formData.price || parseFloat(formData.price) <= 0)
      return 'Price must be greater than 0';
    if (formData.profit === '') return 'Profit is required';
    if (formData.discount === '' || parseFloat(formData.discount) < 0 || parseFloat(formData.discount) > 100)
      return 'Discount must be between 0 and 100';
    if (!formData.date) return 'Date is required';
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const error = validateForm();
    if (error) {
      setErrorMessage(error);
      return;
    }

    setLoading(true);
    try {
      const data = {
        ...formData,
        sales_amount: parseFloat(formData.sales_amount),
        price: parseFloat(formData.price),
        profit: parseFloat(formData.profit),
        discount: parseFloat(formData.discount),
      };
      
      await salesAPI.create(data);
      setSuccessMessage('Sales record created successfully!');
      
      // Reset form
      setFormData({
        region: 'East',
        sales_amount: '',
        price: '',
        profit: '',
        discount: '',
        date: new Date().toISOString().split('T')[0],
        month: 'March',
      });

      // Notify parent component
      if (onRecordAdded) {
        onRecordAdded();
      }

      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      setErrorMessage('Error creating sales record: ' + (err.response?.data?.detail || err.message));
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      region: 'East',
      sales_amount: '',
      price: '',
      profit: '',
      discount: '',
      date: new Date().toISOString().split('T')[0],
      month: 'March',
    });
    setSuccessMessage('');
    setErrorMessage('');
  };

  return (
    <div className="data-entry-container">
      <div className="form-card">
        <h2>Sales Data Entry Form</h2>
        
        {successMessage && (
          <div className="alert alert-success">{successMessage}</div>
        )}
        {errorMessage && (
          <div className="alert alert-error">{errorMessage}</div>
        )}

        <form onSubmit={handleSubmit} className="entry-form">
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="region">Region *</label>
              <select
                id="region"
                name="region"
                value={formData.region}
                onChange={handleChange}
                required
              >
                {regions.map(r => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="sales_amount">Sales Amount *</label>
              <input
                id="sales_amount"
                type="number"
                name="sales_amount"
                value={formData.sales_amount}
                onChange={handleChange}
                placeholder="0.00"
                step="0.01"
                min="0"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="price">Price *</label>
              <input
                id="price"
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="0.00"
                step="0.01"
                min="0"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="profit">Profit *</label>
              <input
                id="profit"
                type="number"
                name="profit"
                value={formData.profit}
                onChange={handleChange}
                placeholder="0.00"
                step="0.01"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="discount">Discount (%) *</label>
              <input
                id="discount"
                type="number"
                name="discount"
                value={formData.discount}
                onChange={handleChange}
                placeholder="0"
                step="0.01"
                min="0"
                max="100"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="date">Date *</label>
              <input
                id="date"
                type="date"
                name="date"
                value={formData.date}
                onChange={handleDateChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="month">Month (Auto-filled)</label>
              <input
                id="month"
                type="text"
                name="month"
                value={formData.month}
                readOnly
                className="readonly-input"
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Submitting...' : 'Submit'}
            </button>
            <button type="button" className="btn btn-secondary" onClick={handleReset}>
              Clear
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DataEntry;

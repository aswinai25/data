/**
 * API Service for communicating with the FastAPI backend
 */
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Sales CRUD operations
export const salesAPI = {
  // Create a new sales record
  create: async (data) => {
    const response = await apiClient.post('/api/sales', data);
    return response.data;
  },

  // Get all sales records
  getAll: async (skip = 0, limit = 100, filters = {}) => {
    const params = { skip, limit, ...filters };
    const response = await apiClient.get('/api/sales', { params });
    return response.data;
  },

  // Get a specific sales record
  getById: async (id) => {
    const response = await apiClient.get(`/api/sales/${id}`);
    return response.data;
  },

  // Update a sales record
  update: async (id, data) => {
    const response = await apiClient.put(`/api/sales/${id}`, data);
    return response.data;
  },

  // Delete a sales record
  delete: async (id) => {
    await apiClient.delete(`/api/sales/${id}`);
  },
};

// Analytics endpoints
export const analyticsAPI = {
  // Get summary metrics
  getSummary: async () => {
    const response = await apiClient.get('/api/analytics/summary');
    return response.data;
  },

  // Get sales by region
  getSalesByRegion: async () => {
    const response = await apiClient.get('/api/analytics/by-region');
    return response.data;
  },

  // Get sales by month
  getSalesByMonth: async () => {
    const response = await apiClient.get('/api/analytics/by-month');
    return response.data;
  },

  // Get profit by region
  getProfitByRegion: async () => {
    const response = await apiClient.get('/api/analytics/profit-by-region');
    return response.data;
  },

  // Export to Excel
  exportToExcel: async () => {
    const response = await apiClient.get('/api/export/excel');
    return response.data;
  },
};

export default apiClient;

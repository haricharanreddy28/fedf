import axios from 'axios';

// Mock API base URL (you can replace this with your actual API)
const API_BASE_URL = 'https://mockapi.io/api/v1'; // Replace with your actual API

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const user = sessionStorage.getItem('dv_app_current_user');
    if (user) {
      const userData = JSON.parse(user);
      config.headers.Authorization = `Bearer ${userData.id}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Server responded with error
      switch (error.response.status) {
        case 401:
          return Promise.reject(new Error('Unauthorized. Please login again.'));
        case 404:
          return Promise.reject(new Error('Resource not found.'));
        case 500:
          return Promise.reject(new Error('Server error. Please try again later.'));
        default:
          return Promise.reject(new Error(error.response.data?.message || 'An error occurred'));
      }
    } else if (error.request) {
      // Request made but no response
      return Promise.reject(new Error('Network issue. Please check your connection.'));
    } else {
      // Something else happened
      return Promise.reject(new Error('Failed to load data. Please try again.'));
    }
  }
);

// API functions with retry logic
const retryRequest = async (fn: () => Promise<any>, retries = 3): Promise<any> => {
  try {
    return await fn();
  } catch (error: any) {
    if (retries > 0 && (error.message.includes('Network') || error.message.includes('Server'))) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      return retryRequest(fn, retries - 1);
    }
    throw error;
  }
};

// Example API functions (using mock data from localStorage for now)
export const fetchLegalRights = async () => {
  try {
    // In a real app, this would be: return await api.get('/legal-rights');
    // For now, we'll use localStorage data
    const data = localStorage.getItem('dv_app_legal_rights');
    return { data: data ? JSON.parse(data) : [] };
  } catch (error: any) {
    throw new Error(error.message || 'Failed to fetch legal rights');
  }
};

export const fetchSupportServices = async () => {
  try {
    // In a real app, this would be: return await api.get('/support-services');
    const data = localStorage.getItem('dv_app_support_services');
    return { data: data ? JSON.parse(data) : [] };
  } catch (error: any) {
    throw new Error(error.message || 'Failed to fetch support services');
  }
};

export const submitCaseNote = async (note: any) => {
  try {
    // In a real app, this would be: return await api.post('/case-notes', note);
    return { data: note, status: 201 };
  } catch (error: any) {
    throw new Error(error.message || 'Failed to submit case note');
  }
};

export const uploadDocument = async (file: File) => {
  try {
    // In a real app, this would be: return await api.post('/documents', formData);
    return { data: { id: `doc-${Date.now()}`, filename: file.name }, status: 201 };
  } catch (error: any) {
    throw new Error(error.message || 'Failed to upload document');
  }
};

export default api;


/**
 * API Client Utility
 * Handles all HTTP requests to the backend with authentication
 */

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || '/api';

/**
 * Get authentication token from localStorage
 */
const getToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
};

/**
 * Store authentication token in localStorage
 */
export const setToken = (token) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('token', token);
  }
};

/**
 * Remove authentication token from localStorage
 */
export const removeToken = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('token');
  }
};

/**
 * Make an API request with automatic token handling
 */
const apiRequest = async (endpoint, options = {}) => {
  const token = getToken();
  
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const config = {
    ...options,
    headers,
    credentials: 'include', // Include cookies for CORS
  };

  try {
    const response = await fetch(`${API_BASE}${endpoint}`, config);
    
    // Handle non-JSON responses
    const contentType = response.headers.get('content-type');
    const isJson = contentType && contentType.includes('application/json');
    
    let data;
    if (isJson) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    // Handle error responses
    if (!response.ok) {
      const error = new Error(data.message || data.detail || `Request failed with status ${response.status}`);
      error.status = response.status;
      error.data = data;
      throw error;
    }

    return data;
  } catch (error) {
    // Network errors
    if (error.name === 'TypeError' || error.message.includes('fetch')) {
      throw new Error('Network error. Please check your connection and try again.');
    }
    throw error;
  }
};

/**
 * API Client with convenience methods
 */
export const apiClient = {
  /**
   * GET request
   */
  async get(endpoint) {
    return apiRequest(endpoint, { method: 'GET' });
  },

  /**
   * POST request
   */
  async post(endpoint, data) {
    return apiRequest(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  /**
   * PUT request
   */
  async put(endpoint, data) {
    return apiRequest(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  /**
   * DELETE request
   */
  async delete(endpoint) {
    return apiRequest(endpoint, { method: 'DELETE' });
  },

  /**
   * PATCH request
   */
  async patch(endpoint, data) {
    return apiRequest(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  },
};

export default apiClient;


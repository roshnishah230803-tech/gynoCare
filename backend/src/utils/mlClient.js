/**
 * ML Service HTTP Client
 * Handles communication with FastAPI ML service with retries and timeout
 */
const axios = require('axios');
const config = require('../config/config');
const logger = require('./logger');

// Create axios instance with default config
const mlClient = axios.create({
  baseURL: config.mlService.url,
  timeout: 30000, // 30 second timeout
  headers: {
    'Content-Type': 'application/json'
  }
});

/**
 * Retry logic for ML service calls
 * @param {Function} fn - Async function to retry
 * @param {Number} retries - Number of retry attempts
 * @param {Number} delay - Delay between retries in ms
 */
async function retryRequest(fn, retries = 3, delay = 1000) {
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === retries - 1) throw error;
      
      logger.warn(`ML service request failed, retrying... (${i + 1}/${retries})`);
      await new Promise(resolve => setTimeout(resolve, delay));
      delay *= 2; // Exponential backoff
    }
  }
}

/**
 * Call PCOS prediction endpoint
 * @param {Object} data - PCOS features
 * @returns {Promise<Object>} Prediction result
 */
async function predictPCOS(data) {
  try {
    const response = await retryRequest(() => 
      mlClient.post('/predict/pcos', data)
    );
    
    logger.info('PCOS prediction successful');
    return response.data;
  } catch (error) {
    logger.error('PCOS prediction failed', error);
    
    if (error.code === 'ECONNREFUSED') {
      throw new Error('ML service is unavailable. Please try again later.');
    }
    
    if (error.response) {
      throw new Error(error.response.data.detail || 'ML prediction failed');
    }
    
    throw new Error('Failed to connect to ML service');
  }
}

/**
 * Call Cervical Cancer prediction endpoint
 * @param {Object} data - Cervical cancer features
 * @returns {Promise<Object>} Prediction result
 */
async function predictCervicalCancer(data) {
  try {
    const response = await retryRequest(() => 
      mlClient.post('/predict/cervical', data)
    );
    
    logger.info('Cervical cancer prediction successful');
    return response.data;
  } catch (error) {
    logger.error('Cervical cancer prediction failed', error);
    
    if (error.code === 'ECONNREFUSED') {
      throw new Error('ML service is unavailable. Please try again later.');
    }
    
    if (error.response) {
      throw new Error(error.response.data.detail || 'ML prediction failed');
    }
    
    throw new Error('Failed to connect to ML service');
  }
}

/**
 * Health check for ML service
 * @returns {Promise<Boolean>} Service health status
 */
async function checkMLServiceHealth() {
  try {
    const response = await mlClient.get('/health', { timeout: 5000 });
    return response.status === 200;
  } catch (error) {
    logger.error('ML service health check failed', error);
    return false;
  }
}

module.exports = {
  predictPCOS,
  predictCervicalCancer,
  checkMLServiceHealth
};
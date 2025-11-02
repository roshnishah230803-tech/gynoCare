/**
 * Authentication middleware - validates JWT tokens
 */
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const User = require('../models/User');
const logger = require('../utils/logger');

/**
 * Verify JWT token and attach user to request
 */
const authenticateToken = async (req, res, next) => {
  try {
    // Get token from header
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN
    
    if (!token) {
      return res.status(401).json({ 
        success: false, 
        message: 'Access denied. No token provided.' 
      });
    }
    
    // Verify token
    const decoded = jwt.verify(token, config.jwt.secret);
    
    // Get user from database (exclude password)
    const user = await User.findById(decoded.userId).select('-password');
    
    if (!user) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid token. User not found.' 
      });
    }
    
    // Attach user to request
    req.user = user;
    next();
  } catch (error) {
    logger.error('Authentication error', error);
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        success: false, 
        message: 'Token expired. Please login again.' 
      });
    }
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid token.' 
      });
    }
    
    res.status(500).json({ 
      success: false, 
      message: 'Authentication failed' 
    });
  }
};

/**
 * Generate JWT token
 * @param {String} userId - User ID
 * @returns {String} JWT token
 */
const generateToken = (userId) => {
  return jwt.sign(
    { userId }, 
    config.jwt.secret, 
    { expiresIn: config.jwt.expiresIn }
  );
};

/**
 * Generate refresh token
 * @param {String} userId - User ID
 * @returns {String} Refresh token
 */
const generateRefreshToken = (userId) => {
  return jwt.sign(
    { userId }, 
    config.jwt.secret, 
    { expiresIn: config.jwt.refreshExpiresIn }
  );
};

module.exports = {
  authenticateToken,
  generateToken,
  generateRefreshToken
};
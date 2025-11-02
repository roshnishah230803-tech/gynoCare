/**
 * Authentication controller - handles user registration and login
 */
const User = require('../models/User');
const Log = require('../models/Log');
const { generateToken, generateRefreshToken } = require('../middleware/auth');
const logger = require('../utils/logger');

/**
 * Register new user
 * POST /api/auth/register
 */
exports.register = async (req, res) => {
  try {
    const { name, email, password, dob } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Email already registered'
      });
    }
    
    // Create new user
    const user = new User({
      name,
      email,
      password, // Will be hashed by pre-save hook
      dob
    });
    
    await user.save();
    
    // Generate tokens
    const token = generateToken(user._id);
    const refreshToken = generateRefreshToken(user._id);
    
    // Log action
    await Log.create({
      userId: user._id,
      action: 'User registered'
    });
    
    logger.info(`New user registered: ${user._id}`);
    
    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          dob: user.dob
        },
        token,
        refreshToken
      }
    });
  } catch (error) {
    logger.error('Registration error', error);
    res.status(500).json({
      success: false,
      message: 'Registration failed',
      error: error.message
    });
  }
};

/**
 * Login user
 * POST /api/auth/login
 */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user with password field
    const user = await User.findOne({ email }).select('+password');
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }
    
    // Check password
    const isPasswordValid = await user.comparePassword(password);
    
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }
    
    // Generate tokens
    const token = generateToken(user._id);
    const refreshToken = generateRefreshToken(user._id);
    
    // Log action
    await Log.create({
      userId: user._id,
      action: 'User logged in'
    });
    
    logger.info(`User logged in: ${user._id}`);
    
    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          dob: user.dob
        },
        token,
        refreshToken
      }
    });
  } catch (error) {
    logger.error('Login error', error);
    res.status(500).json({
      success: false,
      message: 'Login failed',
      error: error.message
    });
  }
};

/**
 * Get current user profile
 * GET /api/auth/me
 */
exports.getProfile = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      data: {
        user: {
          id: req.user._id,
          name: req.user.name,
          email: req.user.email,
          dob: req.user.dob,
          age: req.user.getAge()
        }
      }
    });
  } catch (error) {
    logger.error('Get profile error', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get profile'
    });
  }
};
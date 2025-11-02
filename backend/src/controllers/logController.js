/**
 * Log controller - retrieves user activity logs
 */
const Log = require('../models/Log');
const logger = require('../utils/logger');

/**
 * Get logs for current user
 * GET /api/logs
 */
exports.getUserLogs = async (req, res) => {
  try {
    const { limit = 20, page = 1 } = req.query;
    
    const logs = await Log.find({ userId: req.user._id })
      .sort({ timestamp: -1 })
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit));
    
    const total = await Log.countDocuments({ userId: req.user._id });
    
    res.status(200).json({
      success: true,
      data: {
        logs,
        pagination: {
          total,
          page: parseInt(page),
          pages: Math.ceil(total / parseInt(limit))
        }
      }
    });
  } catch (error) {
    logger.error('Get logs error', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve logs'
    });
  }
};
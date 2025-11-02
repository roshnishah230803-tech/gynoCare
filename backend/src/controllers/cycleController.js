/**
 * Cycle controller - manages menstrual cycle tracking
 */
const Cycle = require('../models/Cycle');
const Log = require('../models/Log');
const logger = require('../utils/logger');

/**
 * Create new cycle record
 * POST /api/cycles
 */
exports.createCycle = async (req, res) => {
  try {
    const { lastPeriod, cycleLength, periodLength, flow } = req.body;
    
    const cycle = new Cycle({
      userId: req.user._id,
      lastPeriod,
      cycleLength,
      periodLength,
      flow
    });
    
    await cycle.save();
    
    // Log action
    await Log.create({
      userId: req.user._id,
      action: 'Recorded menstrual cycle'
    });
    
    logger.info(`Cycle recorded for user: ${req.user._id}`);
    
    res.status(201).json({
      success: true,
      message: 'Cycle recorded successfully',
      data: { cycle }
    });
  } catch (error) {
    logger.error('Create cycle error', error);
    res.status(500).json({
      success: false,
      message: 'Failed to record cycle'
    });
  }
};

/**
 * Get all cycles for current user
 * GET /api/cycles
 */
exports.getCycles = async (req, res) => {
  try {
    const { limit = 10, page = 1 } = req.query;
    
    const cycles = await Cycle.find({ userId: req.user._id })
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit));
    
    const total = await Cycle.countDocuments({ userId: req.user._id });
    
    res.status(200).json({
      success: true,
      data: {
        cycles,
        pagination: {
          total,
          page: parseInt(page),
          pages: Math.ceil(total / parseInt(limit))
        }
      }
    });
  } catch (error) {
    logger.error('Get cycles error', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve cycles'
    });
  }
};

/**
 * Get single cycle by ID
 * GET /api/cycles/:id
 */
exports.getCycleById = async (req, res) => {
  try {
    const cycle = await Cycle.findOne({
      _id: req.params.id,
      userId: req.user._id
    });
    
    if (!cycle) {
      return res.status(404).json({
        success: false,
        message: 'Cycle not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: { cycle }
    });
  } catch (error) {
    logger.error('Get cycle by ID error', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve cycle'
    });
  }
};

/**
 * Update cycle
 * PUT /api/cycles/:id
 */
exports.updateCycle = async (req, res) => {
  try {
    const { lastPeriod, cycleLength, periodLength, flow } = req.body;
    
    const cycle = await Cycle.findOne({
      _id: req.params.id,
      userId: req.user._id
    });
    
    if (!cycle) {
      return res.status(404).json({
        success: false,
        message: 'Cycle not found'
      });
    }
    
    // Update fields
    if (lastPeriod) cycle.lastPeriod = lastPeriod;
    if (cycleLength) cycle.cycleLength = cycleLength;
    if (periodLength) cycle.periodLength = periodLength;
    if (flow) cycle.flow = flow;
    
    await cycle.save();
    
    logger.info(`Cycle updated for user: ${req.user._id}`);
    
    res.status(200).json({
      success: true,
      message: 'Cycle updated successfully',
      data: { cycle }
    });
  } catch (error) {
    logger.error('Update cycle error', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update cycle'
    });
  }
};
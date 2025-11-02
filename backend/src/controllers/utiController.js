/**
 * UTI controller - handles symptom submission and risk assessment
 * MEDICAL DISCLAIMER: This is a risk assessment only and not a medical diagnosis.
 * Consult a medical professional for proper evaluation.
 */
const UTI = require('../models/UTI');
const Log = require('../models/Log');
const { calculateUTIRisk } = require('../utils/scoringLogic');
const logger = require('../utils/logger');

/**
 * Submit UTI symptoms and get risk assessment
 * POST /api/uti
 */
exports.submitSymptoms = async (req, res) => {
  try {
    const symptoms = req.body;
    
    // Calculate risk using scoring logic
    const { riskScore, result } = calculateUTIRisk(symptoms);
    
    // Create record
    const utiRecord = new UTI({
      userId: req.user._id,
      ...symptoms,
      riskScore,
      result
    });
    
    await utiRecord.save();
    
    // Log action
    await Log.create({
      userId: req.user._id,
      action: 'Checked UTI risk'
    });
    
    logger.info(`UTI assessment completed for user: ${req.user._id}`);
    
    res.status(201).json({
      success: true,
      message: 'UTI risk assessment completed',
      disclaimer: 'This is a risk assessment only and not a medical diagnosis. Consult a medical professional.',
      data: {
        riskScore,
        result,
        recordId: utiRecord._id
      }
    });
  } catch (error) {
    logger.error('UTI assessment error', error);
    res.status(500).json({
      success: false,
      message: 'Failed to complete assessment'
    });
  }
};

/**
 * Get UTI history for current user
 * GET /api/uti
 */
exports.getHistory = async (req, res) => {
  try {
    const { limit = 10, page = 1 } = req.query;
    
    const records = await UTI.find({ userId: req.user._id })
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit));
    
    const total = await UTI.countDocuments({ userId: req.user._id });
    
    res.status(200).json({
      success: true,
      data: {
        records,
        pagination: {
          total,
          page: parseInt(page),
          pages: Math.ceil(total / parseInt(limit))
        }
      }
    });
  } catch (error) {
    logger.error('Get UTI history error', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve history'
    });
  }
};
/**
 * PCOS controller - proxies requests to ML service
 * MEDICAL DISCLAIMER: This is a risk assessment only and not a medical diagnosis.
 * Consult a medical professional for proper evaluation.
 */
const PCOS = require('../models/PCOS');
const Log = require('../models/Log');
const { predictPCOS } = require('../utils/mlClient');
const logger = require('../utils/logger');

/**
 * Submit PCOS data and get ML prediction
 * POST /api/pcos
 */
exports.predictPCOS = async (req, res) => {
  try {
    const pcosData = req.body;
    
    // Call ML service
    const prediction = await predictPCOS(pcosData);
    
    // Store result in database
    const pcosRecord = new PCOS({
      userId: req.user._id,
      ...pcosData,
      pcosRisk: prediction.probability || prediction.raw_score,
      result: prediction.result
    });
    
    await pcosRecord.save();
    
    // Log action
    await Log.create({
      userId: req.user._id,
      action: 'Checked PCOS risk (ML)'
    });
    
    logger.info(`PCOS prediction completed for user: ${req.user._id}`);
    
    res.status(201).json({
      success: true,
      message: 'PCOS prediction completed',
      disclaimer: 'This is a risk assessment only and not a medical diagnosis. Consult a medical professional.',
      data: {
        result: prediction.result,
        probability: prediction.probability,
        rawScore: prediction.raw_score,
        explanation: prediction.explanation,
        recordId: pcosRecord._id
      }
    });
  } catch (error) {
    logger.error('PCOS prediction error', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to complete PCOS prediction'
    });
  }
};

/**
 * Get PCOS history for current user
 * GET /api/pcos
*/
exports.getHistory = async (req, res) => {
  try {
    const { limit = 10, page = 1 } = req.query;
    
    const records = await PCOS.find({ userId: req.user._id })
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit));
    
    const total = await PCOS.countDocuments({ userId: req.user._id });
    
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
    logger.error('Get PCOS history error', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve history'
    });
  }
};
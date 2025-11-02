/**
 * Endometriosis controller - handles symptom submission and risk assessment
 * MEDICAL DISCLAIMER: This is a risk assessment only and not a medical diagnosis.
 * Consult a medical professional for proper evaluation.
 */
const Endometriosis = require('../models/Endometriosis');
const Log = require('../models/Log');
const { calculateEndometriosisRisk } = require('../utils/scoringLogic');
const logger = require('../utils/logger');

/**
 * Submit endometriosis symptoms and get risk assessment
 * POST /api/endometriosis
 */
exports.submitSymptoms = async (req, res) => {
  try {
    const symptoms = req.body;
    
    // Calculate risk using scoring logic
    const { riskScore, result } = calculateEndometriosisRisk(symptoms);
    
    // Create record
    const endometriosisRecord = new Endometriosis({
      userId: req.user._id,
      age: symptoms.age,
      cycleRegularity: symptoms.cycleRegularity,
      menstrualPain: symptoms.menstrualPain,
      painBeforePeriod: symptoms.painBeforePeriod,
      painDuringOvulation: symptoms.painDuringOvulation,
      painDuringSex: symptoms.painDuringSex,
      pelvicPain: symptoms.pelvicPain,
      excessiveBleeding: symptoms.excessiveBleeding,
      spotting: symptoms.spotting,
      digestiveSymptom: symptoms.digestiveSymptom,
      infertility: symptoms.infertility,
      historyEndometriosis: symptoms.historyEndometriosis,
      riskScore,
      result
    });
    
    await endometriosisRecord.save();
    
    // Log action
    await Log.create({
      userId: req.user._id,
      action: 'Checked endometriosis risk'
    });
    
    logger.info(`Endometriosis assessment completed for user: ${req.user._id}`);
    
    res.status(201).json({
      success: true,
      message: 'Endometriosis risk assessment completed',
      disclaimer: 'This is a risk assessment only and not a medical diagnosis. Consult a medical professional.',
      data: {
        riskScore,
        result,
        recordId: endometriosisRecord._id
      }
    });
  } catch (error) {
    logger.error('Endometriosis assessment error', error);
    res.status(500).json({
      success: false,
      message: 'Failed to complete assessment'
    });
  }
};

/**
 * Get endometriosis history for current user
 * GET /api/endometriosis
 */
exports.getHistory = async (req, res) => {
  try {
    const { limit = 10, page = 1 } = req.query;
    
    const records = await Endometriosis.find({ userId: req.user._id })
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit));
    
    const total = await Endometriosis.countDocuments({ userId: req.user._id });
    
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
    logger.error('Get endometriosis history error', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve history'
    });
  }
};
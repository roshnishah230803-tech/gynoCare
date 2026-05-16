/**
 * Cervical Cancer controller - proxies requests to ML service
 * MEDICAL DISCLAIMER: This is a risk assessment only and not a medical diagnosis.
 * Consult a medical professional for proper evaluation.
 */
const CervicalCancer = require('../models/CervicalCancer');
const Log = require('../models/Log');
const { predictCervicalCancer } = require('../utils/mlClient');
const logger = require('../utils/logger');

/**
 * Transform camelCase to snake_case for ML service
 * @param {Object} data - Data in camelCase
 * @returns {Object} Data in snake_case
 */
function transformToSnakeCase(data) {
  return {
    age: data.age,
    num_sexual_partners: data.numSexualPartners,
    age_first_intercourse: data.ageFirstIntercourse,
    num_pregnancies: data.numPregnancies,
    smoking: data.smoking,
    years_smoking: data.yearsSmoking || 0,
    hormonal_contraceptives: data.hormonalContraceptives,
    years_hormonal_contraceptives: data.yearsHormonalContraceptives || 0,
    iud: data.iud,
    years_iud: data.yearsIud || 0,
    stds: data.stds,
    num_stds: data.numStds || 0,
    std_hpv: data.stdHpv,
    std_hiv: data.stdHiv
  };
}

/**
 * Submit cervical cancer data and get ML prediction
 * POST /api/cervical-cancer
 */
exports.predictCervicalCancer = async (req, res) => {
  try {
    const cervicalData = req.body;
    
    // Transform camelCase to snake_case for ML service
    const mlData = transformToSnakeCase(cervicalData);
    
    // Call ML service
    const prediction = await predictCervicalCancer(mlData);
    
    // Store result in database
    const cervicalRecord = new CervicalCancer({
      userId: req.user._id,
      ...cervicalData,
      cervicalCancerRisk: prediction.probability || prediction.raw_score,
      result: prediction.result
    });
    
    await cervicalRecord.save();
    
    // Log action
    await Log.create({
      userId: req.user._id,
      action: 'Checked cervical cancer risk (ML)'
    });
    
    logger.info(`Cervical cancer prediction completed for user: ${req.user._id}`);
    
    res.status(201).json({
      success: true,
      message: 'Cervical cancer prediction completed',
      disclaimer: 'This is a risk assessment only and not a medical diagnosis. Consult a medical professional.',
      data: {
        result: prediction.result,
        probability: prediction.probability,
        rawScore: prediction.raw_score,
        explanation: prediction.explanation,
        recordId: cervicalRecord._id
      }
    });
  } catch (error) {
    logger.error('Cervical cancer prediction error', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to complete cervical cancer prediction'
    });
  }
};

/**
 * Get cervical cancer history for current user
 * GET /api/cervical-cancer
 */
exports.getHistory = async (req, res) => {
  try {
    const { limit = 10, page = 1 } = req.query;
    
    const records = await CervicalCancer.find({ userId: req.user._id })
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit));
    
    const total = await CervicalCancer.countDocuments({ userId: req.user._id });
    
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
    logger.error('Get cervical cancer history error', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve history'
    });
  }
};
/**
 * Input validation middleware using Joi
 */
const Joi = require('joi');

/**
 * Generic validation middleware
 * @param {Object} schema - Joi validation schema
 * @returns {Function} Express middleware
 */
const validate = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false, // Return all errors
      stripUnknown: true // Remove unknown fields
    });
    
    if (error) {
      const errors = error.details.map(detail => ({
        field: detail.path.join('.'),
        message: detail.message
      }));
      
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors
      });
    }
    
    // Replace req.body with validated/sanitized value
    req.body = value;
    next();
  };
};

// Validation schemas
const schemas = {
  register: Joi.object({
    name: Joi.string().max(100).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    dob: Joi.date().max('now').required()
  }),
  
  login: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  }),
  
  cycle: Joi.object({
    lastPeriod: Joi.date().max('now').required(),
    cycleLength: Joi.number().min(21).max(45).default(28),
    periodLength: Joi.number().min(1).max(10).default(5),
    flow: Joi.string().valid('light', 'medium', 'heavy').default('medium')
  }),
  
  endometriosis: Joi.object({
    age: Joi.number().min(10).max(100).required(),
    cycleRegularity: Joi.string().valid('Regular', 'Irregular').required(),
    menstrualPain: Joi.string().valid('None', 'Mild', 'Moderate', 'Severe').required(),
    painBeforePeriod: Joi.boolean().default(false),
    painDuringOvulation: Joi.boolean().default(false),
    painDuringSex: Joi.boolean().default(false),
    pelvicPain: Joi.string().valid('None', 'Mild', 'Moderate', 'Severe').required(),
    excessiveBleeding: Joi.boolean().default(false),
    spotting: Joi.boolean().default(false),
    digestiveSymptom: Joi.string().valid('None', 'Diarrhea', 'Constipation', 'Bloating').default('None'),
    infertility: Joi.boolean().default(false),
    historyEndometriosis: Joi.boolean().default(false)
  }),
  
  uti: Joi.object({
    age: Joi.alternatives().try(Joi.number(), Joi.string()).required(),
    sexualActivityStatus: Joi.boolean().required(),
    burningPainUrination: Joi.string().valid('None', 'Mild', 'Moderate', 'Severe').required(),
    frequencyUrination24hrs: Joi.number().min(0).required(),
    urgencyLittleUrine: Joi.boolean().default(false),
    cloudySmellyUrine: Joi.boolean().default(false),
    bloodInUrine: Joi.boolean().default(false),
    painLowerAbdomenPelvic: Joi.string().valid('None', 'Mild', 'Moderate', 'Severe').required(),
    feverChills: Joi.boolean().default(false),
    nauseaVomiting: Joi.boolean().default(false),
    historyRecurrentUTI: Joi.boolean().default(false),
    comorbidities: Joi.alternatives().try(Joi.string(), Joi.array()).allow(null)
  }),
  
  pcos: Joi.object({
    age: Joi.number().min(10).max(100).required(),
    weight: Joi.number().min(20).max(300).required(),
    height: Joi.number().min(100).max(250).required(),
    bloodGroup: Joi.string().valid('A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-').required(),
    cycleLength: Joi.number().min(1).max(12).required(),
    recentWeightGain: Joi.boolean().default(false),
    excessHairGrowth: Joi.boolean().default(false),
    skinDarkening: Joi.boolean().default(false),
    hairLoss: Joi.boolean().default(false),
    pimples: Joi.boolean().default(false),
    fastFood: Joi.boolean().default(false),
    exercise: Joi.boolean().default(false),
    previousPCOS: Joi.boolean().default(false),
    moodSwings: Joi.boolean().default(false),
    periodRegularity: Joi.string().valid('Regular', 'Irregular').required(),
    periodDuration: Joi.number().min(1).max(15).required()
  }),
  
  cervicalCancer: Joi.object({
    age: Joi.number().min(18).max(100).required(),
    numSexualPartners: Joi.number().min(0).required(),
    ageFirstIntercourse: Joi.number().min(10).max(50).required(),
    numPregnancies: Joi.number().min(0).required(),
    smoking: Joi.boolean().required(),
    yearsSmoking: Joi.number().min(0).default(0),
    hormonalContraceptives: Joi.boolean().required(),
    yearsHormonalContraceptives: Joi.number().min(0).default(0),
    iud: Joi.boolean().required(),
    yearsIud: Joi.number().min(0).default(0),
    stds: Joi.boolean().required(),
    numStds: Joi.number().min(0).default(0),
    stdHpv: Joi.boolean().required(),
    stdHiv: Joi.boolean().required()
  })
};

module.exports = {
  validate,
  schemas
};
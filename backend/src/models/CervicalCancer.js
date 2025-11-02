// CervicalCancer model - stores ML prediction results for cervical cancer risk
const mongoose = require('mongoose');

const cervicalCancerSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  age: {
    type: Number,
    required: true
  },
  numSexualPartners: {
    type: Number,
    required: true,
    min: 0
  },
  ageFirstIntercourse: {
    type: Number,
    required: true
  },
  numPregnancies: {
    type: Number,
    required: true,
    min: 0
  },
  smoking: {
    type: Boolean,
    required: true
  },
  yearsSmoking: {
    type: Number,
    default: 0,
    min: 0
  },
  hormonalContraceptives: {
    type: Boolean,
    required: true
  },
  yearsHormonalContraceptives: {
    type: Number,
    default: 0,
    min: 0
  },
  iud: {
    type: Boolean,
    required: true
  },
  yearsIud: {
    type: Number,
    default: 0,
    min: 0
  },
  stds: {
    type: Boolean,
    required: true
  },
  numStds: {
    type: Number,
    default: 0,
    min: 0
  },
  stdHpv: {
    type: Boolean,
    required: true
  },
  stdHiv: {
    type: Boolean,
    required: true
  },
  cervicalCancerRisk: {
    type: Number,
    required: true // Probability from ML model (0-1)
  },
  result: {
    type: String,
    enum: ['Low Risk', 'Moderate Risk', 'High Risk'],
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    index: true
  }
}, {
  timestamps: true
});

// Compound index for user queries
cervicalCancerSchema.index({ userId: 1, createdAt: -1 });

module.exports = mongoose.model('CervicalCancer', cervicalCancerSchema);
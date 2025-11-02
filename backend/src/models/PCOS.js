// PCOS model - stores ML prediction results for PCOS
const mongoose = require('mongoose');

const pcosSchema = new mongoose.Schema({
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
  weight: {
    type: Number,
    required: true
  },
  height: {
    type: Number,
    required: true
  },
  bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'],
    required: true
  },
  cycleLength: {
    type: Number,
    required: true
  },
  recentWeightGain: {
    type: Boolean,
    default: false
  },
  excessHairGrowth: {
    type: Boolean,
    default: false
  },
  skinDarkening: {
    type: Boolean,
    default: false
  },
  hairLoss: {
    type: Boolean,
    default: false
  },
  pimples: {
    type: Boolean,
    default: false
  },
  fastFood: {
    type: Boolean,
    default: false
  },
  exercise: {
    type: Boolean,
    default: false
  },
  previousPCOS: {
    type: Boolean,
    default: false
  },
  moodSwings: {
    type: Boolean,
    default: false
  },
  periodRegularity: {
    type: String,
    enum: ['Regular', 'Irregular'],
    required: true
  },
  periodDuration: {
    type: Number,
    required: true
  },
  pcosRisk: {
    type: Number,
    required: true // Probability from ML model (0-1)
  },
  result: {
    type: String,
    enum: ['Likely PCOS', 'Unlikely PCOS'],
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
pcosSchema.index({ userId: 1, createdAt: -1 });

module.exports = mongoose.model('PCOS', pcosSchema);
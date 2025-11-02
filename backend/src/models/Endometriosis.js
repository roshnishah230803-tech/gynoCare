// Endometriosis model - stores symptom data and risk assessment
const mongoose = require('mongoose');

const endometriosisSchema = new mongoose.Schema({
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
  cycleRegularity: {
    type: String,
    enum: ['Regular', 'Irregular'],
    required: true
  },
  menstrualPain: {
    type: String,
    enum: ['None', 'Mild', 'Moderate', 'Severe'],
    required: true
  },
  painBeforePeriod: {
    type: Boolean,
    default: false
  },
  painDuringOvulation: {
    type: Boolean,
    default: false
  },
  painDuringSex: {
    type: Boolean,
    default: false
  },
  pelvicPain: {
    type: String,
    enum: ['None', 'Mild', 'Moderate', 'Severe'],
    required: true
  },
  excessiveBleeding: {
    type: Boolean,
    default: false
  },
  spotting: {
    type: Boolean,
    default: false
  },
  digestiveSymptom: {
    type: String,
    enum: ['None', 'Diarrhea', 'Constipation', 'Bloating'],
    default: 'None'
  },
  infertility: {
    type: Boolean,
    default: false
  },
  historyEndometriosis: {
    type: Boolean,
    default: false
  },
  riskScore: {
    type: Number,
    required: true
  },
  result: {
    type: String,
    enum: ['Low', 'Medium', 'High'],
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
endometriosisSchema.index({ userId: 1, createdAt: -1 });

module.exports = mongoose.model('Endometriosis', endometriosisSchema);
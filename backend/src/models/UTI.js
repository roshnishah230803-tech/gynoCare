// UTI model - stores UTI symptom data and risk assessment
const mongoose = require('mongoose');

const utiSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  age: {
    type: mongoose.Schema.Types.Mixed, // Can be Number or String (e.g., "21-30")
    required: true
  },
  sexualActivityStatus: {
    type: Boolean,
    required: true
  },
  burningPainUrination: {
    type: String,
    enum: ['None', 'Mild', 'Moderate', 'Severe'],
    required: true
  },
  frequencyUrination24hrs: {
    type: Number,
    required: true,
    min: 0
  },
  urgencyLittleUrine: {
    type: Boolean,
    default: false
  },
  cloudySmellyUrine: {
    type: Boolean,
    default: false
  },
  bloodInUrine: {
    type: Boolean,
    default: false
  },
  painLowerAbdomenPelvic: {
    type: String,
    enum: ['None', 'Mild', 'Moderate', 'Severe'],
    required: true
  },
  feverChills: {
    type: Boolean,
    default: false
  },
  nauseaVomiting: {
    type: Boolean,
    default: false
  },
  historyRecurrentUTI: {
    type: Boolean,
    default: false
  },
  comorbidities: {
    type: mongoose.Schema.Types.Mixed, // Can be String or Array
    default: null
  },
  riskScore: {
    type: Number,
    required: true
  },
  result: {
    type: String,
    enum: ['Low Risk', 'Medium Risk', 'High Risk'],
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
utiSchema.index({ userId: 1, createdAt: -1 });

module.exports = mongoose.model('UTI', utiSchema);
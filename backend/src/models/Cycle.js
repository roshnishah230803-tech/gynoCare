// Cycle model - tracks menstrual cycle data
const mongoose = require('mongoose');

const cycleSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  lastPeriod: {
    type: Date,
    required: [true, 'Last period date is required']
  },
  cycleLength: {
    type: Number,
    required: true,
    default: 28,
    min: 21,
    max: 45
  },
  periodLength: {
    type: Number,
    required: true,
    default: 5,
    min: 1,
    max: 10
  },
  flow: {
    type: String,
    enum: ['light', 'medium', 'heavy'],
    default: 'medium'
  },
  nextPeriod: {
    type: Date
  },
  ovulation: {
    type: Date
  },
  fertileWindow: {
    type: [Date],
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now,
    index: true
  }
}, {
  timestamps: true
});

// Calculate next period, ovulation, and fertile window before saving
cycleSchema.pre('save', function(next) {
  // Calculate next period
  this.nextPeriod = new Date(this.lastPeriod);
  this.nextPeriod.setDate(this.nextPeriod.getDate() + this.cycleLength);
  
  // Calculate ovulation (typically 14 days before next period)
  this.ovulation = new Date(this.nextPeriod);
  this.ovulation.setDate(this.ovulation.getDate() - 14);
  
  // Calculate fertile window (5 days before ovulation + ovulation day)
  this.fertileWindow = [];
  for (let i = 5; i >= 0; i--) {
    const fertileDay = new Date(this.ovulation);
    fertileDay.setDate(fertileDay.getDate() - i);
    this.fertileWindow.push(fertileDay);
  }
  
  next();
});

// Compound index for efficient user queries
cycleSchema.index({ userId: 1, createdAt: -1 });

module.exports = mongoose.model('Cycle', cycleSchema);
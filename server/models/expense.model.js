const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  description: {
    type: String,
    default: ''
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true,
  versionKey: false
});

// Create indexes for efficient queries
ExpenseSchema.index({ updatedAt: 1 });
ExpenseSchema.index({ isDeleted: 1 });

const ExpenseModel = mongoose.model('Expense', ExpenseSchema);

module.exports = {
  ExpenseModel
};
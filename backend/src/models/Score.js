const mongoose = require('mongoose');

const scoreSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, 'Please provide a user name'],
      trim: true,
    },
    score: {
      type: Number,
      required: [true, 'Please provide a score'],
      min: 0,
    },
    totalQuestions: {
      type: Number,
      required: [true, 'Please provide the total number of questions'],
      min: 1,
    },
    worksheetId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Worksheet',
      required: [true, 'Please provide a worksheet ID'],
    },
    timeSpent: {
      type: Number, // Time spent in seconds
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Create index for sorting by score
scoreSchema.index({ score: -1 });

const Score = mongoose.model('Score', scoreSchema);

module.exports = Score;

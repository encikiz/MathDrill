const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  options: {
    type: [String],
    required: true,
    validate: {
      validator: function(options) {
        return options.length >= 2; // At least 2 options
      },
      message: 'At least 2 options are required',
    },
  },
  correctAnswer: {
    type: String,
    required: true,
    validate: {
      validator: function(correctAnswer) {
        return this.options.includes(correctAnswer);
      },
      message: 'Correct answer must be one of the options',
    },
  },
});

const worksheetSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a worksheet title'],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    difficulty: {
      type: String,
      enum: ['easy', 'medium', 'hard'],
      default: 'medium',
    },
    questions: {
      type: [questionSchema],
      required: true,
      validate: {
        validator: function(questions) {
          return questions.length > 0;
        },
        message: 'At least one question is required',
      },
    },
    timeLimit: {
      type: Number, // Time limit in seconds, 0 means no limit
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Worksheet = mongoose.model('Worksheet', worksheetSchema);

module.exports = Worksheet;

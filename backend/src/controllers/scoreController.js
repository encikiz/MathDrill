const Score = require('../models/Score');

// @desc    Create a new score
// @route   POST /api/scores
// @access  Public
const createScore = async (req, res) => {
  try {
    const { userName, score, totalQuestions, worksheetId, timeSpent } = req.body;

    const newScore = await Score.create({
      userName,
      score,
      totalQuestions,
      worksheetId,
      timeSpent,
    });

    res.status(201).json({
      success: true,
      data: newScore,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get all scores
// @route   GET /api/scores
// @access  Public
const getScores = async (req, res) => {
  try {
    const scores = await Score.find()
      .sort({ score: -1 })
      .populate('worksheetId', 'title difficulty');

    res.status(200).json({
      success: true,
      count: scores.length,
      data: scores,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get scores by worksheet ID
// @route   GET /api/scores/worksheet/:worksheetId
// @access  Public
const getScoresByWorksheet = async (req, res) => {
  try {
    const { worksheetId } = req.params;
    
    const scores = await Score.find({ worksheetId })
      .sort({ score: -1 })
      .populate('worksheetId', 'title difficulty');

    res.status(200).json({
      success: true,
      count: scores.length,
      data: scores,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get top scores
// @route   GET /api/scores/top/:limit
// @access  Public
const getTopScores = async (req, res) => {
  try {
    const limit = parseInt(req.params.limit) || 10;
    
    const scores = await Score.find()
      .sort({ score: -1 })
      .limit(limit)
      .populate('worksheetId', 'title difficulty');

    res.status(200).json({
      success: true,
      count: scores.length,
      data: scores,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createScore,
  getScores,
  getScoresByWorksheet,
  getTopScores,
};

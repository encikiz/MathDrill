const express = require('express');
const router = express.Router();
const {
  createScore,
  getScores,
  getScoresByWorksheet,
  getTopScores,
} = require('../controllers/scoreController');

// Create a new score
router.post('/', createScore);

// Get all scores
router.get('/', getScores);

// Get scores by worksheet ID
router.get('/worksheet/:worksheetId', getScoresByWorksheet);

// Get top scores
router.get('/top/:limit', getTopScores);

module.exports = router;

const express = require('express');
const router = express.Router();
const {
  createWorksheet,
  getWorksheets,
  getWorksheetById,
  getWorksheetWithAnswers,
  updateWorksheet,
} = require('../controllers/worksheetController');

// Create a new worksheet
router.post('/', createWorksheet);

// Get all worksheets
router.get('/', getWorksheets);

// Get worksheet by ID
router.get('/:id', getWorksheetById);

// Get worksheet with answers by ID
router.get('/:id/answers', getWorksheetWithAnswers);

// Update worksheet
router.put('/:id', updateWorksheet);

module.exports = router;

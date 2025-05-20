const Worksheet = require('../models/Worksheet');

// @desc    Create a new worksheet
// @route   POST /api/worksheets
// @access  Public
const createWorksheet = async (req, res) => {
  try {
    const { title, description, difficulty, questions, timeLimit } = req.body;

    const newWorksheet = await Worksheet.create({
      title,
      description,
      difficulty,
      questions,
      timeLimit,
    });

    res.status(201).json({
      success: true,
      data: newWorksheet,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get all worksheets
// @route   GET /api/worksheets
// @access  Public
const getWorksheets = async (req, res) => {
  try {
    const worksheets = await Worksheet.find({ isActive: true }).select('-questions.correctAnswer');

    res.status(200).json({
      success: true,
      count: worksheets.length,
      data: worksheets,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get worksheet by ID
// @route   GET /api/worksheets/:id
// @access  Public
const getWorksheetById = async (req, res) => {
  try {
    const worksheet = await Worksheet.findById(req.params.id);

    if (!worksheet) {
      return res.status(404).json({
        success: false,
        message: 'Worksheet not found',
      });
    }

    // Remove correct answers from response for security
    const worksheetForClient = worksheet.toObject();
    worksheetForClient.questions = worksheetForClient.questions.map(q => ({
      ...q,
      correctAnswer: undefined
    }));

    res.status(200).json({
      success: true,
      data: worksheetForClient,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get worksheet with answers by ID (for verification)
// @route   GET /api/worksheets/:id/answers
// @access  Public
const getWorksheetWithAnswers = async (req, res) => {
  try {
    const worksheet = await Worksheet.findById(req.params.id);

    if (!worksheet) {
      return res.status(404).json({
        success: false,
        message: 'Worksheet not found',
      });
    }

    res.status(200).json({
      success: true,
      data: worksheet,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Update worksheet
// @route   PUT /api/worksheets/:id
// @access  Public
const updateWorksheet = async (req, res) => {
  try {
    const worksheet = await Worksheet.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!worksheet) {
      return res.status(404).json({
        success: false,
        message: 'Worksheet not found',
      });
    }

    res.status(200).json({
      success: true,
      data: worksheet,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createWorksheet,
  getWorksheets,
  getWorksheetById,
  getWorksheetWithAnswers,
  updateWorksheet,
};

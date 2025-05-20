const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import routes
const scoreRoutes = require('./routes/scoreRoutes');
const worksheetRoutes = require('./routes/worksheetRoutes');

// Import middleware
const { errorHandler, notFound } = require('./middleware/errorMiddleware');

// Use routes
app.use('/api/scores', scoreRoutes);
app.use('/api/worksheets', worksheetRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('MathDrill API is running');
});

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
};

// Start server
const PORT = process.env.PORT || 5000;
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();

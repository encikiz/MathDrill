const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { worksheets } = require('./data/sampleData');
const Worksheet = require('./models/Worksheet');
const Score = require('./models/Score');

// Load environment variables
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected for seeding'))
  .catch(err => {
    console.error('Error connecting to MongoDB:', err.message);
    process.exit(1);
  });

// Import data
const importData = async () => {
  try {
    // Clear existing data
    await Worksheet.deleteMany();
    await Score.deleteMany();

    // Insert sample worksheets
    const createdWorksheets = await Worksheet.insertMany(worksheets);

    console.log('Data imported successfully!');
    process.exit();
  } catch (error) {
    console.error(`Error importing data: ${error.message}`);
    process.exit(1);
  }
};

// Delete all data
const destroyData = async () => {
  try {
    await Worksheet.deleteMany();
    await Score.deleteMany();

    console.log('Data destroyed successfully!');
    process.exit();
  } catch (error) {
    console.error(`Error destroying data: ${error.message}`);
    process.exit(1);
  }
};

// Run script based on command line argument
if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}

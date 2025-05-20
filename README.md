# MathDrill

A full-stack application for interactive math worksheets, built with Vue.js, Express.js, and MongoDB.

## Project Overview

MathDrill is an interactive web application that displays math worksheets for students to practice their skills. The application includes various types of math worksheets with multiple-choice questions, score tracking, and performance analytics.

## Features

- Display of math worksheets with questions and multiple-choice answers
- Interactive answer selection
- Name input field
- Score calculation and storage
- Reset functionality
- Responsive design for various devices
- Backend API for storing and retrieving worksheets and scores
- Database for persistent storage

## Technology Stack

### Frontend
- Vue 3.5
- TypeScript
- HTML/CSS
- JavaScript
- Vite (for development and building)

### Backend
- Express.js
- MongoDB Atlas
- Node.js
- Mongoose

## Project Structure

The project is organized into two main parts:
- **Frontend**: Vue.js application in the root directory
- **Backend**: Express.js API in the `/backend` directory

## Frontend Setup

```sh
# Install dependencies
npm install

# Compile and hot-reload for development
npm run dev

# Type-check, compile and minify for production
npm run build

# Run unit tests
npm run test:unit

# Run end-to-end tests in development
npm run test:e2e:dev

# Run end-to-end tests in production
npm run build
npm run test:e2e

# Lint with ESLint
npm run lint
```

## Backend Setup

### Prerequisites
1. MongoDB Atlas account
2. Node.js and npm installed

### Installation

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file with the following variables
# PORT=5000
# MONGODB_URI=your_mongodb_connection_string
# NODE_ENV=development

# Run in development mode
npm run dev

# Run in production mode
npm start
```

### Database Seeding

```bash
# Import sample data
npm run data:import

# Destroy all data
npm run data:destroy
```

## API Endpoints

### Worksheets

- `GET /api/worksheets` - Get all worksheets
- `GET /api/worksheets/:id` - Get worksheet by ID (without answers)
- `GET /api/worksheets/:id/answers` - Get worksheet with answers
- `POST /api/worksheets` - Create a new worksheet
- `PUT /api/worksheets/:id` - Update a worksheet

### Scores

- `GET /api/scores` - Get all scores
- `GET /api/scores/worksheet/:worksheetId` - Get scores by worksheet ID
- `GET /api/scores/top/:limit` - Get top scores (default limit: 10)
- `POST /api/scores` - Create a new score

## Data Models

### Worksheet

```javascript
{
  title: String,
  description: String,
  difficulty: String (enum: ['easy', 'medium', 'hard']),
  questions: [
    {
      question: String,
      options: [String],
      correctAnswer: String
    }
  ],
  timeLimit: Number,
  isActive: Boolean
}
```

### Score

```javascript
{
  userName: String,
  score: Number,
  totalQuestions: Number,
  worksheetId: ObjectId,
  timeSpent: Number
}
```

## Deployment

This project is configured for deployment on Vercel (frontend) and can be deployed to various platforms for the backend (Heroku, Render, etc.).

## License

The worksheet content is copyrighted by www.mathinenglish.com.

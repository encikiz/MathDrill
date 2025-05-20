const worksheets = [
  {
    title: 'Basic Addition',
    description: 'Practice basic addition problems',
    difficulty: 'easy',
    questions: [
      {
        question: '2 + 3 = ?',
        options: ['4', '5', '6', '7'],
        correctAnswer: '5',
      },
      {
        question: '5 + 7 = ?',
        options: ['10', '11', '12', '13'],
        correctAnswer: '12',
      },
      {
        question: '8 + 4 = ?',
        options: ['10', '11', '12', '13'],
        correctAnswer: '12',
      },
      {
        question: '9 + 6 = ?',
        options: ['13', '14', '15', '16'],
        correctAnswer: '15',
      },
      {
        question: '7 + 8 = ?',
        options: ['13', '14', '15', '16'],
        correctAnswer: '15',
      },
    ],
    timeLimit: 120, // 2 minutes
  },
  {
    title: 'Basic Subtraction',
    description: 'Practice basic subtraction problems',
    difficulty: 'easy',
    questions: [
      {
        question: '7 - 3 = ?',
        options: ['2', '3', '4', '5'],
        correctAnswer: '4',
      },
      {
        question: '10 - 6 = ?',
        options: ['2', '3', '4', '5'],
        correctAnswer: '4',
      },
      {
        question: '15 - 8 = ?',
        options: ['5', '6', '7', '8'],
        correctAnswer: '7',
      },
      {
        question: '12 - 5 = ?',
        options: ['5', '6', '7', '8'],
        correctAnswer: '7',
      },
      {
        question: '20 - 9 = ?',
        options: ['9', '10', '11', '12'],
        correctAnswer: '11',
      },
    ],
    timeLimit: 120, // 2 minutes
  },
  {
    title: 'Basic Multiplication',
    description: 'Practice basic multiplication problems',
    difficulty: 'medium',
    questions: [
      {
        question: '3 × 4 = ?',
        options: ['10', '11', '12', '13'],
        correctAnswer: '12',
      },
      {
        question: '5 × 6 = ?',
        options: ['28', '29', '30', '31'],
        correctAnswer: '30',
      },
      {
        question: '7 × 8 = ?',
        options: ['54', '55', '56', '57'],
        correctAnswer: '56',
      },
      {
        question: '9 × 7 = ?',
        options: ['61', '62', '63', '64'],
        correctAnswer: '63',
      },
      {
        question: '6 × 6 = ?',
        options: ['34', '35', '36', '37'],
        correctAnswer: '36',
      },
    ],
    timeLimit: 180, // 3 minutes
  },
  {
    title: 'Basic Division',
    description: 'Practice basic division problems',
    difficulty: 'medium',
    questions: [
      {
        question: '10 ÷ 2 = ?',
        options: ['3', '4', '5', '6'],
        correctAnswer: '5',
      },
      {
        question: '15 ÷ 3 = ?',
        options: ['3', '4', '5', '6'],
        correctAnswer: '5',
      },
      {
        question: '24 ÷ 6 = ?',
        options: ['2', '3', '4', '5'],
        correctAnswer: '4',
      },
      {
        question: '35 ÷ 7 = ?',
        options: ['3', '4', '5', '6'],
        correctAnswer: '5',
      },
      {
        question: '48 ÷ 8 = ?',
        options: ['4', '5', '6', '7'],
        correctAnswer: '6',
      },
    ],
    timeLimit: 180, // 3 minutes
  },
  {
    title: 'Mixed Operations',
    description: 'Practice mixed arithmetic operations',
    difficulty: 'hard',
    questions: [
      {
        question: '(5 + 3) × 2 = ?',
        options: ['13', '14', '15', '16'],
        correctAnswer: '16',
      },
      {
        question: '20 - (6 ÷ 2) = ?',
        options: ['16', '17', '18', '19'],
        correctAnswer: '17',
      },
      {
        question: '4 × 5 + 10 = ?',
        options: ['28', '29', '30', '31'],
        correctAnswer: '30',
      },
      {
        question: '36 ÷ (3 + 3) = ?',
        options: ['4', '5', '6', '7'],
        correctAnswer: '6',
      },
      {
        question: '(15 - 7) × (8 ÷ 4) = ?',
        options: ['14', '15', '16', '17'],
        correctAnswer: '16',
      },
    ],
    timeLimit: 240, // 4 minutes
  },
];

module.exports = { worksheets };

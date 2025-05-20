interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
}

interface WorksheetData {
  title: string;
  questions: Question[];
  copyright: string;
}

const worksheetData: WorksheetData = {
  title: "Rounding Off to Nearest 10",
  questions: [
    {
      question: "17 rounded off to the nearest 10 is..",
      options: ["10", "20", "17"],
      correctAnswer: 1 // Index of the correct answer (0-based, so 1 = "20")
    },
    {
      question: "75 rounded off to the nearest 10 is..",
      options: ["70", "80", "175"],
      correctAnswer: 1 // "80"
    },
    {
      question: "64 rounded off to the nearest 10 is..",
      options: ["64", "70", "60"],
      correctAnswer: 2 // "60"
    },
    {
      question: "98 rounded off to the nearest 10 is..",
      options: ["80", "100", "89"],
      correctAnswer: 1 // "100"
    },
    {
      question: "94 rounded off to the nearest 10 is..",
      options: ["100", "94", "90"],
      correctAnswer: 0 // "100"
    },
    {
      question: "445 rounded off to the nearest 10 is..",
      options: ["450", "440", "500"],
      correctAnswer: 0 // "450"
    },
    {
      question: "45 rounded off to the nearest 10 is..",
      options: ["50", "45", "40"],
      correctAnswer: 0 // "50"
    },
    {
      question: "19 rounded to the nearest 10 is..",
      options: ["20", "10", "19"],
      correctAnswer: 0 // "20"
    },
    {
      question: "0 rounded off to the nearest 10 is..",
      options: ["10", "1", "0"],
      correctAnswer: 2 // "0"
    },
    {
      question: "199 rounded off to the nearest 10 is..",
      options: ["190", "100", "200"],
      correctAnswer: 2 // "200"
    },
    {
      question: "165 rounded off to the nearest 10 is..",
      options: ["160", "170", "150"],
      correctAnswer: 1 // "170"
    },
    {
      question: "999 rounded off to the nearest 10 is..",
      options: ["990", "1,000", "909"],
      correctAnswer: 1 // "1,000"
    }
  ],
  copyright: "www.mathinenglish.com"
};

export default worksheetData;

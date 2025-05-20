import axios from 'axios';

// Define API base URL with fallback for production
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Define types for our API responses and data
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  count?: number;
  message?: string;
}

export interface Worksheet {
  _id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  questions: Question[];
  timeLimit: number;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Question {
  _id: string;
  question: string;
  options: string[];
  correctAnswer?: string;
}

export interface Score {
  _id: string;
  userName: string;
  score: number;
  totalQuestions: number;
  worksheetId: string | Worksheet;
  timeSpent: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface ScoreSubmission {
  userName: string;
  score: number;
  totalQuestions: number;
  worksheetId: string;
  timeSpent: number;
}

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Worksheet service
export const worksheetService = {
  /**
   * Get all worksheets
   * @returns Promise with worksheet array
   */
  async getWorksheets(): Promise<Worksheet[]> {
    try {
      const response = await apiClient.get<ApiResponse<Worksheet[]>>('/worksheets');
      return response.data.data;
    } catch (error) {
      console.error('Error fetching worksheets:', error);
      throw error;
    }
  },

  /**
   * Get a worksheet by ID (without answers)
   * @param id Worksheet ID
   * @returns Promise with worksheet
   */
  async getWorksheetById(id: string): Promise<Worksheet> {
    try {
      const response = await apiClient.get<ApiResponse<Worksheet>>(`/worksheets/${id}`);
      return response.data.data;
    } catch (error) {
      console.error(`Error fetching worksheet ${id}:`, error);
      throw error;
    }
  },

  /**
   * Get a worksheet with answers by ID (for verification)
   * @param id Worksheet ID
   * @returns Promise with worksheet including answers
   */
  async getWorksheetWithAnswers(id: string): Promise<Worksheet> {
    try {
      const response = await apiClient.get<ApiResponse<Worksheet>>(`/worksheets/${id}/answers`);
      return response.data.data;
    } catch (error) {
      console.error(`Error fetching worksheet with answers ${id}:`, error);
      throw error;
    }
  },

  /**
   * Create a new worksheet
   * @param worksheet Worksheet data
   * @returns Promise with created worksheet
   */
  async createWorksheet(worksheet: Partial<Worksheet>): Promise<Worksheet> {
    try {
      const response = await apiClient.post<ApiResponse<Worksheet>>('/worksheets', worksheet);
      return response.data.data;
    } catch (error) {
      console.error('Error creating worksheet:', error);
      throw error;
    }
  },

  /**
   * Update a worksheet
   * @param id Worksheet ID
   * @param worksheet Updated worksheet data
   * @returns Promise with updated worksheet
   */
  async updateWorksheet(id: string, worksheet: Partial<Worksheet>): Promise<Worksheet> {
    try {
      const response = await apiClient.put<ApiResponse<Worksheet>>(`/worksheets/${id}`, worksheet);
      return response.data.data;
    } catch (error) {
      console.error(`Error updating worksheet ${id}:`, error);
      throw error;
    }
  }
};

// Score service
export const scoreService = {
  /**
   * Get all scores
   * @returns Promise with score array
   */
  async getScores(): Promise<Score[]> {
    try {
      const response = await apiClient.get<ApiResponse<Score[]>>('/scores');
      return response.data.data;
    } catch (error) {
      console.error('Error fetching scores:', error);
      throw error;
    }
  },

  /**
   * Get scores for a specific worksheet
   * @param worksheetId Worksheet ID
   * @returns Promise with score array
   */
  async getScoresByWorksheet(worksheetId: string): Promise<Score[]> {
    try {
      const response = await apiClient.get<ApiResponse<Score[]>>(`/scores/worksheet/${worksheetId}`);
      return response.data.data;
    } catch (error) {
      console.error(`Error fetching scores for worksheet ${worksheetId}:`, error);
      throw error;
    }
  },

  /**
   * Get top scores
   * @param limit Number of scores to return (default: 10)
   * @returns Promise with score array
   */
  async getTopScores(limit: number = 10): Promise<Score[]> {
    try {
      const response = await apiClient.get<ApiResponse<Score[]>>(`/scores/top/${limit}`);
      return response.data.data;
    } catch (error) {
      console.error(`Error fetching top ${limit} scores:`, error);
      throw error;
    }
  },

  /**
   * Submit a new score
   * @param scoreData Score data
   * @returns Promise with created score
   */
  async submitScore(scoreData: ScoreSubmission): Promise<Score> {
    try {
      const response = await apiClient.post<ApiResponse<Score>>('/scores', scoreData);
      return response.data.data;
    } catch (error) {
      console.error('Error submitting score:', error);
      throw error;
    }
  }
};

export default {
  worksheet: worksheetService,
  score: scoreService
};

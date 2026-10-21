import apiClient from './client';
import { API_ENDPOINTS } from '../../config/api.config';
import { Feedback, CreateFeedbackRequest } from '../../types/api.types';

// Feedback Service
export const feedbackService = {
  /**
   * Add feedback to a session
   */
  async addFeedback(
    sessionId: string,
    feedbackData: CreateFeedbackRequest
  ): Promise<Feedback> {
    const response = await apiClient.post<Feedback>(
      API_ENDPOINTS.FEEDBACK.ADD(sessionId),
      feedbackData
    );
    return response.data;
  },

  /**
   * Get all feedbacks for a session
   */
  async getAllFeedbacks(sessionId: string): Promise<Feedback[]> {
    const response = await apiClient.get<Feedback[]>(
      API_ENDPOINTS.FEEDBACK.GET_ALL(sessionId)
    );
    return response.data;
  },
};

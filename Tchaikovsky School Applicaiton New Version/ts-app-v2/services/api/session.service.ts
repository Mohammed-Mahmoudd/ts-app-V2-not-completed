import apiClient from './client';
import { API_ENDPOINTS } from '../../config/api.config';
import {
  Session,
  CreateSessionRequest,
  UpdateSessionRequest,
} from '../../types/api.types';

// Session Service
export const sessionService = {
  /**
   * Get all sessions
   */
  async getAllSessions(): Promise<Session[]> {
    const response = await apiClient.get<Session[]>(
      API_ENDPOINTS.SESSIONS.GET_ALL
    );
    return response.data;
  },

  /**
   * Create a new session (Admin only)
   */
  async createSession(sessionData: CreateSessionRequest): Promise<Session> {
    const response = await apiClient.post<Session>(
      API_ENDPOINTS.SESSIONS.CREATE,
      sessionData
    );
    return response.data;
  },

  /**
   * Update a session (Admin only)
   */
  async updateSession(
    id: string,
    sessionData: UpdateSessionRequest
  ): Promise<Session> {
    const response = await apiClient.patch<Session>(
      API_ENDPOINTS.SESSIONS.UPDATE(id),
      sessionData
    );
    return response.data;
  },

  /**
   * Delete a session (Admin only)
   */
  async deleteSession(id: string): Promise<void> {
    await apiClient.delete(API_ENDPOINTS.SESSIONS.DELETE(id));
  },
};

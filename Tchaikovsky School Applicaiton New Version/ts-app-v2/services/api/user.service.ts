import apiClient from './client';
import { API_ENDPOINTS } from '../../config/api.config';
import { User } from '../../types/api.types';

// User Service
export const userService = {
  /**
   * Get all users
   */
  async getAllUsers(): Promise<User[]> {
    const response = await apiClient.get<User[]>(API_ENDPOINTS.USERS.GET_ALL);
    return response.data;
  },
};

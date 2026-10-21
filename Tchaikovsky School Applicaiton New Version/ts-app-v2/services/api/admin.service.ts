import apiClient from './client';
import { API_ENDPOINTS } from '../../config/api.config';
import { DashboardResponse } from '../../types/api.types';

// Admin Service
export const adminService = {
  /**
   * Get dashboard statistics and data
   */
  async getDashboard(): Promise<DashboardResponse> {
    const response = await apiClient.get<DashboardResponse>(
      API_ENDPOINTS.ADMIN.DASHBOARD
    );
    return response.data;
  },
};

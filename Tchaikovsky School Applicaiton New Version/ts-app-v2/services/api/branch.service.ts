import apiClient from './client';
import { API_ENDPOINTS } from '../../config/api.config';
import { Branch, CreateBranchRequest } from '../../types/api.types';

// Branch Service
export const branchService = {
  /**
   * Get all branches
   */
  async getBranches(): Promise<Branch[]> {
    const response = await apiClient.get<Branch[]>(
      API_ENDPOINTS.BRANCHES.GET_ALL
    );
    return response.data;
  },

  /**
   * Create a new branch (Admin only)
   */
  async createBranch(branchData: CreateBranchRequest): Promise<Branch> {
    const response = await apiClient.post<Branch>(
      API_ENDPOINTS.BRANCHES.CREATE,
      branchData
    );
    return response.data;
  },

  /**
   * Delete a branch (Admin only)
   */
  async deleteBranch(id: string): Promise<void> {
    await apiClient.delete(API_ENDPOINTS.BRANCHES.DELETE(id));
  },
};

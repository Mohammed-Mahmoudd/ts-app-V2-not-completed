import apiClient, { tokenStorage } from './client';
import { API_ENDPOINTS } from '../../config/api.config';
import {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
  RefreshTokenResponse,
} from '../../types/api.types';

// Authentication Service
export const authService = {
  /**
   * Login user
   */
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>(
      API_ENDPOINTS.AUTH.LOGIN,
      credentials
    );
    
    // Save tokens
    await tokenStorage.saveTokens(
      response.data.accessToken,
      response.data.refreshToken
    );
    
    return response.data;
  },

  /**
   * Register new user
   */
  async register(userData: RegisterRequest): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>(
      API_ENDPOINTS.AUTH.REGISTER,
      userData
    );
    
    // Save tokens
    await tokenStorage.saveTokens(
      response.data.accessToken,
      response.data.refreshToken
    );
    
    return response.data;
  },

  /**
   * Refresh access token
   */
  async refresh(refreshToken: string): Promise<RefreshTokenResponse> {
    const response = await apiClient.post<RefreshTokenResponse>(
      API_ENDPOINTS.AUTH.REFRESH,
      { token: refreshToken }
    );
    
    // Save new tokens
    await tokenStorage.saveTokens(
      response.data.accessToken,
      response.data.refreshToken
    );
    
    return response.data;
  },

  /**
   * Logout user
   */
  async logout(): Promise<void> {
    const refreshToken = await tokenStorage.getRefreshToken();
    
    if (refreshToken) {
      try {
        await apiClient.post(API_ENDPOINTS.AUTH.LOGOUT, { token: refreshToken });
      } catch (error) {
        // Even if logout fails on server, we still clear local tokens
        console.error('Logout error:', error);
      }
    }
    
    // Clear tokens from storage
    await tokenStorage.removeTokens();
  },

  /**
   * Check if user is authenticated
   */
  async isAuthenticated(): Promise<boolean> {
    const accessToken = await tokenStorage.getAccessToken();
    return !!accessToken;
  },
};

import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosError } from 'axios';
import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { API_CONFIG } from '../../config/api.config';

// Token storage keys
const ACCESS_TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';

// Token storage utilities
export const tokenStorage = {
  async saveTokens(accessToken: string, refreshToken: string) {
    if (Platform.OS === 'web') {
      try {
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
          localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
        }
      } catch (e) {
        console.error('Local storage is unavailable:', e);
      }
      return;
    }
    await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, accessToken);
    await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, refreshToken);
  },

  async getAccessToken(): Promise<string | null> {
    if (Platform.OS === 'web') {
      try {
        if (typeof localStorage !== 'undefined') {
          return localStorage.getItem(ACCESS_TOKEN_KEY);
        }
      } catch (e) {
        console.error('Local storage is unavailable:', e);
      }
      return null;
    }
    return await SecureStore.getItemAsync(ACCESS_TOKEN_KEY);
  },

  async getRefreshToken(): Promise<string | null> {
    if (Platform.OS === 'web') {
      try {
        if (typeof localStorage !== 'undefined') {
          return localStorage.getItem(REFRESH_TOKEN_KEY);
        }
      } catch (e) {
        console.error('Local storage is unavailable:', e);
      }
      return null;
    }
    return await SecureStore.getItemAsync(REFRESH_TOKEN_KEY);
  },

  async removeTokens() {
    if (Platform.OS === 'web') {
      try {
        if (typeof localStorage !== 'undefined') {
          localStorage.removeItem(ACCESS_TOKEN_KEY);
          localStorage.removeItem(REFRESH_TOKEN_KEY);
        }
      } catch (e) {
        console.error('Local storage is unavailable:', e);
      }
      return;
    }
    await SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY);
    await SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY);
  },
};

// Create axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - Add access token to requests
apiClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const accessToken = await tokenStorage.getAccessToken();
    
    if (accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle token refresh
let isRefreshing = false;
let failedQueue: {
  resolve: (value?: any) => void;
  reject: (reason?: any) => void;
}[] = [];

const processQueue = (error: AxiosError | null, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    // If error is 401 and we haven't retried yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // If already refreshing, queue this request
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${token}`;
            }
            return apiClient(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken = await tokenStorage.getRefreshToken();

      if (!refreshToken) {
        // No refresh token, user needs to login again
        await tokenStorage.removeTokens();
        processQueue(error, null);
        isRefreshing = false;
        return Promise.reject(error);
      }

      try {
        // Attempt to refresh the token
        const response = await axios.post(
          `${API_CONFIG.BASE_URL}/auth/refresh`,
          { token: refreshToken }
        );

        const { accessToken, refreshToken: newRefreshToken } = response.data;

        // Save new tokens
        await tokenStorage.saveTokens(accessToken, newRefreshToken);

        // Update the authorization header
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        }

        // Process queued requests
        processQueue(null, accessToken);

        // Retry the original request
        return apiClient(originalRequest);
      } catch (refreshError) {
        // Refresh failed, clear tokens and reject
        await tokenStorage.removeTokens();
        processQueue(refreshError as AxiosError, null);
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;

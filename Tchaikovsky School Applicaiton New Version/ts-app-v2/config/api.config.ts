// API Configuration
// Use your local IP address for testing on physical devices
// For emulator/simulator, you can use localhost

const LOCAL_IP = '169.254.33.122'; // Your local machine IP
const PORT = '5000';

// Change this based on your environment
const USE_LOCAL_IP = true; // Set to true when testing on physical device

export const API_CONFIG = {
  BASE_URL: USE_LOCAL_IP 
    ? `http://${LOCAL_IP}:${PORT}/api/v1`
    : 'http://localhost:5000/api/v1',
  TIMEOUT: 10000, // 10 seconds
};

// API Endpoints
export const API_ENDPOINTS = {
  // Auth
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    REFRESH: '/auth/refresh',
    LOGOUT: '/auth/logout',
  },
  // Users
  USERS: {
    GET_ALL: '/users',
  },
  // Admin
  ADMIN: {
    DASHBOARD: '/admin/dashboard',
  },
  // Sessions
  SESSIONS: {
    GET_ALL: '/sessions',
    CREATE: '/sessions',
    UPDATE: (id: string) => `/sessions/${id}`,
    DELETE: (id: string) => `/sessions/${id}`,
  },
  // Feedback
  FEEDBACK: {
    ADD: (sessionId: string) => `/sessions/${sessionId}/feedback`,
    GET_ALL: (sessionId: string) => `/sessions/${sessionId}/feedback`,
  },
  // Instruments
  INSTRUMENTS: {
    GET_ALL: '/instruments',
    CREATE: '/instruments',
    DELETE: (id: string) => `/instruments/${id}`,
  },
  // Branches
  BRANCHES: {
    GET_ALL: '/branches',
    CREATE: '/branches',
    DELETE: (id: string) => `/branches/${id}`,
  },
};

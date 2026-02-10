import axios from 'axios';

const API_URL = import.meta.env.VITE_CORE_URL || 'http://localhost:3000';

// Create axios instance for user endpoints
const userApiClient = axios.create({
  baseURL: `${API_URL}`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add authorization header if token exists
userApiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token') || sessionStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Types
export interface UserProfile {
  activeExamId: string | null;
  activeExamYear: number | null;
  accountTier: string;
  displayName: string | null;
  country: string | null;
  timezone: string | null;
}

export interface User {
  id: string;
  email: string;
  username: string;
  profile: UserProfile | null;
}

export interface UpdateContextDto {
  activeExamId?: string;
  activeExamYear?: number;
}

export const userApi = {
  // Get current user
  getMe: async (): Promise<User> => {
    const response = await userApiClient.get<User>('/users/me');
    return response.data;
  },

  // Update user context
  updateContext: async (payload: UpdateContextDto): Promise<User> => {
    const response = await userApiClient.patch<User>('/users/me/context', payload);
    return response.data;
  },
};
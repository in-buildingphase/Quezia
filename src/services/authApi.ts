import axios, { AxiosError } from 'axios';

const API_URL = import.meta.env.VITE_CORE_URL || 'http://localhost:3000';

// Create axios instance
const apiClient = axios.create({
  baseURL: `${API_URL}/auth`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Types matching your NestJS backend
export interface RegisterDto {
  username: string;
  email: string;
  password: string;
}

export interface LoginDto {
  email?: string;
  username?: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
    role: string;
  };
}

export interface RefreshTokenDto {
  refreshToken: string;
}

// Token storage helpers
const TOKEN_KEY = 'access_token';
const REFRESH_KEY = 'refresh_token';
const USER_KEY = 'user_data';

export const authApi = {
  // Register new user
  register: async (data: RegisterDto): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>('/register', data);
    return response.data;
  },

  // Login with email/username + password
  login: async (data: LoginDto): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>('/login', data);
    return response.data;
  },

  // Refresh tokens
  refresh: async (refreshToken: string): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>('/refresh', {
      refreshToken,
    });
    return response.data;
  },

  // Store auth data
  setAuthData: (data: AuthResponse, rememberMe: boolean) => {
    const storage = rememberMe ? localStorage : sessionStorage;
    storage.setItem(TOKEN_KEY, data.accessToken);
    storage.setItem(REFRESH_KEY, data.refreshToken);
    storage.setItem(USER_KEY, JSON.stringify(data.user));
  },

  // Get stored tokens
  getAccessToken: (): string | null => {
    return localStorage.getItem(TOKEN_KEY) || sessionStorage.getItem(TOKEN_KEY);
  },

  getRefreshToken: (): string | null => {
    return localStorage.getItem(REFRESH_KEY) || sessionStorage.getItem(REFRESH_KEY);
  },

  getUser: () => {
    const user = localStorage.getItem(USER_KEY) || sessionStorage.getItem(USER_KEY);
    return user ? JSON.parse(user) : null;
  },

  // Clear auth data (logout)
  clearAuth: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_KEY);
    localStorage.removeItem(USER_KEY);
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(REFRESH_KEY);
    sessionStorage.removeItem(USER_KEY);
  },

  // Setup axios interceptor for token refresh
  setupInterceptors: () => {
    apiClient.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        const originalRequest = error.config;
        
        if (error.response?.status === 401 && originalRequest && originalRequest.url) {
          // Don't retry auth endpoints (login, register, refresh) - these should fail with 401 for invalid credentials
          const isAuthEndpoint = originalRequest.url.includes('/login') || 
                                originalRequest.url.includes('/register') || 
                                originalRequest.url.includes('/refresh');
          
          if (!isAuthEndpoint) {
            const refreshToken = authApi.getRefreshToken();
            
            if (refreshToken) {
              try {
                const newTokens = await authApi.refresh(refreshToken);
                authApi.setAuthData(newTokens, !!localStorage.getItem(TOKEN_KEY));
                
                // Retry original request
                originalRequest.headers.Authorization = `Bearer ${newTokens.accessToken}`;
                return apiClient(originalRequest);
              } catch (refreshError) {
                authApi.clearAuth();
                window.location.href = '/auth?mode=login';
                return Promise.reject(refreshError);
              }
            }
          }
        }
        
        return Promise.reject(error);
      }
    );
  },
};

// Initialize interceptors
authApi.setupInterceptors();
// API Configuration
export const API_URL = import.meta.env.VITE_API_URL || 'https://localhost:7203';

// Authentication Configuration
export const AUTH_CONFIG = {
  tokenKey: 'auth_token',
  refreshTokenKey: 'refresh_token',
  tokenExpiryKey: 'token_expiry',
  userKey: 'user',
};

// Route Configuration
export const ROUTES = {
  home: '/',
  login: '/login',
  admin: '/admin',
  dashboard: '/dashboard',
  unauthorized: '/unauthorized',
};

// Role Configuration
export const ROLES = {
  ADMIN: 'Admin',
  USER: 'User',
  VIEWER: 'Viewer'
} as const; 
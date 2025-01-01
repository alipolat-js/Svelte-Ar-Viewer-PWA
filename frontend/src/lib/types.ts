export interface LoginResponse {
  success: boolean;
  message: string;
  token: string;
  refreshToken: string;
  userId: string;
  userName: string;
  roles: string[];
}

export interface User {
  id: string;
  userName: string;
  email: string;
  firstName: string;
  lastName: string;
  roles: string[];
  isActive: boolean;
  createdAt: string;
  lastLoginAt: string | null;
}

export interface UserProfileResponse {
  id: string;
  userName: string;
  email: string;
  firstName: string;
  lastName: string;
  roles: string[];
  isActive: boolean;
  createdAt: string;
  lastLoginAt: string | null;
} 
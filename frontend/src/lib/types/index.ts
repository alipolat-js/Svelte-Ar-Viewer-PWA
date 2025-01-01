export interface User {
  id: string;
  email: string;
  roles: string[];
  firstName?: string;
  lastName?: string;
}

export interface AuthState {
  token: string | null;
  refreshToken: string | null;
  user: User | null;
  isAuthenticated: boolean;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  refreshToken: string;
  user: User;
}

export interface RefreshTokenRequest {
  refreshToken: string;
  accessToken: string;
}

export interface RefreshTokenResponse {
  token: string;
  refreshToken: string;
} 
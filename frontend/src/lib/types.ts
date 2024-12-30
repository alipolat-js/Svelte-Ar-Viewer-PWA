export interface AuthResponse {
    success: boolean;
    message: string | null;
    token: string;
    refreshToken: string;
    userId: string;
    userName: string;
    roles: string[];
} 
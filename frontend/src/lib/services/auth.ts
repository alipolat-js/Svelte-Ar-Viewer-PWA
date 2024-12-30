import { API_URL } from '$lib/config';
import { authStore, type User } from '$lib/stores/auth';

export interface AuthResponse {
    success: boolean;
    message: string | null;
    token: string;
    refreshToken: string;
    userId: string;
    userName: string;
    roles: string[];
}

class AuthService {
    private baseUrl = `${API_URL}/api/auth`;

    async login(email: string, password: string): Promise<AuthResponse> {
        const response = await fetch(`${this.baseUrl}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const data: AuthResponse = await response.json();

        if (data.success) {
            const user: User = {
                userId: data.userId,
                userName: data.userName,
                roles: data.roles
            };
            authStore.setAuth(data.token, data.refreshToken, user);
        }

        return data;
    }

    async refreshToken(refreshToken: string): Promise<AuthResponse> {
        const response = await fetch(`${this.baseUrl}/refresh-token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ refreshToken }),
        });

        const data: AuthResponse = await response.json();

        if (data.success) {
            authStore.updateToken(data.token, data.refreshToken);
        }

        return data;
    }

    async logout(): Promise<void> {
        const token = this.getToken();
        if (token) {
            try {
                await fetch(`${this.baseUrl}/revoke-token`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
            } catch (error) {
                console.error('Error revoking token:', error);
            }
        }
        authStore.clearAuth();
    }

    getToken(): string | null {
        let token: string | null = null;
        authStore.subscribe(state => {
            token = state.token;
        })();
        return token;
    }

    isAuthenticated(): boolean {
        let isAuthenticated = false;
        authStore.subscribe(state => {
            isAuthenticated = state.isAuthenticated;
        })();
        return isAuthenticated;
    }

    hasRole(role: string): boolean {
        let hasRole = false;
        authStore.subscribe(state => {
            hasRole = state.user?.roles.includes(role) || false;
        })();
        return hasRole;
    }
}

export const authService = new AuthService(); 
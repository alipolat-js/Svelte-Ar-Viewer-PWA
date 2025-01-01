import { API_URL, AUTH_CONFIG } from '$lib/config';
import type { LoginResponse, User, UserProfileResponse } from '$lib/types';

interface CreateUserRequest {
	email: string;
	password: string;
	firstName: string;
	lastName: string;
	roles: string[];
}

interface CreateUserResponse {
	success: boolean;
	message?: string;
	user?: User;
}

class AuthService {
	private baseUrl = `${API_URL}/api/auth`;

	isAuthenticated(): boolean {
		const token = localStorage.getItem(AUTH_CONFIG.tokenKey);
		return !!token;
	}

	hasRole(role: string): boolean {
		try {
			const userData = localStorage.getItem(AUTH_CONFIG.userKey);
			if (!userData) return false;
			
			const user = JSON.parse(userData);
			return user.roles?.includes(role) || false;
		} catch {
			return false;
		}
	}

	getUserData(): { id: string; userName: string; roles: string[] } | null {
		try {
			const userData = localStorage.getItem(AUTH_CONFIG.userKey);
			return userData ? JSON.parse(userData) : null;
		} catch {
			return null;
		}
	}

	async login(email: string, password: string): Promise<LoginResponse> {
		const response = await fetch(`${this.baseUrl}/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ email, password }),
		});

		if (!response.ok) {
			const error = await response.json();
			throw new Error(error.message || 'Failed to login');
		}

		return response.json();
	}

	async createUser(data: CreateUserRequest): Promise<CreateUserResponse> {
		try {
			const token = localStorage.getItem(AUTH_CONFIG.tokenKey);
			if (!token) {
				return { success: false, message: 'Not authenticated' };
			}

			const response = await fetch(`${this.baseUrl}/register`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${token}`,
					},
					body: JSON.stringify(data),
				});

			if (!response.ok) {
				const error = await response.json();
				return { success: false, message: error.message || 'Failed to create user' };
			}

			const user = await response.json();
			return { success: true, user };
		} catch (error) {
			console.error('Error creating user:', error);
			return { success: false, message: 'An error occurred while creating the user' };
		}
	}

	async getUsers(): Promise<UserProfileResponse[]> {
		const token = localStorage.getItem(AUTH_CONFIG.tokenKey);
		if (!token) {
			throw new Error('Not authenticated');
		}

		const response = await fetch(`${this.baseUrl}/users`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`,
			},
		});

		if (!response.ok) {
			throw new Error('Failed to fetch users');
		}

		return response.json();
	}

	async deactivateUser(userId: string): Promise<void> {
		const token = localStorage.getItem(AUTH_CONFIG.tokenKey);
		if (!token) {
			throw new Error('Not authenticated');
		}

		const response = await fetch(`${this.baseUrl}/users/${userId}/deactivate`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`,
			},
		});

		if (!response.ok) {
			throw new Error('Failed to deactivate user');
		}
	}

	async reactivateUser(userId: string): Promise<void> {
		const token = localStorage.getItem(AUTH_CONFIG.tokenKey);
		if (!token) {
			throw new Error('Not authenticated');
		}

		const response = await fetch(`${this.baseUrl}/users/${userId}/reactivate`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`,
			},
		});

		if (!response.ok) {
			throw new Error('Failed to reactivate user');
		}
	}

	async updateUser(userId: string, data: { firstName: string; lastName: string; email: string; roles: string[] }): Promise<void> {
		const token = localStorage.getItem(AUTH_CONFIG.tokenKey);
		if (!token) {
			throw new Error('Not authenticated');
		}

		const response = await fetch(`${this.baseUrl}/users/${userId}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`,
			},
			body: JSON.stringify(data),
		});

		if (!response.ok) {
			const error = await response.json();
			throw new Error(error.message || 'Failed to update user');
		}
	}

	async deleteUser(userId: string): Promise<void> {
		const token = localStorage.getItem(AUTH_CONFIG.tokenKey);
		if (!token) {
			throw new Error('Not authenticated');
		}

		const response = await fetch(`${this.baseUrl}/users/${userId}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`,
			},
		});

		if (!response.ok) {
			throw new Error('Failed to delete user');
		}
	}

	logout(): void {
		localStorage.removeItem(AUTH_CONFIG.tokenKey);
		localStorage.removeItem(AUTH_CONFIG.refreshTokenKey);
		localStorage.removeItem(AUTH_CONFIG.userKey);
	}
}

export const authService = new AuthService(); 
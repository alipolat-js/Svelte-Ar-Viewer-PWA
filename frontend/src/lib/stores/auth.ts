import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import { AUTH_CONFIG } from '$lib/config';

export interface User {
    userId: string;
    userName: string;
    roles: string[];
}

interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
    token: string | null;
    refreshToken: string | null;
}

// Initialize state from localStorage if available
const getInitialState = (): AuthState => {
    if (!browser) {
        return {
            isAuthenticated: false,
            user: null,
            token: null,
            refreshToken: null
        };
    }

    const token = localStorage.getItem(AUTH_CONFIG.tokenKey);
    const refreshToken = localStorage.getItem(AUTH_CONFIG.refreshTokenKey);
    const userStr = localStorage.getItem(AUTH_CONFIG.userKey);
    const user = userStr ? JSON.parse(userStr) : null;

    return {
        isAuthenticated: !!token,
        user,
        token,
        refreshToken
    };
};

const createAuthStore = () => {
    const { subscribe, set, update } = writable<AuthState>(getInitialState());

    return {
        subscribe,
        setAuth: (token: string, refreshToken: string, user: User) => {
            if (browser) {
                localStorage.setItem(AUTH_CONFIG.tokenKey, token);
                localStorage.setItem(AUTH_CONFIG.refreshTokenKey, refreshToken);
                localStorage.setItem(AUTH_CONFIG.userKey, JSON.stringify(user));
            }

            set({
                isAuthenticated: true,
                token,
                refreshToken,
                user
            });
        },
        clearAuth: () => {
            if (browser) {
                localStorage.removeItem(AUTH_CONFIG.tokenKey);
                localStorage.removeItem(AUTH_CONFIG.refreshTokenKey);
                localStorage.removeItem(AUTH_CONFIG.userKey);
            }

            set({
                isAuthenticated: false,
                token: null,
                refreshToken: null,
                user: null
            });
        },
        updateToken: (token: string, refreshToken: string) => {
            if (browser) {
                localStorage.setItem(AUTH_CONFIG.tokenKey, token);
                localStorage.setItem(AUTH_CONFIG.refreshTokenKey, refreshToken);
            }

            update(state => ({
                ...state,
                token,
                refreshToken
            }));
        }
    };
};

export const authStore = createAuthStore(); 
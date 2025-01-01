import { API_URL } from '$lib/config';
import { authService } from './auth';

export interface DashboardStats {
    totalUsers: number;
    activeModels: number;
    totalViews: number;
}

export interface ActivityItem {
    id: string;
    type: 'user_registered' | 'model_uploaded' | 'model_viewed';
    message: string;
    timestamp: string;
    details: {
        userName?: string;
        modelName?: string;
    };
}

export interface DashboardData {
    stats: DashboardStats;
    recentActivity: ActivityItem[];
}

class AdminService {
    private baseUrl = `${API_URL}/api/admin`;

    async getDashboardData(): Promise<DashboardData> {
        const token = authService.getToken();
        if (!token) {
            throw new Error('No authentication token found');
        }

        const response = await fetch(`${this.baseUrl}/dashboard`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch dashboard data');
        }

        return response.json();
    }
}

export const adminService = new AdminService(); 
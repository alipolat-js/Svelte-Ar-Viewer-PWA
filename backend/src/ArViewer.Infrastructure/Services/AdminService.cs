using ArViewer.Core.Interfaces;
using ArViewer.Core.Models;
using ArViewer.Infrastructure.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace ArViewer.Infrastructure.Services;

public class AdminService : IAdminService
{
    private readonly UserManager<ApplicationUser> _userManager;

    public AdminService(UserManager<ApplicationUser> userManager)
    {
        _userManager = userManager;
    }

    public async Task<DashboardResponse> GetDashboardDataAsync()
    {
        var totalUsers = await _userManager.Users.CountAsync();

        return new DashboardResponse
        {
            Stats = new DashboardStats
            {
                TotalUsers = totalUsers,
                ActiveModels = 0, // TODO: Implement when model tracking is added
                TotalViews = 0 // TODO: Implement when view tracking is added
            },
            RecentActivity = new List<ActivityItem>() // TODO: Implement activity tracking
        };
    }
} 
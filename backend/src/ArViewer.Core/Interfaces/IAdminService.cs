using ArViewer.Core.Models;

namespace ArViewer.Core.Interfaces;

public interface IAdminService
{
    Task<DashboardResponse> GetDashboardDataAsync();
} 
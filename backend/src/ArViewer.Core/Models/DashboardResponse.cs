namespace ArViewer.Core.Models;

public class DashboardResponse
{
    public DashboardStats Stats { get; set; }
    public List<ActivityItem> RecentActivity { get; set; }
}

public class DashboardStats
{
    public int TotalUsers { get; set; }
    public int ActiveModels { get; set; }
    public int TotalViews { get; set; }
}

public class ActivityItem
{
    public string Id { get; set; }
    public string Type { get; set; }
    public string Message { get; set; }
    public string Timestamp { get; set; }
    public ActivityDetails Details { get; set; }
}

public class ActivityDetails
{
    public string UserName { get; set; }
    public string ModelName { get; set; }
} 
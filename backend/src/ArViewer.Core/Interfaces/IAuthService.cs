using ArViewer.Core.Models;

namespace ArViewer.Core.Interfaces;

public interface IAuthService
{
    Task<AuthResponse> LoginAsync(LoginRequest request);
    Task<AuthResponse> RefreshTokenAsync(string refreshToken);
    Task RevokeTokenAsync(string refreshToken);
    Task<IEnumerable<UserProfileResponse>> GetUsersAsync();
    Task DeactivateUserAsync(string userId);
    Task ReactivateUserAsync(string userId);
    Task<AuthResponse> CreateUserAsync(string email, string password, string firstName, string lastName, IEnumerable<string> roles);
    Task<UserProfileResponse> GetUserProfileAsync(string userId);
    Task<AuthResponse> UpdateUserAsync(string userId, string firstName, string lastName, string email, IEnumerable<string> roles);
    Task SoftDeleteUserAsync(string userId);
} 
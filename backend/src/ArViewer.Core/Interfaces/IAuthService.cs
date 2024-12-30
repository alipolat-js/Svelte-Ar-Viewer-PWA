using ArViewer.Core.Models;

namespace ArViewer.Core.Interfaces;

public interface IAuthService
{
    Task<AuthResponse> LoginAsync(LoginRequest request);
    Task<AuthResponse> RefreshTokenAsync(string refreshToken);
    Task<bool> RevokeTokenAsync(string userId);
    Task<AuthResponse> CreateUserAsync(string email, string password, string firstName, string lastName, IList<string> roles);
} 
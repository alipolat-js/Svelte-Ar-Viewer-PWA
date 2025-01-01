using ArViewer.Core.Interfaces;
using ArViewer.Core.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Microsoft.Extensions.Logging;

namespace ArViewer.API.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;
    private readonly ILogger<AuthController> _logger;

    public AuthController(IAuthService authService, ILogger<AuthController> logger)
    {
        _authService = authService;
        _logger = logger;
    }

    [HttpPost("login")]
    public async Task<ActionResult<AuthResponse>> LoginAsync([FromBody] LoginRequest request)
    {
        try
        {
            var response = await _authService.LoginAsync(request);
            return Ok(response);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error during login attempt");
            return BadRequest(new AuthResponse { Success = false, Message = "Invalid email or password" });
        }
    }

    [HttpPost("refresh-token")]
    public async Task<ActionResult<AuthResponse>> RefreshTokenAsync([FromBody] RefreshTokenRequest request)
    {
        try
        {
            var response = await _authService.RefreshTokenAsync(request.RefreshToken);
            return Ok(response);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error during token refresh");
            return BadRequest(new AuthResponse { Success = false, Message = "Invalid refresh token" });
        }
    }

    [HttpPost("revoke-token")]
    [Authorize]
    public async Task<IActionResult> RevokeTokenAsync([FromBody] RevokeTokenRequest request)
    {
        try
        {
            await _authService.RevokeTokenAsync(request.RefreshToken);
            return Ok();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error during token revocation");
            return BadRequest(new { Message = "Invalid token" });
        }
    }

    [HttpGet("users")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<IEnumerable<UserProfileResponse>>> GetUsersAsync()
    {
        try
        {
            var users = await _authService.GetUsersAsync();
            return Ok(users);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error fetching users");
            return StatusCode(500, new { Message = "An error occurred while fetching users" });
        }
    }

    [HttpPost("users/{userId}/deactivate")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> DeactivateUserAsync(string userId)
    {
        try
        {
            await _authService.DeactivateUserAsync(userId);
            return Ok();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error deactivating user");
            return StatusCode(500, new { Message = "An error occurred while deactivating the user" });
        }
    }

    [HttpPost("users/{userId}/reactivate")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> ReactivateUserAsync(string userId)
    {
        try
        {
            await _authService.ReactivateUserAsync(userId);
            return Ok();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error reactivating user");
            return StatusCode(500, new { Message = "An error occurred while reactivating the user" });
        }
    }

    [HttpPut("users/{userId}")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<AuthResponse>> UpdateUserAsync(string userId, [FromBody] UpdateUserRequest request)
    {
        try
        {
            var response = await _authService.UpdateUserAsync(userId, request.FirstName, request.LastName, request.Email, request.Roles);
            if (!response.Success)
            {
                return BadRequest(response);
            }
            return Ok(response);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error updating user");
            return StatusCode(500, new { Message = "An error occurred while updating the user" });
        }
    }

    [HttpDelete("users/{userId}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> DeleteUserAsync(string userId)
    {
        try
        {
            await _authService.SoftDeleteUserAsync(userId);
            return Ok();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error deleting user");
            return StatusCode(500, new { Message = "An error occurred while deleting the user" });
        }
    }

    [HttpPost("register")]
    public async Task<ActionResult<AuthResponse>> RegisterAsync([FromBody] CreateUserRequest request)
    {
        try
        {
            if (request.Roles == null || !request.Roles.Any())
            {
                request.Roles = new List<string> { "User" }; // Default role
            }

            var response = await _authService.CreateUserAsync(
                request.Email,
                request.Password,
                request.FirstName,
                request.LastName,
                request.Roles
            );

            if (!response.Success)
            {
                _logger.LogWarning("User registration failed: {Message}", response.Message);
                return BadRequest(response);
            }

            return Ok(response);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error during user registration");
            return BadRequest(new AuthResponse { Success = false, Message = $"Registration failed: {ex.Message}" });
        }
    }
}

public class CreateUserRequest
{
    public string Email { get; set; }
    public string Password { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public IList<string> Roles { get; set; } = new List<string>();
}

public class RefreshTokenRequest
{
    public string RefreshToken { get; set; }
}

public class RevokeTokenRequest
{
    public string RefreshToken { get; set; }
}

public class UpdateUserRequest
{
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Email { get; set; }
    public IList<string> Roles { get; set; } = new List<string>();
} 
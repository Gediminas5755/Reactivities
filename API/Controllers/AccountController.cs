using API.DTOs;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.EntityFrameworkCore;
using static API.DTOs.GitHubInfo;

namespace API.Controllers;

public class AccountController(
    SignInManager<User> signInManager,
    IEmailSender<User> emailSender,
    IConfiguration config
) : BaseApiController
{
    [AllowAnonymous]
    [HttpPost("github-login")]
    public async Task<ActionResult> LoginWithGithub(string code)
    {
        if (string.IsNullOrEmpty(code))
            return BadRequest("Missing authorization code");

        using var httpClient = new HttpClient();
        httpClient.DefaultRequestHeaders.Accept.Add(
            new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/json")
        );

        //step 1 exchange code for access token
        var tokenResponse = await httpClient.PostAsJsonAsync(
            "https://github.com/login/oauth/access_token",
            new GitHubAuthRequest
            {
                Code = code,
                ClientId = config["Authentication:GitHub:ClientId"]!,
                ClientSecret = config["Authentication:GitHub:ClientSecret"]!,
                RedirectUri = $"{config["ClientAppUrl"]}/auth-callback",
            }
        );

        if (!tokenResponse.IsSuccessStatusCode)
            return BadRequest("Failed to get access token");

        var tokenContent = await tokenResponse.Content.ReadFromJsonAsync<GitHubTokenResponse>();

        if (string.IsNullOrEmpty(tokenContent?.AccessToken))
            return BadRequest("Failed to retrieve access token");

        //step 2 - fetch user info from GiHub
        httpClient.DefaultRequestHeaders.Authorization =
            new System.Net.Http.Headers.AuthenticationHeaderValue(
                "Bearer",
                tokenContent.AccessToken
            );
        httpClient.DefaultRequestHeaders.UserAgent.ParseAdd("Reactivities");

        var userResponse = await httpClient.GetAsync("https://api.github.com/user");
        if (!userResponse.IsSuccessStatusCode)
            return BadRequest("Failed o fetch user from GitHub");

        var user = await userResponse.Content.ReadFromJsonAsync<GitHubUser>();
        if (user == null)
            return BadRequest("Failed to read user from GitHub");

        //step 3 - getting the email if needed
        if (string.IsNullOrEmpty(user?.Email))
        {
            var emailResponse = await httpClient.GetAsync("https://api.github.com/user/emails");
            if (emailResponse.IsSuccessStatusCode)
            {
                var emails = await emailResponse.Content.ReadFromJsonAsync<List<GitHubEmail>>();

                var primary = emails?.FirstOrDefault(e => e is { Primary: true, Verified: true })?.Email;

                if (string.IsNullOrEmpty(primary))
                    return BadRequest("Failed to get email from GitHub");

                user!.Email = primary;
            }
        }

        //step 4- find or create user and sign in
        var existingUser = await signInManager.UserManager.Users.FirstOrDefaultAsync(x =>
            x.Email == user.Email
        );

        if (existingUser == null)
        {
            existingUser = new User
            {
                DisplayName = user.Name,
                Email = user.Email,
                UserName = user.Email,
                ImageUrl = user.ImageUrl,
                EmailConfirmed = true
            };

            var createResult = await signInManager.UserManager.CreateAsync(existingUser);
            if (!createResult.Succeeded)
                return BadRequest("Failed to create user");
        }

        await signInManager.SignInAsync(existingUser, isPersistent: false);

        return Ok();
    }

    [AllowAnonymous]
    [HttpPost("register")]
    public async Task<ActionResult> RegisterUser(RegisterDto registerDto)
    {
        var user = new User
        {
            UserName = registerDto.Email,
            Email = registerDto.Email,
            DisplayName = registerDto.DisplayName,
        };
        var result = await signInManager.UserManager.CreateAsync(user, registerDto.Password);

        foreach (var error in result.Errors)
        {
            ModelState.AddModelError("registerError", error.Description);
        }

        if (result.Succeeded)
        {
            await SendConfirmationEmailAsync(user, registerDto.Email);
            return Ok();
        }

        return ValidationProblem();
    }

    [AllowAnonymous]
    [HttpGet("resendConfirmEmail")]
    public async Task<ActionResult> ResendConfirmEmail(string? email, string? userId)
    {
        if (string.IsNullOrEmpty(email) && string.IsNullOrEmpty(userId))
        {
            return BadRequest("Email or userId are required");
        }

        var user = await signInManager.UserManager.Users.FirstOrDefaultAsync(x =>
            x.Email == email || x.Id == userId
        );
        if (user == null || string.IsNullOrEmpty(user.Email))
            return BadRequest("user with email not found");

        await SendConfirmationEmailAsync(user, user.Email);
        return Ok();
    }

    private async Task SendConfirmationEmailAsync(User user, string email)
    {
        var code = await signInManager.UserManager.GenerateEmailConfirmationTokenAsync(user);
        code = WebEncoders.Base64UrlEncode(System.Text.Encoding.UTF8.GetBytes(code));
        var confirmEmailUrl =
            $"{config["ClientAppUrl"]}/confirm-email?userId={user.Id}&code={code}";
        await emailSender.SendConfirmationLinkAsync(user, email, confirmEmailUrl);
    }

    [AllowAnonymous]
    [HttpGet("user-info")]
    public async Task<ActionResult> GetUserInfo() //check for authenticated user cookie
    {
        if (User.Identity?.IsAuthenticated == false)
            return NoContent();

        var user = await signInManager.UserManager.GetUserAsync(User);

        if (user == null)
            return Unauthorized();

        return Ok(
            new
            {
                user.DisplayName,
                user.Email,
                user.Id,
                user.ImageUrl,
            }
        );
    }

    [HttpPost("logout")]
    public async Task<ActionResult> Logout()
    {
        await signInManager.SignOutAsync(); //removes the authentication cookie
        return NoContent();
    }

    [HttpPost("change-password")]
    public async Task<ActionResult> ChangePassword(ChangePasswordDto passwordDto)
    {
        var user = await signInManager.UserManager.GetUserAsync(User);
        if (user == null)
            return Unauthorized();

        var result = await signInManager.UserManager.ChangePasswordAsync(
            user,
            passwordDto.CurrentPassword,
            passwordDto.NewPassword
        );

        if (result.Succeeded)
        {
            // await signInManager.RefreshSignInAsync(user);
            return Ok();
        }

        return BadRequest(result.Errors.First().Description);
    }
}

using System;
using System.Security.Claims;
using Application.Interfaces;
using Domain;
using Microsoft.AspNetCore.Http;
using Persistence;

namespace Infrastructure;

public class UserAccessor (IHttpContextAccessor httpContextAccessor, AppDbContext appDbContext) : IUserAccessor
{
    public async Task<User> GetUserAsync()
    {
        return await appDbContext.Users.FindAsync(GetUserId()) ?? 
        throw new UnauthorizedAccessException("no user logged in");
    }

    public string GetUserId()
    {
        return httpContextAccessor.HttpContext?.User.FindFirstValue(ClaimTypes.NameIdentifier) ?? 
        throw new Exception("User not found");
    }
}

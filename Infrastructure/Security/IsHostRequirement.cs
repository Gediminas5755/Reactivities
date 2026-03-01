using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Infrastructure.Security;

public class IsHostRequirement : IAuthorizationRequirement { }

public class IsHostRequirementHandler(
    AppDbContext appDbContext,
    IHttpContextAccessor httpContextAccessor
) : AuthorizationHandler<IsHostRequirement>
{
    protected override async Task HandleRequirementAsync(
        AuthorizationHandlerContext context,
        IsHostRequirement requirement
    )
    {
        var userId = context.User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (userId == null)
            return;

        var httpContext = httpContextAccessor.HttpContext;

        if (httpContext?.GetRouteValue("id") is not string activityId)
            return;

        var atendee = await appDbContext.ActivityAttendees.SingleOrDefaultAsync(x =>
            x.UserId == userId && x.ActivityId == activityId
        );

        if (atendee == null || !atendee.IsHost)
            return;

        if (atendee.IsHost)
            context.Succeed(requirement);
        // Here you would implement the logic to check if the user is the host of the activity
        // For example, you might check the user's claims or query the database to verify their role

        // If the user meets the requirement, call context.Succeed(requirement);
        // If not, simply return without calling Succeed, which will result in a failed authorization
    }
}

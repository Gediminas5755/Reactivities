using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Persistence;

namespace Application.Profiles.Commands;

public class FollowToggle
{
    public class Command : IRequest<Result<Unit>>
    {
        public required string TargetUserId { get; set; }
    }
    public class Handler(AppDbContext context, IUserAccessor userAccessor) : IRequestHandler<Command, Result<Unit>>
    {
        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var observer = userAccessor.GetUserAsync();
            var target = await context.Users.FindAsync([request.TargetUserId]);
            if (target == null) return Result<Unit>.Failure("Target User not found", 400);

            var following = await context.UserFollowings.FindAsync([observer.Id, target.Id], cancellationToken);
            if (following == null)
            {
                following = new UserFollowing
                {
                    ObserverId = observer.Id.ToString(),
                    TargetId = target.Id
                };
                context.UserFollowings.Add(following);
            }
            else
            {
                context.UserFollowings.Remove(following);
            }

            var result = context.SaveChangesAsync(cancellationToken).Result > 0;

            return result
                ? Result<Unit>.Success(Unit.Value)
                : Result<Unit>.Failure("Problem updating follow", 400);
        }
    }
}

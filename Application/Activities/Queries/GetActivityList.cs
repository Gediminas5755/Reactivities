using MediatR;
using Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using AutoMapper;
using Application.Activities.DTOs;
using AutoMapper.QueryableExtensions;
using Application.Interfaces;
using Application.Core;

namespace Application.Activities.Queries;

public class ActivityParams : PaginationParams<DateTime?>
{
    public string? Filter { get; set; }
    public DateTime StartDate { get; set; } = DateTime.UtcNow;
}

public class GetActivityList
{
    public class Querry : IRequest<Result<PagedList<ActivityDto, DateTime?>>>
    {
        public required ActivityParams Params { get; set; }
    }

    public class Handler(AppDbContext context, ILogger<GetActivityList> logger, IMapper mapper, IUserAccessor userAccessor)
        : IRequestHandler<Querry, Result<PagedList<ActivityDto, DateTime?>>>
    {
        public async Task<Result<PagedList<ActivityDto, DateTime?>>> Handle(Querry request, CancellationToken cancellationToken)
        {

            var query = context.Activities
                .OrderBy(a => a.Date)
                .Where(a => a.Date >= (request.Params.Cursor ?? request.Params.StartDate))
                .AsQueryable();

            // if (request.Cursor.HasValue)
            // {
            //     query = query.Where(a => a.Date > request.Cursor.Value);
            // }

            if (!string.IsNullOrEmpty(request.Params.Filter))
            {
                query = request.Params.Filter.ToLower() switch
                {
                    "isgoing" => query.Where(a => a.Attendees.Any(at => at.UserId == userAccessor.GetUserId())),
                    "ishost" => query.Where(a => a.Attendees.Any(at => at.UserId == userAccessor.GetUserId() && 
                                                                 at.IsHost)),
                    _ => query
                };
            }

            var projectedActivities = query
                .ProjectTo<ActivityDto>(mapper.ConfigurationProvider, new { currentUserId = userAccessor.GetUserId() });

            var activities = await projectedActivities
                .Take(request.Params.PageSize + 1)
                .ToListAsync(cancellationToken);

            DateTime? nextCursor = null;
            if (activities.Count > request.Params.PageSize)
            {
                nextCursor = activities.Last().Date;
                activities.RemoveAt(activities.Count - 1);
            }

            return Result<PagedList<ActivityDto, DateTime?>>.Success(
                new PagedList<ActivityDto, DateTime?>
                {
                    Items = activities,
                    NextCursor = nextCursor
                });

            // try
            // {
            //     for (int i = 0; i < 10; i++)
            //     {
            //         cancellationToken.ThrowIfCancellationRequested();
            //         await Task.Delay(1000, cancellationToken); 
            //         logger.LogInformation($"Task {i} completed");
            //     }
            // }
            // catch (Exception ex)
            // {
            //     logger.LogInformation(ex, "Task was cancelled");
            // }
            // return await context.Activities
            //     .ProjectTo<ActivityDto>(mapper.ConfigurationProvider, new { currentUserId = userAccessor.GetUserId() })
            //     .ToListAsync(cancellationToken);
        }
    }
}
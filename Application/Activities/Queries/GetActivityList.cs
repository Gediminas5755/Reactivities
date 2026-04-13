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

public class GetActivityList
{
    private const int MaxPageSize = 50;
    public class Querry : IRequest<Result<PagedList<ActivityDto, DateTime?>>>
    {
        public DateTime? Cursor { get; set; }
        private int _pageSize = 3;
        public int PageSize
        {
            get { return _pageSize; }
            set { _pageSize = value > MaxPageSize ? MaxPageSize : value; }
        }

    }

    public class Handler(AppDbContext context, ILogger<GetActivityList> logger, IMapper mapper, IUserAccessor userAccessor)
        : IRequestHandler<Querry, Result<PagedList<ActivityDto, DateTime?>>>
    {
        public async Task<Result<PagedList<ActivityDto, DateTime?>>> Handle(Querry request, CancellationToken cancellationToken)
        {

            var query = context.Activities
                .OrderBy(a => a.Date)
                .Where(a => a.Date >= request.Cursor)
                .AsQueryable();

            if (request.Cursor.HasValue)
            {
                query = query.Where(a => a.Date > request.Cursor.Value);
            }

            var activities = await query
                .Take(request.PageSize + 1)
                .ProjectTo<ActivityDto>(mapper.ConfigurationProvider, new { currentUserId = userAccessor.GetUserId() })
                .ToListAsync(cancellationToken);

            DateTime? nextCursor = null;
            if (activities.Count > request.PageSize)
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
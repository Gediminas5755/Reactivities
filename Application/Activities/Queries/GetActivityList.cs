using System;
using Domain;
using MediatR;
using Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Application.Activities.Queries;

public class GetActivityList
{
    public class Querry : IRequest<List<Activity>>
    {
    }

    public class Handler(AppDbContext context, ILogger<GetActivityList> logger) : IRequestHandler<Querry, List<Activity>>
    {
        public async Task<List<Activity>> Handle(Querry request, CancellationToken cancellationToken)
        {
            try
            {
                for (int i = 0; i < 10; i++)
                {
                    cancellationToken.ThrowIfCancellationRequested();
                    await Task.Delay(1000, cancellationToken); 
                    logger.LogInformation($"Task {i} completed");
                }
            }
            catch (Exception ex)
            {
                logger.LogInformation(ex, "Task was cancelled");
            }
            return await context.Activities.ToListAsync(cancellationToken);
        }
    }
}
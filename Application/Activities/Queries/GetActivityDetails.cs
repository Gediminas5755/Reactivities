using System;
using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities.Queries;

public class GetActivityDetails
{
    public class Querry : IRequest<Result<Activity>>
    {
        public required string Id { get; set; }
    }
    
    public class Handler(AppDbContext context) : IRequestHandler<Querry, Result<Activity>>
    {
        public async Task<Result<Activity>> Handle(Querry request, CancellationToken cancellationToken)
        {
            var activity = await context.Activities.FindAsync(request.Id, cancellationToken);
            if (activity == null)
            {
                return Result<Activity>.Failure("Activity not found", 404);
            }

            return Result<Activity>.Success(activity);
        }
    }
}

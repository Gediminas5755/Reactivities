using System;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities.Queries;

public class GetActivityDetails
{
    public class Querry : IRequest<Activity>
    {
        public required string Id { get; set; }
    }

    public class Handler(AppDbContext context) : IRequestHandler<Querry, Activity>
    {
        public async Task<Activity> Handle(Querry request, CancellationToken cancellationToken)
        {
            var activity = await context.Activities.FindAsync(request.Id, cancellationToken);
            if (activity == null)
            {
                throw new Exception("Activity not found");
            }

            return activity;
        }
    }
}

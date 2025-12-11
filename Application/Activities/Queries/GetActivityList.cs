using System;
using Domain;
using MediatR;
using Persistence;
using Microsoft.EntityFrameworkCore;

namespace Application.Activities.Queries;

public class GetActivityList
{
    public class Querry : IRequest<List<Activity>>
    {
    }

    public class Handler (AppDbContext context) : IRequestHandler<Querry, List<Activity>>
    {
        public async Task<List<Activity>> Handle(Querry request, CancellationToken cancellationToken)
        {
            return await context.Activities.ToListAsync(cancellationToken);
            // Simulate async data fetching
            // await Task.Delay(100);
            // return new List<Activity>
            // {
            //     new Activity
            //     {
            //         Id = Guid.NewGuid(),
            //         Title = "Sample Activity",
            //         Description = "This is a sample activity description.",
            //         Date = DateTime.Now,
            //         Category = "Sample Category",
            //         City = "Sample City",
            //         Venue = "Sample Venue"
            //     }
            // };
        }
    }
}
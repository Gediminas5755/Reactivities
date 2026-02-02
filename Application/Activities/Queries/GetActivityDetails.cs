using System;
using Application.Activities.DTOs;
using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities.Queries;

public class GetActivityDetails
{
    public class Querry : IRequest<Result<ActivityDto>>
    {
        public required string Id { get; set; }
    }
    
    public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Querry, Result<ActivityDto>>
    {
        public async Task<Result<ActivityDto>> Handle(Querry request, CancellationToken cancellationToken)
        {
            var activity = await context.Activities
            .ProjectTo<ActivityDto>(mapper.ConfigurationProvider)
            .FirstOrDefaultAsync(a => a.Id == request.Id, cancellationToken);
            if (activity == null)
            {
                return Result<ActivityDto>.Failure("Activity not found", 404);
            }

            return Result<ActivityDto>.Success(activity);
        }
    }
}

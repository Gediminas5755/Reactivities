using MediatR;
using Persistence;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using Application.Activities.DTOs;
using AutoMapper.QueryableExtensions;
using Application.Core;

namespace Application.Activities.Queries;

public class GetComments
{
    public class Querry : IRequest<Result<List<CommentDto>>>
    {
        public required string ActivityId { get; set; }
    }

    public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Querry, Result<List<CommentDto>>>
    {
        public async Task<Result<List<CommentDto>>> Handle(Querry request, CancellationToken cancellationToken)
        {
            var comments = await context.Comments
                .Where(c => c.ActivityId == request.ActivityId)
                .OrderByDescending(c => c.CreatedAt)
                .ProjectTo<CommentDto>(mapper.ConfigurationProvider)
                .ToListAsync(cancellationToken);

                return Result<List<CommentDto>>.Success(comments);
        }
    }
}

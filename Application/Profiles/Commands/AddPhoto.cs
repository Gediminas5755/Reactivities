using System;
using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Persistence;

namespace Application.Profiles.Commands;

public class SetMainPhoto
{
     public class Command : IRequest<Result<Unit>>
    {
        public required string PhotoId { get; set; }
    }

    public class Handler(IUserAccessor userAccessor, AppDbContext context)
        : IRequestHandler<Command, Result<Unit>>
    {
        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var user = await userAccessor.GetUserWithPhotosAsync();

            var photo = user.Photos.FirstOrDefault(p => p.Id == request.PhotoId);

            if (photo == null) return Result<Unit>.Failure("Photo not found", 400);

            user.ImageUrl = photo.Url;

                var result = await context.SaveChangesAsync(cancellationToken) > 0;
            
            return result
                ? Result<Unit>.Success(Unit.Value)
                : Result<Unit>.Failure("Problem changing main photo", 400);
        }
    }
}

public class AddPhoto
{
    public class Command : IRequest<Result<Photo>>
    {
        public required IFormFile File { get; set; }
    }

    public class Handler(IUserAccessor userAccessor, IPhotoService photoService, AppDbContext context) 
        : IRequestHandler<Command, Result<Photo>>
    {
        async Task<Result<Photo>> IRequestHandler<Command, Result<Photo>>.Handle(Command request, CancellationToken cancellationToken)
        {
            var uploadResult = await photoService.UploadPhoto(request.File);
            if (uploadResult == null)
                return Result<Photo>.Failure("Photo upload failed", 400);

            var user = await userAccessor.GetUserAsync();

            var photo = new Photo
            {
                Url = uploadResult.Url,
                PublicId = uploadResult.PublicId,
                UserId = user.Id,
            };

            user.ImageUrl ??= photo.Url; // Set as main photo if user doesn't have one

            context.Photos.Add(photo);

            var result = await context.SaveChangesAsync(cancellationToken) > 0;

            if (result)
                return Result<Photo>.Success(photo);

            return result
                ? Result<Photo>.Success(photo)
                : Result<Photo>.Failure("Problem adding photo", 400);
        }
    }
}

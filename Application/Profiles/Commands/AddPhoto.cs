using System;
using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Persistence;

namespace Application.Profiles.Commands;

public class AddPhoto
{
    class Command : IRequest<Result<Photo>>
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

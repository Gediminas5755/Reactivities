using Application.Interfaces;
using CloudinaryDotNet;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;

namespace Infrastructure.Photos;

public class PhotoService : IPhotoService
{
    private Cloudinary _cloudinary;

    public PhotoService(IOptions<CloudinarySettings> config)
    {
        var account = new Account(
            config.Value.CloudName,
            config.Value.ApiKey,
            config.Value.ApiSecret
        );

        _cloudinary = new Cloudinary(account);
    }

    public async Task<PhotoUploadResult?> UploadPhoto(IFormFile file)
    {
        // if (file == null || file.Length == 0)
        //     return Task.FromResult<PhotoUploadResult>(null);

        if (file.Length > 0) // Limit file size to 10MB
        {
            await using var stream = file.OpenReadStream();

            var uploadParams = new CloudinaryDotNet.Actions.ImageUploadParams
            {
                File = new CloudinaryDotNet.FileDescription(file.FileName, stream),
                // Transformation = new CloudinaryDotNet.Transformation().Crop("fill").Width(500).Height(500)
                Folder = "reactivities" // Optional: specify a folder in Cloudinary to organize uploads
            };

            var uploadResult = await _cloudinary.UploadAsync(uploadParams);

            if (uploadResult.Error != null)
                throw new Exception(uploadResult.Error.Message);

            return new PhotoUploadResult
            {
                PublicId = uploadResult.PublicId,
                Url = uploadResult.SecureUrl.AbsoluteUri
            };
        }

        return null;
    }

    public async Task<string> DeletePhoto(string publicId)
    {
        var deletionParams = new CloudinaryDotNet.Actions.DeletionParams(publicId);
        var result = await _cloudinary.DestroyAsync(deletionParams);

        if (result.Error != null)
            throw new Exception(result.Error?.Message);

        return result.Result;
    }
}
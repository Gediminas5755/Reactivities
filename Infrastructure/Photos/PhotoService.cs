using Application.Interfaces;
using Microsoft.AspNetCore.Http;

namespace Infrastructure.Photos;

public class PhotoService : IPhotoService
{
    public Task<PhotoUploadResult> AddPhotoAsync(IFormFile file)
    {
        throw new NotImplementedException();
    }

    public Task<string> DeletePhoto(string publicId)
    {
        throw new NotImplementedException();
    }
}

using Application.Profiles.Commands;
using Application.Profiles.DTOs;
using Application.Profiles.Queries;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ProfilesController : BaseApiController
    {
        [HttpPost("add-photo")]
        // public async Task<ActionResult<Photo>> AddPhoto(AddPhoto.Command command)
        public async Task<ActionResult<Photo>> AddPhoto(IFormFile file)
        {
            var command = new AddPhoto.Command { File = file };
            return HandleResult(await Mediator.Send(command));
        }

        [HttpGet("{userId}/photos")]
        public async Task<ActionResult<List<Photo>>> GetPhotosForUser(string userId)
        {
            var query = new GetProfilePhotos.Query { UserId = userId };
            return HandleResult(await Mediator.Send(query));
        }

        [HttpDelete("{photoId}/photos/")]
        public async Task<ActionResult> DeletePhoto(string photoId)
        {
            var command = new DeletePhoto.Command { PhotoId = photoId };
            return HandleResult(await Mediator.Send(command));
        }

        [HttpPut("{photoId}/setMain")]
        public async Task<ActionResult> SetMainPhoto(string photoId)
        {
            var command = new SetMainPhoto.Command { PhotoId = photoId };
            return HandleResult(await Mediator.Send(command));
        }

        [HttpGet("{userId}")]
        public async Task<ActionResult<UserProfile>> GetProfile(string userId)
        {
            var query = new GetProfile.Query { UserId = userId };
            return HandleResult(await Mediator.Send(query));
        }

        [HttpPut]
        public async Task<ActionResult> UpdateProfile(EditProfile.Command command)
        {
            return HandleResult(await Mediator.Send(command));
        }
    }
}
using Domain;
using Microsoft.AspNetCore.Mvc;
using MediatR;
using Application.Activities.Queries;

namespace API.Controllers;

public class ActivitiesController(IMediator mediator) : BaseApiController
{
    [HttpGet]
    public async Task<ActionResult<List<Activity>>> GetActivities()
    {
        return await mediator.Send(new GetActivityList.Querry());
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Activity>> GetActivityDetail(string id)
    {
        return await mediator.Send(new GetActivityDetails.Querry{ Id = id});

        // var activity = await context.Activities.FindAsync(id);
        // if (activity == null)
        // {
        //     return NotFound();
        // }
        // return activity;
    }
}

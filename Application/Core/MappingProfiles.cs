using System;
using Application.Activities.Commands;
using Application.Activities.DTOs;
using Domain;
namespace Application.Core;

public class MappingProfiles: AutoMapper.Profile
{
    public MappingProfiles()
    {
         CreateMap<Activity, Activity>();
         CreateMap<CreateActivityDto, Activity>();
         CreateMap<EditActivityDto, Activity>();
    }
}

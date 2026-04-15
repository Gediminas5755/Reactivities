using System;
using Application.Activities.Commands;
using Application.Activities.DTOs;
using Application.Profiles.DTOs;
using Domain;

namespace Application.Core;

public class MappingProfiles : AutoMapper.Profile
{
    public MappingProfiles()
    {
        string? currentUserId = null;
        CreateMap<Activity, Activity>();
        CreateMap<CreateActivityDto, Activity>();
        CreateMap<EditActivityDto, Activity>();
        CreateMap<Activity, ActivityDto>()
            .ForMember(
                d => d.HostDisplayName,
                o => o.MapFrom(s => s.Attendees.FirstOrDefault(a => a.IsHost)!.User.DisplayName)
            )
            .ForMember(
                d => d.HostId,
                o => o.MapFrom(s => s.Attendees.FirstOrDefault(a => a.IsHost)!.User.Id)
            );

        CreateMap<ActivityAtendee, UserProfile>()
            .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.User.DisplayName))
            .ForMember(d => d.Bio, o => o.MapFrom(s => s.User.Bio))
            .ForMember(d => d.Id, o => o.MapFrom(s => s.User.Id))
            .ForMember(d => d.ImageUrl, o => o.MapFrom(s => s.User.ImageUrl))
            .ForMember(d => d.FollowersCount, o => o.MapFrom(s => s.User.Followers.Count))
            .ForMember(d => d.FollowingCount, o => o.MapFrom(s => s.User.Followings.Count))
            .ForMember(
                d => d.Following,
                o => o.MapFrom(s => s.User.Followers.Any(f => f.ObserverId == currentUserId))
            );

        CreateMap<User, UserProfile>()
            .ForMember(d => d.FollowersCount, o => o.MapFrom(s => s.Followers.Count))
            .ForMember(d => d.FollowingCount, o => o.MapFrom(s => s.Followings.Count))
            .ForMember(
                d => d.Following,
                o => o.MapFrom(s => s.Followers.Any(f => f.ObserverId == currentUserId))
            );

        CreateMap<Comment, CommentDto>()
            .ForMember(d => d.UserDisplayName, o => o.MapFrom(s => s.User.DisplayName))
            .ForMember(d => d.UserId, o => o.MapFrom(s => s.User.Id))
            .ForMember(d => d.ImageUrl, o => o.MapFrom(s => s.User.ImageUrl));

        CreateMap<Activity, UserActivityDto>();
    }
}

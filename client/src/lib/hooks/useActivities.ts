import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import agent from "../api/agent";
import { data, useLocation } from "react-router";
import { useAccount } from "./useAccount";

export const useActivities = (id?: string) => {
    const queryClient = useQueryClient();
    const { currentUser } = useAccount();
    const location = useLocation();

    const { data: activities, isLoading } = useQuery({
        queryKey: ['activities'],
        queryFn: async () => {
            const response = await agent.get<Activity[]>("/activities");
            return response.data;
        },
        enabled: !id && location.pathname === '/activities' && !!currentUser, //disable when id is present and not in activities list page
        select: data => {
            return data.map(activity => {
                const isHost = currentUser?.id == activity.hostId;
                const isGoing = activity.attendees.some(x => x.id === currentUser?.id);
                return { ...activity, isHost, isGoing };
            })
        }
        // staleTime: 5 * 60 * 1000, //5 minutes
    });

    const { data: activity, isLoading: isLoadingActivity } = useQuery({
        queryKey: ['activities', id],
        queryFn: async () => {
            const response = await agent.get<Activity>(`/activities/${id}`);
            return response.data;
        },
        enabled: !!id && !!currentUser, //id not null or undefined, both useQuery would be executed
        select: data => {
            const isHost = currentUser?.id == data.hostId;
            const isGoing = data.attendees.some(x => x.id === currentUser?.id);
            return { ...data, isHost, isGoing };
        }
    });

    const updateActivity = useMutation({
        mutationFn: async (activity: Activity) => {
            await agent.put(`/activities`, activity);
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['activities'] });
        }
    })

    const createActivity = useMutation({
        mutationFn: async (activity: Activity) => {
            const response = await agent.post(`/activities`, activity);
            return response.data;
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['activities'] });
        }
    })

    const deleteActivity = useMutation({
        mutationFn: async (id: string) => {
            await agent.delete(`/activities/${id}`);
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['activities'] });
        }
    })

    const updateAttendance = useMutation({
        mutationFn: async (id: string) => {
            await agent.post(`/activities/${id}/attend`);
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['activities', id] });
            // await queryClient.invalidateQueries({ queryKey: ['activities'] });
        }
    })


    return {
        activities,
        isLoading,
        updateActivity,
        createActivity,
        deleteActivity,
        activity,
        isLoadingActivity,
        updateAttendance
    };
    // const createActivity = useMutation({
    //     mutationFn: async (activity: Activity) => {
    //         await agent.post(`/activities`, activity);
    //     }
    // })
}
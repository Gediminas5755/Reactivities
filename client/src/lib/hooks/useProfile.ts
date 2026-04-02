import { useQuery, useQueryClient } from "@tanstack/react-query";
import agent from "../api/agent";
import { useMemo } from "react";

export const useProfile = (id?: string) => {
    const queryClint = useQueryClient();

    const { data: profile, isLoading: loadingProfile } = useQuery<Profile>({
        queryKey: ['profile', id],
        queryFn: async () => {
            const response = await agent.get(`/profiles/${id}`);
            return response.data;
        },
        enabled: !!id, //only execute when id is not null or undefined
    })


    const { data: photos, isLoading: loadingPhotos } = useQuery<Photo[]>({
        queryKey: ['photos', id],
        queryFn: async () => {
            const response = await agent.get<Photo[]>(`/profiles/${id}/photos`);
            return response.data;
        },
        enabled: !!id, //only execute when id is not null or undefined
    })

    const isCurrentUser = useMemo(() => {
        return id === queryClint.getQueryData<User>(['user'])?.id;
    }, [id, queryClint]);

    return { profile, loadingProfile, photos, loadingPhotos, isCurrentUser };
}
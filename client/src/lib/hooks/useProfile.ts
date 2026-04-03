import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import agent from "../api/agent";
import { useMemo } from "react";
import { data } from "react-router";

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

    const uploadPhoto = useMutation({
        mutationFn: async (file: Blob) => {
            const formData = new FormData();
            formData.append('file', file);
            const response = await agent.post('/profiles/add-photo', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            return response.data;
        },
        onSuccess: async (photo: Photo) => {
            await queryClint.invalidateQueries({ queryKey: ['photos', id] }); //refresh photos after successful upload
            queryClint.setQueryData(['user'], (data: User) => {
                if (!data) return data;
                return {
                    ...data,
                    imageUrl: data.imageUrl ?? photo.url //update user's main photo url after successful upload};
                }
            });
            queryClint.setQueryData(['profile', id], (data: Profile) => {
                if (!data) return data;
                return {
                    ...data,
                    imageUrl: data.imageUrl ?? photo.url //update user's main photo url after successful upload};
                }
            });
        }
    })

    const setMainPhoto = useMutation({
        mutationFn: async (photo: Photo) => {
            await agent.put(`/profiles/${photo.id}/setMain`, {});
        },
        onSuccess: async (_, photo) => {
            queryClint.setQueryData(['user'], (userData: User) => {
                if (!userData) return userData;
                return {
                    ...userData,
                    imageUrl: photo.url
                };
            });

            queryClint.setQueryData(['profile', id], (profileData: Profile) => {
                if (!profileData) return profileData;
                return {
                    ...profileData,
                    imageUrl: photo.url
                };
            });
        }
    });

    const isCurrentUser = useMemo(() => {
        return id === queryClint.getQueryData<User>(['user'])?.id;
    }, [id, queryClint]);

    return { profile, loadingProfile, photos, loadingPhotos, isCurrentUser, uploadPhoto, setMainPhoto };
}
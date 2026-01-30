import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import type { LoginSchema } from "../schemas/loginSchema"
import agent from "../api/agent";
import { useNavigate } from "react-router";
import type { RegisterSchema } from "../schemas/registerSchema";
import { toast } from "react-toastify";

export const useAccount = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const loginUser = useMutation({
        mutationFn: async (creds: LoginSchema) => {

            await agent.post('/login?useCookies=true', creds);
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['user'] });
            // await navigate('/activities');
        }
    });

    const registerUser = useMutation({
        mutationFn: async (creds: RegisterSchema) => {
            await agent.post('/account/register', creds);
        },
        onSuccess: async () => {
            toast.success('Registration successful - you can now login');
            // await queryClient.invalidateQueries({ queryKey: ['user'] });
            navigate('/login');
        }
    });

    const logoutUser = useMutation({
        mutationFn: async () => {
            await agent.post('/account/logout');
        },
        onSuccess: async () => {
            await queryClient.removeQueries({ queryKey: ['user'] });
            await queryClient.removeQueries({ queryKey: ['activities'] });
            navigate('/');
        }
    });

    const { data: currentUser, isLoading: loadingUserInfo } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const result = await agent.get<User>('/account/user-info');
            return result.data;
        },
        enabled: !queryClient.getQueryData(['user'])
    });

    return { loginUser, currentUser, logoutUser, loadingUserInfo, registerUser };
}
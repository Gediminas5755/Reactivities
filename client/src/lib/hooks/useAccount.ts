import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import type { LoginSchema } from "../schemas/loginSchema"
import agent from "../api/agent";

export const useAccount = () => {
    const queryClient = useQueryClient();
    
    const loginUser = useMutation({
        mutationFn: async (creds: LoginSchema) => {

            await agent.post('/login?useCookies=true', creds);
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['user'] });
        }
    });

    const { data: currentUser } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const result = await agent.get<User>('/account/user-info');
            return result.data;
        }
    });

    return { loginUser, currentUser };
}
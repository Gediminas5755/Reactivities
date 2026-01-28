import { useAccount } from "../../lib/hooks/useAccount"
import { useForm } from "react-hook-form";
import { loginSchema, type LoginSchema } from "../../lib/schemas/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod/dist/zod.js";
import { Box, Button, Paper, Typography } from "@mui/material";
import { LockOpen } from "@mui/icons-material";
import TextInput from "../../app/shared/components/TextInput";

export default function LoginForm() {
    const { loginUser } = useAccount();

    const { control, handleSubmit, formState: { isValid, isSubmitting } } = useForm<LoginSchema>({
        mode: 'onTouched',
        resolver: zodResolver(loginSchema)
    });

    const onSubmit = async (data: LoginSchema) => {

        await loginUser.mutateAsync(data);
    };

    return (
        <Paper
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                gap: 3,
                maxWidth: 'md',
                mx: 'auto',
                borderRadius: 3
            }}>
            <Box display="flex" alignItems="center" justifyContent='center' color="secondary.main" gap={3}>
                <LockOpen fontSize="large" />
                <Typography variant="h4" >Sign In</Typography>
            </Box>
            <TextInput name="email" control={control} label="Email" />
            <TextInput name="password" control={control} label="Password" type="password" />
            <Button type="submit" variant="contained" size="large" color="primary" disabled={!isValid || isSubmitting}>
                Login
            </Button>
        </Paper>
    )
}
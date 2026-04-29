import { useAccount } from "../../lib/hooks/useAccount"
import { useForm } from "react-hook-form";
import { loginSchema, type LoginSchema } from "../../lib/schemas/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod/dist/zod.js";
import { Box, Button, Paper, Typography } from "@mui/material";
import { LockOpen } from "@mui/icons-material";
import TextInput from "../../app/shared/components/TextInput";
import { Link, useLocation, useNavigate } from "react-router";
import { useState } from "react";
import { toast } from "react-toastify";

export default function LoginForm() {
    const [notVerified, setNotVerified] = useState(false);
    const { loginUser, resendEmailConfirmation } = useAccount();
    const navigate = useNavigate();
    const location = useLocation();

    const { control, handleSubmit, watch, formState: { isValid, isSubmitting } } = useForm<LoginSchema>({
        mode: 'onTouched',
        resolver: zodResolver(loginSchema)
    });

    const email = watch('email');

    const handleResendEmail = async () => {
        try {
            await resendEmailConfirmation.mutateAsync({email});
            setNotVerified(false);
        }
        catch (error) {
            console.log(error);
            toast.error('Failed to resend confirmation email - please check email and try again');
        }
    }

    const onSubmit = async (data: LoginSchema) => {
        await loginUser.mutateAsync(data, {
            onSuccess: () => {
                navigate(location.state?.from || '/activities');
            },
            onError: error => {
                if (error.message === 'NotAllowed') {
                    setNotVerified(true);
                }
            }
        });
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
            {notVerified ? (
                <Box display="flex" flexDirection="column" justifyContent="center" gap={2}>
                    <Typography textAlign='center' color="error">Your email has not been verified. Please check your email for the verification link.</Typography>
                    <Button
                        disabled={resendEmailConfirmation.isPending}
                        onClick={handleResendEmail} variant="contained" color="primary" size="large">
                        Resend confirmation email
                    </Button>
                </Box>
            ) : (
                <Typography sx={{ textAlign: 'center' }}>
                    Dont't have an account?
                    <Typography component={Link} to="/register" color="primary" sx={{ ml: 2 }}>
                        Sign up
                    </Typography>
                </Typography>
            )}

        </Paper>
    )
}
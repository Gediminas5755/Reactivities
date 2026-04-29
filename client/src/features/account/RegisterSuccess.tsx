import { Check } from "@mui/icons-material";
import { Button, Paper, Typography } from "@mui/material";
import { useAccount } from "../../lib/hooks/useAccount";

type Props = {
    email?: string;
}

export default function RegisterSuccess({ email }: Props) {
    const { resendEmailConfirmation } = useAccount();

    if (!email) {
        return <div>Invalid email</div>
    }

    return (
        <Paper
            sx={{
                height: 400,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                p: 6
            }}
        >
            <Check sx={{ fontSize: 100}} color="primary" />
            <Typography variant="h3" gutterBottom>
                Registration Successful!
            </Typography>
            <Typography variant="h3" gutterBottom>
                Please check your email ({email}) to confirm your account.
            </Typography>
            <Button fullWidth onClick={() => resendEmailConfirmation.mutateAsync({email})} variant="contained" color="primary" size="large">
                Resend Confirmation Email
            </Button>
        </Paper>
    )
}
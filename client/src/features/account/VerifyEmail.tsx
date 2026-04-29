import { useState, useRef, useEffect } from "react";
import { Link, useSearchParams } from "react-router";
import { useAccount } from "../../lib/hooks/useAccount";
import { Box, Button, Divider, Paper, Typography } from "@mui/material";
import { EmailRounded } from "@mui/icons-material";

export default function VerifyEmail() {
    {
        const { verifyEmail, resendEmailConfirmation } = useAccount();
        const [status, setStatus] = useState('verifying');
        const [searchParams] = useSearchParams();
        const userId = searchParams.get('userId') || '';
        const code = searchParams.get('code') || '';
        const hasRun = useRef(false);

        useEffect(() => {
            if (code && userId && !hasRun.current) {
                hasRun.current = true;
                verifyEmail.mutateAsync({ userId, code })
                    .then(() => { setStatus('verified') })
                    .catch(() => { setStatus('failed') });
            }
        }, [code, userId, verifyEmail]);

        const getBody = () => {
            switch (status) {
                case 'verifying':
                    return <Typography>Verifying...</Typography>
                case 'verified':
                    return (
                        <Box display="flex" flexDirection="column" justifyContent="center" gap={2}>
                            <Typography>Verified</Typography>
                            <Button component={Link} to="/login">
                                login
                            </Button>
                        </Box>
                    )
                case 'failed':
                    return (
                        <Box display="flex" flexDirection="column" justifyContent="center" gap={2}>
                            <Typography>Verification failed. Please try again.</Typography>
                            <Button onClick={() => resendEmailConfirmation.mutate({ userId })}
                                disabled={resendEmailConfirmation.isPending}
                                variant="contained" color="primary" size="large">
                                Resend verification email
                            </Button>
                        </Box>
                    )
            }
        }

        return (
            <Paper sx={{
                height: 400,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                p: 6
            }}>
                <EmailRounded sx={{ fontSize: 100 }} color='primary' />
                <Typography variant="h3" gutterBottom>
                    Email verification
                </Typography>
                <Divider />
                {getBody()}
            </Paper>
        )
    }
}
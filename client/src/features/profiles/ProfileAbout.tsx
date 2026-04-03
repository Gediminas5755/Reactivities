import { Box, Button, Divider, Typography } from "@mui/material";
import { useParams } from "react-router";
import { useProfile } from "../../lib/hooks/useProfile";

export default function ProfileAbout() {
    const { id } = useParams();
    const { profile, loadingProfile } = useProfile(id);

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h5" gutterBottom>About {profile?.displayName}</Typography>
                <Button variant="outlined" size="small">Edit Profile</Button>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ my: 2 }}>
                <Typography variant="body1" sx={{whiteSpace: 'pre-wrap'}}>
                    {profile?.bio || 'No bio available.'}
                </Typography>
            </Box>
        </Box>
    )
}
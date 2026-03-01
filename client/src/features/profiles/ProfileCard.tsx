import { Person } from "@mui/icons-material";
import { Box, Card, CardContent, CardMedia, Chip, Divider, Typography } from "@mui/material";
import { Link } from "react-router";

type Props = {
    profile: Profile
}

export default function ProfileCard({ profile }: Props) {
    const following = false;

    return (
        <Link to={`/profiles/${profile.id}`} style={{ textDecoration: 'none' }}>
            <Card sx={{ borderRadius: 3, p: 3, maxWidth: 300, textdecoration: 'none' }} elevation={4}>
                <CardMedia component="img"
                    src={profile?.imageUrl || '/assets/user.png'}
                    alt={profile.displayName + ' image'}
                    sx={{ width: 200, zIndex: 50 }} />
                <CardContent sx={{ textAlign: 'center', mt: -5, zIndex: 0 }}>
                    <Box display='flex' alignItems='center' gap={1}>
                        <Typography variant="h5" >{profile.displayName}</Typography>
                        {following && <Chip size="small" variant="outlined" color="secondary" label="Following" />}
                    </Box>
                    <Divider sx={{ mb: 2 }} />
                    <Box sx={{display:'flex', alignItems:'center', justifyContent:'center'}}>
                        <Person/>
                        <Typography sx={{ml:1}}>20 followers</Typography>
                    </Box>

                </CardContent>
            </Card>
        </Link >
    )
}
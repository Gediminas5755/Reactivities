import { Avatar, Box, Button, Chip, Divider, Grid2, Paper, Stack, Typography } from "@mui/material";

export default function ProfileHeader() {
    const isFollowing = true;
    return (
        <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
            <Grid2 container spacing={2}>
                <Grid2 size={8}>
                    <Stack direction="row" alignItems="center" spacing={3}>
                        <Avatar alt="profile image" src='' sx={{ width: 150, height: 150 }} />
                        <Box display="flex" flexDirection="column" gap={2}>
                            <Typography variant="h4">Display Name</Typography>
                            {isFollowing && <Chip label="Following" color="secondary" variant="outlined" sx={{borderRadius : 1}} />}
                        </Box>
                    </Stack>
                </Grid2>
                <Grid2 size={4}>
                    <Stack alignItems="center" spacing={2}>
                    <Box display="flex" justifyContent='space-around' width='100%'>
                        <Box textAlign="center">
                            <Typography variant="h6">Followers</Typography>
                            <Typography variant="h5">100</Typography>
                        </Box>
                         <Box textAlign="center">
                            <Typography variant="h6">Following</Typography>
                            <Typography variant="h5">150</Typography>
                        </Box>
                    </Box>
                    <Divider sx={{ width: '100%' }} />
                    <Button variant="outlined" color={isFollowing ? 'error' : 'success'} fullWidth>
                        {isFollowing ? 'Unfollow' : 'Follow'}
                    </Button>
                    {/* <Chip label='This is you' color='primary' variant='outlined' /> */}
                    </Stack>
                </Grid2>
            </Grid2>
        </Paper>
    )
}
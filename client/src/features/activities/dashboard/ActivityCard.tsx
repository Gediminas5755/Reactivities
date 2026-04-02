import { AccessTime, Place } from "@mui/icons-material";
import { Avatar, Box, Button, Card, CardContent, CardHeader, Chip, Divider, Typography } from "@mui/material"
import { Link } from "react-router";
import { formatDate } from "../../../lib/util/util";
import AvatarPopover from "../../../app/shared/components/AvatarPopover";

type Props = {
    activity: Activity
}

export default function ActivityCard({ activity }: Props) {

    const label = activity.isHost ? 'You are hosting this activity' : activity.isGoing ? 'You are going to this activity' : '';
    const color = activity.isHost ? 'secondary' : activity.isGoing ? 'warning' : 'default';

    return (
        <Card elevation={3} sx={{ borderRadius: 3 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <CardHeader
                    avatar={
                        <Avatar alt="image of host" src={activity.hostImageUrl} sx={{ height: 80, width: 80 }} />
                    }
                    title={activity.title}
                    titleTypographyProps={{
                        fontWeight: "bold",
                        fontSize: "20"
                    }}
                    subheader={
                        <>
                            Hosted by{' '} <Link to={`/profiles/${activity.hostId}`} >{activity.hostDisplayName}</Link>
                        </>
                    } />
                <Box display='flex' flexDirection='column' gap={2} mr={2} >
                    {(activity.isHost || activity.isGoing) && <Chip label={label} variant="outlined"  color={color} sx={{ borderRadius: 2 }} />}
                    {activity.isCancelled && <Chip label='Cancelled' color='error' sx={{ borderRadius: 2 }} />}
                </Box>
            </Box>

            <Divider sx={{ mb: 3 }} />

            <CardContent sx={{ p: 0 }}>
                <Box display="flex" alignItems="center" px={2} mb={2}>
                  <Box display="flex" alignItems="center" flexGrow={0}>
                    <AccessTime sx={{ mr: 1 }} />
                    <Typography noWrap variant="body2">{formatDate(activity.date)}</Typography>
                  </Box>
            
                    <Place sx={{ ml: 3, mr: 1 }}/>
                    <Typography variant="body2">{activity.venue}, {activity.city}</Typography>
                </Box>
                <Divider />
                <Box display="flex" gap={2} sx={{ backgroundColor: "grey.200", py: 3, pl: 3 }}>
                    {activity.attendees.map(attendee => (
                        <AvatarPopover key={attendee.id} profile={attendee} />
                    ))}
                </Box>
            </CardContent>
            <CardContent sx={{ pb: 2 }}>
                <Typography variant="body2">{activity.description}</Typography>
                <Button
                    component={Link}
                    to={`/activities/${activity.id}`}
                    size="medium"
                    variant="contained"
                    sx={{ display: 'flex', justifySelf: 'self-end', borderRadius: 3 }}>
                    View</Button>
            </CardContent>
        </Card>
    )
}
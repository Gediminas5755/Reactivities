import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material"
import { Link, useNavigate } from "react-router";

export default function ActivityDetail() {
    const navigate = useNavigate();
    const activity = {} as Activity; // Replace with actual selected activity logic
    if (!activity) return <Typography>Activity not found</Typography>;

    return (
        <Card sx={{ borderRadius: 3 }}>
            <CardMedia
                component='img'
                src={`/images/categoryImages/${activity.category}.jpg`} />
            <CardContent>
                <Typography variant='h5'>{activity.title}</Typography>
                <Typography variant='subtitle1' fontWeight='light'>{activity.date}</Typography>
                <Typography variant='body1'>{activity.description}</Typography>
            </CardContent>
            <CardActions>
                <Button color="primary" component={Link} to={`/activities/${activity.id}`}>Edit</Button>
                <Button color="inherit" onClick={() => navigate('/activities')}>Cancel</Button>
            </CardActions>
        </Card>
    )
}
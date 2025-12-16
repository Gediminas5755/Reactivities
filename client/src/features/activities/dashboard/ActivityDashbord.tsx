import { Grid2 } from "@mui/material";
import ActivityList from "./ActivityList";
import ActivityDetail from "../details/ActivityDetail";

type Props = {
    activities: Activity[]
}

export default function ActivityDashbord({ activities }: Props) {
    return (
        <Grid2 container spacing={3}>
            <Grid2 size={7}>
                <ActivityList activities={activities} />
                {/* <List>
                    {activities.map((activity) => (
                        <ListItem key={activity.id}>
                            <ListItemText>{activity.title}</ListItemText>
                        </ListItem>
                    ))}
                </List> */}
            </Grid2>
             <Grid2 size={5}>
                {activities[0] &&  <ActivityDetail activity={activities[0]} />} 
            </Grid2>
        </Grid2>
    )
}
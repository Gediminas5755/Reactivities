import { Grid2 } from "@mui/material";
import ActivityList from "./ActivityList";
import ActivityDetail from "../details/ActivityDetail";

type Props = {
    activities: Activity[]
    selectActivity: (id: string) => void
    cancelSelectActivity: () => void    
    selectedActivity?: Activity
}

export default function ActivityDashbord({ activities, selectActivity, cancelSelectActivity, selectedActivity }: Props) {
    return (
        <Grid2 container spacing={3}>
            <Grid2 size={7}>
                <ActivityList activities={activities} selectActivity={selectActivity} />
                {/* <List>
                    {activities.map((activity) => (
                        <ListItem key={activity.id}>
                            <ListItemText>{activity.title}</ListItemText>
                        </ListItem>
                    ))}
                </List> */}
            </Grid2>
             <Grid2 size={5}>
                {selectedActivity &&  
                <ActivityDetail activity={selectedActivity} cancelSelectActivity={cancelSelectActivity} />} 
            </Grid2>
        </Grid2>
    )
}
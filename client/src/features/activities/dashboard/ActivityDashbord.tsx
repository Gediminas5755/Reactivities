import { Grid2 } from "@mui/material";
import ActivityList from "./ActivityList";
import ActivityDetail from "../details/ActivityDetail";
import ActivityForm from "../form/ActivityForm";

type Props = {
    activities: Activity[]
    selectActivity: (id: string) => void
    cancelSelectActivity: () => void
    selectedActivity?: Activity
    editMode: boolean
    openForm: (id: string) => void
    closeForm: () => void
    deleteActivity: (id: string) => void
}

export default function ActivityDashbord({
    activities, selectActivity, cancelSelectActivity, 
    selectedActivity, editMode, openForm, closeForm, deleteActivity }: Props) {
    return (
        <Grid2 container spacing={3}>
            <Grid2 size={7}>
                <ActivityList activities={activities} deleteActivity={deleteActivity} selectActivity={selectActivity} />
                {/* <List>
                    {activities.map((activity) => (
                        <ListItem key={activity.id}>
                            <ListItemText>{activity.title}</ListItemText>
                        </ListItem>
                    ))}
                </List> */}
            </Grid2>
            <Grid2 size={5}>
                {selectedActivity && !editMode &&
                    <ActivityDetail selectedActivity={selectedActivity} cancelSelectActivity={cancelSelectActivity} 
                    openForm={openForm} />}
                
                {editMode &&
                <ActivityForm closeForm={closeForm} activity={selectedActivity} />}
            </Grid2>
        </Grid2>
    )
}
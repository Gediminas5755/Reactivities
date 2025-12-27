import { Grid2 } from "@mui/material";
import ActivityList from "./ActivityList";
import ActivityFilters from "./ActivityFilters";

export default function ActivityDashbord() {
    return (
        <Grid2 container spacing={3}>
            <Grid2 size={7}>
                <ActivityList />
            </Grid2>
            <Grid2 size={5}>
                <ActivityFilters />
            </Grid2>
        </Grid2>
    )
}
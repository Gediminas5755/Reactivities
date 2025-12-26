import { Box, Container, CssBaseline, Typography } from "@mui/material";
import {useState } from "react"
import NavBar from "./NavBar";
import ActivityDashbord from "../../features/activities/dashboard/ActivityDashbord";
import { useActivities } from "../../lib/hooks/useActivities";

function App() {
  // const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const {activities, isPending} = useActivities();

  // useEffect(() => {
  //   axios.get<Activity[]>("http://localhost:5001/api/activities")
  //     .then((response) => setActivities(response.data))

  //   return () => { };
  // }, [])



  // const [activities, setActivities] = useState<Activity[]>([]);

  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities!.find(a => a.id === id));
  }

  const handleCancelSelectActivity = () => {
    setSelectedActivity(undefined);
  }

  const handleOpenForm = (id?: string) => {
    if(id) handleSelectActivity(id)
    else handleCancelSelectActivity();
    setEditMode(true);
  }

  const handleCloseForm = () => {
    setEditMode(false);
  }

  const handleDeleteActivity = (id: string) => {
    // setActivities(activities.filter(a => a.id !== id));
    console.log(id);
  }

  return (
    <Box sx={{ bgcolor: "#eeeeee" }} minHeight={"100vh"}>
      {/* view height */}
      <CssBaseline />
      <NavBar openForm={handleOpenForm} />
      <Container maxWidth="xl" sx={{ mt: 3 }}>
        {!activities || isPending ? <Typography>Loading activities...</Typography>:(

          <ActivityDashbord activities={activities}
          selectActivity={handleSelectActivity}
          cancelSelectActivity={handleCancelSelectActivity}
          selectedActivity={selectedActivity}
          editMode={editMode}
          closeForm={handleCloseForm}
          openForm={handleOpenForm}
          deleteActivity={handleDeleteActivity}
          />
        )}
      </Container>
    </Box>

  )
}

export default App
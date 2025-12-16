import { Box, Container, CssBaseline } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react"
import NavBar from "./NavBar";
import ActivityDashbord from "../../features/activities/dashboard/ActivityDashbord";

function App() {
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  
  const [activities, setActivities1] = useState<Activity[]>([]);
  
  useEffect(() => {
    axios.get<Activity[]>("https://localhost:5001/api/activities")
      .then((response) => setActivities1(response.data))

    return () => { };
  }, [])

const handleSelectActivity = (id: string) => {
  setSelectedActivity(activities.find(a => a.id === id));
}

const handleCancelSelectActivity = () => {
  setSelectedActivity(undefined);
}

  return (
    <Box sx={{bgcolor:"#eeeeee"}}>
      <CssBaseline />
      <NavBar />
      <Container maxWidth="xl" sx={{ mt: 3 }}>
        <ActivityDashbord activities={activities} 
        selectActivity={handleSelectActivity} 
        cancelSelectActivity={handleCancelSelectActivity}
        selectedActivity={selectedActivity}/>
      </Container>
    </Box>

  )
}

export default App

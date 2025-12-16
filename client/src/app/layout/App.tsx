import { Box, Container, CssBaseline } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react"
import NavBar from "./NavBar";
import ActivityDashbord from "../../features/activities/dashboard/ActivityDashbord";

function App() {
  const [activities, setActivities] = useState<Activity[]>([])

  useEffect(() => {
    axios.get<Activity[]>("https://localhost:5001/api/activities")
      .then((response) => setActivities(response.data))

    return () => { };
  }, []);

  return (
    <Box sx={{bgcolor:"#eeeeee"}}>
      <CssBaseline />
      <NavBar />
      <Container maxWidth="xl" sx={{ mt: 3 }}>
        <ActivityDashbord activities={activities} />
      </Container>
    </Box>

  )
}

export default App

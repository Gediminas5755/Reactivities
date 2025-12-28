import { Box, Container, CssBaseline } from "@mui/material";
import NavBar from "./NavBar";
import { Outlet, useLocation } from "react-router";
import HomePage from "../../features/home/HomePage";

function App() {
  // const [activities, setActivities] = useState<Activity[]>([]);
  // const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  // const [editMode, setEditMode] = useState(false);
  // const {activities, isPending} = useActivities();

  // useEffect(() => {
  //   axios.get<Activity[]>("http://localhost:5001/api/activities")
  //     .then((response) => setActivities(response.data))

  //   return () => { };
  // }, [])



  // const [activities, setActivities] = useState<Activity[]>([]);

  // const handleSelectActivity = (id: string) => {
  //   setSelectedActivity(activities!.find(a => a.id === id));
  // }

  // const handleCancelSelectActivity = () => {
  //   setSelectedActivity(undefined);
  // }

  // const handleOpenForm = (id?: string) => {
  //   if(id) handleSelectActivity(id)
  //   else handleCancelSelectActivity();
  //   setEditMode(true);
  // }

  // const handleCloseForm = () => {
  //   setEditMode(false);
  // }

  const location = useLocation();

  return (
    <Box sx={{ bgcolor: "#eeeeee" }} minHeight={"100vh"}>
      {/* view height */}
      <CssBaseline />

      {location.pathname === '/' ? <HomePage /> : (
        <>
          <NavBar />
          <Container maxWidth="xl" sx={{ mt: 3 }}>
            <Outlet />
          </Container>
        </>
      )
      }
    </Box >

  )
}

export default App
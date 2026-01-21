import { SearchOff } from "@mui/icons-material";
import { Button, Paper, Typography } from "@mui/material";
import { Link } from "react-router";

export default function NotFound() {
    return (
        <Paper sx={{ height: 450, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', p: 6 }}>
            <SearchOff sx={{ fontSize: 100, mr: 2 }} color="primary" />
            <Typography variant="h3" gutterBottom>
                Oops - we've looked everywhere but we couldn't find what you were looking for.
            </Typography>
            <Button
                component={Link}
                to="/activities"
                variant="outlined"
            >
                Return to activities page
            </Button>
        </Paper>
    )
}
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
type Props = {
    closeForm: () => void
    activity?: Activity
}
export default function ActivityForm({ closeForm, activity }: Props) {
    return (
        <Paper sx={{borderRadius: 3, p:3}}>
            <Typography variant="h5" gutterBottom color="primary">Create Activity</Typography>
            <Box display="flex" component="form" flexDirection="column" gap={3}>
                <TextField label="Title" value={activity?.title} />
                <TextField label="Description" multiline rows={3} />
                <TextField label="Category" />
                <TextField label="Date" type="date" />
                <TextField label="City" />
                <TextField label="Venue" />
                <Box display="flex" justifyContent="end"  gap={3} >
                    <Button color='inherit' onClick={closeForm}>Cancel</Button>
                    <Button color='success' variant="contained">Submit</Button>
                </Box>
            </Box>
        </Paper>
    )
}
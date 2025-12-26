import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { useActivities } from "../../../lib/hooks/useActivities";

export default function ActivityForm() {
    const { updateActivity } = useActivities();
    const { createActivity } = useActivities();
    const activity = {} as Activity; // Replace with actual activity when editing

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();// prevent page reload and loose of state

        const formData = new FormData(event.currentTarget);
        // const data = {
        //     title: formData.get('Title') as string,
        //     description: formData.get('Description') as string,
        //     category: formData.get('Category') as string,
        //     date: formData.get('Date') as string,
        //     city: formData.get('City') as string,
        //     venue: formData.get('Venue') as string,
        // };

        const data: { [key: string]: FormDataEntryValue } = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        if (activity) {
            data.id = activity.id;
            await updateActivity.mutateAsync(data as unknown as Activity);
        }
        else {
            await createActivity.mutateAsync(data as unknown as Activity);
        }
        //submitForm(data as unknown as Activity);
        // console.log(data);
    }

    return (
        <Paper sx={{ borderRadius: 3, p: 3 }}>
            <Typography variant="h5" gutterBottom color="primary">Create Activity</Typography>
            <Box display="flex" onSubmit={handleSubmit} component="form" flexDirection="column" gap={3}>
                {/* uncontrolled/controlled input */}
                <TextField name="title" label="Title" defaultValue={activity?.title} />
                <TextField name="description" label="Description" defaultValue={activity?.description} multiline rows={3} />
                <TextField name="category" label="Category" defaultValue={activity?.category} />
                <TextField name="date" label="Date" type="date" defaultValue={activity?.date ?
                    new Date(activity?.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]} />
                <TextField name="city" label="City" defaultValue={activity?.city} />
                <TextField name="venue" label="Venue" defaultValue={activity?.venue} />
                <Box display="flex" justifyContent="end" gap={3} >
                    <Button color='inherit' >Cancel</Button>
                    <Button type="submit" color='success' variant="contained"
                        disabled={updateActivity?.isPending || createActivity?.isPending}>Submit</Button>
                </Box>
            </Box>
        </Paper>
    )
}
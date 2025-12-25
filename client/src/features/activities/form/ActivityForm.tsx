import { Box, Button, Paper, TextField, Typography } from "@mui/material";
type Props = {
    closeForm: () => void
    activity?: Activity
    submitForm: (activity: Activity) => void
}
export default function ActivityForm({ closeForm, activity, submitForm }: Props) {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
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

        const data : {[key: string] : FormDataEntryValue} = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        if (activity) {
            data.id = activity.id;
        }

        submitForm(data as unknown as Activity);
        // console.log(data);
    }

    return (
        <Paper sx={{borderRadius: 3, p:3}}>
            <Typography variant="h5" gutterBottom color="primary">Create Activity</Typography>
            <Box display="flex" onSubmit={handleSubmit} component="form" flexDirection="column" gap={3}>
                {/* uncontrolled/controlled input */}
                <TextField name="title" label="Title" defaultValue={activity?.title} /> 
                <TextField name="description" label="Description" defaultValue={activity?.description} multiline rows={3} />
                <TextField name="category" label="Category" defaultValue={activity?.category} />
                <TextField name="date" label="Date" type="date" defaultValue={activity?.date} />
                <TextField name="city" label="City" defaultValue={activity?.city} />
                <TextField name="venue" label="Venue" defaultValue={activity?.venue} />
                <Box display="flex" justifyContent="end"  gap={3} >
                    <Button color='inherit' onClick={closeForm}>Cancel</Button>
                    <Button type="submit" color='success' variant="contained">Submit</Button>
                </Box>
            </Box>
        </Paper>
    )
}
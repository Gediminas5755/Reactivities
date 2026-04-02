import { Grid2, Typography } from "@mui/material";

export default function PhotoUploadWidget() {
    return (
        <Grid2 container spacing={3}>
            <Grid2 size={4}>
                <Typography variant="overline" color="secondary">step 1: add Photo</Typography>
            </Grid2>
            <Grid2 size={4}>
                <Typography variant="overline" color="secondary">step 2: resize Photo</Typography>
            </Grid2>
            <Grid2 size={4}>
                <Typography variant="overline" color="secondary">step 3: preview upload Photo</Typography>
            </Grid2>
        </Grid2>
    )
}
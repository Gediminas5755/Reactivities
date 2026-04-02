import { CloudUpload } from "@mui/icons-material";
import { Box, Grid2, Typography } from "@mui/material";
import { useCallback } from "react";
import { useDropzone } from 'react-dropzone'

export default function PhotoUploadWidget() {
    const onDrop = useCallback((acceptedFiles: File[]) => {
        console.log(acceptedFiles);
        // Do something with the files
    }, [])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    return (
        <Grid2 container spacing={3}>
            <Grid2 size={4}>
                <Typography variant="overline" color="secondary">step 1: add Photo</Typography>
                <Box {...getRootProps()}
                    sx={{
                        border: 'dashed 3px #eee',
                        borderColor: isDragActive ? 'green' : '#eee',
                        borderRadius: '5px',
                        pt: '30px',
                        textAlign: 'center',
                        height: '280px'
                    }}>
                    <input {...getInputProps()} />
                    <CloudUpload sx={{ fontSize: 80 }} />
                    <Typography variant="h5" >Drag and drop image here, or click to select image</Typography>
                </Box>
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
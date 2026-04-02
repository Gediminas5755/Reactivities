import { CloudUpload } from "@mui/icons-material";
import { Box, Button, Grid2, Typography } from "@mui/material";
import { useCallback, useRef, useState } from "react";
import { useDropzone } from 'react-dropzone'
import Cropper, { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";

type Props = {
    uploadPhoto: (file: Blob) => void
    loading: boolean
}

export default function PhotoUploadWidget({ uploadPhoto, loading }: Props) {
    const [files, setFiles] = useState<object & { preview: string }[]>([]);
    const cropperRef = useRef<ReactCropperElement>(null);
    // const onCrop = () => {
    //     const cropper = cropperRef.current?.cropper;
    //     //console.log(cropper.getCroppedCanvas().toDataURL());
    // };


    const onDrop = useCallback((acceptedFiles: File[]) => {
        setFiles(acceptedFiles.map(file => Object.assign(file, {
            preview: URL.createObjectURL(file as Blob)
        })));
        //console.log(acceptedFiles);
        // Do something with the files
    }, [])

    const onCrop = useCallback(() => {
        const cropper = cropperRef.current?.cropper;
        cropper?.getCroppedCanvas().toBlob(blob => uploadPhoto(blob as Blob));
    }, [uploadPhoto])

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
                {files[0]?.preview && (
                    <Cropper
                        ref={cropperRef}
                        src={files[0]?.preview}
                        style={{ height: 280, width: '100%' }}
                        // Cropper options
                        aspectRatio={1}
                        initialAspectRatio={1}
                        preview='.img-preview'
                        guides={false}
                        viewMode={1}
                        background={false}
                    />
                )}
            </Grid2>
            <Grid2 size={4}>
                {files[0]?.preview && (
                    <>
                        <Typography variant="overline" color="secondary">step 3: preview upload Photo</Typography>
                        <div
                            className="img-preview"
                            style={{ width: 300, height: 300, overflow: 'hidden' }} />
                        <Button
                            sx={{ mt: 2 }}
                            onClick={onCrop}
                            variant='contained'
                            color="secondary"
                            disabled={loading}
                        >
                            Upload
                            { /* {loading ? 'Uploading...' : 'Upload Photo'} */}
                        </Button>
                    </>
                )}
            </Grid2>
        </Grid2>
    )
}
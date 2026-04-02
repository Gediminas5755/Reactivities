import { useParams } from "react-router";
import { useProfile } from "../../lib/hooks/useProfile";
import Typography from "@mui/material/Typography/Typography";
import ImageList from "@mui/material/ImageList/ImageList";
import ImageListItem from "@mui/material/ImageListItem/ImageListItem";
import React from "react";
import Box from "@mui/material/Box/Box";
import Button from "@mui/material/Button/Button";

export default function ProfilePhotos() {
    const { id } = useParams();
    const { photos, loadingPhotos, isCurrentUser } = useProfile(id);
    const [editMode, setEditMode] = React.useState(false);

    if (loadingPhotos) return <Typography>Loading photos...</Typography>
    if (!photos || photos.length === 0) return <Typography>No photos found</Typography>;

    return (
        <Box>
            {isCurrentUser && (
                <Box>
                    <Button onClick={() => setEditMode(!editMode)}>
                        {editMode ? 'Cancel' : 'Manage Photos'}
                    </Button>
                </Box>
            )}
            {editMode ? (
                <div>photo widget</div>
            ) : (
                <ImageList sx={{ height: 450 }} cols={6} rowHeight={164}>
                    {photos.map((item) => (
                        <ImageListItem key={item.id}>
                            <img
                                srcSet={`${item.url.replace('/upload', '/upload/w_164,h_164,c_fill,dpr_2,f_auto')}`}
                                src={`${item.url.replace('/upload', '/upload/w_164,h_164,c_fill,dpr_2,f_auto')}`}
                                alt={'Photo profile img'}
                                loading="lazy"
                            />
                        </ImageListItem>
                    ))}
                </ImageList>
            )}
        </Box>


    )
}
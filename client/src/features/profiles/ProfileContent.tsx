import { Box, Paper, Tab, Tabs } from "@mui/material";
import React from "react";
import ProfilePhotos from "./ProfilePhotos";

export default function ProfileContent() {
    const [value, setValue] = React.useState(0);

    const handleChange = (_: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    }

    const tabContent = [
        { label: 'About', content: <div>About</div> },
        { label: 'Photos', content: <ProfilePhotos /> },
        { label: 'Events', content: <div>Events</div> },
        { label: 'Followers', content: <div>Followers</div> },
        { label: 'Following', content: <div>Following</div> },
    ];

    return (
        <Box
            component={Paper}
            mt={2}
            elevation={3}
            height={500}
            sx={{ display: 'flex', alignItems: 'flex-start', borderRadius: 3 }}
        >
            <Tabs
                orientation="vertical"
                value={value}
                onChange={handleChange}
                sx={{ borderRight: 1, height: 450, minWidth: 150 }}>
                {tabContent.map((tab, index) => (
                    <Tab key={index} label={tab.label} sx={{ mr: 3 }} />
                ))}
            </Tabs>
            <Box  p={3} flexGrow={1}>
                {tabContent[value].content}
            </Box>
        </Box>
    )
}
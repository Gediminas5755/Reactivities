import { Box, Paper, Tab, Tabs } from "@mui/material";
import React from "react";
import ProfilePhotos from "./ProfilePhotos";
import ProfileAbout from "./ProfileAbout";
import ProfileFollowings from "./ProfileFollowings";

export default function ProfileContent() {
    const [value, setValue] = React.useState(0);

    const handleChange = (_: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    }

    const tabContent = [
        { label: 'About', content: <ProfileAbout /> },
        { label: 'Photos', content: <ProfilePhotos /> },
        { label: 'Events', content: <div>Events</div> },
        { label: 'Followers', content: <ProfileFollowings activeTab={value} /> },
        { label: 'Following', content: <ProfileFollowings activeTab={value} /> },
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
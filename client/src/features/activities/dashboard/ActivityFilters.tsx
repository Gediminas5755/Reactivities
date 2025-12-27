import { Event, FilterList } from "@mui/icons-material";
import { Box, ListItemText, MenuItem, MenuList, Paper, Typography } from "@mui/material";
import 'react-calendar/dist/Calendar.css';
import { Calendar } from "react-calendar";

export default function ActivityFilters() {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, borderRadius: 3 }}>
            <Paper sx={{ borderRadius: 3, p: 3 }}>
                <Box sx={{width:'100%'}}>
                    <Typography variant="h6" sx={{display:'flex', color:'primary.main', alignItems:'center', gap:1, mb:1}}>
                        <FilterList sx={{mr:1}}/> 
                        Filters
                    </Typography>
                    <MenuList>
                        <MenuItem><ListItemText primary="All events" /></MenuItem>
                        <MenuItem><ListItemText primary="I'm going" /></MenuItem>
                        <MenuItem><ListItemText primary="I'm hosting" /></MenuItem>
                    </MenuList>
                </Box>
            </Paper>
            <Box component={Paper} sx={{ width: '100%', p: 3, borderRadius: 3 }}> 
                <Typography variant="h6" sx={{ display:'flex', color:'primary.main', alignItems:"center", mb:1}}>
                    <Event sx={{mr:1}} />

                    Select date
                </Typography>
                <Calendar />
            </Box>
        </Box>

    )
}
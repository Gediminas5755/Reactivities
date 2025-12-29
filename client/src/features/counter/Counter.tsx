import { Box, Button, ButtonGroup, List, ListItemText, Paper, Typography } from "@mui/material";
import { useStore } from "../../lib/hooks/useStore";
import { observer } from "mobx-react-lite";

// export default function Counter() {
const Counter = observer(function Counter() {
    const { counterStore } = useStore();

    return (
        <Box display="flex" justifyContent='space-between'>
            <Box sx={{ width: '60%' }}>

                {/* <Observer>
                {() => (
                    <>
                        <Typography variant="h3">{counterStore.title}</Typography>
                        <Typography variant="h4">Count: {counterStore.count}</Typography>
                    </>
                )}
            </Observer> */}

                <Typography variant="h3">{counterStore.title}</Typography>
                <Typography variant="h4">Count: {counterStore.count}</Typography>
                <ButtonGroup variant="contained" aria-label="outlined primary button group">
                    <Button onClick={() => counterStore.increment()}>Increment</Button>
                    <Button onClick={() => counterStore.decrement()}>Decrement</Button>
                    <Button onClick={() => counterStore.increment(5)}>Increment by 5</Button>
                </ButtonGroup>
            </Box>
            <Paper sx={{ width: '40%', p: 4 }}>
                <Typography variant="h5">Counter events {counterStore.eventCount}</Typography>
                <List>
                    {counterStore.events.map((event, index) => (
                        <ListItemText key={index}>{event}</ListItemText>
                    ))}
                </List>
            </Paper>
        </Box>
    )
});

export default Counter;
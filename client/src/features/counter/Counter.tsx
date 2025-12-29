import { Button, ButtonGroup, Typography } from "@mui/material";
import { useStore } from "../../lib/hooks/useStore";
import { Observer } from "mobx-react-lite";

export default function Counter() {
    const { counterStore } = useStore();

    return (
        <>

            <Observer>
                {() => (
                    <>
                        <Typography variant="h3">{counterStore.title}</Typography>
                        <Typography variant="h4">Count: {counterStore.count}</Typography>
                    </>
                )}
            </Observer>
                <ButtonGroup variant="contained" aria-label="outlined primary button group">
                    <Button onClick={() => counterStore.increment()}>Increment</Button>
                    <Button onClick={() => counterStore.decrement()}>Decrement</Button>
                    <Button onClick={() => counterStore.increment(5)}>Increment by 5</Button>
                </ButtonGroup>
        </>
    )
}
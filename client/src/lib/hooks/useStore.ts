import React from "react";
import { StoreContext } from "../stores/store";

export function useStore() {
    return React.useContext(StoreContext);
}
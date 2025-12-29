import { createContext } from "react";
import CounterStore from "./counterStore";

interface IStore {
    counterStore: CounterStore;
}

export const store : IStore = 
{
    counterStore: new CounterStore()
}

export const StoreContext = createContext(store);
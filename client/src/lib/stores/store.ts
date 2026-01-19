import { createContext } from "react";
import CounterStore from "./counterStore";
import { UIStore } from "./uiStore";

interface IStore {
    counterStore: CounterStore;
    uiStore: UIStore;
}

export const store : IStore = 
{
    counterStore: new CounterStore(),
    uiStore: new UIStore()
}

export const StoreContext = createContext(store);
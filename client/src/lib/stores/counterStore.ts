import { makeAutoObservable } from "mobx";

export default class CounterStore {
    title = "Counter Store";
    count = 42;
    events: string[] = [
        `Initialized store with count ${this.count}`
    ];

    constructor() {
        makeAutoObservable(this);
        // makeObservable(this,
        //     {
        //         title: observable,
        //         count: observable,
        //         increment: action.bound,//jei daroma tokia tiesiogine fja
        //         decrement: action
        //     }
        // );
    }

    increment(amount = 1) {
        this.count += amount;
        this.events.push(`Incremented by ${amount} to ${this.count}`);
    }

    decrement = (amount = 1) => {
        this.count -= amount;
        this.events.push(`Decremented by ${amount} to ${this.count}`);
    }

    get eventCount() {
        return this.events.length;
    }
}
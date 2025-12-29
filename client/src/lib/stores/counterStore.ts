import { action, makeObservable, observable } from "mobx";

export default class CounterStore {
    title = "Counter Store";
    count = 42;
    // increment() {
    //     this.count++;
    // }

    increment (amount = 1) {
        this.count += amount;
    }

    decrement = (amount = 1) => {
        this.count -= amount;
    }

    constructor() {
        makeObservable(this,
            {
                title: observable,
                count: observable,
                increment: action.bound,//jei daroma tokia tiesiogine fja
                decrement: action
            }
        );
    }
}
import { Action } from "redux"

export type Pizza = {
    name: string;
    price: number;
    _id: string;
}

export type BasketItem = Pizza & { count: number;};
export type Basket = {
    items: BasketItem[];
    totalPrice: number;
}

export type State = {
    pizza: Pizza[];
    basket: Basket;
}

export interface AppAction<A extends string, P = any> extends Action<A> {
    payload: P;
}
import { AppAction, Basket, Pizza } from './../../types';

enum BasketAction {
    PizzaAddedIntoBasket = 'PIZZA_ADDED_INTO_BASKET',
    PizzaRemovedFromBasket = 'PIZZA_REMOVED_FROM_BASKET'
}

export type PizzaAddedIntoBasketAction = AppAction<BasketAction.PizzaAddedIntoBasket, Pizza>;
export type PizzaRemovedFromBasketAction = AppAction<BasketAction.PizzaRemovedFromBasket, Pizza>;

export const addPizzaToBasketAction = (pizza: Pizza): PizzaAddedIntoBasketAction => ({
    type: BasketAction.PizzaAddedIntoBasket,
    payload: pizza
});

export const removePizzaFromBasketAction = (pizza: Pizza): PizzaRemovedFromBasketAction => ({
    type: BasketAction.PizzaRemovedFromBasket,
    payload: pizza
});

type BasketActions = PizzaAddedIntoBasketAction
    | PizzaRemovedFromBasketAction;

const INIT_STATE: Basket = {
    items: [],
    totalPrice: 0
}

export function basket(state: Basket = INIT_STATE, action: BasketActions): Basket {
    switch (action.type) {
        case BasketAction.PizzaAddedIntoBasket: {
            const { items, totalPrice} = state;
            const { _id, price} = action.payload;
            const updatedItems = [...items];
            const pizzaIndex = items.findIndex(basketItem => basketItem._id === _id);
            if (pizzaIndex < 0) {
                updatedItems.push({
                    ...action.payload,
                    count: 1
                });
            } else {
                const pizzaPack = items[pizzaIndex];
                updatedItems[pizzaIndex] = {
                    ...pizzaPack,
                    count: pizzaPack.count + 1
                };
            }
            return {
                items: updatedItems,
                totalPrice: totalPrice + price
            };
        }
        case BasketAction.PizzaRemovedFromBasket: {
            const { items, totalPrice} = state;
            const { _id, price} = action.payload;
            const deletingPizza = items.find(basketItem => basketItem._id === _id);
            const updatedItems = [...items];
            let updatedTotalPrice = totalPrice;
            if (!!deletingPizza) {
                const updatedPizzaPack = {
                    ...deletingPizza,
                    count: deletingPizza.count - 1
                };
                const packIndex = updatedItems.indexOf(deletingPizza);
                updatedPizzaPack.count > 0 
                    ? updatedItems.splice(packIndex, 1, updatedPizzaPack)
                    : updatedItems.splice(packIndex, 1);
                updatedTotalPrice -= price;
            }
            return {
                items: updatedItems,
                totalPrice: updatedTotalPrice
            }; 
        }
        default: return state;
    }
}
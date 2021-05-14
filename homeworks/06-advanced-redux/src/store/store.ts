import { applyMiddleware, combineReducers, createStore, Middleware } from "redux";
import thunk from "redux-thunk";
import { State } from "../types";
import { composeWithDevTools } from 'redux-devtools-extension';
import { basket, pizzaList } from "./reducers";

const logger: Middleware<{}, State> = storeAPI => next => action => {
    const {type, payload} = action;
    fetch('http://localhost:3001/log', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            eventName: type,
            pizzaName: payload?.name,
            pizzaPrice: payload?.price
        })
    }).then((json) => {
        console.log(json);
    }).catch((ex) => {
        console.log(ex)
    });
    return next(action);
};
 
const reducers = combineReducers<State>({
    pizza: pizzaList,
    basket: basket
});

const store = createStore(reducers, composeWithDevTools(applyMiddleware(logger, thunk)))

export default store;
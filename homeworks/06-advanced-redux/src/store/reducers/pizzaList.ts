import { ThunkAction } from 'redux-thunk';
import { getPizza } from '../../services/api';
import { Pizza, AppAction } from './../../types';

enum PizzaListAction {
    PizzaShow = 'PIZZA_SHOW',
    PizzaViewed = 'PIZZA_VIEWED'
}

export type PizzaShowAction = AppAction<PizzaListAction.PizzaShow>;
export type PizzaViewedAction = AppAction<PizzaListAction.PizzaViewed, Pizza[]>;

export const pizzaListShowAction = (): ThunkAction<Promise<void>, Pizza[], {}, PizzaViewedAction> => 
    async (dispatch, _) => {
        const response = await getPizza();
        dispatch({type: PizzaListAction.PizzaViewed, payload: response.items});
    };

export const pizzaListViewedAction = (pizza: Pizza[]): PizzaViewedAction => ({
    type: PizzaListAction.PizzaViewed,
    payload: pizza
});

type PizzaListActions = PizzaShowAction 
    | PizzaViewedAction;

export function pizzaList(state: Pizza[] = [], action: PizzaListActions): Pizza[] {
    switch (action.type) {
        case PizzaListAction.PizzaViewed: {
            return action.payload;
        }
        default: return state;
    }
}
import { compose, createStore } from "redux";

declare global {
    interface Window {
      __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

interface Action {
    type: string;
}

enum BalanceAction {
    UPDATE_BALANCE = 'UPDATE_BALANCE',
    CREDIT = 'CREDIT',
    SET_BALANCE_WITH_TAX = 'SET_BALANCE_WITH_TAX',
    DEBIT = 'DEBIT'
}

export class UpdateBalaceAction implements Action {
    readonly type = BalanceAction.UPDATE_BALANCE;
    
    constructor(public payload: number) {
    }
}

export class CreditAction implements Action {
    readonly type = BalanceAction.CREDIT;
    
    constructor(public payload: number) {
    }
}

export class SetBalanceWithTaxAction implements Action {
    readonly type = BalanceAction.SET_BALANCE_WITH_TAX;
    
    constructor(public payload: number) {
    }
}

export class DebitAction implements Action {
    readonly type = BalanceAction.DEBIT;
    
    constructor(public payload: number) {
    }
}

type BalanceActions = UpdateBalaceAction 
    | CreditAction
    | SetBalanceWithTaxAction
    | DebitAction;

function balanceReducer(state: number = 0, action: BalanceActions): number {
    switch(action.type) {
        case BalanceAction.UPDATE_BALANCE: {
            return action.payload;
        }
        case BalanceAction.CREDIT: {
            return state - action.payload;
        }
        case BalanceAction.DEBIT: {
            return state + action.payload;
        }
        case BalanceAction.SET_BALANCE_WITH_TAX: {
            return state * (1 - action.payload / 100);
        }
        default: return state;
    }
}

const store = createStore(balanceReducer, undefined, composeEnhancers());

store.dispatch({type: BalanceAction.UPDATE_BALANCE, payload: 1000});
store.dispatch({type: BalanceAction.CREDIT, payload: 200});
store.dispatch({type: BalanceAction.DEBIT, payload: 50});
store.dispatch({type: BalanceAction.SET_BALANCE_WITH_TAX, payload: 14});
store.dispatch({type: BalanceAction.DEBIT, payload: 250});
store.dispatch({type: BalanceAction.UPDATE_BALANCE, payload: 1000});

export default store;
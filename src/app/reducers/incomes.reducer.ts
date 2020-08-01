import { Action } from '@ngrx/store'
import { IncomesModule } from '../../incomes/incomes.module'
import * as IncomelActions from '../actions/incomes.actions'

// Section 1
const initialState: IncomesModule = {
    id: 0,
    title: "Some Income",
    amount: 11000,
    payDay: 3,
    methodsofPayment: 4
}

// Section 2
export function reducer(state: IncomesModule[] = [initialState], action: IncomelActions.Actions) {

    // Section 3
    switch(action.type) {
        case IncomelActions.ADD_INCOME:
            return [...state, action.payload];
        default:
            return state;
    }
}
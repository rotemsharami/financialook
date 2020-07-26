import { Action, createReducer, on } from '@ngrx/store';
import { Income } from 'src/incomes/income';
import { setIncomes } from "../actions/incomes.actions"
export const incomesFeatureKey = 'incomes';

export interface State {
  incomes:Income[]
}

export const initialState: State = {
  incomes: [{
    id: 0,
    title: "",
    amount: 0,
    payDay: 1,
    methodsofPayment: 1
  }]
};


export const reducer = createReducer(
  initialState,
  on(setIncomes, (state: State, action) => ({ ...state, incomes: action.incomes }))
);

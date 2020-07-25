import { Action, createReducer, on } from '@ngrx/store';
import { setIncomes } from '../../actions/incomes.actions';

export const incomesFeatureKey = 'incomes';

export interface State {
  incomes:any[]
}

export const initialState: State = {
  incomes: []
};


export const reducer = createReducer(
  initialState,
  on(setIncomes, (state: State, action) => {
    return {
      ...state,
      incomes: action.incomes
    }
  })
);

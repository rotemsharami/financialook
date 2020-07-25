import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import {State as IncomesState, reducer as IncomesReducer, incomesFeatureKey} from "./incomes.reducer"

export interface State {
  [incomesFeatureKey]: IncomesState;
  
}

export const reducers: ActionReducerMap<State> = {
  [incomesFeatureKey]: IncomesReducer
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];

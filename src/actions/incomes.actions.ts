import { createAction, props } from '@ngrx/store';

export const setIncomes = createAction(
  '[Incomes] Set Incomess',
  props<{incomes:any[]}>()
);

export const loadIncomessSuccess = createAction(
  '[Incomes] Load Incomess Success',
  props<{ data: any }>()
);

export const loadIncomessFailure = createAction(
  '[Incomes] Load Incomess Failure',
  props<{ error: any }>()
);

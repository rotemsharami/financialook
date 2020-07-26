import { createAction, props } from '@ngrx/store';

export const setIncomes = createAction(
  '[Incomes] Set Incomess',
  props<{incomes:[]}>()
);
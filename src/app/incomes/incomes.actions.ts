import { createAction, props } from '@ngrx/store';
import Income from './incomes.model';

export const GetToDoAction = createAction('[Income] - Get Income');

export const CreateToDoAction = createAction(
  '[Income] - Create Income',
  props<Income>()
);

export const BeginGetToDoAction = createAction('[Income] - Begin Get Incomes');

export const SuccessGetToDoAction = createAction(
  '[Income] - Sucess Get Income',
  props<{ payload: Income[] }>()
);

export const BeginCreateToDoAction = createAction(
  '[Income] - Begin Create Income',
  props<{ payload: Income }>()
);

export const NewUpdateToDoAction = createAction(
  '[Income] - Begin Create Income',
  props<{ payload: String }>()
);

export const SuccessCreateToDoAction = createAction(
  '[Income] - Sucess Create Income',
  props<{ payload: Income }>()
);

export const newSuccessCreateToDoAction = createAction(
  '[Income] - Sucess Create Income',
  props<{ payload: any }>()
);

export const ErrorToDoAction = createAction('[Income] - Error', props<Error>());
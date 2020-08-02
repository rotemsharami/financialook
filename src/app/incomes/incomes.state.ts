import Income from './incomes.model';

export default class incomesState {
  incomes: Array<Income>;
  ToDoError: Error;
}

export const initializeState = (): incomesState => {
  return { incomes: Array<Income>(), ToDoError: null };
};
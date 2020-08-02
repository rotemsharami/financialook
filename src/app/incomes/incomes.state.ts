import Income from './incomes.model';

export default class ToDoState {
  incomes: Array<Income>;
  ToDoError: Error;
}

export const initializeState = (): ToDoState => {
  return { incomes: Array<Income>(), ToDoError: null };
};
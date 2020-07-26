import * as fromIncomes from './incomes.actions';

describe('loadIncomess', () => {
  it('should return an action', () => {
    expect(fromIncomes.loadIncomess().type).toBe('[Incomes] Load Incomess');
  });
});

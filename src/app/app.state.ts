import { IncomesModule } from '../incomes/incomes.module';

export interface AppState {
  readonly income: IncomesModule[];
}
import dayjs from 'dayjs'
import { Budget } from './budget';
import { Period } from './period';

export class BudgetService {
  query(start, end) {
    let period = new Period(dayjs(start), dayjs(end));
    return this.getAll()
      .map(b => {
        let budget = Budget.from(b)
        return budget.overlappingAmount(period);
      })
      .reduce((a, b) => a + b, 0);
  }
}

import dayjs from 'dayjs'
import { Budget } from './budget';
import { Period } from './period';

export class BudgetService {
  query(start, end) {
    let sum = 0
    let period = new Period(dayjs(start), dayjs(end));
    this.getAll()
      .forEach(b => {
        let budget = Budget.from(b)
        sum += budget.overlappingAmount(period);
      })
    return sum
  }
}

import dayjs from 'dayjs'
import { Budget } from './budget';
import { Period } from './period';

export class BudgetService {
  query(start, end) {
    let startDay = dayjs(start)
    let endDay = dayjs(end)
    let sum = 0
    let period = new Period(startDay, endDay);
    this.getAll()
      .forEach(b => {
        let budget = Budget.from(b)
        sum += this.overlappingAmount(budget, period);
      })
    return sum
  }

  overlappingAmount(budget, period) {
    return budget.dailyAmount() * period.overlappingDays(budget);
  }
}

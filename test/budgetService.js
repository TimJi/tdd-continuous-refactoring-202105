import dayjs from 'dayjs'
import { Budget } from './budget';
import { Period } from './period';

export class BudgetService {
  query(start, end) {
    let startDay = dayjs(start)
    let endDay = dayjs(end)
    if (endDay.isBefore(startDay)) {
      return 0
    }
    if (startDay.isSame(endDay, 'month')) {
      return (this.getAll()
        ?.find(element => element.yearMonth === startDay.format('YYYYMM'))?.amount || 0) / startDay.daysInMonth() * (endDay.diff(startDay, 'day') + 1)
    }
    let sum = 0
    for (let currentMonth = startDay.startOf('month');
      currentMonth.isBefore(endDay.add(1, 'month')
        .startOf('month'));
      currentMonth = currentMonth.add(1, 'month')) {
      let budget = Budget.from(this.getAll()
        ?.find(element => element.yearMonth === currentMonth.format('YYYYMM')));
      if (budget) {
        let period = new Period(startDay, endDay);
        sum += budget.dailyAmount() * period.overlappingDays(budget)
      }
    }
    return sum
  }
}

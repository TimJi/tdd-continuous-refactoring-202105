import dayjs from 'dayjs'
import { Budget } from './budget';

class Period {
  startDay;
  endDay;

  constructor(startDay, endDay) {
    this.startDay = startDay;
    this.endDay = endDay;
  }

}

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
      let month = currentMonth.format('YYYYMM');
      let budget = Budget.from(this.getAll()
        ?.find(element => element.yearMonth === month));
      if (budget) {
        sum += budget.dailyAmount() * this.overlappingDays(budget, startDay, endDay)
      }
    }
    return sum
  }

  overlappingDays(budget, startDay, endDay) {
    let period = new Period(startDay, endDay);
    startDay = period.startDay;
    endDay = period.endDay;
    let overlappingEnd;
    let overlappingStart;
    if (budget.firstDay()
      .isSame(startDay, 'month')) {
      overlappingEnd = budget.lastDay();
      overlappingStart = startDay;
    } else if (budget.lastDay()
      .isSame(endDay, 'month')) {
      overlappingEnd = endDay;
      overlappingStart = budget.firstDay();
    } else {
      overlappingEnd = budget.lastDay();
      overlappingStart = budget.firstDay();
    }
    return overlappingEnd.diff(overlappingStart, 'day') + 1;
  }
}

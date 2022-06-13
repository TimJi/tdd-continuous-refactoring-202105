export class Period {
  startDay;
  endDay;

  constructor(startDay, endDay) {
    this.startDay = startDay;
    this.endDay = endDay;
  }

  overlappingDays(budget) {
    let overlappingEnd;
    let overlappingStart;
    if (budget.firstDay()
      .isSame(this.startDay, 'month')) {
      overlappingEnd = budget.lastDay();
      overlappingStart = this.startDay;
    } else if (budget.lastDay()
      .isSame(this.endDay, 'month')) {
      overlappingEnd = this.endDay;
      overlappingStart = budget.firstDay();
    } else {
      overlappingEnd = budget.lastDay();
      overlappingStart = budget.firstDay();
    }
    return overlappingEnd.diff(overlappingStart, 'day') + 1;

  }
}

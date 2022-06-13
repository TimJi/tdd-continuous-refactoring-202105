export class Period {
  startDay;
  endDay;

  constructor(startDay, endDay) {
    this.startDay = startDay;
    this.endDay = endDay;
  }

  overlappingDays(budget) {
    let overlappingEnd = budget.lastDay()
      .isBefore(this.endDay) ? budget.lastDay() : this.endDay;
    let overlappingStart = budget.firstDay()
      .isAfter(this.startDay) ? budget.firstDay() : this.startDay;
    return overlappingEnd.diff(overlappingStart, 'day') + 1;
  }
}

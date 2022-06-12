import dayjs from 'dayjs';

export class Budget {
  static from(json) {
    if (json) {
      return Object.assign(new Budget(), json);
    }
    return null;
  }

  totalDays() {
    let firstDay = dayjs(this.yearMonth + '01', 'yyyyMMdd');
    return firstDay.daysInMonth();
  }
}

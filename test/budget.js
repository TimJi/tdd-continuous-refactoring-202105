import dayjs from 'dayjs';

export class Budget {
  static from(json) {
    if (json) {
      return Object.assign(new Budget(), json);
    }
    return null;
  }

  totalDays() {
    return this.firstDay()
      .daysInMonth();
  }

  firstDay() {
    return dayjs(this.yearMonth + '01', 'yyyyMMdd');
  }

  lastDay() {
    return this.firstDay()
      .endOf('month');
  }

  dailyAmount() {
    return (this.amount || 0) / this.totalDays();
  }
}

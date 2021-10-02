import dayjs from "dayjs"

export class BudgetService {
  query(start, end) {
    let startDay = dayjs(start)
    let endDay = dayjs(end)
    if (endDay.isBefore(startDay)) {
      return 0
    }
    if (startDay.isSame(endDay, "month")) {
      return this.getDaysAmount(startDay, endDay)
    }
    let sum = 0
    for (let i = startDay.startOf("month");
         i.isBefore(endDay.add(1, 'month').startOf('month'));
         i = i.add(1, "month")) {
      if (i.isSame(startDay, "month")) {
        sum += this.getDaysAmount(startDay, startDay.endOf("month"))
      } else if (i.isSame(endDay, "month")) {
        sum += this.getDaysAmount(endDay.startOf("month"), endDay)
      } else {
        sum += this.getFullMonthAmount(i.format("YYYYMM"))
      }
    }
    return sum
  }

  getDaysAmount(startDay, endDay) {
    return this.getFullMonthAmount(startDay.format("YYYYMM")) / startDay.daysInMonth() * (endDay.diff(startDay, "day") + 1)
  }

  getFullMonthAmount(month) {
    return this.getAll()?.find(element => element.yearMonth === month)?.amount || 0
  }
}

import dayjs from "dayjs"

export class BudgetService {
  query(start, end) {
    // let fakeDays =(start, end)=> [
    //   {yearMonth: '202110', days: 31}
    // ]
    let startDay = dayjs(start)
    let endDay = dayjs(end)
    let isInvalidDate = !endDay.isAfter(startDay)
    if (isInvalidDate) {
      return 0
    }
    return this.getFullMonthAmount(startDay.format("YYYYMM")) / startDay.daysInMonth() * (endDay.diff(startDay, "day") + 1) || 0
    // return this.getFullMonthAmount(startDay.format("YYYYMM")) || 0
  }

  getFullMonthAmount(month) {
    return this.getAll()?.find(element => element.yearMonth === month)?.amount
  }
}

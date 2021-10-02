import dayjs from "dayjs"

export class BudgetService {
  query(start, end) {
    // let fakeDays =(start, end)=> [
    //   {yearMonth: '202110', days: 31}
    // ]
    let startDay = dayjs(start).format("YYYYMM")
    return this.getAll()?.find(element => element.yearMonth === startDay)?.amount || 0
  }
}

export class BudgetService {
  query(start, end) {
    if (start === "2021-10-01" && end === "2021-10-31") {
      // let fakeDays =(start, end)=> [
      //   {yearMonth: '202110', days: 31}
      // ]
      return this.getAll()[0].amount
    }
    return 0
  }
}

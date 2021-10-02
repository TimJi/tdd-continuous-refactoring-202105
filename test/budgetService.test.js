import {BudgetService} from "./budgetService"

describe("Budget Service", () => {
  let budgetService = new BudgetService
  beforeEach(() => {
    budgetService = new BudgetService
  })

  function budgetShouldBe(start, end, expected) {
    expect(budgetService.query(start, end)).toBe(expected)
  }

  it("no budget", () => {
    budgetShouldBe("2021-10-01", "2021-11-30", 0)
  })

  it("full month", () => {
    budgetService.getAll = () => {
      return [{yearMonth: 202110, amount: 310}]
    }
    budgetShouldBe("2021-10-01", "2021-10-31", 310)
  })

})

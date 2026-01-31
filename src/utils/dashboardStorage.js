// src/utils/dashboardStorage.js

const STORAGE_KEY = 'dashboardState'

export function defaultDashboardState() {
  const year = new Date().getFullYear()
  return {
    firstRunCompleted: false,       // 1
    selectedIds: [],                // 2
    tierIndexById: {},              // 3
    totalAnnualPts: 0,              // 4
    selectedRewardTab: 'Flights',   // 5a
    selectedRewardId: null,         // 5b
    // always start in April of the current year
    currentMonth: `${year}-04`,     // YYYY-04   // 6
    currentMonthEarnedById: {},     // 7
    currentMonthTargetById: {},     // 8
    currentMonthTotalPts: 0,        // 9
    currentBalance: 0,              // 10
    setupProgressById: {}           // 11
  }
}

export function loadDashboardState() {
  const raw = localStorage.getItem(STORAGE_KEY)
  return raw
    ? JSON.parse(raw)
    : defaultDashboardState()
}

export function saveDashboardState(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}

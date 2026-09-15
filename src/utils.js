import { bsMonthKeyOf, bsMonthLabel, formatBsDate } from './nepaliDate.js'

// "2026-09-10" (AD) -> "2083-05" (BS year-month key)
export const monthKeyOf = bsMonthKeyOf

// "2083-05" -> "Ashwin 2083"
export const monthLabel = bsMonthLabel

// "2026-09-10" (AD) -> "30 Bhadra 2083" (BS)
export const formatDate = formatBsDate

export function formatAmount(amount) {
  return amount.toLocaleString('en-US')
}

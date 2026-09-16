import { bsMonthKeyOf, bsMonthLabel, formatBsDate, parseAdIsoLocal } from './nepaliDate.js'

const AD_MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

// "2026-09-10" -> "2026-09"
function adMonthKeyOf(dateString) {
  return dateString.slice(0, 7)
}

// "2026-09" -> "September 2026"
function adMonthLabel(monthKey) {
  const [year, month] = monthKey.split('-')
  return `${AD_MONTH_NAMES[Number(month) - 1]} ${year}`
}

function formatAdDate(dateString) {
  return parseAdIsoLocal(dateString).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })
}

// Everything a transaction's `date` (always stored as an AD "YYYY-MM-DD"
// string) needs to be grouped and displayed in a given calendar system.
export const CALENDARS = {
  AD: { key: 'AD', label: 'English (A.D.)', monthKeyOf: adMonthKeyOf, monthLabel: adMonthLabel, formatDate: formatAdDate },
  BS: { key: 'BS', label: 'Nepali (B.S.)', monthKeyOf: bsMonthKeyOf, monthLabel: bsMonthLabel, formatDate: formatBsDate },
}

export function formatAmount(amount) {
  return amount.toLocaleString('en-US')
}

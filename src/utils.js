const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

// "2026-09" -> "September 2026"
export function monthLabel(monthKey) {
  const [year, month] = monthKey.split('-')
  return `${MONTH_NAMES[Number(month) - 1]} ${year}`
}

// "2026-09-10" -> "2026-09"
export function monthKeyOf(dateString) {
  return dateString.slice(0, 7)
}

export function formatDate(dateString) {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })
}

export function formatAmount(amount) {
  return amount.toLocaleString('en-US')
}

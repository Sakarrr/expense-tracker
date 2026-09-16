// Bikram Sambat (BS) calendar helpers, backed by nepali-date-converter.
// Transactions are still stored with an AD ("YYYY-MM-DD") `date` field so
// sorting/id generation stay simple; everything the user sees and enters
// goes through BS via the helpers below.
import NepaliDate from 'nepali-date-converter'

// Derived from the library's own formatter (rather than hand-spelled) so the
// month picker always matches the spelling used elsewhere (table, month select).
export const BS_MONTH_NAMES = Array.from({ length: 12 }, (_, month) =>
  new NepaliDate(2000, month, 1).format('MMMM')
)

function pad(n) {
  return String(n).padStart(2, '0')
}

// `new Date("YYYY-MM-DD")` parses as UTC, which can shift the calendar day
// once converted back to local time near timezone boundaries. Parse the
// parts and build a local-time Date instead.
export function parseAdIsoLocal(adIso) {
  const [year, month, day] = adIso.split('-').map(Number)
  return new Date(year, month - 1, day)
}

// AD ISO date string -> { year, month, date, day } in BS (month is 0-indexed, Baishakh = 0)
export function adIsoToBs(adIso) {
  return NepaliDate.fromAD(parseAdIsoLocal(adIso)).getBS()
}

// BS year / month (0-indexed) / date -> AD ISO date string ("YYYY-MM-DD")
export function bsToAdIso(year, month, date) {
  const ad = new NepaliDate(year, month, date).getAD()
  return `${ad.year}-${pad(ad.month + 1)}-${pad(ad.date)}`
}

// AD ISO date string -> "2083-05" (BS year-month key, for grouping)
export function bsMonthKeyOf(adIso) {
  const bs = adIsoToBs(adIso)
  return `${bs.year}-${pad(bs.month + 1)}`
}

// "2083-05" -> "Ashwin 2083"
export function bsMonthLabel(monthKey) {
  const [year, month] = monthKey.split('-')
  return `${BS_MONTH_NAMES[Number(month) - 1]} ${year}`
}

// AD ISO date string -> "30 Ashwin 2083"
export function formatBsDate(adIso) {
  return NepaliDate.fromAD(parseAdIsoLocal(adIso)).format('DD MMMM YYYY')
}

// Today's date in BS: { year, month, date, day }
export function todayBs() {
  return NepaliDate.now().getBS()
}

// Number of days in a given BS year/month (0-indexed month).
export function daysInBsMonth(year, month) {
  const firstAd = new NepaliDate(year, month, 1).getAD()
  const nextAd = new NepaliDate(year, month + 1, 1).getAD()
  const first = new Date(firstAd.year, firstAd.month, firstAd.date)
  const next = new Date(nextAd.year, nextAd.month, nextAd.date)
  return Math.round((next - first) / (1000 * 60 * 60 * 24))
}

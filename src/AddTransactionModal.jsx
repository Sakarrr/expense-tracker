import { useMemo, useState } from 'react'
import { BS_MONTH_NAMES, bsToAdIso, daysInBsMonth, todayBs } from './nepaliDate.js'

const today = todayBs()
const BS_YEARS = Array.from({ length: 12 }, (_, i) => today.year - 10 + i)

function todayAdIso() {
  const now = new Date()
  const pad = (n) => String(n).padStart(2, '0')
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`
}

export default function AddTransactionModal({ calendar, onSave, onCancel }) {
  const [adDate, setAdDate] = useState(todayAdIso())
  const [bsYear, setBsYear] = useState(today.year)
  const [bsMonth, setBsMonth] = useState(today.month)
  const [bsDay, setBsDay] = useState(today.date)
  const [description, setDescription] = useState('')
  const [type, setType] = useState('expense')
  const [category, setCategory] = useState('')
  const [amount, setAmount] = useState('')

  const dayCount = useMemo(() => daysInBsMonth(bsYear, bsMonth), [bsYear, bsMonth])
  const days = useMemo(() => Array.from({ length: dayCount }, (_, i) => i + 1), [dayCount])

  function handleYearChange(nextYear) {
    setBsYear(nextYear)
    setBsDay((day) => Math.min(day, daysInBsMonth(nextYear, bsMonth)))
  }

  function handleMonthChange(nextMonth) {
    setBsMonth(nextMonth)
    setBsDay((day) => Math.min(day, daysInBsMonth(bsYear, nextMonth)))
  }

  function handleSubmit(event) {
    event.preventDefault()
    onSave({
      date: calendar === 'AD' ? adDate : bsToAdIso(bsYear, bsMonth, bsDay),
      description,
      type,
      category,
      amount: Number(amount),
    })
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl w-full max-w-md p-6">
        <h3 className="text-xl font-bold mb-4">Add transaction</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">
              DATE ({calendar === 'AD' ? 'A.D.' : 'B.S.'})
            </label>
            {calendar === 'AD' ? (
              <input
                type="date"
                required
                value={adDate}
                onChange={(event) => setAdDate(event.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
              />
            ) : (
              <div className="grid grid-cols-3 gap-2">
                <select
                  aria-label="Year (B.S.)"
                  value={bsYear}
                  onChange={(event) => handleYearChange(Number(event.target.value))}
                  className="w-full border border-gray-300 rounded-lg px-2 py-2"
                >
                  {BS_YEARS.map((year) => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
                <select
                  aria-label="Month (B.S.)"
                  value={bsMonth}
                  onChange={(event) => handleMonthChange(Number(event.target.value))}
                  className="w-full border border-gray-300 rounded-lg px-2 py-2"
                >
                  {BS_MONTH_NAMES.map((name, index) => (
                    <option key={name} value={index}>{name}</option>
                  ))}
                </select>
                <select
                  aria-label="Day (B.S.)"
                  value={bsDay}
                  onChange={(event) => setBsDay(Number(event.target.value))}
                  className="w-full border border-gray-300 rounded-lg px-2 py-2"
                >
                  {days.map((day) => (
                    <option key={day} value={day}>{day}</option>
                  ))}
                </select>
              </div>
            )}
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">DESCRIPTION</label>
            <input
              type="text"
              required
              placeholder="e.g. Groceries"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">TYPE</label>
            <select
              value={type}
              onChange={(event) => setType(event.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">CATEGORY</label>
            <input
              type="text"
              required
              placeholder="e.g. Food & Dining"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">AMOUNT (NPR)</label>
            <input
              type="number"
              required
              min="0"
              step="1"
              placeholder="0"
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 border border-gray-300 rounded-lg py-2 font-semibold text-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-2 font-semibold"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

// Simple localStorage helpers.

const AUTH_KEY = 'expense-tracker-auth'
const TX_KEY = 'expense-tracker-transactions'
const CALENDAR_KEY = 'expense-tracker-calendar'

// Login credentials, injected at build time via env vars.
const VALID_EMAIL = import.meta.env.VITE_LOGIN_EMAIL
const VALID_PASSWORD = import.meta.env.VITE_LOGIN_PASSWORD

const seedTransactions = [
  { id: 1, date: '2026-09-10', description: 'Salary', type: 'income', category: 'Salary', amount: 65000 },
  { id: 2, date: '2026-09-09', description: 'Groceries', type: 'expense', category: 'Food & Dining', amount: 2450 },
  { id: 3, date: '2026-09-07', description: 'Internet bill', type: 'expense', category: 'Utilities', amount: 1200 },
  { id: 4, date: '2026-09-05', description: 'Freelance project', type: 'income', category: 'Freelance', amount: 18000 },
  { id: 5, date: '2026-09-03', description: 'Restaurant dinner', type: 'expense', category: 'Food & Dining', amount: 1850 },
  { id: 6, date: '2026-09-01', description: 'Bus & taxi', type: 'expense', category: 'Transport', amount: 900 },
]

export function isLoggedIn() {
  return localStorage.getItem(AUTH_KEY) === 'true'
}

export function login(email, password) {
  if (email === VALID_EMAIL && password === VALID_PASSWORD) {
    localStorage.setItem(AUTH_KEY, 'true')
    return true
  }
  return false
}

export function logout() {
  localStorage.removeItem(AUTH_KEY)
}

export function getTransactions() {
  const raw = localStorage.getItem(TX_KEY)
  if (!raw) {
    localStorage.setItem(TX_KEY, JSON.stringify(seedTransactions))
    return seedTransactions
  }
  return JSON.parse(raw)
}

export function addTransaction(transaction) {
  const transactions = getTransactions()
  transaction.id = Date.now()
  transactions.unshift(transaction)
  localStorage.setItem(TX_KEY, JSON.stringify(transactions))
  return transactions
}

export function updateTransaction(transaction) {
  const transactions = getTransactions().map((tx) =>
    tx.id === transaction.id ? transaction : tx
  )
  localStorage.setItem(TX_KEY, JSON.stringify(transactions))
  return transactions
}

export function deleteTransaction(id) {
  const transactions = getTransactions().filter((tx) => tx.id !== id)
  localStorage.setItem(TX_KEY, JSON.stringify(transactions))
  return transactions
}

export function getCalendarPreference() {
  return localStorage.getItem(CALENDAR_KEY) === 'AD' ? 'AD' : 'BS'
}

export function setCalendarPreference(calendar) {
  localStorage.setItem(CALENDAR_KEY, calendar)
}

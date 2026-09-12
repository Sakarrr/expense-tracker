import { useState } from 'react'
import { getTransactions, addTransaction, logout } from './storage.js'
import { monthLabel, monthKeyOf, formatDate, formatAmount } from './utils.js'
import AddTransactionModal from './AddTransactionModal.jsx'

export default function Dashboard({ onLogout }) {
  const [transactions, setTransactions] = useState(getTransactions())
  const [selectedMonth, setSelectedMonth] = useState('')
  const [modalOpen, setModalOpen] = useState(false)

  const months = [...new Set(transactions.map((tx) => monthKeyOf(tx.date)))].sort().reverse()
  const activeMonth = selectedMonth || months[0] || ''

  const filtered = transactions
    .filter((tx) => monthKeyOf(tx.date) === activeMonth)
    .sort((a, b) => (a.date < b.date ? 1 : -1))

  function handleSave(newTransaction) {
    const updated = addTransaction(newTransaction)
    setTransactions(updated)
    setSelectedMonth(monthKeyOf(newTransaction.date))
    setModalOpen(false)
  }

  function handleLogout() {
    logout()
    onLogout()
  }

  return (
    <div className="min-h-screen flex bg-gray-50">
      <aside className="w-72 bg-white border-r border-gray-200 flex flex-col p-6">
        <div className="flex items-center gap-3 pb-6 border-b border-gray-200">
          <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 font-bold flex items-center justify-center">S</div>
          <div>
            <p className="font-semibold text-gray-900">Sakar Shrestha</p>
            <p className="text-sm text-gray-500">Personal account</p>
          </div>
        </div>

        <div className="pt-6">
          <h1 className="text-xl font-bold text-gray-900">Expense Tracker</h1>
          <p className="text-sm text-gray-500">Your finances, simply.</p>
        </div>

        <p className="text-xs font-semibold text-gray-400 tracking-wide mt-8 pt-6 border-t border-gray-200">ACCOUNT</p>

        <button
          onClick={handleLogout}
          className="mt-auto flex items-center gap-2 border border-gray-200 rounded-lg px-4 py-3 text-gray-700 hover:bg-gray-50"
        >
          <span>&#8617;</span> Logout
        </button>
      </aside>

      <main className="flex-1 p-10">
        <div className="flex items-start justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Dashboard</h2>
            <p className="text-gray-500">Track your income and expenses.</p>
          </div>
          <button
            onClick={() => setModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg px-5 py-3"
          >
            + Add transaction
          </button>
        </div>

        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900">Monthly overview</h3>
          <select
            value={activeMonth}
            onChange={(event) => setSelectedMonth(event.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 bg-white"
          >
            {months.map((m) => (
              <option key={m} value={m}>{monthLabel(m)}</option>
            ))}
          </select>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-200 text-gray-500 text-sm">
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium">Description</th>
                <th className="px-6 py-4 font-medium">Type</th>
                <th className="px-6 py-4 font-medium">Category</th>
                <th className="px-6 py-4 font-medium text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr>
                  <td colSpan="5" className="px-6 py-10 text-center text-gray-400">No transactions this month.</td>
                </tr>
              )}
              {filtered.map((tx) => (
                <tr key={tx.id} className="border-b border-gray-100 last:border-0">
                  <td className="px-6 py-4 text-gray-700">{formatDate(tx.date)}</td>
                  <td className="px-6 py-4 text-gray-900">{tx.description}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${tx.type === 'income' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'}`}>
                      {tx.type === 'income' ? 'Income' : 'Expense'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-700">{tx.category}</td>
                  <td className={`px-6 py-4 text-right font-semibold ${tx.type === 'income' ? 'text-green-700' : 'text-red-600'}`}>
                    {tx.type === 'income' ? '+' : '-'} NPR {formatAmount(tx.amount)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex items-center justify-between px-6 py-4 text-sm text-gray-500 border-t border-gray-100">
            <span>Showing {filtered.length} transactions</span>
            <span>{activeMonth ? monthLabel(activeMonth) : ''}</span>
          </div>
        </div>
      </main>

      {modalOpen && (
        <AddTransactionModal onSave={handleSave} onCancel={() => setModalOpen(false)} />
      )}
    </div>
  )
}

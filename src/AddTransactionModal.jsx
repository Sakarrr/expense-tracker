import { useState } from 'react'

export default function AddTransactionModal({ onSave, onCancel }) {
  const [date, setDate] = useState('')
  const [description, setDescription] = useState('')
  const [type, setType] = useState('expense')
  const [category, setCategory] = useState('')
  const [amount, setAmount] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    onSave({
      date,
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
            <label className="block text-xs font-semibold text-gray-600 mb-1">DATE</label>
            <input
              type="date"
              required
              value={date}
              onChange={(event) => setDate(event.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
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

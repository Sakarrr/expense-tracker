import { useState } from 'react'
import { login } from './storage.js'

export default function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showError, setShowError] = useState(false)

  function handleSubmit(event) {
    event.preventDefault()

    if (login(email, password)) {
      onLoginSuccess()
    } else {
      setShowError(true)
    }
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="hidden md:flex md:w-1/2 bg-green-700 text-white flex-col justify-between p-12">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-green-800 rounded-xl flex items-center justify-center text-2xl font-bold">$</div>
          <span className="text-xl font-bold tracking-wide">LOREM</span>
        </div>

        <div>
          <h1 className="text-5xl font-extrabold leading-tight mb-6">Lorem ipsum dolor sit amet.</h1>
          <p className="text-green-100 text-lg">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.</p>
        </div>

        <div className="bg-green-600/60 rounded-2xl p-6">
          <p className="text-sm font-semibold tracking-wide text-green-100 mb-1">THIS MONTH</p>
          <p className="text-2xl font-bold">Lorem ipsum dolor sit amet.</p>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-sm">
          <h2 className="text-3xl font-bold mb-2">Welcome back</h2>
          <p className="text-gray-500 mb-8">Sign in to continue managing your finances.</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">EMAIL ADDRESS</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">PASSWORD</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-600"
              />
            </div>

            {showError && <p className="text-red-600 text-sm">Invalid email or password.</p>}

            <button
              type="submit"
              className="w-full bg-green-700 hover:bg-green-800 text-white font-semibold rounded-lg py-3 transition-colors"
            >
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

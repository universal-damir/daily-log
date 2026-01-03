import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

export function Header() {
  const { user, signOut } = useAuth()
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-xl font-bold text-gray-900">
            Daily Log
          </Link>

          {/* Desktop nav */}
          <nav className="hidden sm:flex items-center gap-6">
            <Link
              to="/"
              className={`text-sm font-medium transition ${
                location.pathname === '/'
                  ? 'text-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Dashboard
            </Link>
            <Link
              to="/settings"
              className={`text-sm font-medium transition ${
                location.pathname === '/settings'
                  ? 'text-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Settings
            </Link>
            <span className="text-sm text-gray-400">|</span>
            <span className="text-sm text-gray-600 truncate max-w-[150px]">
              {user?.email}
            </span>
            <button
              onClick={signOut}
              className="text-sm text-gray-600 hover:text-gray-900 transition"
            >
              Sign out
            </button>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="sm:hidden p-2 text-gray-600"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="sm:hidden pt-3 pb-2 border-t border-gray-100 mt-3">
            <nav className="flex flex-col gap-2">
              <Link
                to="/"
                onClick={() => setMenuOpen(false)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                  location.pathname === '/'
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                Dashboard
              </Link>
              <Link
                to="/settings"
                onClick={() => setMenuOpen(false)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                  location.pathname === '/settings'
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                Settings
              </Link>
              <div className="border-t border-gray-100 mt-2 pt-2">
                <p className="px-3 py-1 text-sm text-gray-500 truncate">{user?.email}</p>
                <button
                  onClick={() => { signOut(); setMenuOpen(false); }}
                  className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition"
                >
                  Sign out
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

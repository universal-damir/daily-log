import { useState } from 'react'

const PRESET_COLORS = [
  '#ef4444', '#f97316', '#eab308', '#22c55e', '#10b981',
  '#14b8a6', '#06b6d4', '#3b82f6', '#6366f1', '#8b5cf6',
  '#a855f7', '#d946ef', '#ec4899', '#f43f5e',
]

export function CategoryForm({ onSubmit, onCancel, initialData = null }) {
  const [name, setName] = useState(initialData?.name || '')
  const [color, setColor] = useState(initialData?.color || PRESET_COLORS[0])

  function handleSubmit(e) {
    e.preventDefault()
    if (name.trim()) {
      onSubmit({ name: name.trim(), color })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Category Name
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g., Meditation, Reading"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          autoFocus
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Color
        </label>
        <div className="flex flex-wrap gap-2">
          {PRESET_COLORS.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setColor(c)}
              className={`w-8 h-8 rounded-full transition ${
                color === c ? 'ring-2 ring-offset-2 ring-gray-900' : ''
              }`}
              style={{ backgroundColor: c }}
            />
          ))}
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={!name.trim()}
          className="flex-1 py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition disabled:opacity-50"
        >
          {initialData ? 'Update' : 'Add Category'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}

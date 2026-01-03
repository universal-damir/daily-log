import { useState, useEffect } from 'react'
import { format } from 'date-fns'

const RATINGS = [
  { value: 'good', label: 'Good', color: 'bg-green-500', hoverColor: 'hover:bg-green-600' },
  { value: 'average', label: 'Avg', color: 'bg-yellow-500', hoverColor: 'hover:bg-yellow-600' },
  { value: 'bad', label: 'Bad', color: 'bg-red-500', hoverColor: 'hover:bg-red-600' },
]

export function EntryModal({
  isOpen,
  onClose,
  date,
  categories,
  entries,
  onSave,
  selectedCategoryId,
}) {
  const [categoryEntries, setCategoryEntries] = useState({})

  useEffect(() => {
    if (isOpen && date) {
      const initialState = {}
      categories.forEach((cat) => {
        const existingEntry = entries.find((e) => e.category_id === cat.id)
        initialState[cat.id] = {
          rating: existingEntry?.rating || null,
          note: existingEntry?.note || '',
        }
      })
      setCategoryEntries(initialState)
    }
  }, [isOpen, date, categories, entries])

  if (!isOpen) return null

  function handleRatingClick(categoryId, rating) {
    setCategoryEntries((prev) => ({
      ...prev,
      [categoryId]: {
        ...prev[categoryId],
        rating: prev[categoryId]?.rating === rating ? null : rating,
      },
    }))
  }

  function handleNoteChange(categoryId, note) {
    setCategoryEntries((prev) => ({
      ...prev,
      [categoryId]: {
        ...prev[categoryId],
        note,
      },
    }))
  }

  function handleSave() {
    Object.entries(categoryEntries).forEach(([categoryId, data]) => {
      if (data.rating) {
        onSave(categoryId, data.rating, data.note)
      }
    })
    onClose()
  }

  const displayCategories =
    selectedCategoryId === 'all'
      ? categories
      : categories.filter((c) => c.id === selectedCategoryId)

  return (
    <div className="fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center z-50">
      <div className="bg-white rounded-t-xl sm:rounded-xl shadow-xl w-full sm:max-w-md max-h-[85vh] overflow-hidden flex flex-col">
        <div className="p-4 sm:p-6 border-b border-gray-200 flex-shrink-0">
          <div className="flex justify-between items-center">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
              {date && format(date, 'EEE, MMM d')}
            </h2>
            <button
              onClick={onClose}
              className="p-2 -mr-2 text-gray-400 hover:text-gray-600 transition"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-4 sm:p-6 space-y-5 overflow-y-auto flex-1">
          {displayCategories.map((category) => (
            <div key={category.id}>
              <div className="flex items-center gap-2 mb-2">
                <div
                  className="w-3 h-3 rounded-full flex-shrink-0"
                  style={{ backgroundColor: category.color }}
                />
                <h3 className="font-medium text-gray-900 text-sm sm:text-base">{category.name}</h3>
              </div>

              <div className="flex gap-2 mb-2">
                {RATINGS.map((rating) => (
                  <button
                    key={rating.value}
                    onClick={() => handleRatingClick(category.id, rating.value)}
                    className={`flex-1 py-2.5 px-2 rounded-lg text-white text-sm font-medium transition ${
                      rating.color
                    } ${rating.hoverColor} ${
                      categoryEntries[category.id]?.rating === rating.value
                        ? 'ring-2 ring-offset-2 ring-gray-900'
                        : 'opacity-50 hover:opacity-100'
                    }`}
                  >
                    {rating.label}
                  </button>
                ))}
              </div>

              <textarea
                value={categoryEntries[category.id]?.note || ''}
                onChange={(e) => handleNoteChange(category.id, e.target.value)}
                placeholder="Add a note (optional)"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                rows={2}
              />
            </div>
          ))}
        </div>

        <div className="p-4 sm:p-6 border-t border-gray-200 flex gap-3 flex-shrink-0 bg-gray-50">
          <button
            onClick={handleSave}
            className="flex-1 py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition"
          >
            Save
          </button>
          <button
            onClick={onClose}
            className="px-6 py-3 text-gray-700 hover:bg-gray-200 rounded-lg transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

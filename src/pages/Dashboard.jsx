import { useState } from 'react'
import { HeatmapCalendar } from '../components/calendar/HeatmapCalendar'
import { CategoryTabs } from '../components/categories/CategoryTabs'
import { CategoryForm } from '../components/categories/CategoryForm'
import { EntryModal } from '../components/entries/EntryModal'
import { useCategories } from '../hooks/useCategories'
import { useEntries } from '../hooks/useEntries'

export function Dashboard() {
  const { categories, loading: categoriesLoading, addCategory } = useCategories()
  const { entries, loading: entriesLoading, upsertEntry, getEntriesForDate } = useEntries()

  const [selectedCategoryId, setSelectedCategoryId] = useState('all')
  const [showCategoryForm, setShowCategoryForm] = useState(false)
  const [selectedDate, setSelectedDate] = useState(null)

  const loading = categoriesLoading || entriesLoading

  async function handleAddCategory({ name, color }) {
    await addCategory(name, color)
    setShowCategoryForm(false)
  }

  function handleDayClick(date) {
    setSelectedDate(date)
  }

  async function handleSaveEntry(categoryId, rating, note) {
    await upsertEntry(categoryId, selectedDate, rating, note)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-gray-500">Loading...</div>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-8">
      <CategoryTabs
        categories={categories}
        selectedId={selectedCategoryId}
        onSelect={setSelectedCategoryId}
        onAddClick={() => setShowCategoryForm(true)}
      />

      <HeatmapCalendar
        entries={entries}
        categories={categories}
        selectedCategoryId={selectedCategoryId}
        onDayClick={handleDayClick}
      />

      {showCategoryForm && (
        <div className="fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center z-50 p-0 sm:p-4">
          <div className="bg-white rounded-t-xl sm:rounded-xl shadow-xl w-full sm:max-w-md p-6">
            <h2 className="text-xl font-semibold mb-4">Add New Category</h2>
            <CategoryForm
              onSubmit={handleAddCategory}
              onCancel={() => setShowCategoryForm(false)}
            />
          </div>
        </div>
      )}

      <EntryModal
        isOpen={selectedDate !== null}
        onClose={() => setSelectedDate(null)}
        date={selectedDate}
        categories={categories}
        entries={selectedDate ? getEntriesForDate(selectedDate) : []}
        onSave={handleSaveEntry}
        selectedCategoryId={selectedCategoryId}
      />
    </div>
  )
}

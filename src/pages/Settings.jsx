import { useState } from 'react'
import { useCategories } from '../hooks/useCategories'
import { CategoryForm } from '../components/categories/CategoryForm'

export function Settings() {
  const { categories, loading, addCategory, deleteCategory, updateCategory } = useCategories()
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingCategory, setEditingCategory] = useState(null)

  async function handleAddCategory({ name, color }) {
    await addCategory(name, color)
    setShowAddForm(false)
  }

  async function handleUpdateCategory({ name, color }) {
    await updateCategory(editingCategory.id, { name, color })
    setEditingCategory(null)
  }

  async function handleDeleteCategory(id) {
    if (window.confirm('Delete this category? All entries for this category will also be deleted.')) {
      await deleteCategory(id)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-gray-500">Loading...</div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-4 sm:py-8">
      <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 sm:mb-8">Settings</h1>

      <section className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <h2 className="text-base sm:text-lg font-semibold text-gray-900">Categories</h2>
          <button
            onClick={() => setShowAddForm(true)}
            className="px-3 sm:px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition"
          >
            + Add
          </button>
        </div>

        <div className="space-y-2 sm:space-y-3">
          {categories.map((category) => (
            <div
              key={category.id}
              className="flex items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-4 h-4 rounded-full flex-shrink-0"
                  style={{ backgroundColor: category.color }}
                />
                <span className="font-medium text-gray-900 text-sm sm:text-base">{category.name}</span>
              </div>

              <div className="flex gap-1 sm:gap-2">
                <button
                  onClick={() => setEditingCategory(category)}
                  className="px-2 sm:px-3 py-1 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteCategory(category.id)}
                  className="px-2 sm:px-3 py-1 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}

          {categories.length === 0 && (
            <p className="text-gray-500 text-center py-8">
              No categories yet. Add one to get started!
            </p>
          )}
        </div>
      </section>

      {/* Add Category Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center z-50">
          <div className="bg-white rounded-t-xl sm:rounded-xl shadow-xl w-full sm:max-w-md p-6">
            <h2 className="text-xl font-semibold mb-4">Add New Category</h2>
            <CategoryForm
              onSubmit={handleAddCategory}
              onCancel={() => setShowAddForm(false)}
            />
          </div>
        </div>
      )}

      {/* Edit Category Modal */}
      {editingCategory && (
        <div className="fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center z-50">
          <div className="bg-white rounded-t-xl sm:rounded-xl shadow-xl w-full sm:max-w-md p-6">
            <h2 className="text-xl font-semibold mb-4">Edit Category</h2>
            <CategoryForm
              initialData={editingCategory}
              onSubmit={handleUpdateCategory}
              onCancel={() => setEditingCategory(null)}
            />
          </div>
        </div>
      )}
    </div>
  )
}

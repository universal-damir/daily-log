export function CategoryTabs({ categories, selectedId, onSelect, onAddClick }) {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      <button
        onClick={() => onSelect('all')}
        className={`px-4 py-2 rounded-full text-sm font-medium transition ${
          selectedId === 'all'
            ? 'bg-gray-900 text-white'
            : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
        }`}
      >
        All
      </button>

      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onSelect(category.id)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition ${
            selectedId === category.id
              ? 'text-white'
              : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
          }`}
          style={
            selectedId === category.id
              ? { backgroundColor: category.color }
              : {}
          }
        >
          {category.name}
        </button>
      ))}

      <button
        onClick={onAddClick}
        className="px-4 py-2 rounded-full text-sm font-medium text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition"
      >
        +
      </button>
    </div>
  )
}

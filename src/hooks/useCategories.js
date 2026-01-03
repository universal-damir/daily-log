import { useState, useEffect, useRef } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from './useAuth'

const DEFAULT_CATEGORIES = [
  { name: 'Relationship', color: '#ec4899' },
  { name: 'Professional Work', color: '#3b82f6' },
  { name: 'Workout', color: '#10b981' },
]

export function useCategories() {
  const { user } = useAuth()
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const hasSeeded = useRef(false)

  useEffect(() => {
    if (user) {
      fetchCategories()
    }
  }, [user])

  async function fetchCategories() {
    setLoading(true)
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('user_id', user.id)
      .order('order', { ascending: true })

    if (error) {
      console.error('Error fetching categories:', error)
      setLoading(false)
      return
    }

    if (data.length === 0 && !hasSeeded.current) {
      hasSeeded.current = true
      await seedDefaultCategories()
    } else {
      setCategories(data)
      setLoading(false)
    }
  }

  async function seedDefaultCategories() {
    const categoriesToInsert = DEFAULT_CATEGORIES.map((cat, index) => ({
      user_id: user.id,
      name: cat.name,
      color: cat.color,
      order: index,
    }))

    const { data, error } = await supabase
      .from('categories')
      .insert(categoriesToInsert)
      .select()

    if (error) {
      console.error('Error seeding categories:', error)
    } else {
      setCategories(data)
    }
    setLoading(false)
  }

  async function addCategory(name, color = '#6b7280') {
    const { data, error } = await supabase
      .from('categories')
      .insert({
        user_id: user.id,
        name,
        color,
        order: categories.length,
      })
      .select()
      .single()

    if (error) {
      console.error('Error adding category:', error)
      return null
    }
    setCategories([...categories, data])
    return data
  }

  async function deleteCategory(id) {
    const { error } = await supabase
      .from('categories')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting category:', error)
      return false
    }
    setCategories(categories.filter((c) => c.id !== id))
    return true
  }

  async function updateCategory(id, updates) {
    const { data, error } = await supabase
      .from('categories')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Error updating category:', error)
      return null
    }
    setCategories(categories.map((c) => (c.id === id ? data : c)))
    return data
  }

  return {
    categories,
    loading,
    addCategory,
    deleteCategory,
    updateCategory,
    refetch: fetchCategories,
  }
}

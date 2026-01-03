import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from './useAuth'
import { startOfYear, endOfYear, format } from 'date-fns'

export function useEntries(year = new Date().getFullYear()) {
  const { user } = useAuth()
  const [entries, setEntries] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      fetchEntries()
    }
  }, [user, year])

  async function fetchEntries() {
    setLoading(true)
    const startDate = format(startOfYear(new Date(year, 0, 1)), 'yyyy-MM-dd')
    const endDate = format(endOfYear(new Date(year, 0, 1)), 'yyyy-MM-dd')

    const { data, error } = await supabase
      .from('entries')
      .select('*')
      .eq('user_id', user.id)
      .gte('date', startDate)
      .lte('date', endDate)

    if (error) {
      console.error('Error fetching entries:', error)
    } else {
      setEntries(data)
    }
    setLoading(false)
  }

  async function upsertEntry(categoryId, date, rating, note = '') {
    const dateStr = format(date, 'yyyy-MM-dd')

    const existingEntry = entries.find(
      (e) => e.category_id === categoryId && e.date === dateStr
    )

    if (existingEntry) {
      const { data, error } = await supabase
        .from('entries')
        .update({ rating, note })
        .eq('id', existingEntry.id)
        .select()
        .single()

      if (error) {
        console.error('Error updating entry:', error)
        return null
      }
      setEntries(entries.map((e) => (e.id === existingEntry.id ? data : e)))
      return data
    } else {
      const { data, error } = await supabase
        .from('entries')
        .insert({
          user_id: user.id,
          category_id: categoryId,
          date: dateStr,
          rating,
          note,
        })
        .select()
        .single()

      if (error) {
        console.error('Error creating entry:', error)
        return null
      }
      setEntries([...entries, data])
      return data
    }
  }

  async function deleteEntry(id) {
    const { error } = await supabase
      .from('entries')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting entry:', error)
      return false
    }
    setEntries(entries.filter((e) => e.id !== id))
    return true
  }

  function getEntriesForDate(date) {
    const dateStr = format(date, 'yyyy-MM-dd')
    return entries.filter((e) => e.date === dateStr)
  }

  function getEntryForDateAndCategory(date, categoryId) {
    const dateStr = format(date, 'yyyy-MM-dd')
    return entries.find(
      (e) => e.date === dateStr && e.category_id === categoryId
    )
  }

  return {
    entries,
    loading,
    upsertEntry,
    deleteEntry,
    getEntriesForDate,
    getEntryForDateAndCategory,
    refetch: fetchEntries,
  }
}

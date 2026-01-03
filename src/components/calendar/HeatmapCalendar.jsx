import { useMemo } from 'react'
import {
  format,
  isToday,
  addDays,
  differenceInWeeks,
  startOfWeek,
} from 'date-fns'
import { CalendarCell } from './CalendarCell'
import { CalendarLegend } from './CalendarLegend'

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export function HeatmapCalendar({
  entries,
  selectedCategoryId,
  onDayClick,
  year = new Date().getFullYear(),
}) {
  const { weeks, monthLabels } = useMemo(() => {
    const yearStart = new Date(year, 0, 1)
    const yearEnd = new Date(year, 11, 31)
    const calendarStart = startOfWeek(yearStart, { weekStartsOn: 0 })
    const totalWeeks = differenceInWeeks(yearEnd, calendarStart) + 2

    const entryMap = new Map()
    entries.forEach((entry) => {
      const key = `${entry.date}-${entry.category_id}`
      entryMap.set(key, entry)
    })

    const weeksArray = []
    const monthLabelsArray = []
    let currentMonth = -1

    for (let week = 0; week < totalWeeks; week++) {
      const weekDays = []
      const weekStart = addDays(calendarStart, week * 7)

      for (let day = 0; day < 7; day++) {
        const date = addDays(weekStart, day)
        const isInYear = date.getFullYear() === year

        // Track month changes on Sundays (first day of week)
        if (day === 0 && isInYear) {
          const month = date.getMonth()
          if (month !== currentMonth) {
            monthLabelsArray.push({ month: MONTHS[month], weekIndex: week })
            currentMonth = month
          }
        }

        const dateStr = format(date, 'yyyy-MM-dd')
        let rating = null

        if (isInYear) {
          if (selectedCategoryId === 'all') {
            const dayEntries = entries.filter((e) => e.date === dateStr)
            if (dayEntries.length > 0) {
              const hasBad = dayEntries.some((e) => e.rating === 'bad')
              const hasAverage = dayEntries.some((e) => e.rating === 'average')
              const hasGood = dayEntries.some((e) => e.rating === 'good')
              if (hasBad) rating = 'bad'
              else if (hasAverage) rating = 'average'
              else if (hasGood) rating = 'good'
            }
          } else {
            const entry = entryMap.get(`${dateStr}-${selectedCategoryId}`)
            rating = entry?.rating || null
          }
        }

        weekDays.push({ date, rating, isInYear })
      }
      weeksArray.push(weekDays)
    }

    return { weeks: weeksArray, monthLabels: monthLabelsArray }
  }, [entries, selectedCategoryId, year])

  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">{year}</h2>
        <CalendarLegend />
      </div>

      {/* Month labels */}
      <div className="relative h-6 ml-12 mb-2">
        {monthLabels.map(({ month, weekIndex }, i) => (
          <span
            key={`${month}-${i}`}
            className="absolute text-sm text-gray-500 font-medium"
            style={{ left: `${weekIndex * 15}px` }}
          >
            {month}
          </span>
        ))}
      </div>

      <div className="flex">
        {/* Day labels */}
        <div className="flex flex-col gap-[3px] mr-3">
          {DAYS.map((day, i) => (
            <div
              key={day}
              className="h-[14px] text-xs text-gray-400 flex items-center justify-end pr-1"
              style={{ visibility: i % 2 === 1 ? 'visible' : 'hidden' }}
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="flex gap-[3px]">
          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="flex flex-col gap-[3px]">
              {week.map((day, dayIndex) => (
                <CalendarCell
                  key={`${weekIndex}-${dayIndex}`}
                  date={day.date}
                  rating={day.isInYear ? day.rating : null}
                  onClick={day.isInYear ? onDayClick : undefined}
                  isToday={isToday(day.date)}
                  disabled={!day.isInYear}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

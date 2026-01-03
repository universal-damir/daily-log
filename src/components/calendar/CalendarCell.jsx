import { format } from 'date-fns'

const RATING_COLORS = {
  good: 'bg-emerald-300',
  average: 'bg-amber-200',
  bad: 'bg-rose-300',
  empty: 'bg-gray-100',
}

export function CalendarCell({ date, rating, onClick, isToday, disabled }) {
  if (disabled) {
    return <div className="w-[14px] h-[14px]" />
  }

  const colorClass = RATING_COLORS[rating] || RATING_COLORS.empty

  return (
    <button
      onClick={() => onClick?.(date)}
      className={`w-[14px] h-[14px] rounded-[3px] ${colorClass} transition-all hover:scale-110 ${
        isToday ? 'ring-2 ring-blue-400 ring-offset-1' : ''
      }`}
      title={format(date, 'EEEE, MMM d, yyyy')}
    />
  )
}

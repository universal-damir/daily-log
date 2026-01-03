import { format } from 'date-fns'

const RATING_COLORS = {
  good: 'bg-green-500',
  average: 'bg-yellow-400',
  bad: 'bg-red-500',
  empty: 'bg-gray-200',
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
        isToday ? 'ring-2 ring-blue-500 ring-offset-1' : ''
      }`}
      title={format(date, 'EEEE, MMM d, yyyy')}
    />
  )
}

export function CalendarLegend() {
  return (
    <div className="flex items-center gap-2 text-sm text-gray-500">
      <span>Less</span>
      <div className="flex gap-1">
        <div className="w-[14px] h-[14px] rounded-[3px] bg-gray-200" />
        <div className="w-[14px] h-[14px] rounded-[3px] bg-red-500" />
        <div className="w-[14px] h-[14px] rounded-[3px] bg-yellow-400" />
        <div className="w-[14px] h-[14px] rounded-[3px] bg-green-500" />
      </div>
      <span>More</span>
    </div>
  )
}

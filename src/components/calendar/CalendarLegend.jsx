export function CalendarLegend() {
  return (
    <div className="flex items-center gap-2 text-sm text-gray-500">
      <span>Less</span>
      <div className="flex gap-1">
        <div className="w-[14px] h-[14px] rounded-[3px] bg-gray-100" />
        <div className="w-[14px] h-[14px] rounded-[3px] bg-rose-300" />
        <div className="w-[14px] h-[14px] rounded-[3px] bg-amber-200" />
        <div className="w-[14px] h-[14px] rounded-[3px] bg-emerald-300" />
      </div>
      <span>More</span>
    </div>
  )
}

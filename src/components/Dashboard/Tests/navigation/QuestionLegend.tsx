import React from 'react'

export type QuestionStatus = 'unattempted' | 'attempted' | 'marked' | 'current'

type LegendItem = {
  status: QuestionStatus
  label: string
  count: number
}

type Props = {
  items: LegendItem[]
  compact?: boolean
}

const statusStyles: Record<QuestionStatus, string> = {
  unattempted: 'border-white/10 bg-transparent',
  attempted: 'border-emerald-500/30 bg-emerald-500/20',
  marked: 'border-amber-500/30 bg-amber-500/20',
  current: 'border-white/40 bg-white/20',
}

const QuestionLegend: React.FC<Props> = ({ items, compact }) => {
  return (
    <div className={compact ? 'flex flex-col gap-2' : 'flex items-center gap-4'}>
      {items.map((item) => (
        <div key={item.status} className="flex items-center gap-2">
          <div
            className={`h-3 w-3 rounded border ${statusStyles[item.status]}`}
          />
          <span className="text-xs text-neutral-400">
            {item.label} ({item.count})
          </span>
        </div>
      ))}
    </div>
  )
}

export default QuestionLegend

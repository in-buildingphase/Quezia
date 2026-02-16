import React, { useState, useRef, useEffect } from 'react'
import { ChartBar } from '@phosphor-icons/react'
import AttemptsAnalyticsPopup, { type Attempt } from '../analytics/AttemptsAnalyticsPopup'

type Props = {
  threadId: string
  title?: string
  attempts: Attempt[]
  onStartTest: () => void
}

const ThreadHeader: React.FC<Props> = ({ threadId, title, attempts, onStartTest }) => {
  const [isAnalyticsOpen, setIsAnalyticsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsAnalyticsOpen(false)
      }
    }
    if (isAnalyticsOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isAnalyticsOpen])

  return (
    <div className="mb-4 flex items-center justify-between" ref={containerRef}>
      <div>
        <p className="text-xs uppercase tracking-wide text-neutral-500">
          Test thread
        </p>
        <h1 className="mt-1 text-lg font-medium text-neutral-200">
          {title || `Thread #${threadId}`}
        </h1>
      </div>

      <div className="relative">
        <button
          onClick={() => setIsAnalyticsOpen(!isAnalyticsOpen)}
          className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-all ${isAnalyticsOpen
            ? 'bg-white text-neutral-900 shadow-lg shadow-white/10'
            : 'bg-white/5 text-neutral-400 hover:bg-white/10 hover:text-white border border-white/5'
            }`}
        >
          <ChartBar size={18} weight={isAnalyticsOpen ? "fill" : "regular"} />
          <span>Analytics</span>
        </button>

        {isAnalyticsOpen && (
          <AttemptsAnalyticsPopup
            testId={threadId}
            attempts={attempts}
            onStartTest={onStartTest}
            onClose={() => setIsAnalyticsOpen(false)}
          />
        )}
      </div>
    </div>
  )
}

export default ThreadHeader

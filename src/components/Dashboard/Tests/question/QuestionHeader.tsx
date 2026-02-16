import React from 'react'
import { Bug } from '@phosphor-icons/react'

type Props = {
  questionNumber: number
  totalQuestions: number
  marks: number
  onReportIssue: () => void
}

const QuestionHeader: React.FC<Props> = ({ questionNumber, totalQuestions, marks, onReportIssue }) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium text-neutral-200">
          Question {questionNumber}
        </span>
        <span className="text-xs text-neutral-500">
          of {totalQuestions}
        </span>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-xs text-neutral-400">
          {marks} mark{marks !== 1 ? 's' : ''}
        </span>
        <button
          onClick={onReportIssue}
          className="flex items-center gap-1.5 px-2 py-1 rounded-md border border-white/10 bg-white/[0.03] text-neutral-400 hover:bg-white/[0.06] hover:text-neutral-200 hover:border-white/20 transition-all text-xs"
          title="Report issue"
        >
          <Bug size={12} weight="bold" />
          <span>Report</span>
        </button>
      </div>
    </div>
  )
}

export default QuestionHeader

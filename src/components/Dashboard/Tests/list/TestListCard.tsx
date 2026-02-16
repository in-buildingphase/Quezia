import React from 'react'
import { useNavigate } from 'react-router-dom'
import { CaretRight } from '@phosphor-icons/react'

export type TestStatus = 'IN_PROGRESS' | 'COMPLETED' | 'GENERATED'

export type TestCardData = {
  id: string
  title: string
  subject: string
  status: TestStatus
  totalQuestions: number
  attemptedQuestions?: number
  score?: number
  totalMarks?: number
  createdAt: string
  lastInteractedAt: string
}

type Props = {
  test: TestCardData
}

const TestListCard: React.FC<Props> = ({ test }) => {
  const navigate = useNavigate()

  const statusColor = {
    IN_PROGRESS: 'bg-amber-400',
    COMPLETED: 'bg-emerald-400',
    GENERATED: 'bg-neutral-500',
  }[test.status]

  const formatDate = (iso: string) => {
    const date = new Date(iso)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  const handleClick = () => {
    navigate(`/dashboard/tests/thread/${test.id}`)
  }

  // Right side value based on status
  const renderRightValue = () => {
    if (test.status === 'COMPLETED' && test.score !== undefined && test.totalMarks !== undefined) {
      return <span className="text-sm tabular-nums text-emerald-400">{test.score}/{test.totalMarks}</span>
    }
    if (test.status === 'IN_PROGRESS' && test.attemptedQuestions !== undefined) {
      return <span className="text-sm tabular-nums text-neutral-500">{test.attemptedQuestions}/{test.totalQuestions}</span>
    }
    if (test.status === 'GENERATED' && test.totalMarks !== undefined) {
      return <span className="text-sm tabular-nums text-neutral-600">{test.totalMarks} marks</span>
    }
    return null
  }

  return (
    <button
      onClick={handleClick}
      className="w-full text-left group py-4 px-1 flex items-center gap-4 border-b border-white/[0.04] last:border-b-0 hover:bg-white/[0.015] -mx-1 transition"
    >
      {/* Status dot */}
      <div className={`flex-shrink-0 w-2 h-2 rounded-full ${statusColor}`} />

      {/* Main content */}
      <div className="flex-1 min-w-0">
        <h3 className="text-[15px] text-neutral-200 truncate group-hover:text-white transition">
          {test.title}
        </h3>
        <p className="text-xs text-neutral-500 mt-1">
          {test.subject} · {test.totalQuestions} questions · {formatDate(test.createdAt)}
        </p>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3 flex-shrink-0">
        {renderRightValue()}
        <CaretRight size={14} weight="bold" className="text-neutral-600 group-hover:text-neutral-400 transition" />
      </div>
    </button>
  )
}

export default TestListCard

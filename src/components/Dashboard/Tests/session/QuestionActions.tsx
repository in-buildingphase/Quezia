import React from 'react'
import { Flag, Eraser } from '@phosphor-icons/react'

type Props = {
  isMarkedForReview: boolean
  onMarkForReview: () => void
  onClearResponse: () => void
  hasResponse: boolean
}

const QuestionActions: React.FC<Props> = ({
  isMarkedForReview,
  onMarkForReview,
  onClearResponse,
  hasResponse,
}) => {
  return (
    <div className="mt-8 flex items-center gap-3">
      <button
        onClick={onMarkForReview}
        className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-sm transition ${
          isMarkedForReview
            ? 'border-amber-500/30 bg-amber-500/10 text-amber-400'
            : 'border-white/5 bg-white/[0.02] text-neutral-400 hover:border-white/10 hover:text-neutral-300'
        }`}
      >
        <Flag className="h-4 w-4" weight={isMarkedForReview ? 'fill' : 'regular'} />
        {isMarkedForReview ? 'Marked' : 'Mark for review'}
      </button>

      <button
        onClick={onClearResponse}
        disabled={!hasResponse}
        className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-sm transition ${
          hasResponse
            ? 'border-white/5 bg-white/[0.02] text-neutral-400 hover:border-white/10 hover:text-neutral-300'
            : 'border-white/5 bg-white/[0.01] text-neutral-600 cursor-not-allowed'
        }`}
      >
        <Eraser className="h-4 w-4" />
        Clear response
      </button>
    </div>
  )
}

export default QuestionActions

import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CaretLeft } from '@phosphor-icons/react'
import ConfirmModal from '../../../common/ConfirmModal'

export type TestStats = {
  total: number
  attempted: number
  unattempted: number
  markedForReview: number
}

type Props = {
  title: string
  subject?: string
  timeRemaining?: string
  stats: TestStats
  onSubmit: () => void
}

const TestSessionHeader: React.FC<Props> = ({ title, subject, timeRemaining, stats, onSubmit }) => {
  const navigate = useNavigate()
  const [showLeaveModal, setShowLeaveModal] = useState(false)
  const [showSubmitModal, setShowSubmitModal] = useState(false)

  const handleLeave = () => {
    setShowLeaveModal(false)
    navigate(-1)
  }

  const handleConfirmSubmit = () => {
    setShowSubmitModal(false)
    onSubmit()
  }

  const submitDescription = (
    <div className="space-y-3">
      <p className="text-neutral-400">Are you sure you want to submit? You won't be able to change your answers after submission.</p>
      <div className="grid grid-cols-2 gap-3 pt-2">
        <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-3 py-2">
          <div className="text-lg font-semibold text-emerald-400">{stats.attempted}</div>
          <div className="text-xs text-neutral-400">Attempted</div>
        </div>
        <div className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2">
          <div className="text-lg font-semibold text-neutral-300">{stats.unattempted}</div>
          <div className="text-xs text-neutral-400">Unattempted</div>
        </div>
        <div className="rounded-lg border border-amber-500/20 bg-amber-500/10 px-3 py-2">
          <div className="text-lg font-semibold text-amber-400">{stats.markedForReview}</div>
          <div className="text-xs text-neutral-400">Marked for Review</div>
        </div>
        <div className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2">
          <div className="text-lg font-semibold text-neutral-300">{stats.total}</div>
          <div className="text-xs text-neutral-400">Total Questions</div>
        </div>
      </div>
    </div>
  )

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 h-14 border-b border-white/5 bg-neutral-950">
        <div className="h-full max-w-screen-xl mx-auto px-6 flex items-center justify-between">
          {/* Left: Back + Test context */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowLeaveModal(true)}
              className="p-1.5 -ml-1.5 rounded-lg text-neutral-400 hover:text-neutral-200 hover:bg-white/5 transition"
              title="Leave test"
            >
              <CaretLeft size={18} weight="bold" />
            </button>
            <h1 className="text-sm font-medium text-neutral-200">
              {title}
            </h1>
            {subject && (
              <>
                <span className="text-neutral-600">·</span>
                <span className="text-sm text-neutral-400">{subject}</span>
              </>
            )}
          </div>

          {/* Right: Timer + Submit */}
          <div className="flex items-center gap-4">
            {timeRemaining && (
              <div className="text-sm font-mono text-neutral-300">
                {timeRemaining}
              </div>
            )}
            <button
              onClick={() => setShowSubmitModal(true)}
              className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-neutral-900 hover:bg-neutral-200 transition"
            >
              Submit Test
            </button>
          </div>
        </div>
      </header>

      {/* Leave Modal */}
      <ConfirmModal
        isOpen={showLeaveModal}
        onClose={() => setShowLeaveModal(false)}
        title="Leave Test?"
        description="You can rejoin anytime, but the timer will keep running. If the test ends while you're away, it will be auto-submitted and recorded."
        cancelButton={{
          label: 'Stay',
          onClick: () => setShowLeaveModal(false),
        }}
        confirmButton={{
          label: 'Leave',
          onClick: handleLeave,
          variant: 'danger',
        }}
      />

      {/* Submit Confirmation Modal */}
      <ConfirmModal
        isOpen={showSubmitModal}
        onClose={() => setShowSubmitModal(false)}
        title="Submit Test?"
        description={submitDescription}
        cancelButton={{
          label: 'Review Again',
          onClick: () => setShowSubmitModal(false),
        }}
        confirmButton={{
          label: 'Submit',
          onClick: handleConfirmSubmit,
          variant: 'primary',
        }}
      />
    </>
  )
}

export default TestSessionHeader

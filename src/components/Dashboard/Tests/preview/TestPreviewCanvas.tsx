import React, { useState, useRef, useEffect } from 'react'
import { Bug, CaretDown, ArrowsOut, ArrowsIn } from '@phosphor-icons/react'
import QuestionPreviewCard, { type Question } from './QuestionPreviewCard'
import ReportIssueModal from '../../../common/ReportIssueModal'

export type Version = {
  id: string
  label: string
  createdAt: string
}

type Props = {
  prompt: string
  versions: Version[]
  questions: Question[]
  currentVersion?: string
  onVersionChange?: (versionId: string) => void
  onStartTest: () => void
  onRegenerateQuestion?: (id: number) => void
  testId?: string
}

const TestPreviewCanvas: React.FC<Props> = ({
  prompt,
  versions,
  questions,
  currentVersion,
  onVersionChange,
  onStartTest,
  onRegenerateQuestion,
  testId,
}) => {
  const [isVersionOpen, setIsVersionOpen] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [isReportModalOpen, setIsReportModalOpen] = useState(false)
  const [reportingQuestionId, setReportingQuestionId] = useState<number | null>(null)
  const versionRef = useRef<HTMLDivElement>(null)

  const selectedVersion = currentVersion || versions[0]?.label || 'v1'

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (versionRef.current && !versionRef.current.contains(e.target as Node)) {
        setIsVersionOpen(false)
      }
    }

    if (isVersionOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isVersionOpen])

  return (
    <>
      <div className={`${isExpanded
        ? 'fixed inset-0 z-50 rounded-none'
        : 'relative flex-1 rounded-2xl mb-4'
        } border border-white/10 bg-neutral-900/80 backdrop-blur p-6 flex flex-col overflow-hidden`}>

        {/* HEADER */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-white/5">
          {/* Prompt text */}
          <div className="flex-1 min-w-0 max-w-[70%]">
            <p className="text-[10px] uppercase tracking-wider text-neutral-500 mb-1">
              Generated from prompt
            </p>
            <div className="max-h-12 overflow-y-auto scrollbar-none">
              <p className="text-sm font-medium text-neutral-100 leading-snug">
                {prompt}
              </p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2">
            {/* Expand/Shrink */}
            <button
              onClick={() => setIsExpanded((e) => !e)}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-neutral-400 hover:bg-white/10"
              title={isExpanded ? 'Shrink' : 'Expand'}
            >
              {isExpanded ? <ArrowsIn className="h-4 w-4" /> : <ArrowsOut className="h-4 w-4" />}
            </button>

            {/* Bug report */}
            <button
              onClick={() => {
                setReportingQuestionId(questions[0]?.id ?? 1)
                setIsReportModalOpen(true)
              }}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-neutral-400 hover:bg-white/10"
              title="Report issue"
            >
              <Bug className="h-4 w-4" />
            </button>

            {/* Version dropdown */}
            <div className="relative" ref={versionRef}>
              <button
                onClick={() => setIsVersionOpen((v) => !v)}
                className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-neutral-300 hover:bg-white/10"
              >
                {selectedVersion}
                <CaretDown className="h-3 w-3 text-neutral-400" />
              </button>

              {isVersionOpen && (
                <div className="absolute right-0 mt-2 w-44 rounded-xl border border-white/10 bg-black/70 backdrop-blur-md p-1 z-20">
                  {versions.map((v) => (
                    <button
                      key={v.id}
                      onClick={() => {
                        onVersionChange?.(v.id)
                        setIsVersionOpen(false)
                      }}
                      className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm text-neutral-300 hover:bg-white/10"
                    >
                      <span>{v.label}</span>
                      <span className="text-xs text-neutral-500">
                        {v.createdAt}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* QUESTIONS */}
        <div className="flex-1 overflow-y-auto pr-2 space-y-8 scrollbar-none">
          {questions.map((q) => (
            <QuestionPreviewCard
              key={q.id}
              question={q}
              onRegenerate={onRegenerateQuestion}
            />
          ))}
        </div>

        {/* BOTTOM GRADIENT */}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-neutral-900 to-transparent" />

        {/* START TEST */}
        <div className="absolute bottom-4 right-4">
          <button
            onClick={onStartTest}
            className="rounded-xl bg-white px-5 py-2.5 text-sm font-medium text-neutral-900 hover:bg-neutral-200 transition"
          >
            Start Test
          </button>
        </div>
      </div>

      {/* Report Issue Modal - outside card for full-page overlay */}
      <ReportIssueModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        questionNumber={reportingQuestionId ?? 1}
        questionId={reportingQuestionId ?? 1}
        testId={testId}
      />
    </>
  )
}

export default TestPreviewCanvas

import React, { useState } from 'react'
import { PencilSimple, Check } from '@phosphor-icons/react'
import { parseDuration, formatDuration } from '../../../types/test'

export type TestInstructionsPreset = {
  title: string
  subtitle?: string
  duration: string
  sections?: string[]
  marking: {
    correct: string
    incorrect: string
    unattempted: string
  }
  rules: string[]
  queziaNote?: string
}

type Props = {
  preset: TestInstructionsPreset
  questionsCount?: number
  onStart: () => void
  onDurationChange?: (minutes: number) => void
  mock?: boolean
}

const TestPreviewRulesCard: React.FC<Props> = ({ preset, questionsCount, onStart, onDurationChange, mock = false }) => {
  const [isEditingDuration, setIsEditingDuration] = useState(false)
  const [durationMinutes, setDurationMinutes] = useState(() => parseDuration(preset.duration))
  const [durationInput, setDurationInput] = useState(preset.duration)

  const handleDurationSave = () => {
    const minutes = parseDuration(durationInput)
    setDurationMinutes(minutes)
    onDurationChange?.(minutes)
    setIsEditingDuration(false)
  }

  return (
    <div className="w-full max-w-md rounded-2xl border border-white/10 bg-neutral-900/70 backdrop-blur px-6 py-5">

      {/* TITLE */}
      <div className="mb-4">
        <p className="text-xs uppercase tracking-wide text-neutral-500">
          {mock ? 'Mock test' : 'Custom test'}
        </p>
        <h2 className="mt-1 text-base font-medium text-neutral-200">
          {preset.title}
        </h2>
        {preset.subtitle && (
          <p className="mt-0.5 text-sm text-neutral-400">
            {preset.subtitle}
          </p>
        )}
      </div>

      {/* META */}
      <div className="mb-4 flex items-center justify-between text-sm">
        <div>
          <p className="text-neutral-500">Duration</p>
          {mock ? (
            <p className="text-neutral-200">{formatDuration(durationMinutes)}</p>
          ) : (
            <div className="flex items-center gap-2">
              {isEditingDuration ? (
                <>
                  <input
                    type="text"
                    value={durationInput}
                    onChange={(e) => setDurationInput(e.target.value)}
                    className="w-20 rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-neutral-200 outline-none focus:border-white/20"
                    autoFocus
                    onKeyDown={(e) => e.key === 'Enter' && handleDurationSave()}
                  />
                  <button
                    onClick={handleDurationSave}
                    className="rounded-md p-1 text-neutral-400 hover:bg-white/10 hover:text-neutral-200"
                  >
                    <Check className="h-4 w-4" />
                  </button>
                </>
              ) : (
                <>
                  <p className="text-neutral-200">{formatDuration(durationMinutes)}</p>
                  <button
                    onClick={() => setIsEditingDuration(true)}
                    className="rounded-md p-1 text-neutral-400 hover:bg-white/10 hover:text-neutral-200"
                  >
                    <PencilSimple className="h-4 w-4" />
                  </button>
                </>
              )}
            </div>
          )}
        </div>
        {questionsCount !== undefined && (
          <div>
            <p className="text-neutral-500">Questions</p>
            <p className="text-neutral-200">{questionsCount}</p>
          </div>
        )}
        {preset.sections && preset.sections.length > 0 && (
          <div className="text-right">
            <p className="text-neutral-500">Sections</p>
            <p className="text-neutral-200">
              {preset.sections.length}
            </p>
          </div>
        )}
      </div>

      {/* RULES (compact) */}
      <ul className="mb-4 space-y-2 text-sm text-neutral-300">
        {preset.rules.slice(0, 5).map((rule, i) => (
          <li key={i} className="flex gap-2">
            <span className="text-neutral-500">•</span>
            <span>{rule}</span>
          </li>
        ))}
      </ul>

      {/* QUEZIA NOTE */}
      {preset.queziaNote && (
        <p className="mb-4 text-xs text-neutral-400">
          {preset.queziaNote}
        </p>
      )}

      {/* CTA */}
      <button
        onClick={onStart}
        className="w-full rounded-xl bg-white py-2.5 text-sm font-medium text-neutral-900 hover:bg-neutral-200 transition"
      >
        Start Test
      </button>
    </div>
  )
}

export default TestPreviewRulesCard

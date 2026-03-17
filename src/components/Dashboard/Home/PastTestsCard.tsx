import React from 'react'

interface PastTestCardProps {
  id: string
  title: string
  originType: 'SYSTEM' | 'GENERATED'
  createdAt: string
  subjects: string[]
  difficulty?: string | null
  attemptsCount: number
  lastActivityAt: string
  latestAttempt?: {
    status: 'ACTIVE' | 'COMPLETED' | 'ABANDONED'
    startedAt: string
    completedAt: string | null
    score: number | string | null
    accuracy: number | string | null
  }

  onOpen: (testId: string) => void
}

const PastTestCard: React.FC<PastTestCardProps> = ({
  id,
  title,
  originType,
  createdAt,
  subjects,
  difficulty,
  attemptsCount,
  lastActivityAt,
  latestAttempt,
  onOpen,
}) => {
  const [now] = React.useState(() => Date.now())

  const formatDate = (iso: string) => {
    const date = new Date(iso)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  const formatRelativeTime = (iso: string) => {
    const diff = now - new Date(iso).getTime()
    const hours = Math.floor(diff / (1000 * 60 * 60))

    if (hours < 1) return 'Just now'
    if (hours < 24) return `${hours}h ago`

    return `${Math.floor(hours / 24)}d ago`
  }

  const toFiniteNumber = (value: number | string | null | undefined) => {
    if (value === null || value === undefined) return null

    if (typeof value === 'number') {
      return Number.isFinite(value) ? value : null
    }

    if (typeof value === 'string') {
      const parsed = Number(value)
      return Number.isFinite(parsed) ? parsed : null
    }

    return null
  }

  const formatScore = (score: number | string | null) => {
    const numericScore = toFiniteNumber(score)
    if (numericScore === null) return '--'

    return Number.isInteger(numericScore) ? `${numericScore}` : numericScore.toFixed(1)
  }

  const attemptStatusConfig = latestAttempt
    ? {
      ACTIVE: {
        label: 'Active',
        color: 'text-[var(--color-warning)]',
      },
      COMPLETED: {
        label: 'Completed',
        color: 'text-[var(--color-success)]',
      },
      ABANDONED: {
        label: 'Abandoned',
        color: 'text-[var(--color-error)]',
      },
    }[latestAttempt.status]
    : null

  const originLabel = originType === 'SYSTEM' ? 'System' : 'Generated'
  const subjectLabel = subjects.length > 0 ? subjects.join(', ') : '—'

  const ctaLabel = latestAttempt?.status === 'ACTIVE'
    ? 'Continue thread'
    : latestAttempt?.status === 'COMPLETED'
      ? 'Review thread'
      : 'Open thread'

  const scoreLabel = latestAttempt?.status === 'COMPLETED'
    ? formatScore(latestAttempt.score)
    : '--'

  const accuracyValue = toFiniteNumber(latestAttempt?.accuracy)

  const accuracyLabel = latestAttempt?.status === 'COMPLETED' && accuracyValue !== null
    ? `${Math.round(accuracyValue)}%`
    : '--'

  return (
    <div
      className="
    min-w-[300px]
    max-w-[320px]
    min-h-[332px]
    shrink-0
    rounded-2xl
    bg-[var(--color-bg-subtle)]
    border border-[var(--color-border-default)]
    p-3.5
    flex flex-col
    transition-all duration-200
    hover:-translate-y-1 hover:border-[var(--color-border-hover)]
  "
    >
      <div className="flex h-full flex-col gap-2.5">
        <div className="flex items-center justify-between gap-2">
          <span className="inline-flex items-center rounded-full border border-[var(--color-border-default)] bg-[var(--color-bg-base)] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-[var(--color-text-tertiary)]">
            {originLabel}
          </span>

          {attemptStatusConfig && (
            <span className={`text-[11px] font-medium ${attemptStatusConfig.color}`}>
              {attemptStatusConfig.label}
            </span>
          )}
        </div>

        <p className="text-sm font-medium text-[var(--color-text-primary)] leading-snug line-clamp-2 min-h-[40px]">
          {title}
        </p>

        <div className="rounded-xl border border-[var(--color-border-default)] bg-[var(--color-bg-base)] px-2.5 py-2 grid grid-cols-3 gap-x-2">
          <div className="min-w-0">
            <p className="text-[10px] text-[var(--color-text-disabled)]">Subjects</p>
            <p className="text-xs text-[var(--color-text-tertiary)] truncate">{subjectLabel}</p>
          </div>
          <div>
            <p className="text-[10px] text-[var(--color-text-disabled)]">Difficulty</p>
            <p className="text-xs text-[var(--color-text-tertiary)]">{difficulty || '—'}</p>
          </div>
          <div>
            <p className="text-[10px] text-[var(--color-text-disabled)]">Attempts</p>
            <p className="text-xs text-[var(--color-text-tertiary)]">{attemptsCount}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="rounded-lg border border-[var(--color-border-default)] bg-[var(--color-bg-base)] px-2 py-1.5">
            <p className="text-[var(--color-text-disabled)]">Score</p>
            <p className="text-[var(--color-text-primary)] font-medium">{scoreLabel}</p>
          </div>
          <div className="rounded-lg border border-[var(--color-border-default)] bg-[var(--color-bg-base)] px-2 py-1.5">
            <p className="text-[var(--color-text-disabled)]">Accuracy</p>
            <p className="text-[var(--color-text-primary)] font-medium">{accuracyLabel}</p>
          </div>
        </div>

        <div className="space-y-1 text-xs text-[var(--color-text-tertiary)]">
          <p>Created: {formatDate(createdAt)}</p>
          <p>Last activity: {formatRelativeTime(lastActivityAt)}</p>
        </div>

        <button
          onClick={() => onOpen(id)}
          className="
        mt-auto
        w-full
        rounded-lg
        border border-[var(--color-border-default)]
        bg-[var(--color-bg-muted)]
        py-2
        text-sm
        text-[var(--color-text-primary)]
        transition
        hover:bg-[var(--color-bg-subtle)]
      "
        >
          {ctaLabel}
        </button>
      </div>
    </div>
  )
}

export default PastTestCard

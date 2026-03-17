import React, { useEffect, useMemo, useState } from 'react'
import PastTestCard from './PastTestsCard'
import SectionStrip from '../../common/SectionStrip'
import LoadingSpinner from '../../common/LoadingSpinner'
import { ArrowUpRight } from '@phosphor-icons/react'
import { useTests } from '../../../hooks/useTests'
import { useAuth } from '../../../hooks/useAuth'
import { testEngineService, type Attempt, type TestThread } from '../../../services/test-engine/test-engine.service'

const PastTestsStrip: React.FC = () => {
  const { threads, refreshThreads, isLoading } = useTests()
  const { user } = useAuth()
  const [attemptsByThread, setAttemptsByThread] = useState<Record<string, Attempt[]>>({})
  const [isAttemptsLoading, setIsAttemptsLoading] = useState(false)

  useEffect(() => {
    void refreshThreads()
  }, [refreshThreads])

  const learnerThreads = useMemo(() => {
    return threads.filter((t: TestThread) => {
      if (user?.role === 'ADMIN') return true
      return t.createdByUserId === user?.id && t.originType !== 'SYSTEM'
    })
  }, [threads, user])

  useEffect(() => {
    let isCancelled = false

    const loadAttemptsByThread = async () => {
      if (learnerThreads.length === 0) {
        setAttemptsByThread({})
        setIsAttemptsLoading(false)
        return
      }

      setIsAttemptsLoading(true)

      try {
        const results = await Promise.all(
          learnerThreads.map(async (thread) => {
            const threadAttempts = await testEngineService.getAttempts(thread.id)
            return [thread.id, threadAttempts] as const
          })
        )

        if (!isCancelled) {
          setAttemptsByThread(Object.fromEntries(results))
        }
      } catch {
        if (!isCancelled) {
          setAttemptsByThread({})
        }
      } finally {
        if (!isCancelled) {
          setIsAttemptsLoading(false)
        }
      }
    }

    void loadAttemptsByThread()

    return () => {
      isCancelled = true
    }
  }, [learnerThreads])

  const realTests = useMemo(() => {
    return learnerThreads
      .map((thread) => {
        const threadAttempts = attemptsByThread[thread.id] ?? []

        const latestAttempt = [...threadAttempts].sort(
          (a, b) => new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime()
        )[0]

        const config = thread.baseGenerationConfig as { subjects?: unknown; difficulty?: unknown }
        const subjects = Array.isArray(config.subjects)
          ? config.subjects.filter((value): value is string => typeof value === 'string' && value.trim().length > 0)
          : typeof config.subjects === 'string' && config.subjects.trim().length > 0
            ? [config.subjects]
            : []

        const difficulty = typeof config.difficulty === 'string' && config.difficulty.trim().length > 0
          ? config.difficulty
          : null

        return {
          id: thread.id,
          title: thread.title,
          originType: thread.originType,
          createdAt: thread.createdAt,
          subjects,
          difficulty,
          attemptsCount: threadAttempts.length,
          lastActivityAt: latestAttempt?.startedAt || thread.createdAt,
          latestAttempt: latestAttempt
            ? {
              status: latestAttempt.status,
              startedAt: latestAttempt.startedAt,
              completedAt: latestAttempt.completedAt,
              score: latestAttempt.totalScore,
              accuracy: latestAttempt.accuracy,
            }
            : undefined,
        }
      })
      .sort((a, b) => new Date(b.lastActivityAt).getTime() - new Date(a.lastActivityAt).getTime())
  }, [learnerThreads, attemptsByThread])

  const isPastTestsLoading = isLoading || isAttemptsLoading

  const handleOpenTest = (testId: string) => {
    window.location.href = `/dashboard/tests/thread/${testId}`
  }

  const actions = (
    <button
      onClick={() => window.location.href = '/dashboard/tests'}
      className="h-7 w-7 rounded-md border border-white/10 hover:bg-white/5 transition flex items-center justify-center"
    >
      <ArrowUpRight size={14} className="text-white" />
    </button>
  )

  return (
    <SectionStrip title="Past tests" actions={actions} className="max-w-screen-xl">
      {/* Horizontal scroll ONLY here */}
      <div className="flex gap-4 overflow-x-auto overscroll-x-contain px-1 py-4 scrollbar-none">
        {isPastTestsLoading ? (
          <div className="flex min-h-32 w-full items-center justify-center rounded-2xl border border-white/5 bg-white/[0.02] px-4 py-12">
            <LoadingSpinner size="sm" />
          </div>
        ) : realTests.length > 0 ? (
          realTests.map((test) => (
            <PastTestCard
              key={test.id}
              id={test.id}
              title={test.title}
              originType={test.originType}
              createdAt={test.createdAt}
              subjects={test.subjects}
              difficulty={test.difficulty}
              attemptsCount={test.attemptsCount}
              lastActivityAt={test.lastActivityAt}
              latestAttempt={test.latestAttempt}
              onOpen={handleOpenTest}
            />
          ))
        ) : (
          <div className="py-12 px-4 text-center w-full bg-white/[0.02] rounded-2xl border border-white/5">
            <p className="text-sm text-neutral-500">No past attempts yet.</p>
          </div>
        )}
      </div>
    </SectionStrip>
  )
}

export default PastTestsStrip

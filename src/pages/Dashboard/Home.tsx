import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { useTests } from '../../hooks/useTests'
import { useDailyLimit } from '../../hooks/useDailyLimit'
import GlassCard from '../../components/Dashboard/GlassCard'
import PromptInput from '../../components/common/PromptInput'
import LoadingSpinner from '../../components/common/LoadingSpinner'
import AnalyticsStrip from '../../components/Dashboard/Home/AnalyticsStrip'
import PastTestsStrip from '../../components/Dashboard/Home/PastTestsStrip'
import DailyLimitModal from '../../components/common/DailyLimitModal'
import { Exam } from '@phosphor-icons/react'
import { testEngineService, type TestThread } from '../../services/test-engine/test-engine.service'

const Home: React.FC = () => {
  const navigate = useNavigate()
  const { user, loading } = useAuth()
  const { refreshThreads } = useTests()
  const { isLimitModalOpen, closeLimitModal, handleApiError, limitData } = useDailyLimit()

  const [selectedSubject, setSelectedSubject] = useState<string[]>([])
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('')
  const [isSubjectOpen, setIsSubjectOpen] = useState(false)
  const [isDifficultyOpen, setIsDifficultyOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handlePromptSubmit = async (prompt: string) => {
    if (!user?.profile?.targetExamId) {
      return
    }

    setIsSubmitting(true)
    let thread: TestThread | null = null

    try {
      // 1. Create Thread
      thread = await testEngineService.createThread({
        examId: user.profile.targetExamId,
        originType: user.role === 'ADMIN' ? 'SYSTEM' : 'GENERATED',
        title: prompt,
        baseGenerationConfig: {
          subjects: selectedSubject,
          difficulty: selectedDifficulty,
        },
      })

      // 2. Generate Version (DRAFT)
      await testEngineService.generateVersion(thread.id, {
        prompt,
        followsBlueprint: false, // Override blueprint when prompt is provided
      })

      // Refresh global threads to update sidebar
      await refreshThreads()

      // 3. Navigate to thread page
      navigate(`/dashboard/tests/thread/${thread.id}`)
    } catch (error) {
      if (handleApiError(error)) {
        // If limit reached, delete the thread we just created so we don't leave empty threads
        if (thread) {
          try {
            await testEngineService.deleteThread((thread as TestThread).id)
            await refreshThreads()
          } catch (cleanupError) {
             // Failed to cleanup, not much we can do
          }
        }
        setIsSubmitting(false)
        return
      }
      // Failed to create test - handle silently
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading) {
    return <LoadingSpinner fullScreen message="Preparing your dashboard..." />
  }

  return (
    <div className="relative min-h-screen overflow-x-hidden px-4 bg-[var(--color-bg-base)]">
      <GlassCard
        title={`Hello ${user?.username || 'User'}`}
        subtitle="Prepare smarter with Quezia."
        headerAction={
          <Link
            to="/dashboard/tests"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-[var(--color-text-primary)] border border-[var(--color-border-default)] bg-[var(--color-bg-subtle)] backdrop-blur-md hover:border-[var(--color-border-hover)] transition-colors"
          >
            <Exam size={16} weight="bold" />
            Full Mock Test
          </Link>
        }
      >
        <PromptInput
          selectedSubject={selectedSubject}
          setSelectedSubject={setSelectedSubject}
          selectedDifficulty={selectedDifficulty}
          setSelectedDifficulty={setSelectedDifficulty}
          isSubjectOpen={isSubjectOpen}
          setIsSubjectOpen={setIsSubjectOpen}
          isDifficultyOpen={isDifficultyOpen}
          setIsDifficultyOpen={setIsDifficultyOpen}
          onSubmit={handlePromptSubmit}
          isLoading={isSubmitting}
        />
      </GlassCard>
      <AnalyticsStrip />
      <PastTestsStrip />
      <DailyLimitModal 
        isOpen={isLimitModalOpen} 
        onClose={closeLimitModal} 
        limitData={limitData} 
      />
    </div>
  )
}

export default Home

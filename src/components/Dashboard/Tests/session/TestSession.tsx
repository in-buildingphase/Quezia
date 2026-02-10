import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { GridFour, Check, Flag, Circle } from '@phosphor-icons/react'
import TestSessionHeader from './TestSessionHeader'
import TestSessionFooter from './TestSessionFooter'
import QuestionWorkspace from './QuestionWorkspace'
import QuestionPalette from '../navigation/QuestionPalette'
import { useTestSession } from './hooks/useTestSession'
import { type TestConfig, generateSampleQuestions } from '../../../../types/test'

// Fallback sample questions for development/testing
const fallbackQuestions = generateSampleQuestions(90)

const TestSession: React.FC = () => {
  const { threadId } = useParams<{ threadId: string }>()
  const navigate = useNavigate()
  const location = useLocation()

  // Get testConfig from route state
  const routeState = location.state as { testConfig?: TestConfig } | null
  const testConfig = routeState?.testConfig

  // Use questions from config or fallback
  const questions = testConfig?.questions ?? fallbackQuestions
  const sections = testConfig?.sections
  const durationMinutes = testConfig?.durationMinutes ?? 180
  const testTitle = testConfig?.title ?? 'Test Session'
  const testSubject = testConfig?.subject

  const [isPaletteOpen, setIsPaletteOpen] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState(durationMinutes * 60) // in seconds
  const [isSubmitted, setIsSubmitted] = useState(false)

  // Format time remaining as HH:MM:SS
  const formatTime = (seconds: number): string => {
    const h = Math.floor(seconds / 3600)
    const m = Math.floor((seconds % 3600) / 60)
    const s = seconds % 60
    return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
  }

  // Timer countdown
  useEffect(() => {
    if (isSubmitted) return

    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval)
          setIsSubmitted(true)
          // Navigate after state update
          navigate(`/dashboard/tests/thread/${threadId}`)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [isSubmitted, navigate, threadId])

  const {
    currentIndex,
    currentQuestion,
    selectedAnswer,
    integerAnswer,
    isMarkedForReview,
    questionStates,
    canGoPrevious,
    canGoNext,
    goToQuestion,
    goToPrevious,
    goToNext,
    selectAnswer,
    setIntegerAnswer,
    toggleMarkForReview,
    clearResponse,
  } = useTestSession(questions)

  // Compute stats for submit modal
  const stats = {
    total: questions.length,
    attempted: questionStates.filter((q) => q.status === 'attempted').length,
    unattempted: questionStates.filter((q) => q.status === 'unattempted').length,
    markedForReview: questionStates.filter((q) => q.status === 'marked').length,
  }

  const handleSubmit = () => {
    // TODO: Implement submission logic
    console.log('Submitting test...', { testConfig, questionStates })
    navigate(`/dashboard/tests/thread/${threadId}`)
  }

  // Determine active section based on current question
  const activeSection = sections?.find(
    (s) => currentIndex >= s.startIndex && currentIndex <= s.endIndex
  )?.name

  return (
    <div className="h-screen bg-neutral-950 flex flex-col">
      <TestSessionHeader
        title={testTitle}
        subject={activeSection || testSubject}
        timeRemaining={formatTime(timeRemaining)}
        stats={stats}
        onSubmit={handleSubmit}
      />

      {/* Main content area - offset for fixed header/footer */}
      <div className="flex-1 pt-14 pb-16 overflow-y-auto">
        <QuestionWorkspace
          question={currentQuestion}
          questionNumber={currentIndex + 1}
          totalQuestions={questions.length}
          selectedAnswer={selectedAnswer}
          integerAnswer={integerAnswer}
          isMarkedForReview={isMarkedForReview}
          onSelectAnswer={selectAnswer}
          onIntegerChange={setIntegerAnswer}
          onMarkForReview={toggleMarkForReview}
          onClearResponse={clearResponse}
        />
      </div>

      {/* Edge toggle button with hover info strip - fixed on right edge */}
      <div
        className={`group fixed right-0 top-1/2 -translate-y-1/2 z-30 flex items-center transition-transform duration-200 ${
          isPaletteOpen ? 'translate-x-80' : ''
        }`}
      >
        {/* Hover info strip - attached to left of button, appears on hover */}
        {!isPaletteOpen && (
          <div className="flex items-center gap-3 px-3 h-14 rounded-l-lg border border-r-0 border-white/10 bg-neutral-900 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-150">
            <div className="flex items-center gap-1.5" title="Attempted">
              <Check size={12} weight="bold" className="text-emerald-400" />
              <span className="text-xs text-neutral-300">{stats.attempted}</span>
            </div>
            <div className="flex items-center gap-1.5" title="Marked for Review">
              <Flag size={12} weight="fill" className="text-amber-400" />
              <span className="text-xs text-neutral-300">{stats.markedForReview}</span>
            </div>
            <div className="flex items-center gap-1.5" title="Unattempted">
              <Circle size={12} className="text-neutral-500" />
              <span className="text-xs text-neutral-300">{stats.unattempted}</span>
            </div>
          </div>
        )}
        
        {/* Toggle button */}
        <button
          onClick={() => setIsPaletteOpen((prev) => !prev)}
          className={`flex items-center justify-center w-10 h-14 border border-r-0 transition-colors ${
            isPaletteOpen
              ? 'rounded-l-lg bg-white/[0.08] border-white/20 text-neutral-200'
              : 'rounded-l-lg bg-neutral-900 border-white/10 text-neutral-400 group-hover:bg-white/[0.05] group-hover:text-neutral-200 group-hover:rounded-none group-hover:border-l-0'
          }`}
          title="Toggle question palette"
        >
          <GridFour size={18} />
        </button>
      </div>

      {/* Question Palette - Right-side drawer */}
      <QuestionPalette
        questions={questionStates}
        sections={sections}
        currentIndex={currentIndex}
        onSelect={goToQuestion}
        onClose={() => setIsPaletteOpen(false)}
        isOpen={isPaletteOpen}
      />

      <TestSessionFooter
        currentQuestion={currentIndex + 1}
        totalQuestions={questions.length}
        onPrevious={goToPrevious}
        onNext={goToNext}
        onTogglePalette={() => setIsPaletteOpen((prev) => !prev)}
        canGoPrevious={canGoPrevious}
        canGoNext={canGoNext}
        isPaletteOpen={isPaletteOpen}
      />
    </div>
  )
}

export default TestSession

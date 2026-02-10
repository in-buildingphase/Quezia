import { useState, useCallback, useMemo } from 'react'
import { type SessionQuestion } from '../QuestionWorkspace'
import { type QuestionStatus } from '../../navigation/QuestionLegend'

type QuestionState = {
  id: number
  selectedAnswer: number | null
  integerAnswer: string
  isMarkedForReview: boolean
}

type UseTestSessionReturn = {
  currentIndex: number
  currentQuestion: SessionQuestion
  selectedAnswer: number | null
  integerAnswer: string
  isMarkedForReview: boolean
  questionStates: { id: number; status: QuestionStatus }[]
  canGoPrevious: boolean
  canGoNext: boolean
  goToQuestion: (index: number) => void
  goToPrevious: () => void
  goToNext: () => void
  selectAnswer: (index: number) => void
  setIntegerAnswer: (value: string) => void
  toggleMarkForReview: () => void
  clearResponse: () => void
}

export function useTestSession(questions: SessionQuestion[]): UseTestSessionReturn {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [questionStates, setQuestionStates] = useState<QuestionState[]>(() =>
    questions.map((q) => ({
      id: q.id,
      selectedAnswer: null,
      integerAnswer: '',
      isMarkedForReview: false,
    }))
  )

  const currentQuestion = questions[currentIndex]
  const currentState = questionStates[currentIndex]

  const canGoPrevious = currentIndex > 0
  const canGoNext = currentIndex < questions.length - 1

  const goToQuestion = useCallback((index: number) => {
    if (index >= 0 && index < questions.length) {
      setCurrentIndex(index)
    }
  }, [questions.length])

  const goToPrevious = useCallback(() => {
    if (canGoPrevious) {
      setCurrentIndex((prev) => prev - 1)
    }
  }, [canGoPrevious])

  const goToNext = useCallback(() => {
    if (canGoNext) {
      setCurrentIndex((prev) => prev + 1)
    }
  }, [canGoNext])

  const selectAnswer = useCallback((answerIndex: number) => {
    setQuestionStates((prev) =>
      prev.map((state, i) =>
        i === currentIndex ? { ...state, selectedAnswer: answerIndex } : state
      )
    )
  }, [currentIndex])

  const setIntegerAnswer = useCallback((value: string) => {
    setQuestionStates((prev) =>
      prev.map((state, i) =>
        i === currentIndex ? { ...state, integerAnswer: value } : state
      )
    )
  }, [currentIndex])

  const toggleMarkForReview = useCallback(() => {
    setQuestionStates((prev) =>
      prev.map((state, i) =>
        i === currentIndex ? { ...state, isMarkedForReview: !state.isMarkedForReview } : state
      )
    )
  }, [currentIndex])

  const clearResponse = useCallback(() => {
    setQuestionStates((prev) =>
      prev.map((state, i) =>
        i === currentIndex ? { ...state, selectedAnswer: null, integerAnswer: '' } : state
      )
    )
  }, [currentIndex])

  const paletteStates = useMemo(() => {
    return questionStates.map((state, index) => {
      const question = questions[index]
      const hasAnswer = question.type === 'mcq' 
        ? state.selectedAnswer !== null 
        : state.integerAnswer !== ''
      
      let status: QuestionStatus = 'unattempted'
      if (state.isMarkedForReview) {
        status = 'marked'
      } else if (hasAnswer) {
        status = 'attempted'
      }
      return { id: state.id, status }
    })
  }, [questionStates, questions])

  return {
    currentIndex,
    currentQuestion,
    selectedAnswer: currentState.selectedAnswer,
    integerAnswer: currentState.integerAnswer,
    isMarkedForReview: currentState.isMarkedForReview,
    questionStates: paletteStates,
    canGoPrevious,
    canGoNext,
    goToQuestion,
    goToPrevious,
    goToNext,
    selectAnswer,
    setIntegerAnswer,
    toggleMarkForReview,
    clearResponse,
  }
}

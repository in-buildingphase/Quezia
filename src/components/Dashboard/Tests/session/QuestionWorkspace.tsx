import React from 'react'
import QuestionHeader from '../question/QuestionHeader'
import QuestionText from '../question/QuestionText'
import AnswerInput from '../question/AnswerInput'
import QuestionActions from './QuestionActions'
import { type Question } from '../../../../types/test'

// Re-export for backwards compatibility
export type SessionQuestion = Question

type Props = {
  question: Question
  questionNumber: number
  totalQuestions: number
  selectedAnswer: number | null
  integerAnswer: string
  isMarkedForReview: boolean
  onSelectAnswer: (index: number) => void
  onIntegerChange: (value: string) => void
  onMarkForReview: () => void
  onClearResponse: () => void
}

const QuestionWorkspace: React.FC<Props> = ({
  question,
  questionNumber,
  totalQuestions,
  selectedAnswer,
  integerAnswer,
  isMarkedForReview,
  onSelectAnswer,
  onIntegerChange,
  onMarkForReview,
  onClearResponse,
}) => {
  const hasResponse = question.type === 'mcq' 
    ? selectedAnswer !== null 
    : integerAnswer !== ''

  return (
    <main className="flex-1 flex items-start justify-center overflow-y-auto py-8">
      <div className="w-full max-w-2xl px-6">
        <QuestionHeader
          questionNumber={questionNumber}
          totalQuestions={totalQuestions}
          marks={question.marks}
        />

        <QuestionText text={question.text} />

        {question.type === 'mcq' ? (
          <AnswerInput
            type="mcq"
            options={question.options}
            selectedIndex={selectedAnswer}
            onSelect={onSelectAnswer}
          />
        ) : (
          <AnswerInput
            type="integer"
            value={integerAnswer}
            onChange={onIntegerChange}
            hint={question.hint}
          />
        )}

        <QuestionActions
          isMarkedForReview={isMarkedForReview}
          onMarkForReview={onMarkForReview}
          onClearResponse={onClearResponse}
          hasResponse={hasResponse}
        />
      </div>
    </main>
  )
}

export default QuestionWorkspace

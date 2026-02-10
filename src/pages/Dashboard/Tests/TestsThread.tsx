import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import ThreadHeader from '../../../components/Dashboard/Tests/ThreadHeader'
import TestPreviewCanvas from '../../../components/Dashboard/Tests/TestPreviewCanvas'
import PromptInput from '../../../components/Dashboard/Home/PromptInput'
import { generateJEEQuestions, type TestConfig } from '../../../types/test'

const versions = [
  { id: 'v3', label: 'v3', createdAt: 'Feb 10 · 14:32' },
  { id: 'v2', label: 'v2', createdAt: 'Feb 10 · 13:05' },
  { id: 'v1', label: 'v1', createdAt: 'Feb 10 · 12:10' },
]

// Generate JEE-style questions with 3 sections (Physics, Chemistry, Maths - 25 each)
const { questions: testQuestions, sections: testSections } = generateJEEQuestions()

const TestsThread: React.FC = () => {
  const { threadId } = useParams<{ threadId: string }>()
  const navigate = useNavigate()

  // PromptInput state
  const [selectedSubject, setSelectedSubject] = useState<string[]>([])
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('')
  const [isSubjectOpen, setIsSubjectOpen] = useState(false)
  const [isDifficultyOpen, setIsDifficultyOpen] = useState(false)

  const handleStartTest = () => {
    // Build test config to pass to preview page
    const testConfig: TestConfig = {
      id: threadId || 'test-1',
      title: 'JEE Main Mock Test',
      subject: 'Physics, Chemistry, Mathematics',
      questions: testQuestions,
      sections: testSections,
      durationMinutes: 180, // 3 hours default
      isMock: true,
      marking: {
        correct: 4,
        incorrect: -1,
        unattempted: 0,
      },
    }
    
    navigate(`/dashboard/tests/thread/${threadId}/preview`, {
      state: { testConfig },
    })
  }

  const handleRegenerateQuestion = (id: number) => {
    console.log(`Regenerating question ${id}`)
  }

  // Convert Question[] to preview format for TestPreviewCanvas
  const previewQuestions = testQuestions.map((q) => ({
    id: q.id,
    text: q.text,
    marks: q.marks,
    options: q.type === 'mcq' ? q.options : undefined,
  }))

  return (
    <div className="h-screen bg-neutral-950 px-4 py-6 flex flex-col overflow-hidden">
      <ThreadHeader threadId={threadId || ''} />

      <TestPreviewCanvas
        prompt="Generate a mixed difficulty electrostatics test with PYQs"
        versions={versions}
        questions={previewQuestions}
        onStartTest={handleStartTest}
        onRegenerateQuestion={handleRegenerateQuestion}
      />

      {/* PROMPT INPUT */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
        <PromptInput
          selectedSubject={selectedSubject}
          setSelectedSubject={setSelectedSubject}
          selectedDifficulty={selectedDifficulty}
          setSelectedDifficulty={setSelectedDifficulty}
          isSubjectOpen={isSubjectOpen}
          setIsSubjectOpen={setIsSubjectOpen}
          isDifficultyOpen={isDifficultyOpen}
          setIsDifficultyOpen={setIsDifficultyOpen}
          openUp
          placeholder="Refine or customize this test..."
        />
      </div>
    </div>
  )
}

export default TestsThread

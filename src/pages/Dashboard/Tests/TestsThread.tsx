import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import ThreadHeader from '../../../components/Dashboard/Tests/thread/ThreadHeader'
import TestPreviewCanvas from '../../../components/Dashboard/Tests/preview/TestPreviewCanvas'
import PromptInput from '../../../components/common/PromptInput'
import type { Question, TestConfig } from '../../../types/test'
import { testsService } from '../../../services/tests'
import type { TestVersion } from '../../../services/mockDatabase'


const TestsThread: React.FC = () => {
  const { threadId } = useParams<{ threadId: string }>()
  const navigate = useNavigate()

  // Data State
  const [testConfig, setTestConfig] = useState<TestConfig | null>(null)
  const [attempts, setAttempts] = useState<any[]>([])
  const [versions, setVersions] = useState<TestVersion[]>([])

  // PromptInput state
  const [selectedSubject, setSelectedSubject] = useState<string[]>([])
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('')
  const [isSubjectOpen, setIsSubjectOpen] = useState(false)
  const [isDifficultyOpen, setIsDifficultyOpen] = useState(false)

  useEffect(() => {
    const loadData = async () => {
      if (!threadId) return

      // Parallel fetch
      const [fetchedTest, fetchedAttempts, fetchedVersions] = await Promise.all([
        testsService.getTestThread(threadId),
        testsService.getAttempts(threadId),
        testsService.getVersions(threadId)
      ])

      setTestConfig(fetchedTest || null)
      setAttempts(fetchedAttempts)
      setVersions(fetchedVersions)
    }
    loadData()
  }, [threadId])

  const handleStartTest = () => {
    if (!testConfig) return

    navigate(`/dashboard/tests/thread/${threadId}/preview`, {
      state: { testConfig },
    })
  }

  const handleRegenerateQuestion = (id: number) => {
    console.log(`Regenerating question ${id}`)
  }

  // Convert Question[] to preview format for TestPreviewCanvas
  const previewQuestions = (testConfig?.questions || []).map((q: Question) => ({
    id: q.id,
    text: q.text,
    marks: q.marks,
    options: q.type === 'mcq' ? q.options : undefined,
  }))

  return (
    <div className='h-screen flex flex-col overflow-hidden bg-neutral-950 px-4 pb-4 pt-2'>
      <ThreadHeader
        threadId={threadId || ''}
        title={testConfig?.title}
        attempts={attempts}
        onStartTest={handleStartTest}
      />

      <TestPreviewCanvas
        prompt={testConfig?.title || "Test Thread"}
        versions={versions}
        questions={previewQuestions}
        onStartTest={handleStartTest}
        onRegenerateQuestion={handleRegenerateQuestion}
        testId={threadId}
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

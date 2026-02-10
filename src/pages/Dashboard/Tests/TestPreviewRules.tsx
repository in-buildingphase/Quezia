import React, { useState } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { ArrowLeft } from '@phosphor-icons/react'
import TestPreviewRulesCard from '../../../components/Dashboard/Tests/TestPreviewRulesCard'
import { JEE_FULL_MOCK_PRESET } from '../../../presets/testPresets'
import { type TestConfig } from '../../../types/test'

const TestPreviewRules: React.FC = () => {
  const { threadId } = useParams<{ threadId: string }>()
  const navigate = useNavigate()
  const location = useLocation()

  // Get testConfig from route state (passed from TestsThread)
  const routeState = location.state as { testConfig?: TestConfig } | null
  const testConfig = routeState?.testConfig

  // Track duration changes (for custom tests)
  const [durationMinutes, setDurationMinutes] = useState(
    testConfig?.durationMinutes ?? 180
  )

  const handleStart = () => {
    // Build updated config with potentially modified duration
    const configToPass: TestConfig = testConfig ?? {
      id: threadId || 'test-1',
      title: 'Test Session',
      questions: [],
      durationMinutes,
      isMock: true,
    }

    navigate(`/test/${threadId}`, {
      state: {
        testConfig: {
          ...configToPass,
          durationMinutes,
        },
      },
    })
  }

  const handleDurationChange = (minutes: number) => {
    setDurationMinutes(minutes)
  }

  return (
    <div className="relative h-screen bg-neutral-950 px-4 py-6 flex items-center justify-center">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-6 left-4 flex items-center gap-2 text-sm text-neutral-400 hover:text-neutral-200 transition"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </button>

      <TestPreviewRulesCard
        preset={JEE_FULL_MOCK_PRESET}
        questionsCount={testConfig?.questions.length}
        onStart={handleStart}
        onDurationChange={handleDurationChange}
        mock={testConfig?.isMock ?? true}
      />
    </div>
  )
}

export default TestPreviewRules

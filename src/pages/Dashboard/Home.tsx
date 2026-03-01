import React, { useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import GlassCard from '../../components/Dashboard/GlassCard'
import PromptInput from '../../components/common/PromptInput'
import LoadingSpinner from '../../components/common/LoadingSpinner'
import AnalyticsStrip from '../../components/Dashboard/Home/AnalyticsStrip'
import PastTestsStrip from '../../components/Dashboard/Home/PastTestsStrip'

const Home: React.FC = () => {
  const { user, loading } = useAuth()
  const [selectedSubject, setSelectedSubject] = useState<string[]>([])
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('')
  const [isSubjectOpen, setIsSubjectOpen] = useState(false)
  const [isDifficultyOpen, setIsDifficultyOpen] = useState(false)

  if (loading) {
    return <LoadingSpinner fullScreen message="Preparing your dashboard..." />
  }

  return (
    <div className="relative min-h-screen overflow-x-hidden px-4 bg-[var(--color-bg-base)]">
      <GlassCard
        title={`Hello ${user?.username || 'User'}`}
        subtitle="Prepare smarter with Quezia."
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
        />
      </GlassCard>
      <AnalyticsStrip />
      <PastTestsStrip />
    </div>
  )
}

export default Home

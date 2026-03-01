import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { userApi, type User } from '../../services/userApi'
import GlassCard from '../../components/Dashboard/GlassCard'
import PromptInput from '../../components/common/PromptInput'
import LoadingSpinner from '../../components/common/LoadingSpinner'
import AnalyticsStrip from '../../components/Dashboard/Home/AnalyticsStrip'
import PastTestsStrip from '../../components/Dashboard/Home/PastTestsStrip'
import { Exam } from '@phosphor-icons/react'

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
        />
      </GlassCard>
      <AnalyticsStrip />
      <PastTestsStrip />
    </div>
  )
}

export default Home

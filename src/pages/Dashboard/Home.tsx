import React, { useState, useEffect } from 'react'
import { userApi, type User } from '../../services/userApi'
import GlassCard from '../../components/Dashboard/GlassCard'
import PromptInput from '../../components/common/PromptInput'
import LoadingSpinner from '../../components/common/LoadingSpinner'
import AnalyticsStrip from '../../components/Dashboard/Home/AnalyticsStrip'
import PastTestsStrip from '../../components/Dashboard/Home/PastTestsStrip'

const Home: React.FC = () => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedSubject, setSelectedSubject] = useState<string[]>([])
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('')
  const [isSubjectOpen, setIsSubjectOpen] = useState(false)
  const [isDifficultyOpen, setIsDifficultyOpen] = useState(false)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await userApi.getMe()
        setUser(userData)
      } catch (error) {
        console.error('Failed to fetch user:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [])

  if (loading) {
    return <LoadingSpinner fullScreen message="Loading..." />
  }

  return (
    <div className="relative min-h-screen overflow-x-hidden px-4 bg-neutral-950">
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

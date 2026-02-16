import React, { useState } from 'react'
import GlassCard from '../../../components/Dashboard/GlassCard'
import PromptInput from '../../../components/common/PromptInput'
import YourTestsSection from '../../../components/Dashboard/Tests/list/YourTestsSection'

const Tests: React.FC = () => {
  const [selectedSubject, setSelectedSubject] = useState<string[]>([])
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('')
  const [isSubjectOpen, setIsSubjectOpen] = useState(false)
  const [isDifficultyOpen, setIsDifficultyOpen] = useState(false)

  return (
    <div className="min-h-screen overflow-x-hidden bg-[var(--color-bg-base)] px-6 pt-60 pb-8">
      {/* Create new test section */}
      <div className="w-full">
        <GlassCard
          title="Create a New Test"
          subtitle="Describe what you want to be tested on."
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
      </div>

      {/* Your tests section */}
      <div className="w-full px-2 lg:px-3 mt-10">
        <YourTestsSection />
      </div>
    </div>
  )
}

export default Tests
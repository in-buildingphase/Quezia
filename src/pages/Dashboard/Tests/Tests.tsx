import React, { useState } from 'react'
import GlassCard from '../../../components/Dashboard/GlassCard'
import PromptInput from '../../../components/Dashboard/Home/PromptInput'

const Tests: React.FC = () => {
  const [selectedSubject, setSelectedSubject] = useState<string[]>([])
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('')
  const [isSubjectOpen, setIsSubjectOpen] = useState(false)
  const [isDifficultyOpen, setIsDifficultyOpen] = useState(false)

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-neutral-950 flex items-center justify-center">
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
  )
}

export default Tests
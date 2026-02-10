import React, { useRef, useEffect } from 'react'
import { BookOpen, Gauge, CaretDown, Check, PaperPlane } from '@phosphor-icons/react'

interface PromptInputProps {
  selectedSubject: string[]
  setSelectedSubject: (subjects: string[]) => void
  selectedDifficulty: string
  setSelectedDifficulty: (difficulty: string) => void
  isSubjectOpen: boolean
  setIsSubjectOpen: (open: boolean) => void
  isDifficultyOpen: boolean
  setIsDifficultyOpen: (open: boolean) => void
  openUp?: boolean
  placeholder?: string
}

const PromptInput: React.FC<PromptInputProps> = ({
  selectedSubject,
  setSelectedSubject,
  selectedDifficulty,
  setSelectedDifficulty,
  isSubjectOpen,
  setIsSubjectOpen,
  isDifficultyOpen,
  setIsDifficultyOpen,
  openUp = false,
  placeholder = 'What would you like to practice today?',
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const subjectDropdownRef = useRef<HTMLDivElement>(null)
  const difficultyDropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (subjectDropdownRef.current && !subjectDropdownRef.current.contains(event.target as Node)) {
        setIsSubjectOpen(false)
      }
      if (difficultyDropdownRef.current && !difficultyDropdownRef.current.contains(event.target as Node)) {
        setIsDifficultyOpen(false)
      }
    }

    if (isSubjectOpen || isDifficultyOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isSubjectOpen, isDifficultyOpen, setIsSubjectOpen, setIsDifficultyOpen])

  const handleTextareaInput = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px'
    }
  }

  return (
    <>
      {/* Chat / prompt */}
      <div className="mb-5 rounded-xl bg-white/5 px-5 py-3">
        <textarea
          ref={textareaRef}
          placeholder={placeholder}
          className="w-full resize-none bg-transparent text-neutral-300 placeholder-neutral-500 outline-none max-h-32"
          onInput={handleTextareaInput}
          rows={1}
        />
      </div>

      {/* Action buttons row */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          {/* Subject Dropdown */}
          <div className="relative" ref={subjectDropdownRef}>
            <button
              onClick={() => setIsSubjectOpen(!isSubjectOpen)}
              className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 hover:bg-white/10"
            >
              <BookOpen className="h-4 w-4 text-neutral-400" />
              <span className="text-sm text-neutral-300">
                {selectedSubject.length > 0 ? selectedSubject.join(', ') : 'Subject'}
              </span>
              <CaretDown className="h-3 w-3 text-neutral-400" />
            </button>
            {isSubjectOpen && (
              <div className={`absolute left-0 right-0 z-20 rounded-xl border border-white/10 bg-black/60 backdrop-blur-md p-2 ${openUp ? 'bottom-full mb-2' : 'mt-2'}`}>
                {['physics', 'chemistry', 'mathematics'].map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      setSelectedSubject(
                        selectedSubject.includes(option)
                          ? selectedSubject.filter((s: string) => s !== option)
                          : [...selectedSubject, option]
                      )
                    }}
                    className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm capitalize text-neutral-300 hover:bg-white/10"
                  >
                    {option}
                    {selectedSubject.includes(option) && (
                      <Check className="w-4 h-4 text-white" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Difficulty Dropdown */}
          <div className="relative" ref={difficultyDropdownRef}>
            <button
              onClick={() => setIsDifficultyOpen(!isDifficultyOpen)}
              className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 hover:bg-white/10"
            >
              <Gauge className="h-4 w-4 text-neutral-400" />
              <span className="text-sm text-neutral-300">
                {selectedDifficulty || 'Difficulty'}
              </span>
              <CaretDown className="h-3 w-3 text-neutral-400" />
            </button>
            {isDifficultyOpen && (
              <div className={`absolute left-0 right-0 z-20 rounded-xl border border-white/10 bg-black/60 backdrop-blur-md p-2 ${openUp ? 'bottom-full mb-2' : 'mt-2'}`}>
                {['easy', 'medium', 'hard'].map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      setSelectedDifficulty(selectedDifficulty === option ? '' : option)
                    }}
                    className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm capitalize text-neutral-300 hover:bg-white/10"
                  >
                    {option}
                    {selectedDifficulty === option && (
                      <Check className="w-4 h-4 text-white" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        {/* Send button */}
        <button className="group flex items-center justify-center h-10 w-10 rounded-full border border-white/10 bg-white/5 text-neutral-300 transition hover:bg-[#EC280113] hover:text-[#EC2801] focus:outline-none">
          <PaperPlane className="h-4 w-4 rotate-90 transition-transform" />
        </button>
      </div>
    </>
  )
}

export default PromptInput
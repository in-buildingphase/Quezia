import React, { useState, useRef, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import PromptInput from '../../components/Dashboard/Home/PromptInput'
import { Bug, ArrowsClockwise, CaretDown } from '@phosphor-icons/react'

const versions = [
  { id: 'v3', label: 'v3', createdAt: 'Feb 10 · 14:32' },
  { id: 'v2', label: 'v2', createdAt: 'Feb 10 · 13:05' },
  { id: 'v1', label: 'v1', createdAt: 'Feb 10 · 12:10' },
]

const questions = [
  {
    id: 1,
    text: 'A point charge q is placed at the centre of a cube. The flux through one face of the cube is:',
    marks: 1,
    options: ['q / ε₀', 'q / 6ε₀', 'q / 8ε₀', 'q / 12ε₀'],
  },
  {
    id: 2,
    text: 'The SI unit of electric flux is:',
    marks: 1,
    options: ['N/C', 'V/m', 'N·m²/C', 'C/N'],
  },
  {
    id: 3,
    text: 'Gauss’s law relates electric flux to:',
    marks: 1,
    options: ['Charge enclosed', 'Electric field', 'Potential', 'Permittivity'],
  },
  {
    id: 4,
    text: 'If no charge is enclosed, electric flux is:',
    marks: 1,
    options: ['Zero', 'Infinite', 'Maximum', 'Negative'],
  },
  {
    id: 5,
    text: 'Electric flux depends on:',
    marks: 1,
    options: ['Surface area', 'Orientation', 'Electric field', 'All of these'],
  },
]

const TestsThread: React.FC = () => {
  const { threadId } = useParams<{ threadId: string }>()

  // PromptInput state
  const [selectedSubject, setSelectedSubject] = useState<string[]>([])
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('')
  const [isSubjectOpen, setIsSubjectOpen] = useState(false)
  const [isDifficultyOpen, setIsDifficultyOpen] = useState(false)

  // Version dropdown state
  const [isVersionOpen, setIsVersionOpen] = useState(false)
  const versionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (versionRef.current && !versionRef.current.contains(e.target as Node)) {
        setIsVersionOpen(false)
      }
    }

    if (isVersionOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isVersionOpen])

  return (
    <div className="h-screen bg-neutral-950 px-4 py-6 flex flex-col overflow-hidden">

      {/* THREAD HEADER */}
      <div className="mb-6">
        <p className="text-xs uppercase tracking-wide text-neutral-500">
          Test thread
        </p>
        <h1 className="mt-1 text-lg font-medium text-neutral-200">
          Thread #{threadId}
        </h1>
      </div>

      {/* TEST PREVIEW CANVAS */}
      <div className="relative flex-1 rounded-2xl border border-white/10 bg-neutral-900/80 backdrop-blur p-6 mb-6 flex flex-col overflow-hidden">

        {/* HEADER */}
        <div className="flex items-start justify-between gap-4">
          {/* Prompt pill */}
          <div className="max-w-[70%] rounded-full border border-white/10 bg-white/5 px-4 py-2">
            <p className="text-xs text-neutral-400 mb-0.5">
              Generated from prompt
            </p>
            <p className="text-sm text-neutral-200 truncate">
              Generate a mixed difficulty electrostatics test with PYQs
            </p>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2">
            {/* Bug report */}
            <button
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-neutral-400 hover:bg-white/10"
              title="Report issue"
            >
              <Bug className="h-4 w-4" />
            </button>

            {/* Version dropdown */}
            <div className="relative" ref={versionRef}>
              <button
                onClick={() => setIsVersionOpen((v) => !v)}
                className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-neutral-300 hover:bg-white/10"
              >
                v3
                <CaretDown className="h-3 w-3 text-neutral-400" />
              </button>

              {isVersionOpen && (
                <div className="absolute right-0 mt-2 w-44 rounded-xl border border-white/10 bg-black/70 backdrop-blur-md p-1 z-20">
                  {versions.map((v) => (
                    <button
                      key={v.id}
                      className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm text-neutral-300 hover:bg-white/10"
                    >
                      <span>{v.label}</span>
                      <span className="text-xs text-neutral-500">
                        {v.createdAt}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="my-4 h-px bg-white/10" />

        {/* QUESTIONS (ONLY SCROLLS HERE) */}
        <div className="flex-1 overflow-y-auto pr-2 space-y-8 scrollbar-none">
          {questions.map((q) => (
            <div key={q.id}>
              <div className="mb-3 flex items-start justify-between gap-4">
                <p className="text-sm text-neutral-200 leading-relaxed">
                  <span className="text-neutral-400 mr-2">Q{q.id}.</span>
                  {q.text}
                </p>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-neutral-500 whitespace-nowrap">
                    ({q.marks} mark)
                  </span>
                  <button
                    className="rounded-md p-1 text-neutral-400 hover:bg-white/10 hover:text-neutral-200"
                    title="Regenerate question"
                  >
                    <ArrowsClockwise className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-2 pl-6">
                {q.options.map((opt, i) => (
                  <div
                    key={i}
                    className="rounded-lg border border-white/5 bg-white/[0.03] px-4 py-2 text-sm text-neutral-300"
                  >
                    {String.fromCharCode(97 + i)}) {opt}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* BOTTOM GRADIENT */}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-neutral-900 to-transparent" />

        {/* START TEST */}
        <div className="absolute bottom-4 right-4">
          <button className="rounded-xl bg-white px-5 py-2.5 text-sm font-medium text-neutral-900 hover:bg-neutral-200 transition">
            Start Test
          </button>
        </div>
      </div>

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
        />
      </div>
    </div>
  )
}

export default TestsThread

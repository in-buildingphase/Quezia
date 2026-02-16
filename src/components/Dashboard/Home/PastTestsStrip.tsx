import React from 'react'
import PastTestCard from './PastTestsCard'
import SectionStrip from '../../common/SectionStrip'
import { ArrowUpRight } from '@phosphor-icons/react'

type PastTestStatus = 'IN_PROGRESS' | 'COMPLETED' | 'GENERATED'

// Static mock data - computed once at module load, not during render
const mockTests = [
  {
    id: 'test_123',
    title: 'Electrostatics — PYQ mixed difficulty',
    subject: 'Physics',
    exam: 'JEE Advanced',
    status: 'IN_PROGRESS' as PastTestStatus,
    totalQuestions: 30,
    attemptedQuestions: 12,
    lastInteractedAt: '2026-02-11T08:30:00.000Z',
  },
  {
    id: 'test_124',
    title: 'Organic Chemistry — Reaction Mechanisms',
    subject: 'Chemistry',
    exam: 'JEE Main',
    status: 'COMPLETED' as PastTestStatus,
    totalQuestions: 25,
    score: 78,
    accuracy: 85,
    lastInteractedAt: '2026-02-10T10:30:00.000Z',
  },
  {
    id: 'test_125',
    title: 'Calculus — Integration Techniques',
    subject: 'Mathematics',
    exam: 'JEE Advanced',
    status: 'GENERATED' as PastTestStatus,
    totalQuestions: 20,
    lastInteractedAt: '2026-02-08T10:30:00.000Z',
  },
  {
    id: 'test_126',
    title: 'Thermodynamics — Laws and Applications',
    subject: 'Physics',
    exam: 'JEE Main',
    status: 'IN_PROGRESS' as PastTestStatus,
    totalQuestions: 28,
    attemptedQuestions: 8,
    lastInteractedAt: '2026-02-11T10:00:00.000Z',
  },
  {
    id: 'test_127',
    title: 'Inorganic Chemistry — Coordination Compounds',
    subject: 'Chemistry',
    exam: 'JEE Advanced',
    status: 'COMPLETED' as PastTestStatus,
    totalQuestions: 22,
    score: 92,
    accuracy: 95,
    lastInteractedAt: '2026-02-09T10:30:00.000Z',
  },
  {
    id: 'test_128',
    title: 'Vectors and 3D Geometry',
    subject: 'Mathematics',
    exam: 'JEE Main',
    status: 'GENERATED' as PastTestStatus,
    totalQuestions: 18,
    lastInteractedAt: '2026-02-06T10:30:00.000Z',
  },
  {
    id: 'test_129',
    title: 'Optics — Ray and Wave Optics',
    subject: 'Physics',
    exam: 'JEE Advanced',
    status: 'IN_PROGRESS' as PastTestStatus,
    totalQuestions: 35,
    attemptedQuestions: 20,
    lastInteractedAt: '2026-02-11T06:30:00.000Z',
  },
  {
    id: 'test_130',
    title: 'Physical Chemistry — Electrochemistry',
    subject: 'Chemistry',
    exam: 'JEE Main',
    status: 'COMPLETED' as PastTestStatus,
    totalQuestions: 24,
    score: 65,
    accuracy: 72,
    lastInteractedAt: '2026-02-05T10:30:00.000Z',
  },
]

const PastTestsStrip: React.FC = () => {
  const handleOpenTest = (testId: string) => {
    console.log('Opening test:', testId)
    // TODO: Navigate to test page
  }

  const actions = (
    <>
      <button className="h-7 w-7 rounded-md border border-white/10 hover:bg-white/5 transition" />
      <button
        onClick={() => window.location.href = '/dashboard/tests'}
        className="h-7 w-7 rounded-md border border-white/10 hover:bg-white/5 transition flex items-center justify-center"
      >
        <ArrowUpRight size={14} className="text-white" />
      </button>
    </>
  )

  return (
    <SectionStrip title="Past tests" actions={actions} className="max-w-screen-xl">
      {/* Horizontal scroll ONLY here */}
      <div className="flex gap-4 overflow-x-auto overscroll-x-contain py-3 scrollbar-none">
              {mockTests.map((test) => (
                <PastTestCard
                  key={test.id}
                  id={test.id}
                  title={test.title}
                  subject={test.subject}
                  exam={test.exam}
                  status={test.status}
                  totalQuestions={test.totalQuestions}
                  attemptedQuestions={test.attemptedQuestions}
                  score={test.score}
                  accuracy={test.accuracy}
                  lastInteractedAt={test.lastInteractedAt}
                  onOpen={handleOpenTest}
                />
              ))}
      </div>
    </SectionStrip>
  )
}

export default PastTestsStrip

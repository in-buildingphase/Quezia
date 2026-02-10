import React from 'react'
import PastTestCard from './PastTestsCard'
import { ArrowUpRight } from '@phosphor-icons/react'

type PastTestStatus = 'IN_PROGRESS' | 'COMPLETED' | 'GENERATED'

const PastTestsStrip: React.FC = () => {
  const mockTests = [
    {
      id: 'test_123',
      title: 'Electrostatics — PYQ mixed difficulty',
      subject: 'Physics',
      exam: 'JEE Advanced',
      status: 'IN_PROGRESS' as PastTestStatus,
      totalQuestions: 30,
      attemptedQuestions: 12,
      lastInteractedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
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
      lastInteractedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    },
    {
      id: 'test_125',
      title: 'Calculus — Integration Techniques',
      subject: 'Mathematics',
      exam: 'JEE Advanced',
      status: 'GENERATED' as PastTestStatus,
      totalQuestions: 20,
      lastInteractedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
    },
    {
      id: 'test_126',
      title: 'Thermodynamics — Laws and Applications',
      subject: 'Physics',
      exam: 'JEE Main',
      status: 'IN_PROGRESS' as PastTestStatus,
      totalQuestions: 28,
      attemptedQuestions: 8,
      lastInteractedAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(), // 30 min ago
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
      lastInteractedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    },
    {
      id: 'test_128',
      title: 'Vectors and 3D Geometry',
      subject: 'Mathematics',
      exam: 'JEE Main',
      status: 'GENERATED' as PastTestStatus,
      totalQuestions: 18,
      lastInteractedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
    },
    {
      id: 'test_129',
      title: 'Optics — Ray and Wave Optics',
      subject: 'Physics',
      exam: 'JEE Advanced',
      status: 'IN_PROGRESS' as PastTestStatus,
      totalQuestions: 35,
      attemptedQuestions: 20,
      lastInteractedAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), // 4 hours ago
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
      lastInteractedAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(), // 6 days ago
    },
  ]

  const handleOpenTest = (testId: string) => {
    console.log('Opening test:', testId)
    // TODO: Navigate to test page
  }

  return (
    <div className="mt-12 max-w-screen-xl">
      {/* OUTER SHELL */}
      <div className="rounded-2xl border-t border-white/20 px-4 pt-3 pb-4">
          {/* TOP STRIP */}
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm text-neutral-400">
              Past tests
            </p>

            {/* icon-only buttons */}
            <div className="flex gap-2">
              <button className="h-7 w-7 rounded-md border border-white/10 hover:bg-white/5 transition" />
              <button 
                onClick={() => window.location.href = '/dashboard/tests'}
                className="h-7 w-7 rounded-md border border-white/10 hover:bg-white/5 transition flex items-center justify-center"
              >
                <ArrowUpRight size={14} className="text-white" />
              </button>
            </div>
          </div>

          {/* INNER CONTAINER */}
          <div className="rounded-xl border border-white/10 bg-white/[0.045] backdrop-blur px-4 py-4">
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
          </div>
        </div>
    </div>
  )
}

export default PastTestsStrip

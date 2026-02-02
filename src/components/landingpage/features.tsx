import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Blueprint, 
  Target, 
  Brain, 
  ChartLineUp,
  Star
} from '@phosphor-icons/react'

// --- Visual Components (Compact) ---

const StructureVisual = () => (
  <div className="w-full h-full flex items-center justify-center p-6">
    <div className="flex items-center gap-4 w-full max-w-sm">
      <div className="flex-1 h-24 rounded-lg border border-gray-200 bg-white shadow-sm flex items-center justify-center">
        <span className="text-sm font-medium text-gray-600">Exam</span>
      </div>
      <div className="w-8 h-px bg-gray-300"/>
      <div className="flex-1 h-28 rounded-lg border-2 border-[#EC2801] bg-white shadow-md flex flex-col items-center justify-center">
        <div className="w-2 h-2 rounded-full bg-[#EC2801] mb-1"/>
        <span className="text-sm font-semibold text-gray-900">Blueprint</span>
        <span className="text-[10px] text-gray-500">Versions</span>
      </div>
      <div className="w-8 h-px bg-gray-300"/>
      <div className="flex-1 h-24 rounded-lg border border-gray-200 bg-white shadow-sm flex items-center justify-center">
        <span className="text-sm font-medium text-gray-600">Sections</span>
      </div>
    </div>
  </div>
)

const PracticeVisual = () => (
  <div className="w-full h-full flex items-center justify-center p-6">
    <div className="w-full max-w-md">
      <div className="relative flex justify-between items-center px-2">
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-100 -translate-y-1/2"/>
        {[
          { label: 'Topic', sub: 'Domain' },
          { label: 'Question', sub: 'Pattern' },
          { label: 'Attempt', sub: 'Pressure', active: true },
          { label: 'Feedback', sub: 'Loop' }
        ].map((item, i) => (
          <div key={i} className="relative flex flex-col items-center gap-2 bg-white px-1">
            <div className={`w-2.5 h-2.5 rounded-full ${item.active ? 'bg-[#EC2801]' : 'bg-gray-200'}`}/>
            <div className="text-center mt-1">
              <p className="text-[11px] font-medium text-gray-700">{item.label}</p>
              <p className="text-[9px] text-gray-400">{item.sub}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
)

const IntelligenceVisual = () => (
  <div className="w-full h-full flex items-center justify-center p-6">
    <div className="flex items-center gap-6">
      <div className="flex flex-col gap-3">
        {['Practice', 'Tests'].map((label) => (
          <div key={label} className="px-3 py-1.5 rounded-md border border-gray-200 bg-gray-50 text-[11px] text-gray-600">
            {label}
          </div>
        ))}
      </div>
      
      <div className="w-24 h-24 rounded-xl border-2 border-[#EC2801] bg-white shadow-md flex items-center justify-center">
        <div className="text-center">
          <Brain size={20} weight="duotone" className="mx-auto mb-1 text-[#EC2801]"/>
          <span className="text-[11px] font-semibold text-gray-900">Intelligence</span>
        </div>
      </div>
      
      <div className="flex flex-col gap-3">
        {['History', 'Time'].map((label) => (
          <div key={label} className="px-3 py-1.5 rounded-md border border-gray-200 bg-gray-50 text-[11px] text-gray-600">
            {label}
          </div>
        ))}
      </div>
    </div>
  </div>
)

const AnalyticsVisual = () => (
  <div className="w-full h-full flex items-center justify-center p-6">
    <div className="w-full max-w-xs bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
      <div className="flex items-end justify-between mb-4">
        <div>
          <p className="text-[11px] text-gray-500 mb-0.5">Section Mastery</p>
          <p className="text-2xl font-semibold text-gray-900">84.2%</p>
        </div>
        <div className="flex gap-3 text-right">
          <div>
            <p className="text-[9px] text-gray-500">Accuracy</p>
            <p className="text-xs font-semibold text-gray-900">78%</p>
          </div>
          <div className="w-px bg-gray-200 h-6"/>
          <div>
            <p className="text-[9px] text-gray-500">Speed</p>
            <p className="text-xs font-semibold text-[#EC2801]">↑12%</p>
          </div>
        </div>
      </div>
      
      <div className="relative h-20">
        <svg className="w-full h-full" viewBox="0 0 200 60" preserveAspectRatio="none">
          <path 
            d="M0 50 Q 50 45, 100 35 T 200 15" 
            fill="none" 
            stroke="#EC2801" 
            strokeWidth="2"
          />
          <circle cx="100" cy="35" r="3" fill="white" stroke="#EC2801" strokeWidth="2"/>
          <circle cx="200" cy="15" r="3" fill="white" stroke="#EC2801" strokeWidth="2"/>
        </svg>
        <div className="absolute bottom-0 left-0 right-0 flex justify-between text-[9px] text-gray-400">
          <span>Week 1</span>
          <span>Week 8</span>
        </div>
      </div>
    </div>
  </div>
)

// --- Types ---

interface TabData {
  id: string
  label: string
  icon: React.ElementType
  tag: string
  title: string
  description: string
  bullets: string[]
  visual: React.FC
}

const tabs: TabData[] = [
  {
    id: 'structure',
    label: 'Structure',
    icon: Blueprint,
    tag: 'Structure',
    title: 'Built around exam design, not randomness.',
    description: 'Quezia begins with structure. Every exam is broken down into its real components — sections, question types, difficulty progression, and scoring logic. Preparation stays aligned with the exam, not assumptions.',
    bullets: [
      'Exam blueprints and versions',
      'Section-level flow and constraints',
      'Rules embedded directly into tests'
    ],
    visual: StructureVisual
  },
  {
    id: 'practice',
    label: 'Practice Engine',
    icon: Target,
    tag: 'Practice',
    title: 'Practice that compounds, not repeats.',
    description: 'Practice in Quezia is deliberate. Questions are selected with intent — reinforcing concepts, exposing weaknesses, and building exam-specific instincts.',
    bullets: [
      'Context-aware practice modes',
      'Pattern-aligned question selection',
      'Time and accuracy tracked together'
    ],
    visual: PracticeVisual
  },
  {
    id: 'intelligence',
    label: 'Intelligence',
    icon: Brain,
    tag: 'Intelligence',
    title: 'Insight, not motivation.',
    description: 'Quezia observes how you prepare — identifying patterns in mistakes, time usage, and conceptual gaps, translating data into clear guidance.',
    bullets: [
      'Concept-level weakness detection',
      'Time-pressure behavior analysis',
      'Personalized focus recommendations'
    ],
    visual: IntelligenceVisual
  },
  {
    id: 'analytics',
    label: 'Analytics',
    icon: ChartLineUp,
    tag: 'Analytics',
    title: 'Measure progress the way exams do.',
    description: 'Progress is measured across dimensions that matter — accuracy under time, section balance, consistency, and trends. No vanity metrics.',
    bullets: [
      'Section-wise mastery tracking',
      'Speed vs accuracy trends',
      'Long-term performance curves'
    ],
    visual: AnalyticsVisual
  }
]

const Features: React.FC = () => {
  const [activeTab, setActiveTab] = useState('structure')
  const activeData = tabs.find(tab => tab.id === activeTab) || tabs[0]
  const VisualComponent = activeData.visual
  const IconComponent = activeData.icon

  return (
    <section className="relative bg-gray-50/50 min-h-screen flex flex-col justify-center py-8 lg:py-12">
      <div className="max-w-5xl mx-auto px-6 w-full">
        
        {/* Header - Compact */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-1.5 mb-4 shadow-sm">
            <Star size={14} weight="fill" className="text-[#EC2801]" />
            <span className="text-sm font-medium text-gray-800">Features</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-semibold text-gray-900 mb-3 tracking-tight">
            Not another practice platform.
          </h2>
          <p className="text-base text-gray-600 max-w-xl mx-auto leading-relaxed">
            Quezia is structured around how competitive exams are actually built, practiced, and mastered.
          </p>
        </div>

        {/* Tab Navigation - Separate Entity */}
        <div className="flex justify-center mb-4">
          <div className="inline-flex bg-white border border-gray-200 rounded-xl p-1 shadow-sm">
            {tabs.map((tab) => {
              const TabIcon = tab.icon
              const isActive = activeTab === tab.id
              
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                    ${isActive 
                      ? 'bg-gray-100 text-gray-900' 
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                    }
                  `}
                >
                  <TabIcon 
                    size={18} 
                    weight={isActive ? "duotone" : "regular"}
                    className={isActive ? "text-[#EC2801]" : "text-gray-400"}
                  />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Content Card - Separate Entity Below */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
          <div className="grid lg:grid-cols-2 h-[520px] lg:h-[520px]">
            
            {/* Left Column - Text */}
            <div className="p-8 lg:p-10 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-gray-100">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                >
                  {/* Tag */}
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 border border-gray-200 w-fit">
                    <IconComponent size={14} className="text-[#EC2801]" weight="duotone" />
                    <span className="text-[11px] font-bold text-gray-700 uppercase tracking-wider">
                      {activeData.tag}
                    </span>
                  </div>
                  
                  <h3 className="text-2xl font-semibold text-gray-900 leading-tight">
                    {activeData.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed text-[15px]">
                    {activeData.description}
                  </p>
                  
                  <ul className="space-y-2 pt-1">
                    {activeData.bullets.map((bullet, index) => (
                      <li key={index} className="flex items-start gap-2.5 text-gray-700 text-[14px]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#EC2801] mt-1.5 shrink-0"/>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right Column - Visual */}
            <div className="relative bg-gray-50/50 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.25 }}
                  className="absolute inset-0"
                >
                  <VisualComponent />
                </motion.div>
              </AnimatePresence>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  )
}

export default Features
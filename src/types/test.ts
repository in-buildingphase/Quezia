// Shared types for test data - single source of truth

export type Section = {
  id: string
  name: string
  startIndex: number
  endIndex: number
}

export type MCQQuestion = {
  id: number
  text: string
  marks: number
  type: 'mcq'
  options: string[]
  section?: string
}

export type IntegerQuestion = {
  id: number
  text: string
  marks: number
  type: 'integer'
  hint?: string
  section?: string
}

export type Question = MCQQuestion | IntegerQuestion

// For preview cards (simplified view)
export type PreviewQuestion = {
  id: number
  text: string
  marks: number
  options?: string[]
}

// Full test configuration passed between routes
export type TestConfig = {
  id: string
  title: string
  subject?: string
  questions: Question[]
  sections?: Section[]
  durationMinutes: number
  isMock: boolean
  marking?: {
    correct: number
    incorrect: number
    unattempted: number
  }
}

// Helper to convert duration string to minutes
export function parseDuration(duration: string): number {
  const lower = duration.toLowerCase()
  
  // Handle "3 Hours", "3 hours", "3h"
  const hoursMatch = lower.match(/(\d+)\s*h/)
  if (hoursMatch) {
    return parseInt(hoursMatch[1], 10) * 60
  }
  
  // Handle "30 mins", "30 minutes", "30m"
  const minsMatch = lower.match(/(\d+)\s*m/)
  if (minsMatch) {
    return parseInt(minsMatch[1], 10)
  }
  
  // Default fallback
  return 60
}

// Helper to format minutes to display string
export function formatDuration(minutes: number): string {
  if (minutes >= 60) {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    if (mins === 0) {
      return `${hours} Hour${hours > 1 ? 's' : ''}`
    }
    return `${hours}h ${mins}m`
  }
  return `${minutes} mins`
}

// Generate sample questions for testing
export function generateSampleQuestions(count: number): Question[] {
  return Array.from({ length: count }, (_, i) => {
    // Every 10th question is an integer type
    if ((i + 1) % 10 === 0) {
      return {
        id: i + 1,
        text: `Sample question ${i + 1}: Calculate the numerical value. Enter your answer as an integer.`,
        marks: 4,
        type: 'integer' as const,
        hint: 'Round to the nearest whole number. Negative values are allowed.',
      }
    }
    return {
      id: i + 1,
      text: `Sample question ${i + 1}: This is a placeholder question to test the UI with ${count} questions. What is the correct answer?`,
      marks: 4,
      type: 'mcq' as const,
      options: ['Option A', 'Option B', 'Option C', 'Option D'],
    }
  })
}

// JEE-style sections configuration
export const JEE_SECTIONS: Section[] = [
  { id: 'physics', name: 'Physics', startIndex: 0, endIndex: 24 },
  { id: 'chemistry', name: 'Chemistry', startIndex: 25, endIndex: 49 },
  { id: 'maths', name: 'Mathematics', startIndex: 50, endIndex: 74 },
]

// Generate JEE-style questions with 3 sections
export function generateJEEQuestions(): { questions: Question[]; sections: Section[] } {
  const sections = JEE_SECTIONS
  const questions: Question[] = []

  const sectionTopics: Record<string, string[]> = {
    physics: ['Mechanics', 'Electrostatics', 'Magnetism', 'Optics', 'Modern Physics'],
    chemistry: ['Organic Chemistry', 'Inorganic Chemistry', 'Physical Chemistry', 'Coordination Compounds', 'Chemical Bonding'],
    maths: ['Calculus', 'Algebra', 'Coordinate Geometry', 'Vectors', 'Probability'],
  }

  sections.forEach((section) => {
    const topics = sectionTopics[section.id] || ['General']
    const questionsInSection = section.endIndex - section.startIndex + 1

    for (let i = 0; i < questionsInSection; i++) {
      const globalIndex = section.startIndex + i
      const topic = topics[i % topics.length]
      const isInteger = i >= 20 // Last 5 questions in each section are integer type (JEE pattern)

      if (isInteger) {
        questions.push({
          id: globalIndex + 1,
          text: `Question ${i + 1}: Calculate the numerical value for this ${topic.toLowerCase()} problem.`,
          marks: 4,
          type: 'integer',
          hint: 'Enter your answer as an integer (range: -999 to 999)',
          section: section.id,
        })
      } else {
        questions.push({
          id: globalIndex + 1,
          text: `Question ${i + 1}: This is a ${topic.toLowerCase()} question. Which of the following is correct?`,
          marks: 4,
          type: 'mcq',
          options: [
            `Option A related to ${topic}`,
            `Option B related to ${topic}`,
            `Option C related to ${topic}`,
            `Option D related to ${topic}`,
          ],
          section: section.id,
        })
      }
    }
  })

  return { questions, sections }
}

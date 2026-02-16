import { useMemo, useEffect, useState } from 'react'
import LoadingSpinner from '../components/common/LoadingSpinner'
import { useParams, useNavigate } from 'react-router-dom'
import { CaretLeft } from '@phosphor-icons/react'
import { MockDatabase } from '../services/mockDatabase'

// New Redesigned Components
import CompactHeaderSummary from '../components/test-analytics/CompactHeaderSummary'
import QuestionReviewSection, { type QuestionReviewData } from '../components/test-analytics/QuestionReviewSection'
import TacticalInsightStrip from '../components/test-analytics/TacticalInsightStrip'

// Refactored Analytics Components
import SubjectPerformanceCard from '../components/test-analytics/SubjectPerformanceCard'
import TimeAnalysisCard from '../components/test-analytics/TimeAnalysisCard'
import DifficultyBreakdownCard from '../components/test-analytics/DifficultyBreakdownCard'
import TopicWeaknessCard from '../components/test-analytics/TopicWeaknessCard'
import ImprovementComparisonCard from '../components/test-analytics/ImprovementComparisonCard'

const TestAnalyticsPage = () => {
    const { testId } = useParams<{ testId: string }>()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)

    // -------------------------------------------------------------------------
    // Data Fetching & Orchestration
    // -------------------------------------------------------------------------
    const attempt = useMemo(() => {
        if (!testId) return null
        const attempts = MockDatabase.getAttemptsForTest(testId)
        return attempts.sort((a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )[0]
    }, [testId])

    const test = useMemo(() => {
        return testId ? MockDatabase.getTest(testId) : null
    }, [testId])

    const prevAttempt = useMemo(() => {
        if (!attempt) return null
        const allAttempts = MockDatabase.getAllAttempts()
        return allAttempts
            .filter(a => new Date(a.createdAt) < new Date(attempt.createdAt))
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0]
    }, [attempt])

    useEffect(() => {
        if (attempt && test) {
            setTimeout(() => setLoading(false), 500)
        }
    }, [attempt, test])

    // -------------------------------------------------------------------------
    // Derived Analytics Data
    // -------------------------------------------------------------------------

    // 1. Expanded Question Data for Review Section
    const detailedQuestions = useMemo((): QuestionReviewData[] => {
        if (!attempt || !test) return []
        return attempt.questionAttempts.map(qa => {
            const qDef = test.questions.find(q => q.id === qa.questionId)
            return {
                id: qa.questionId,
                section: qDef?.section || 'N/A',
                subject: qDef?.section ? qDef.section.charAt(0).toUpperCase() + qDef.section.slice(1) : 'General',
                topic: qDef?.topic || 'General',
                difficulty: qDef?.difficulty || 'medium',
                status: qa.status,
                marks: qa.status === 'correct' ? (test.marking?.correct || 4) :
                    qa.status === 'incorrect' ? (test.marking?.incorrect || -1) : 0,
                time: qa.timeSpentSeconds,
                text: qDef?.text || 'Question text not found',
                options: qDef?.type === 'mcq' ? qDef.options : undefined,
                userAnswer: qa.userAnswer,
                correctAnswer: qDef?.correctAnswer,
                explanation: qDef?.explanation || `This question tests concepts of ${qDef?.topic}. Detailed solution coming soon.`
            }
        })
    }, [attempt, test])

    // 2. Tactical Insights
    const tacticalInsights = useMemo(() => {
        if (!detailedQuestions.length) return []
        const list: any[] = []

        const marksLost = detailedQuestions.filter(q => q.status === 'incorrect').length * 1
        if (marksLost > 10) {
            list.push({ type: 'critical', text: `Negative Marking (-${marksLost}m) is your biggest leak.` })
        }

        const avgTime = attempt!.timeTakenMinutes * 60 / detailedQuestions.length
        if (avgTime < 150) {
            list.push({ type: 'success', text: `Excellent Speed: ${Math.round(avgTime)}s per question.` })
        }

        const trickyMisses = detailedQuestions.filter(q => q.difficulty === 'hard' && q.status === 'incorrect').length
        if (trickyMisses > 3) {
            list.push({ type: 'warning', text: `Strategic Alert: ${trickyMisses} hard questions were over-attempted.` })
        }

        return list
    }, [detailedQuestions, attempt])

    // 3. Subject Performance
    const subjectsData = useMemo(() => {
        const subs = ['Physics', 'Chemistry', 'Mathematics']
        return subs.map(s => {
            const qs = detailedQuestions.filter(q => q.subject.toLowerCase() === (s === 'Mathematics' ? 'maths' : s.toLowerCase()))
            const correct = qs.filter(q => q.status === 'correct').length
            const attempted = qs.filter(q => q.status !== 'unattempted').length
            const accuracy = attempted > 0 ? Math.round((correct / attempted) * 100) : 0
            const score = qs.reduce((acc, q) => acc + q.marks, 0)

            return {
                subject: s,
                score,
                maxScore: qs.length * 4,
                accuracy,
                attemptRate: qs.length > 0 ? Math.round((attempted / qs.length) * 100) : 0,
                avgTimePerQ: qs.length > 0 ? Math.round(qs.reduce((acc, q) => acc + q.time, 0) / qs.length) : 0,
                status: accuracy > 75 ? 'strong' : accuracy > 50 ? 'average' : 'weak' as any
            }
        })
    }, [detailedQuestions])

    // 4. Time Analysis
    const timeStats = useMemo(() => {
        const diffTime = (diff: string) => {
            const qs = detailedQuestions.filter(q => q.difficulty === diff && q.status !== 'unattempted')
            return qs.length > 0 ? Math.round(qs.reduce((acc, q) => acc + q.time, 0) / qs.length) : 0
        }

        return {
            avgTimeEasy: diffTime('easy'),
            avgTimeMedium: diffTime('medium'),
            avgTimeHard: diffTime('hard'),
            totalTimeSpent: attempt?.timeTakenMinutes ? attempt.timeTakenMinutes * 60 : 0,
            slowestQuestions: [...detailedQuestions].sort((a, b) => b.time - a.time).slice(0, 4)
        }
    }, [detailedQuestions, attempt])

    // 5. Difficulty Breakdown
    const diffMatrix = useMemo(() => {
        const getStats = (diff: string) => {
            const qs = detailedQuestions.filter(q => q.difficulty === diff)
            const correct = qs.filter(q => q.status === 'correct').length
            const attempted = qs.filter(q => q.status !== 'unattempted').length
            return {
                correct,
                incorrect: attempted - correct,
                unattempted: qs.length - attempted,
                accuracy: attempted > 0 ? Math.round((correct / attempted) * 100) : 0
            }
        }
        return {
            easy: getStats('easy'),
            medium: getStats('medium'),
            hard: getStats('hard')
        }
    }, [detailedQuestions])

    // 6. Topic Weakness
    const weakTopics = useMemo(() => {
        const topicGroups: Record<string, typeof detailedQuestions> = {}
        detailedQuestions.forEach(q => {
            if (!topicGroups[q.topic]) topicGroups[q.topic] = []
            topicGroups[q.topic].push(q)
        })

        return Object.entries(topicGroups)
            .map(([name, qs]) => {
                const correct = qs.filter(q => q.status === 'correct').length
                const attempted = qs.filter(q => q.status !== 'unattempted').length
                const negatives = qs.filter(q => q.status === 'incorrect').length * 1
                const accuracy = attempted > 0 ? Math.round((correct / attempted) * 100) : 0
                const avgTime = Math.round(qs.reduce((acc, q) => acc + q.time, 0) / qs.length)

                return {
                    name,
                    subject: qs[0].subject,
                    accuracy,
                    negatives,
                    avgTime,
                    reason: negatives > 2 ? 'negatives' : avgTime > 120 ? 'time' : 'accuracy' as any
                }
            })
            .sort((a, b) => a.accuracy - b.accuracy)
            .slice(0, 3)
    }, [detailedQuestions])

    // 7. Deltas
    const deltas = useMemo(() => {
        if (!attempt || !prevAttempt) return []
        const dScore = attempt.score - prevAttempt.score
        const dAcc = attempt.accuracy - prevAttempt.accuracy
        const dTime = attempt.timeTakenMinutes - prevAttempt.timeTakenMinutes

        return [
            { label: 'Score', value: dScore, direction: (dScore > 0 ? 'up' : dScore < 0 ? 'down' : 'neutral') as any, isGood: dScore >= 0 },
            { label: 'Accuracy', value: dAcc, direction: (dAcc > 0 ? 'up' : dAcc < 0 ? 'down' : 'neutral') as any, isGood: dAcc >= 0 },
            { label: 'Time', value: dTime, direction: (dTime > 0 ? 'up' : dTime < 0 ? 'down' : 'neutral') as any, isGood: dTime <= 0 },
            { label: 'Efficiency', value: 12, direction: 'up' as any, isGood: true }
        ]
    }, [attempt, prevAttempt])

    if (!testId || !attempt || !test) return null

    if (loading) return (
        <LoadingSpinner fullScreen size="lg" message="Analyzing Performance..." />
    )

    return (
        <div className="min-h-screen bg-[#050505] text-neutral-400 font-sans selection:bg-blue-500/10">
            {/* Minimal Sticky Header */}
            <div className="sticky top-0 z-50 bg-[#050505]/80 backdrop-blur-md border-b border-white/5 py-4 px-6">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <button
                        onClick={() => navigate('/dashboard/analytics')}
                        className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-neutral-600 hover:text-white transition-colors group"
                    >
                        <CaretLeft size={16} />
                        Exit Analysis
                    </button>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate(`/dashboard/tests/thread/${testId}/preview`, { state: { testConfig: test } })}
                            className="px-5 py-2.5 bg-white rounded-xl text-[10px] font-black uppercase tracking-widest text-black hover:bg-neutral-200 transition-all flex items-center gap-2"
                        >
                            Retake Test
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-10 space-y-12">

                {/* Layer 1: Results & Immediate Review */}
                <div className="space-y-8">
                    <CompactHeaderSummary
                        title={test.title}
                        date={new Date(attempt.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                        score={attempt.score}
                        totalMarks={attempt.totalMarks}
                        accuracy={attempt.accuracy}
                        attemptRate={Math.round((attempt.questionAttempts.filter(q => q.status !== 'unattempted').length / test.questions.length) * 100)}
                        timeTakenMinutes={attempt.timeTakenMinutes}
                        riskRatio={attempt.questionAttempts.filter(q => q.status === 'incorrect').length / attempt.questionAttempts.length}
                    />

                    <QuestionReviewSection questions={detailedQuestions} />
                </div>

                {/* Layer 2: Tactical Insights */}
                <div className="py-2">
                    <TacticalInsightStrip insights={tacticalInsights} />
                </div>

                {/* Layer 3: Deep Analytics Matrix */}
                <div className="space-y-12 border-t border-white/5 pt-12">
                    <ImprovementComparisonCard deltas={deltas} />

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <SubjectPerformanceCard subjects={subjectsData} />
                        <DifficultyBreakdownCard easy={diffMatrix.easy} medium={diffMatrix.medium} hard={diffMatrix.hard} />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <TimeAnalysisCard {...timeStats} />
                        <TopicWeaknessCard topics={weakTopics} />
                    </div>
                </div>

                {/* Footer Disclaimer */}
                <div className="text-center pt-12">
                    <p className="text-[10px] font-black text-neutral-800 uppercase tracking-[0.3em]">
                        Quezia Intelligence Engine • JEE Advanced Standard
                    </p>
                </div>
            </div>
        </div>
    )
}

export default TestAnalyticsPage

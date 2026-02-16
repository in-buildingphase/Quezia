
import { MockDatabase, dbRequest, type TestAttempt } from './mockDatabase'
import type {
    AnalyticsFilter,
    MetricCardData,
    PerformanceTrendPoint,
    RankComparisonPoint,
    SubjectMastery,
    TimeEfficiencyPoint,
    TopicHealth
} from '../components/Dashboard/Analytics/types'

// --------------------------------------------------------------------------
// Helpers
// --------------------------------------------------------------------------

// Filter attempts based on UI filters
const filterAttempts = (attempts: TestAttempt[], filter: AnalyticsFilter): TestAttempt[] => {
    let filtered = attempts.filter(a => {
        // @ts-ignore - only include submitted/completed attempts in analytics
        if (a.isSubmitted === false) return false
        return true
    })

    // 1. Date Range
    const now = new Date()
    if (filter.dateRange === 'week') {
        const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
        filtered = filtered.filter(a => new Date(a.createdAt) >= oneWeekAgo)
    } else if (filter.dateRange === 'month') {
        const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
        filtered = filtered.filter(a => new Date(a.createdAt) >= oneMonthAgo)
    } else if (filter.dateRange === 'year') {
        const oneYearAgo = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000)
        filtered = filtered.filter(a => new Date(a.createdAt) >= oneYearAgo)
    }

    // 2. Subject Filter
    if (filter.subject && filter.subject.length > 0) {
        filtered = filtered.filter(a => {
            const test = MockDatabase.getTest(a.testId)
            return filter.subject.some(s => test?.subject?.includes(s) || test?.title.includes(s))
        })
    }

    // 3. Search Query with Relevance Sorting
    if (filter.searchQuery) {
        const query = filter.searchQuery.toLowerCase()

        // Calculate relevance scores
        const scored = filtered.map(a => {
            const test = MockDatabase.getTest(a.testId)
            const title = test?.title.toLowerCase() || ''
            const subject = test?.subject?.toLowerCase() || ''

            let score = 0
            if (title === query || subject === query) score = 100
            else if (title.startsWith(query) || subject.startsWith(query)) score = 50
            else if (title.includes(query) || subject.includes(query)) score = 10

            return { attempt: a, score }
        })

        // Sort by score (descending) then by date (descending)
        scored.sort((a, b) => {
            if (b.score !== a.score) return b.score - a.score
            return new Date(b.attempt.createdAt).getTime() - new Date(a.attempt.createdAt).getTime()
        })

        filtered = scored.map(s => s.attempt)
    }

    return filtered
}

// --------------------------------------------------------------------------
// Metric Calculators
// --------------------------------------------------------------------------

const calculateMetrics = (attempts: TestAttempt[]): MetricCardData[] => {
    if (attempts.length === 0) return []

    // 1. Overall Accuracy
    const allQuestions = attempts.flatMap(a => a.questionAttempts)
    const totalCorrect = allQuestions.filter(q => q.status === 'correct').length
    const totalAttempted = allQuestions.filter(q => q.status !== 'unattempted').length
    const overallAccuracy = totalAttempted > 0 ? Math.round((totalCorrect / totalAttempted) * 100) : 0

    // 2. Avg Score
    const avgScore = Math.round(attempts.reduce((acc, a) => acc + a.score, 0) / attempts.length)
    const avgTotalMarks = Math.round(attempts.reduce((acc, a) => acc + a.totalMarks, 0) / attempts.length)

    // 3. Best Rank (Mock logic)
    // In a real app, this comes from a leaderboard service.
    // We'll simulate rank based on score percentile.
    const bestRank = Math.max(1, 42 - attempts.length) // Fake improvement

    // 4. Streak (Mock)
    const streak = 5 // Hardcoded for now as we don't track daily login in attempts

    // 5. Avg Time Per Question
    const avgTimeSeconds = Math.round(
        allQuestions.reduce((acc, q) => acc + q.timeSpentSeconds, 0) / allQuestions.length
    )
    const avgTimeDisplay = `${Math.floor(avgTimeSeconds / 60)}m ${avgTimeSeconds % 60} s`

    // 6. Weakest Subject
    // We need to group questions by subject to find this.
    // Since QuestionAttempt only has ID, we need to map back to Question definition.
    const allDbQuestions = MockDatabase.getQuestions()
    const subjectPerformance: Record<string, { correct: number, total: number }> = {}

    allQuestions.forEach(qa => {
        const qDef = allDbQuestions.find(q => q.id === qa.questionId)
        if (qDef?.section) {
            if (!subjectPerformance[qDef.section]) subjectPerformance[qDef.section] = { correct: 0, total: 0 }
            subjectPerformance[qDef.section].total++
            if (qa.status === 'correct') subjectPerformance[qDef.section].correct++
        }
    })

    let weakestSubject = 'N/A'
    let minAcc = 100
    Object.entries(subjectPerformance).forEach(([subj, data]) => {
        const acc = (data.correct / data.total) * 100
        if (acc < minAcc) {
            minAcc = acc
            weakestSubject = subj.charAt(0).toUpperCase() + subj.slice(1) // Capitalize
        }
    })


    return [
        {
            id: '1',
            label: 'Overall Accuracy',
            value: `${overallAccuracy}%`,
            trend: { value: 5.2, direction: 'up', label: 'vs last month' }, // Mock trend
            metricDirection: 'increase_is_good',
            color: '[#EC2801]',
            icon: null
        },
        {
            id: '2',
            label: 'Average Score',
            value: `${avgScore} / ${avgTotalMarks}`,
            metricDirection: 'increase_is_good',
            color: '[#F97316]'
        },
        {
            id: '3',
            label: 'Best Rank',
            value: `#${bestRank}`,
            metricDirection: 'increase_is_good',
            color: '[#FAB005]'
        },
        {
            id: '4',
            label: 'Current Streak',
            value: `${streak} Days`,
            metricDirection: 'increase_is_good',
            color: '[#F59E0B]'
        },
        {
            id: '5',
            label: 'Avg Time / Q',
            value: avgTimeDisplay,
            metricDirection: 'decrease_is_good',
            color: '[#EA580C]'
        },
        {
            id: '6',
            label: 'Weakest Subject',
            value: weakestSubject,
            metricDirection: 'increase_is_good',
            color: '[#991B1B]'
        },
    ]
}

const calculatePerformanceTrend = (attempts: TestAttempt[]): PerformanceTrendPoint[] => {
    // Group by Month (simplified)
    // For granular "dateRange=week", we might group by day.
    // Assuming "month" view for now.

    // Sort by date ascending
    const sorted = [...attempts].sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())

    return sorted.map(a => {
        const date = new Date(a.createdAt)
        return {
            date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            score: a.score,
            totalMarks: a.totalMarks,
            accuracy: a.accuracy,
            percentile: Math.min(99, 50 + (a.score / a.totalMarks) * 50) // Mock percentile logic
        }
    })
}

const calculateSubjectMastery = (attempts: TestAttempt[]): SubjectMastery[] => {
    const allDbQuestions = MockDatabase.getQuestions()
    const subjectStats: Record<string, { correct: number, attempted: number, totalQs: number, totalScore: number }> = {}

    // Initialize from Schema sections to ensure all subjects exist even if 0 attempts
    // (We'd need to mock this or import JEE_SECTIONS, but for now we inferred from attempts)

    attempts.forEach(attempt => {
        attempt.questionAttempts.forEach(qa => {
            if (qa.status === 'unattempted') return // Mastery usually based on attempted? Or total available? 
            // Let's go with Attempted for accuracy, but the chart needs "Total Questions" to show coverage?
            // The interface asks for 'accuracy', 'avgMark', 'attempted', 'totalQuestions'.

            const qDef = allDbQuestions.find(q => q.id === qa.questionId)
            if (!qDef?.section) return

            const subj = qDef.section.charAt(0).toUpperCase() + qDef.section.slice(1) // Capitalize

            if (!subjectStats[subj]) subjectStats[subj] = { correct: 0, attempted: 0, totalQs: 0, totalScore: 0 }

            subjectStats[subj].attempted++
            subjectStats[subj].totalQs++ // In this logic, we only count questions seen in tests
            if (qa.status === 'correct') {
                subjectStats[subj].correct++
                subjectStats[subj].totalScore += (qDef.marks || 4)
            }
        })
    })

    return Object.entries(subjectStats).map(([subject, stats], index) => {
        const colors = ['#EC2801', '#F97316', '#FAB005']
        return {
            subject,
            accuracy: Math.round((stats.correct / stats.attempted) * 100) || 0,
            avgMark: Math.round(stats.totalScore / (stats.attempted || 1)), // Simplified
            attempted: stats.attempted,
            totalQuestions: stats.totalQs, // In a real app this is total distinct questions available in DB for that subject
            color: colors[index % colors.length]
        }
    })
}

const calculateTopicHealth = (attempts: TestAttempt[]): TopicHealth[] => {
    const allTests = MockDatabase.getAllTests()

    // Create a map of questionId -> Question for quick lookup
    const questionMap = new Map<number, any>()
    allTests.forEach(test => {
        test.questions.forEach(q => {
            if (!questionMap.has(q.id)) {
                questionMap.set(q.id, q)
            }
        })
    })

    const topicStats: Record<string, {
        subject: string,
        correct: number,
        attempted: number,
        totalInDb: number,
        totalTime: number,
        negativeCount: number,
        accuracyHistory: { date: number, acc: number }[]
        diffStats: { easy: { c: number, t: number }, medium: { c: number, t: number }, hard: { c: number, t: number } }
    }> = {}

    // Initialize counts for all topics found in the DB (Total Available)
    questionMap.forEach((q) => {
        if (!q.topic) return
        if (!topicStats[q.topic]) {
            topicStats[q.topic] = {
                subject: q.section ? q.section.charAt(0).toUpperCase() + q.section.slice(1) : 'General',
                correct: 0, attempted: 0, totalInDb: 0, totalTime: 0, negativeCount: 0, accuracyHistory: [],
                diffStats: { easy: { c: 0, t: 0 }, medium: { c: 0, t: 0 }, hard: { c: 0, t: 0 } }
            }
        }
        topicStats[q.topic].totalInDb++
    })

    // Process attempts
    attempts.forEach(attempt => {
        // Group by topic for this attempt to calculate per-attempt topic accuracy
        const attemptTopicAccuracy: Record<string, { correct: number, total: number }> = {}

        attempt.questionAttempts.forEach(qa => {
            if (qa.status === 'unattempted') return

            const qDef = questionMap.get(qa.questionId)
            if (!qDef?.topic) return

            const topic = qDef.topic
            const stats = topicStats[topic]

            stats.attempted++
            stats.totalTime += qa.timeSpentSeconds

            if (!attemptTopicAccuracy[topic]) attemptTopicAccuracy[topic] = { correct: 0, total: 0 }
            attemptTopicAccuracy[topic].total++

            if (qa.status === 'correct') {
                stats.correct++
                attemptTopicAccuracy[topic].correct++
                if (qDef.difficulty) stats.diffStats[qDef.difficulty as 'easy' | 'medium' | 'hard'].c++
            } else if (qa.status === 'incorrect') {
                stats.negativeCount++
            }

            if (qDef.difficulty) stats.diffStats[qDef.difficulty as 'easy' | 'medium' | 'hard'].t++
        })

        // Save accuracy history for trend calculation
        Object.entries(attemptTopicAccuracy).forEach(([topic, data]) => {
            topicStats[topic].accuracyHistory.push({
                date: new Date(attempt.createdAt).getTime(),
                acc: Math.round((data.correct / data.total) * 100)
            })
        })
    })

    return Object.entries(topicStats).map(([topic, stats]) => {
        const accuracy = stats.attempted > 0 ? Math.round((stats.correct / stats.attempted) * 100) : 0
        const diffCalc = (d: { c: number, t: number }) => d.t > 0 ? Math.round((d.c / d.t) * 100) : 0

        // Calculate Trend Delta: Compare latest accuracy vs average
        let trendDelta = 0
        if (stats.accuracyHistory.length >= 2) {
            const sortedHistory = [...stats.accuracyHistory].sort((a, b) => a.date - b.date)
            const latest = sortedHistory[sortedHistory.length - 1].acc
            const previous = sortedHistory[Math.max(0, sortedHistory.length - 3)].acc // Compare with ~3 tests ago if possible
            trendDelta = latest - previous
        }

        const lastTestedDate = stats.accuracyHistory.length > 0
            ? new Date(Math.max(...stats.accuracyHistory.map(h => h.date))).toLocaleDateString()
            : 'Never'

        return {
            topic,
            subject: stats.subject,
            accuracy,
            attempted: stats.attempted,
            totalAvailable: stats.totalInDb,
            avgTimePerQ: stats.attempted > 0 ? Math.round(stats.totalTime / stats.attempted) : 0,
            negativeRate: stats.attempted > 0 ? Math.round((stats.negativeCount / stats.attempted) * 100) : 0,
            trendDelta,
            consistency: accuracy > 75 ? 'stable' : accuracy > 50 ? 'improving' : stats.accuracyHistory.length > 5 ? 'volatile' : 'declining',
            lastTestedDate,
            difficultyBreakdown: {
                easy: diffCalc(stats.diffStats.easy),
                medium: diffCalc(stats.diffStats.medium),
                hard: diffCalc(stats.diffStats.hard)
            },
            weightage: 0.1, // Placeholder
            status: accuracy > 80 ? 'strong' : accuracy < 50 ? 'weak' : 'moderate'
        }
    })
}

const calculateTimeEfficiency = (attempts: TestAttempt[]): TimeEfficiencyPoint[] => {
    const points: TimeEfficiencyPoint[] = []
    const allDbQuestions = MockDatabase.getQuestions()

    attempts.slice(0, 10).forEach(attempt => {
        // Simplified: Just one point per test per difficulty group
        ; (['easy', 'medium', 'hard'] as const).forEach(diff => {
            const qs = attempt.questionAttempts.filter(qa => {
                const qDef = allDbQuestions.find(q => q.id === qa.questionId)
                return qDef?.difficulty === diff && qa.status !== 'unattempted'
            })

            if (qs.length > 0) {
                const totalTime = qs.reduce((a, b) => a + b.timeSpentSeconds, 0)
                const totalCorrect = qs.filter(q => q.status === 'correct').length
                points.push({
                    testId: attempt.id, // simplified label : should be readable like 'Test 1'
                    difficulty: diff,
                    timeSpent: Math.round(totalTime / qs.length),
                    accuracy: Math.round((totalCorrect / qs.length) * 100)
                })
            }
        })
    })

    return points
}

// --------------------------------------------------------------------------
// Main Export
// --------------------------------------------------------------------------

export const analyticsService = {
    fetchAnalyticsDashboardData: async (filter: AnalyticsFilter) => {
        return dbRequest(() => {
            const allAttempts = MockDatabase.getAllAttempts()
            // Filter the attempts based on the user's criteria
            const filteredAttempts = filterAttempts(allAttempts, filter)

            // Parallel-ish calculation (synchronous actually)
            const metrics = calculateMetrics(filteredAttempts)
            const performanceTrend = calculatePerformanceTrend(filteredAttempts)
            const subjectMastery = calculateSubjectMastery(filteredAttempts)
            const topicHealth = calculateTopicHealth(filteredAttempts)
            const timeEfficiency = calculateTimeEfficiency(filteredAttempts)

            // Rank Distribution - Mock separately as it needs cohort data we don't really have
            const rankData: RankComparisonPoint[] = filteredAttempts.map(a => ({
                testId: a.createdAt.substring(0, 10),
                studentRank: Math.floor(Math.random() * 100) + 1,
                totalCandidates: 1000,
                percentile: a.accuracy + 10, // Mock
                avgRank: 500
            }))

            // AI Insights - Static for now, could be dynamic based on Weakest Subject
            const insights = [
                "Your accuracy in recent tests has improved by 5%.",
                "Physics Thermodynamics needs attention (High weightage, Low accuracy).",
            ]

            return {
                metrics,
                performanceData: performanceTrend,
                subjectData: subjectMastery,
                topicData: topicHealth,
                timeData: timeEfficiency,
                rankData,
                insights,
                filteredAttempts
            }
        })
    }
}

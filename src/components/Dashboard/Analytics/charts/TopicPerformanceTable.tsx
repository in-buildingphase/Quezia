import React, { useState, useMemo } from 'react'
import {
    MagnifyingGlass,
    CaretDown,
    CaretUp,
    Clock,
    WarningOctagon,
    TrendUp,
    TrendDown,
    Minus,
    Funnel,
    SortAscending,
    Target
} from '@phosphor-icons/react'
import type { TopicHealth } from '../types'
import { BlockDropdown } from '../../../common/Dropdown'

interface Props {
    data: TopicHealth[]
}

type SortOption = 'accuracy_asc' | 'accuracy_desc' | 'most_attempted' | 'largest_drop' | 'largest_improvement'
type FilterSubject = 'All' | 'Physics' | 'Chemistry' | 'Maths'
type FilterAccuracy = 'All' | 'Below 50%' | '50-70%' | 'Above 70%'

const TopicPerformanceTable: React.FC<Props> = ({ data }) => {
    const [searchQuery, setSearchQuery] = useState('')
    const [subjectFilter, setSubjectFilter] = useState<FilterSubject>('All')
    const [accuracyFilter, setAccuracyFilter] = useState<FilterAccuracy>('All')
    const [sortBy, setSortBy] = useState<SortOption>('accuracy_asc')
    const [expandedTopic, setExpandedTopic] = useState<string | null>(null)

    // Dropdown States
    const [subjectOpen, setSubjectOpen] = useState(false)
    const [accuracyOpen, setAccuracyOpen] = useState(false)
    const [sortOpen, setSortOpen] = useState(false)

    // --- Filter & Sort Logic ---
    const processedData = useMemo(() => {
        let filtered = data.filter(item =>
            item.topic.toLowerCase().includes(searchQuery.toLowerCase())
        )

        if (subjectFilter !== 'All') {
            filtered = filtered.filter(item => item.subject === subjectFilter)
        }

        if (accuracyFilter === 'Below 50%') {
            filtered = filtered.filter(item => item.accuracy < 50)
        } else if (accuracyFilter === '50-70%') {
            filtered = filtered.filter(item => item.accuracy >= 50 && item.accuracy <= 70)
        } else if (accuracyFilter === 'Above 70%') {
            filtered = filtered.filter(item => item.accuracy > 70)
        }

        return filtered.sort((a, b) => {
            switch (sortBy) {
                case 'accuracy_asc': return a.accuracy - b.accuracy
                case 'accuracy_desc': return b.accuracy - a.accuracy
                case 'most_attempted': return b.attempted - a.attempted
                case 'largest_drop': return a.trendDelta - b.trendDelta
                case 'largest_improvement': return b.trendDelta - a.trendDelta
                default: return 0
            }
        })
    }, [data, searchQuery, subjectFilter, accuracyFilter, sortBy])

    const toggleExpand = (topic: string) => {
        setExpandedTopic(expandedTopic === topic ? null : topic)
    }

    // Helper for consistency color
    const getConsistencyColor = (consistency: string) => {
        switch (consistency) {
            case 'stable': return 'text-emerald-400'
            case 'improving': return 'text-blue-400'
            case 'volatile': return 'text-amber-400'
            case 'declining': return 'text-rose-400'
            default: return 'text-neutral-400'
        }
    }

    return (
        <div className="rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-xl h-full flex flex-col overflow-hidden">
            {/* Header & Controls */}
            <div className="p-6 border-b border-white/5 space-y-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h3 className="text-lg font-semibold text-white">Topic Performance</h3>
                        <p className="text-sm text-neutral-400">Detailed topic-wise analysis</p>
                    </div>

                    <div className="flex flex-wrap gap-2 z-20">
                        {/* Search */}
                        <div className="relative grow md:grow-0 w-full md:w-auto">
                            <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" size={14} />
                            <input
                                type="text"
                                placeholder="Search..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full md:w-72 bg-black/20 border border-white/10 rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-white/20 transition-all h-9"
                            />
                        </div>

                        {/* Subject Filter */}
                        <div className="w-32">
                            <BlockDropdown
                                options={[
                                    { value: 'All', label: 'All Subjects' },
                                    { value: 'Physics', label: 'Physics' },
                                    { value: 'Chemistry', label: 'Chemistry' },
                                    { value: 'Maths', label: 'Maths' },
                                ]}
                                value={subjectFilter}
                                onChange={setSubjectFilter}
                                isOpen={subjectOpen}
                                setIsOpen={setSubjectOpen}
                                placeholder="Subject"
                            />
                        </div>

                        {/* Accuracy Filter */}
                        <div className="w-36">
                            <BlockDropdown
                                options={[
                                    { value: 'All', label: 'All Accuracy' },
                                    { value: 'Below 50%', label: 'Below 50%' },
                                    { value: '50-70%', label: '50-70%' },
                                    { value: 'Above 70%', label: 'Above 70%' },
                                ]}
                                value={accuracyFilter}
                                onChange={setAccuracyFilter}
                                isOpen={accuracyOpen}
                                setIsOpen={setAccuracyOpen}
                                placeholder="Accuracy"
                                icon={<Target size={14} />}
                            />
                        </div>

                        {/* Sort Control */}
                        <div className="w-48 ml-auto md:ml-0">
                            <BlockDropdown
                                options={[
                                    { value: 'accuracy_asc', label: 'Accuracy (Low to High)' },
                                    { value: 'accuracy_desc', label: 'Accuracy (High to Low)' },
                                    { value: 'most_attempted', label: 'Most Attempted' },
                                    { value: 'largest_drop', label: 'Largest Drop' },
                                    { value: 'largest_improvement', label: 'Largest Improvement' },
                                ]}
                                value={sortBy}
                                onChange={setSortBy}
                                isOpen={sortOpen}
                                setIsOpen={setSortOpen}
                                placeholder="Sort By"
                                icon={<SortAscending size={14} />}
                                alignRight
                                showActiveStyle
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 px-6 py-3 border-b border-white/5 bg-white/[0.01] text-[10px] uppercase tracking-wider text-neutral-500 font-medium">
                <div className="col-span-4 md:col-span-5">Topic</div>
                <div className="col-span-3 md:col-span-2 text-right">Accuracy</div>
                <div className="col-span-2 md:col-span-2 text-right hidden md:block">Attempts</div>
                <div className="col-span-3 md:col-span-2 text-right">Trend</div>
                <div className="col-span-2 md:col-span-1 text-center">Action</div>
            </div>

            {/* Table Body */}
            <div className="flex-1 overflow-y-auto custom-scrollbar">
                {processedData.length > 0 ? (
                    processedData.map((item) => {
                        const isExpanded = expandedTopic === item.topic
                        return (
                            <div key={item.topic} className={`border-b border-white/5 transition-colors ${isExpanded ? 'bg-white/[0.03]' : 'hover:bg-white/[0.01]'}`}>
                                {/* Main Row */}
                                <div
                                    className="grid grid-cols-12 gap-4 px-6 py-3.5 cursor-pointer items-center group"
                                    onClick={() => toggleExpand(item.topic)}
                                >
                                    <div className="col-span-4 md:col-span-5 flex items-center gap-3">
                                        <div className={`w-1 h-8 rounded-full shrink-0 ${item.accuracy >= 70 ? 'bg-emerald-500' :
                                            item.accuracy >= 50 ? 'bg-amber-500' : 'bg-rose-500'
                                            }`} />
                                        <div className="min-w-0">
                                            <div className="text-sm font-medium text-white truncate group-hover:text-amber-500 transition-colors">{item.topic}</div>
                                            <div className="text-[10px] text-neutral-500">{item.subject}</div>
                                        </div>
                                    </div>

                                    <div className="col-span-3 md:col-span-2 text-right font-mono text-sm text-neutral-300">
                                        {item.accuracy}%
                                    </div>

                                    <div className="col-span-2 md:col-span-2 text-right hidden md:block text-xs text-neutral-400">
                                        {item.attempted} <span className="text-[10px] text-neutral-600">/ {item.totalAvailable}</span>
                                    </div>

                                    <div className="col-span-3 md:col-span-2 text-right flex justify-end">
                                        <div className={`flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full bg-white/5 ${item.trendDelta > 0 ? 'text-emerald-400' :
                                            item.trendDelta < 0 ? 'text-rose-400' : 'text-neutral-400'
                                            }`}>
                                            {item.trendDelta > 0 ? <TrendUp size={12} weight="bold" /> :
                                                item.trendDelta < 0 ? <TrendDown size={12} weight="bold" /> : <Minus size={12} />}
                                            {Math.abs(item.trendDelta)}%
                                        </div>
                                    </div>

                                    <div className="col-span-2 md:col-span-1 flex justify-center text-neutral-600 group-hover:text-white transition-colors">
                                        {isExpanded ? <CaretUp size={14} /> : <CaretDown size={14} />}
                                    </div>
                                </div>

                                {/* Expanded Details */}
                                {isExpanded && (
                                    <div className="px-6 pb-6 pt-2 animate-in slide-in-from-top-1 duration-200">
                                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 rounded-xl bg-black/20 border border-white/5">

                                            {/* Key Metrics */}
                                            <div className="space-y-3 md:col-span-1 md:border-r border-white/5 md:pr-4">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-2 text-xs text-neutral-400">
                                                        <Clock size={14} /> Avg Time
                                                    </div>
                                                    <span className="text-xs font-medium text-white">{item.avgTimePerQ}s</span>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-2 text-xs text-neutral-400">
                                                        <WarningOctagon size={14} /> Negative Rate
                                                    </div>
                                                    <span className="text-xs font-medium text-white">{item.negativeRate}%</span>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-2 text-xs text-neutral-400">
                                                        <Funnel size={14} /> Last Tested
                                                    </div>
                                                    <span className="text-xs font-medium text-white">{item.lastTestedDate}</span>
                                                </div>
                                            </div>

                                            {/* Difficulty Breakdown */}
                                            <div className="md:col-span-2 space-y-3 md:border-r border-white/5 md:px-4">
                                                <div className="text-[10px] uppercase text-neutral-500 tracking-wider">Difficulty Accuracy</div>
                                                <div className="grid grid-cols-3 gap-3">
                                                    {/* Easy */}
                                                    <div>
                                                        <div className="flex justify-between items-end mb-1.5">
                                                            <span className="text-[10px] text-neutral-400">Easy</span>
                                                            <span className="text-xs font-semibold text-emerald-400">{item.difficultyBreakdown.easy}%</span>
                                                        </div>
                                                        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                                            <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${item.difficultyBreakdown.easy}%` }} />
                                                        </div>
                                                    </div>
                                                    {/* Medium */}
                                                    <div>
                                                        <div className="flex justify-between items-end mb-1.5">
                                                            <span className="text-[10px] text-neutral-400">Medium</span>
                                                            <span className="text-xs font-semibold text-amber-400">{item.difficultyBreakdown.medium}%</span>
                                                        </div>
                                                        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                                            <div className="h-full bg-amber-500 rounded-full" style={{ width: `${item.difficultyBreakdown.medium}%` }} />
                                                        </div>
                                                    </div>
                                                    {/* Hard */}
                                                    <div>
                                                        <div className="flex justify-between items-end mb-1.5">
                                                            <span className="text-[10px] text-neutral-400">Hard</span>
                                                            <span className="text-xs font-semibold text-rose-400">{item.difficultyBreakdown.hard}%</span>
                                                        </div>
                                                        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                                            <div className="h-full bg-rose-500 rounded-full" style={{ width: `${item.difficultyBreakdown.hard}%` }} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Status Badge */}
                                            <div className="md:col-span-1 flex flex-col items-end justify-center md:pl-4">
                                                <div className="text-[10px] text-neutral-500 uppercase mb-1">Consistency</div>
                                                <div className={`text-xs font-medium capitalize ${getConsistencyColor(item.consistency)}`}>
                                                    {item.consistency}
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                )}
                            </div>
                        )
                    })
                ) : (
                    <div className="text-center py-12 text-neutral-500">
                        No topics found matching your criteria.
                    </div>
                )}
            </div>
        </div>
    )
}

export default TopicPerformanceTable

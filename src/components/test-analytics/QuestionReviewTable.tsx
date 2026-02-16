import React, { useState, useMemo } from 'react'
import { CaretDown, MagnifyingGlass, ArrowRight } from '@phosphor-icons/react'

interface QuestionAttempt {
    id: number
    section: string
    subject: string
    topic: string
    difficulty: 'easy' | 'medium' | 'hard'
    status: 'correct' | 'incorrect' | 'unattempted'
    marks: number
    time: number
}

interface Props {
    questions: QuestionAttempt[]
}

const QuestionReviewTable: React.FC<Props> = ({ questions }) => {
    const [search, setSearch] = useState('')
    const [filter, setFilter] = useState<'all' | 'incorrect' | 'hard' | 'slow'>('all')
    const [sortConfig, setSortConfig] = useState<{ key: keyof QuestionAttempt, direction: 'asc' | 'desc' } | null>(null)

    const filteredQuestions = useMemo(() => {
        return questions.filter(q => {
            const matchSearch = q.topic.toLowerCase().includes(search.toLowerCase()) ||
                q.subject.toLowerCase().includes(search.toLowerCase())

            if (filter === 'incorrect') return matchSearch && q.status === 'incorrect'
            if (filter === 'hard') return matchSearch && q.difficulty === 'hard'
            if (filter === 'slow') return matchSearch && q.time > 180
            return matchSearch
        }).sort((a, b) => {
            if (!sortConfig) return 0
            const { key, direction } = sortConfig
            const factor = direction === 'asc' ? 1 : -1
            if (a[key] < b[key]) return -1 * factor
            if (a[key] > b[key]) return 1 * factor
            return 0
        })
    }, [questions, search, filter, sortConfig])

    const handleSort = (key: keyof QuestionAttempt) => {
        setSortConfig(prev => ({
            key,
            direction: prev?.key === key && prev.direction === 'desc' ? 'asc' : 'desc'
        }))
    }

    return (
        <div className="bg-neutral-900/80 backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden flex flex-col">
            {/* Toolbar */}
            <div className="p-6 border-b border-white/10 space-y-4">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <h3 className="text-xl font-bold text-white tracking-tight">Question Depth Review</h3>
                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <div className="relative flex-1 md:w-64">
                            <MagnifyingGlass size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
                            <input
                                type="text"
                                placeholder="Search topic or subject..."
                                className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-xs font-medium text-white placeholder:text-neutral-600 focus:outline-none focus:border-blue-500/50 transition-colors"
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <div className="flex flex-wrap gap-2">
                    <FilterButton active={filter === 'all'} onClick={() => setFilter('all')}>All Questions</FilterButton>
                    <FilterButton active={filter === 'incorrect'} onClick={() => setFilter('incorrect')}>Mistakes Only</FilterButton>
                    <FilterButton active={filter === 'hard'} onClick={() => setFilter('hard')}>Hard Questions</FilterButton>
                    <FilterButton active={filter === 'slow'} onClick={() => setFilter('slow')}>Time Inefficient ({'>'}180s)</FilterButton>
                </div>
            </div>

            {/* Table Content */}
            <div className="flex-1 overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[1000px]">
                    <thead>
                        <tr className="bg-white/5 text-[10px] text-neutral-500 uppercase tracking-widest font-bold border-b border-white/5">
                            <th className="px-6 py-4 cursor-pointer hover:text-white" onClick={() => handleSort('id')}>
                                <div className="flex items-center gap-1">
                                    # {sortConfig?.key === 'id' && <CaretDown className={sortConfig.direction === 'asc' ? 'rotate-180' : ''} />}
                                </div>
                            </th>
                            <th className="px-6 py-4 cursor-pointer hover:text-white" onClick={() => handleSort('section')}>
                                <div className="flex items-center gap-1">
                                    Section {sortConfig?.key === 'section' && <CaretDown className={sortConfig.direction === 'asc' ? 'rotate-180' : ''} />}
                                </div>
                            </th>
                            <th className="px-6 py-4 cursor-pointer hover:text-white" onClick={() => handleSort('subject')}>
                                <div className="flex items-center gap-1">
                                    Subject {sortConfig?.key === 'subject' && <CaretDown className={sortConfig.direction === 'asc' ? 'rotate-180' : ''} />}
                                </div>
                            </th>
                            <th className="px-6 py-4 cursor-pointer hover:text-white" onClick={() => handleSort('topic')}>
                                <div className="flex items-center gap-1">
                                    Topic {sortConfig?.key === 'topic' && <CaretDown className={sortConfig.direction === 'asc' ? 'rotate-180' : ''} />}
                                </div>
                            </th>
                            <th className="px-6 py-4 cursor-pointer hover:text-white" onClick={() => handleSort('difficulty')}>
                                <div className="flex items-center gap-1">
                                    Diff {sortConfig?.key === 'difficulty' && <CaretDown className={sortConfig.direction === 'asc' ? 'rotate-180' : ''} />}
                                </div>
                            </th>
                            <th className="px-6 py-4 cursor-pointer hover:text-white" onClick={() => handleSort('status')}>Status</th>
                            <th className="px-6 py-4 cursor-pointer hover:text-white" onClick={() => handleSort('marks')}>Marks</th>
                            <th className="px-6 py-4 cursor-pointer hover:text-white" onClick={() => handleSort('time')}>
                                <div className="flex items-center gap-1">
                                    Time {sortConfig?.key === 'time' && <CaretDown className={sortConfig.direction === 'asc' ? 'rotate-180' : ''} />}
                                </div>
                            </th>
                            <th className="px-6 py-4"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {filteredQuestions.map((q, i) => (
                            <tr key={i} className="group hover:bg-white/[0.02] transition-colors">
                                <td className="px-6 py-4 text-sm font-bold text-white">#{q.id}</td>
                                <td className="px-6 py-4 text-xs font-medium text-neutral-400 uppercase tracking-wider">{q.section}</td>
                                <td className="px-6 py-4 text-xs font-bold text-neutral-300 uppercase">{q.subject}</td>
                                <td className="px-6 py-4 text-sm font-medium text-white group-hover:text-blue-400 transition-colors uppercase tracking-tight">{q.topic}</td>
                                <td className="px-6 py-4">
                                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-md ${q.difficulty === 'easy' ? 'bg-green-500/10 text-green-400' :
                                        q.difficulty === 'medium' ? 'bg-yellow-500/10 text-yellow-400' : 'bg-red-500/10 text-red-400'
                                        }`}>
                                        {q.difficulty}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className={`flex items-center gap-1.5 text-xs font-bold uppercase ${q.status === 'correct' ? 'text-green-500' :
                                        q.status === 'incorrect' ? 'text-red-500' : 'text-neutral-600'
                                        }`}>
                                        {q.status}
                                    </div>
                                </td>
                                <td className={`px-6 py-4 text-sm font-mono font-bold ${q.marks > 0 ? 'text-green-500' : q.marks < 0 ? 'text-red-500' : 'text-neutral-500'
                                    }`}>
                                    {q.marks > 0 ? `+${q.marks}` : q.marks}
                                </td>
                                <td className={`px-6 py-4 text-sm font-mono font-medium ${q.time > 180 ? 'text-yellow-500' : 'text-neutral-300'}`}>
                                    {q.time}s
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button className="p-2 rounded-lg bg-white/5 border border-white/10 text-neutral-500 hover:bg-white/10 hover:text-white transition-all opacity-0 group-hover:opacity-100">
                                        <ArrowRight size={14} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

const FilterButton = ({ active, children, onClick }: { active: boolean, children: React.ReactNode, onClick: () => void }) => (
    <button
        onClick={onClick}
        className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${active ? 'bg-white/15 text-white shadow-lg shadow-white/5' : 'text-neutral-500 hover:text-neutral-400 hover:bg-white/5'
            }`}
    >
        {children}
    </button>
)

export default QuestionReviewTable

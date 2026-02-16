import React from 'react'
import { CheckCircle, WarningCircle, Clock, Tag, TrendUp } from '@phosphor-icons/react'
import type { QuestionReviewData } from './QuestionReviewSection'

interface Props {
    question?: QuestionReviewData
}

const QuestionDetailView: React.FC<Props> = ({ question }) => {
    if (!question) {
        return (
            <div className="flex-1 flex items-center justify-center text-neutral-600">
                <p className="text-sm font-medium">Select a question to debug</p>
            </div>
        )
    }

    const {
        text,
        options,
        userAnswer,
        correctAnswer,
        status,
        difficulty,
        topic,
        time,
        marks,
        explanation
    } = question

    return (
        <div className="flex-1 flex flex-col overflow-hidden">
            {/* Header / Meta */}
            <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/[0.01]">
                <div className="flex items-center gap-4">
                    <StatusBadge status={status} />
                    <div className="h-4 w-px bg-white/10" />
                    <div className="flex items-center gap-4">
                        <MetaItem icon={<Tag size={12} />} label="Topic" value={topic} />
                        <MetaItem icon={<TrendUp size={12} />} label="Difficulty" value={difficulty} color={
                            difficulty === 'easy' ? 'text-green-400' :
                                difficulty === 'medium' ? 'text-yellow-400' : 'text-red-400'
                        } />
                    </div>
                </div>

                <div className="flex items-center gap-6">
                    <div className="text-right">
                        <p className="text-[9px] font-bold text-neutral-500 uppercase tracking-widest mb-0.5">Time Spent</p>
                        <p className={`text-sm font-mono font-bold ${time > 120 ? 'text-yellow-400' : 'text-white'}`}>{time}s</p>
                    </div>
                    <div className="text-right">
                        <p className="text-[9px] font-bold text-neutral-500 uppercase tracking-widest mb-0.5">Marks</p>
                        <p className={`text-sm font-mono font-bold ${marks > 0 ? 'text-green-500' : marks < 0 ? 'text-red-500' : 'text-neutral-500'}`}>
                            {marks > 0 ? `+${marks}` : marks}
                        </p>
                    </div>
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
                {/* Question */}
                <div className="space-y-4">
                    <p className="text-lg font-medium text-neutral-100 leading-relaxed">
                        {text}
                    </p>
                </div>

                {/* Options */}
                {options && (
                    <div className="space-y-3 max-w-2xl">
                        {options.map((opt, idx) => {
                            const isUserSelection = userAnswer === idx
                            const isCorrect = correctAnswer === idx

                            let borderClass = 'border-white/5 bg-white/[0.02]'
                            let labelClass = 'bg-neutral-800 text-neutral-400'

                            if (isCorrect) {
                                borderClass = 'border-green-500/50 bg-green-500/[0.03]'
                                labelClass = 'bg-green-500 text-white'
                            } else if (isUserSelection && !isCorrect) {
                                borderClass = 'border-red-500/50 bg-red-500/[0.03]'
                                labelClass = 'bg-red-500 text-white'
                            }

                            return (
                                <div key={idx} className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${borderClass}`}>
                                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${labelClass}`}>
                                        {String.fromCharCode(65 + idx)}
                                    </div>
                                    <span className="text-sm font-medium text-neutral-300">{opt}</span>

                                    <div className="ml-auto flex items-center gap-3">
                                        {isCorrect && (
                                            <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-green-500/10 border border-green-500/20">
                                                <span className="text-[9px] font-black text-green-500 uppercase tracking-widest leading-none">Correct</span>
                                               
                                            </div>
                                        )}
                                        {isUserSelection && !isCorrect && (
                                            <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-red-500/10 border border-red-500/20">
                                                <span className="text-[9px] font-black text-red-500 uppercase tracking-widest leading-none">Your Selection</span>
                                                <WarningCircle size={14} weight="fill" className="text-red-500" />
                                            </div>
                                        )}
                                        {isUserSelection && isCorrect && (
                                            <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-green-500/20 border border-green-500/30">
                                                <span className="text-[9px] font-black text-green-500 uppercase tracking-widest leading-none">Your Selection</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )}

                {/* Numeric Comparison Block */}
                {!options && (userAnswer !== undefined || correctAnswer !== undefined) && (
                    <div className="max-w-2xl grid grid-cols-2 gap-6">
                        <div className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl">
                            <h4 className="text-[9px] font-black text-neutral-600 uppercase tracking-widest mb-4">Your Answer</h4>
                            <div className={`text-3xl font-mono font-bold ${status === 'correct' ? 'text-green-400' : 'text-red-400'}`}>
                                {userAnswer ?? 'N/A'}
                            </div>
                        </div>
                        <div className="p-6 bg-green-500/[0.02] border border-green-500/10 rounded-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-3 opacity-10">
                                <CheckCircle size={48} weight="fill" className="text-green-500" />
                            </div>
                            <h4 className="text-[9px] font-black text-green-600 uppercase tracking-widest mb-4">Correct Answer</h4>
                            <div className="text-3xl font-mono font-bold text-green-400">
                                {correctAnswer ?? 'N/A'}
                            </div>
                        </div>
                    </div>
                )}

                {/* Performance Context */}
                {status === 'incorrect' && (
                    <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/10 text-xs font-medium text-red-400/80 leading-relaxed flex gap-3">
                        <WarningCircle size={16} className="shrink-0 mt-0.5" />
                        <div>
                            <p className="font-bold text-red-400 uppercase tracking-widest text-[10px] mb-1 text-red-500">Learning Insight</p>
                            This was a {difficulty} question in {topic}. You spent {time}s.
                            Review the {topic} foundations before your next attempt.
                        </div>
                    </div>
                )}

                {/* Explanation */}
                {explanation && (
                    <div className="space-y-3 pt-4 border-t border-white/5">
                        <h4 className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Step-by-Step Solution</h4>
                        <p className="text-sm text-neutral-400 leading-relaxed bg-white/[0.02] p-6 rounded-2xl">
                            {explanation}
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}

const StatusBadge = ({ status }: { status: string }) => {
    const config: Record<string, { text: string, bg: string, textCol: string, icon: React.ReactNode }> = {
        correct: { text: 'Correct', bg: 'bg-green-500/10', textCol: 'text-green-400', icon: <CheckCircle weight="bold" /> },
        incorrect: { text: 'Incorrect', bg: 'bg-red-500/10', textCol: 'text-red-400', icon: <WarningCircle weight="bold" /> },
        unattempted: { text: 'Unattempted', bg: 'bg-neutral-500/10', textCol: 'text-neutral-400', icon: <Clock weight="bold" /> }
    }
    const statusConfig = config[status] || config.unattempted

    return (
        <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full ${statusConfig.bg} ${statusConfig.textCol} text-[10px] font-black uppercase tracking-widest`}>
            {statusConfig.icon}
            {statusConfig.text}
        </div>
    )
}

const MetaItem = ({ icon, label, value, color = 'text-white' }: { icon: React.ReactNode, label: string, value: string, color?: string }) => (
    <div className="flex flex-col">
        <span className="text-[8px] font-bold text-neutral-600 uppercase tracking-widest flex items-center gap-1">
            {icon}{label}
        </span>
        <span className={`text-[11px] font-bold uppercase tracking-tight ${color}`}>{value}</span>
    </div>
)

export default QuestionDetailView

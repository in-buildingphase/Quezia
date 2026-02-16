import React from 'react'

interface QuestionReviewData {
    id: number
    status: 'correct' | 'incorrect' | 'unattempted'
    marks: number
    time: number
    topic: string
}

interface Props {
    questions: QuestionReviewData[]
    activeIndex: number
    onSelect: (index: number) => void
}

const QuestionNavigator: React.FC<Props> = ({ questions, activeIndex, onSelect }) => {
    return (
        <div className="divide-y divide-white/5">
            {questions.map((q, index) => (
                <button
                    key={q.id}
                    onClick={() => onSelect(index)}
                    className={`w-full flex items-center gap-4 px-4 py-3 text-left transition-all ${activeIndex === index
                            ? 'bg-white/[0.07] border-l-2 border-blue-500'
                            : 'hover:bg-white/[0.03] border-l-2 border-transparent'
                        }`}
                >
                    <div className="w-8 text-xs font-mono font-bold text-neutral-500">
                        #{String(q.id).padStart(2, '0')}
                    </div>

                    <div className={`w-2 h-2 rounded-full ${q.status === 'correct' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]' :
                            q.status === 'incorrect' ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.4)]' :
                                'bg-neutral-600'
                        }`} />

                    <div className="flex-1 min-w-0">
                        <p className={`text-[11px] font-bold truncate ${activeIndex === index ? 'text-white' : 'text-neutral-400'}`}>
                            {q.topic}
                        </p>
                        <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-tighter text-neutral-600 mt-0.5">
                            <span>{q.time}s</span>
                            <span>•</span>
                            <span className={q.marks > 0 ? 'text-green-500/60' : q.marks < 0 ? 'text-red-500/60' : ''}>
                                {q.marks > 0 ? `+${q.marks}` : q.marks}m
                            </span>
                        </div>
                    </div>
                </button>
            ))}
        </div>
    )
}

export default QuestionNavigator

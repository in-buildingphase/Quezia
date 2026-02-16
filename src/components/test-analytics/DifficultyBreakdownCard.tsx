import React from 'react'

interface DifficultyStats {
    correct: number
    incorrect: number
    unattempted: number
    accuracy: number
}

interface Props {
    easy: DifficultyStats
    medium: DifficultyStats
    hard: DifficultyStats
}

const DifficultyBreakdownCard: React.FC<Props> = ({ easy, medium, hard }) => {
    const stats = [
        { label: 'Easy', data: easy, color: 'bg-green-500' },
        { label: 'Medium', data: medium, color: 'bg-yellow-500' },
        { label: 'Hard', data: hard, color: 'bg-red-500' },
    ]

    return (
        <div className="bg-neutral-900/50 border border-white/5 rounded-3xl p-6 h-full space-y-8">
            <h3 className="text-sm font-bold text-neutral-400 uppercase tracking-widest">Difficulty Matrix</h3>

            <div className="space-y-8">
                {stats.map((s, i) => (
                    <div key={i} className="space-y-3">
                        <div className="flex justify-between items-end">
                            <div>
                                <span className="text-[10px] font-bold text-neutral-600 uppercase tracking-widest">{s.label} Questions</span>
                                <div className="text-sm font-bold text-white">{s.data.accuracy}% <span className="text-[10px] text-neutral-600 font-bold uppercase ml-1">Accuracy</span></div>
                            </div>
                            <div className="flex gap-4">
                                <StatDot label="Correct" count={s.data.correct} color="text-green-500" />
                                <StatDot label="Error" count={s.data.incorrect} color="text-red-500" />
                                <StatDot label="Miss" count={s.data.unattempted} color="text-neutral-700" />
                            </div>
                        </div>

                        <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                            <div
                                className={`h-full rounded-full ${s.color} transition-all duration-700`}
                                style={{ width: `${s.data.accuracy}%` }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

const StatDot = ({ label, count, color }: { label: string, count: number, color: string }) => (
    <div className="text-right">
        <p className={`text-xs font-mono font-bold ${color} leading-none mb-1`}>{count}</p>
        <p className="text-[8px] text-neutral-700 font-bold uppercase tracking-tighter leading-none">{label}</p>
    </div>
)

export default DifficultyBreakdownCard

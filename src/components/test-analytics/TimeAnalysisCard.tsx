import React from 'react'

interface Props {
    avgTimeEasy: number
    avgTimeMedium: number
    avgTimeHard: number
    totalTimeSpent: number
    slowestQuestions: {
        id: number
        time: number
        subject: string
        status: 'correct' | 'incorrect' | 'unattempted'
    }[]
}

const TimeAnalysisCard: React.FC<Props> = ({
    avgTimeEasy,
    avgTimeMedium,
    avgTimeHard,
    totalTimeSpent,
    slowestQuestions
}) => {
    return (
        <div className="bg-neutral-900/50 border border-white/5 rounded-3xl p-6 h-full space-y-8">
            <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-neutral-400 uppercase tracking-widest">Time Budget</h3>
                <div className="text-[10px] font-mono font-bold text-neutral-600 uppercase tracking-widest bg-white/5 px-3 py-1 rounded-lg">
                    Total: {Math.floor(totalTimeSpent / 60)}m {totalTimeSpent % 60}s
                </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
                <TimeBox label="Easy" value={`${avgTimeEasy}s`} color="text-green-500" />
                <TimeBox label="Medium" value={`${avgTimeMedium}s`} color="text-yellow-500" />
                <TimeBox label="Hard" value={`${avgTimeHard}s`} color="text-red-500" />
            </div>

            <div className="space-y-4">
                <div className="text-[10px] text-neutral-600 font-bold uppercase tracking-[0.2em]">Slowest Debuts</div>
                <div className="space-y-2">
                    {slowestQuestions.map((q, i) => (
                        <div key={i} className="flex items-center justify-between py-3 px-4 bg-white/[0.02] border border-white/5 rounded-2xl group transition-all">
                            <div className="flex items-center gap-4">
                                <div className="text-[10px] font-bold text-neutral-700">#{q.id}</div>
                                <div>
                                    <div className="text-[11px] font-bold text-neutral-300 uppercase tracking-tight">{q.subject}</div>
                                    <div className={`text-[9px] font-black uppercase tracking-widest ${q.status === 'correct' ? 'text-green-500/40' :
                                        q.status === 'incorrect' ? 'text-red-500/40' : 'text-neutral-700'
                                        }`}>
                                        {q.status}
                                    </div>
                                </div>
                            </div>
                            <div className="text-sm font-mono font-bold text-white">{q.time}s</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

const TimeBox = ({ label, value, color }: { label: string, value: string, color: string }) => (
    <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
        <div className="text-[8px] font-bold text-neutral-600 uppercase tracking-widest mb-1">{label}</div>
        <div className={`text-lg font-bold font-mono ${color}`}>{value}</div>
    </div>
)

export default TimeAnalysisCard

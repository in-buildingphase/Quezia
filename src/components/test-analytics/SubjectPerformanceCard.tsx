import React from 'react'

interface SubjectData {
    subject: string
    score: number
    maxScore: number
    accuracy: number
    attemptRate: number
    avgTimePerQ: number
    status: 'strong' | 'average' | 'weak'
}

interface Props {
    subjects: SubjectData[]
}

const SubjectPerformanceCard: React.FC<Props> = ({ subjects }) => {
    return (
        <div className="bg-neutral-900/50 border border-white/5 rounded-3xl p-6 h-full flex flex-col">
            <div className="flex items-center justify-between mb-8">
                <h3 className="text-sm font-bold text-neutral-400 uppercase tracking-widest">Subject Analysis</h3>
                <div className="flex gap-4">
                    {['Strong', 'Average', 'Weak'].map(s => (
                        <div key={s} className="flex items-center gap-2">
                            <div className={`w-1.5 h-1.5 rounded-full ${s === 'Strong' ? 'bg-green-500' :
                                s === 'Average' ? 'bg-yellow-500' : 'bg-red-500'
                                }`} />
                            <span className="text-[10px] text-neutral-600 font-bold uppercase tracking-tight">{s}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex-1">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="text-[9px] text-neutral-600 uppercase tracking-[0.2em] font-black border-b border-white/5">
                            <th className="pb-4">Subject</th>
                            <th className="pb-4">Accuracy</th>
                            <th className="pb-4 text-right">Score</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {subjects.map((s, i) => (
                            <tr key={i} className="group">
                                <td className="py-4">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-1 h-3 rounded-full ${s.status === 'strong' ? 'bg-green-500' :
                                            s.status === 'average' ? 'bg-yellow-500' : 'bg-red-500'
                                            }`} />
                                        <span className="text-xs font-bold text-neutral-300 uppercase tracking-tight">{s.subject}</span>
                                    </div>
                                </td>
                                <td className="py-4">
                                    <div className="flex items-center gap-3">
                                        <span className="text-xs font-mono font-bold text-white">{s.accuracy}%</span>
                                        <div className="w-20 h-1 bg-white/5 rounded-full overflow-hidden">
                                            <div
                                                className={`h-full rounded-full ${s.accuracy > 75 ? 'bg-green-500' :
                                                    s.accuracy > 50 ? 'bg-yellow-500' : 'bg-red-500'
                                                    }`}
                                                style={{ width: `${s.accuracy}%` }}
                                            />
                                        </div>
                                    </div>
                                </td>
                                <td className="py-4 text-right">
                                    <span className="text-sm font-mono font-bold text-neutral-300">{s.score}</span>
                                    <span className="text-[10px] text-neutral-600 font-bold ml-1">/ {s.maxScore}</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default SubjectPerformanceCard

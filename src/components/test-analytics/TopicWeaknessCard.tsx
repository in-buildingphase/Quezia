import React from 'react'
import { Timer, WarningCircle, Target } from '@phosphor-icons/react'

interface WeakTopic {
    name: string
    subject: string
    accuracy: number
    negatives: number
    avgTime: number
    reason: 'accuracy' | 'time' | 'negatives'
}

interface Props {
    topics: WeakTopic[]
}

const TopicWeaknessCard: React.FC<Props> = ({ topics }) => {
    return (
        <div className="bg-neutral-900/50 border border-white/5 rounded-3xl p-6 h-full space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-neutral-400 uppercase tracking-widest">Growth Targets</h3>
                <span className="text-[10px] text-neutral-600 font-bold uppercase tracking-widest">Focus Areas</span>
            </div>

            <div className="space-y-3">
                {topics.map((t, i) => (
                    <div key={i} className="group p-4 bg-white/[0.02] rounded-2xl border border-white/5 hover:border-white/10 transition-all">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <span className="text-[9px] font-black text-neutral-600 uppercase tracking-[0.2em]">{t.subject}</span>
                                <h4 className="text-xs font-bold text-neutral-200 mt-1 uppercase tracking-tight">{t.name}</h4>
                            </div>
                            <div className={`p-1.5 rounded-lg bg-white/5 border border-white/5 ${t.reason === 'negatives' ? 'text-red-500' :
                                    t.reason === 'time' ? 'text-yellow-500' : 'text-orange-500'
                                }`}>
                                {t.reason === 'negatives' && <WarningCircle size={14} weight="fill" />}
                                {t.reason === 'time' && <Timer size={14} weight="fill" />}
                                {t.reason === 'accuracy' && <Target size={14} weight="fill" />}
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-6">
                            <TopicStat label="Accuracy" value={`${t.accuracy}%`} />
                            <TopicStat label="Score Leak" value={`-${t.negatives}`} color="text-red-500" />
                            <TopicStat label="Pace" value={`${t.avgTime}s`} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

const TopicStat = ({ label, value, color }: { label: string, value: string, color?: string }) => (
    <div>
        <div className="text-[8px] text-neutral-700 font-black uppercase tracking-widest mb-1">{label}</div>
        <div className={`text-sm font-mono font-bold ${color || 'text-neutral-300'}`}>{value}</div>
    </div>
)

export default TopicWeaknessCard

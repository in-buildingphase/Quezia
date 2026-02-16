import React from 'react'
import { Lightbulb, WarningCircle, Timer } from '@phosphor-icons/react'

export interface TacticalInsight {
    type: 'success' | 'warning' | 'critical'
    text: string
}

interface Props {
    insights: TacticalInsight[]
}

const TacticalInsightStrip: React.FC<Props> = ({ insights }) => {
    if (insights.length === 0) return null

    return (
        <div className="flex flex-wrap gap-4">
            {insights.map((insight, idx) => (
                <div
                    key={idx}
                    className={`flex items-center gap-3 px-4 py-3 rounded-2xl border transition-all ${insight.type === 'critical' ? 'bg-red-500/[0.03] border-red-500/10 text-red-400' :
                            insight.type === 'warning' ? 'bg-yellow-500/[0.03] border-yellow-500/10 text-yellow-400' :
                                'bg-green-500/[0.03] border-green-500/10 text-green-400'
                        }`}
                >
                    <div className="shrink-0">
                        {insight.type === 'critical' ? <WarningCircle size={18} weight="fill" /> :
                            insight.type === 'warning' ? <Lightbulb size={18} weight="fill" /> :
                                <Timer size={18} weight="fill" />}
                    </div>
                    <p className="text-xs font-bold uppercase tracking-widest leading-none">
                        {insight.text}
                    </p>
                </div>
            ))}
        </div>
    )
}

export default TacticalInsightStrip

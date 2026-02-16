import React from 'react'
import { Sparkle, Lightbulb } from '@phosphor-icons/react'

interface Props {
    insights: string[]
}

const AIInsightCard: React.FC<Props> = ({ insights }) => {
    return (
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-neutral-900/80 p-6 backdrop-blur-xl h-full flex flex-col group">

            {/* Primary soft gradient */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#EC2801]/10 via-transparent" />
            

            <div className="relative z-10 flex items-center gap-3 mb-4">
                <div className="p-2 rounded-xl bg-[#EC2801]/10 border border-[#EC2801]/20 text-[#EC2801]">
                    <Sparkle weight="fill" className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold text-white">
                    AI Insights
                </h3>
            </div>

            <div className="relative z-10 flex-1 space-y-4 overflow-y-auto custom-scrollbar pr-2">
                {insights.map((insight, idx) => (
                    <div
                        key={idx}
                        className="flex gap-3 items-start p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors"
                    >
                        <Lightbulb
                            className="h-4 w-4 text-[#EC2801]/80 shrink-0 mt-0.5"
                            weight="duotone"
                        />
                        <p className="text-sm text-neutral-300 leading-relaxed font-medium">
                            {insight}
                        </p>
                    </div>
                ))}
            </div>

            <div className="relative z-10 mt-4 pt-3 border-t border-white/5">
                <button className="text-xs font-semibold text-[#EC2801] hover:opacity-80 transition-opacity flex items-center gap-1">
                    Generate new analysis →
                </button>
            </div>
        </div>
    )
}

export default AIInsightCard

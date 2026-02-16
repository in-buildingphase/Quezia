import React from 'react'

interface Insight {
    type: 'success' | 'warning' | 'info' | 'critical'
    text: string
    icon: React.ReactNode
}

interface Props {
    insights: Insight[]
}

const InsightBar: React.FC<Props> = ({ insights }) => {
    if (insights.length === 0) return null

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {insights.map((insight, index) => (
                <div
                    key={index}
                    className={`flex items-start gap-4 p-4 rounded-2xl border backdrop-blur-sm transition-all hover:scale-[1.01] ${insight.type === 'success' ? 'bg-green-500/5 border-green-500/20 text-green-400' :
                        insight.type === 'warning' ? 'bg-yellow-500/5 border-yellow-500/20 text-yellow-400' :
                            insight.type === 'critical' ? 'bg-red-500/5 border-red-500/20 text-red-400' :
                                'bg-blue-500/5 border-blue-500/20 text-blue-400'
                        }`}
                >
                    <div className={`p-2 rounded-xl ${insight.type === 'success' ? 'bg-green-500/10' :
                        insight.type === 'warning' ? 'bg-yellow-500/10' :
                            insight.type === 'critical' ? 'bg-red-500/10' :
                                'bg-blue-500/10'
                        }`}>
                        {insight.icon}
                    </div>
                    <p className="text-sm font-medium leading-relaxed mt-1">
                        {insight.text}
                    </p>
                </div>
            ))}
        </div>
    )
}

export default InsightBar

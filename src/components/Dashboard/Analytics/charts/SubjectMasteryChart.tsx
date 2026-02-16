import { useState } from 'react'
import {
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    ResponsiveContainer,
    Tooltip
} from 'recharts'
import type { SubjectMastery } from '../types'

interface Props {
    data: SubjectMastery[]
}

type Metric = 'accuracy' | 'avgMark'

const SubjectMasteryChart: React.FC<Props> = ({ data }) => {
    const [metric, setMetric] = useState<Metric>('accuracy')

    const label = metric === 'accuracy' ? 'Accuracy' : 'Avg Mark'
    const suffix = metric === 'accuracy' ? '%' : ''

    return (
        <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-5 pt-4 backdrop-blur-xl h-full flex flex-col overflow-hidden">
            {/* Compact header: title + toggle on one line */}
            <div className="flex items-center justify-between shrink-0">
                <h3 className="text-base font-semibold text-white">Subject Mastery</h3>
                <div className="flex rounded-lg bg-white/5 border border-white/10 p-0.5">
                    <button
                        onClick={() => setMetric('accuracy')}
                        className={`px-2.5 py-1 text-[11px] font-medium rounded-md transition-all duration-200 ${metric === 'accuracy'
                            ? 'bg-[#EC2801]/15 text-[#EC2801] shadow-sm'
                            : 'text-neutral-500 hover:text-neutral-300'
                            }`}
                    >
                        Accuracy
                    </button>
                    <button
                        onClick={() => setMetric('avgMark')}
                        className={`px-2.5 py-1 text-[11px] font-medium rounded-md transition-all duration-200 ${metric === 'avgMark'
                            ? 'bg-[#EC2801]/15 text-[#EC2801] shadow-sm'
                            : 'text-neutral-500 hover:text-neutral-300'
                            }`}
                    >
                        Avg Mark
                    </button>
                </div>
            </div>

            {/* Radar chart — takes all remaining space */}
            <div className="flex-1 min-h-0 relative">
                <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="55%" outerRadius="78%" data={data}>
                        <PolarGrid stroke="rgba(255,255,255,0.05)" />
                        <PolarAngleAxis
                            dataKey="subject"
                            tick={{ fill: '#737373', fontSize: 11, fontWeight: 500 }}
                        />
                        <Radar
                            name={label}
                            dataKey={metric}
                            stroke="#EC2801"
                            fill="#EC2801"
                            fillOpacity={0.5}
                            animationDuration={800}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'rgba(23, 23, 23, 0.9)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: '12px',
                                color: '#fff',
                                fontSize: '12px'
                            }}
                        />
                    </RadarChart>
                </ResponsiveContainer>
            </div>

            {/* Footer stats */}
            <div className="shrink-0 px-4 pb-1 flex justify-around">
                {data.map((item) => (
                    <div key={item.subject} className="flex flex-col items-center">
                        <span className="text-[10px] text-neutral-500 uppercase tracking-wider">{item.subject}</span>
                        <span className="text-sm font-bold text-white">
                            {metric === 'accuracy' ? item.accuracy : item.avgMark}{suffix}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SubjectMasteryChart

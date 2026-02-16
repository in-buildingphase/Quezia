import React, { useState } from 'react'
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts'
import type { PerformanceTrendPoint } from '../types'

interface Props {
    data: PerformanceTrendPoint[]
}

const PerformanceTrendChart: React.FC<Props> = ({ data }) => {
    const [activeMetric, setActiveMetric] = useState<'score' | 'accuracy' | 'percentile'>('score')

    return (
        <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-xl h-full flex flex-col">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-lg font-semibold text-white">Performance Trend</h3>
                    <p className="text-sm text-neutral-400">Track your improvement over time</p>
                </div>

                <div className="flex bg-white/5 rounded-lg p-1 border border-white/10">
                    {(['score', 'accuracy', 'percentile'] as const).map((metric) => (
                        <button
                            key={metric}
                            onClick={() => setActiveMetric(metric)}
                            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all capitalize ${activeMetric === metric
                                ? 'bg-white/10 text-white shadow-sm'
                                : 'text-neutral-500 hover:text-neutral-300'
                                }`}
                        >
                            {metric}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex-1 min-h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                        <XAxis
                            dataKey="date"
                            stroke="#525252"
                            tick={{ fill: '#737373', fontSize: 11 }}
                            tickLine={false}
                            axisLine={false}
                            dy={10}
                        />
                        <YAxis
                            stroke="#525252"
                            tick={{ fill: '#737373', fontSize: 11 }}
                            tickLine={false}
                            axisLine={false}
                            dx={-10}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'rgba(23, 23, 23, 0.9)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: '12px',
                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                                color: '#fff'
                            }}
                            itemStyle={{ color: '#e5e5e5', fontSize: '12px' }}
                            labelStyle={{ color: '#a3a3a3', marginBottom: '8px', fontSize: '11px' }}
                            cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1 }}
                        />
                        <Line
                            type="monotone"
                            dataKey={activeMetric}
                            stroke={
                                activeMetric === 'score' ? '#EC2801' :
                                    activeMetric === 'accuracy' ? '#F97316' : '#FAB005'
                            }
                            strokeWidth={3}
                            dot={{ r: 4, strokeWidth: 2, fill: '#171717' }}
                            activeDot={{ r: 6, strokeWidth: 0, fill: activeMetric === 'score' ? '#EC2801' : activeMetric === 'accuracy' ? '#F97316' : '#FAB005' }}
                            animationDuration={1500}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

export default PerformanceTrendChart

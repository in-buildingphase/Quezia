import React from 'react'
import {
    ScatterChart,
    Scatter,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    ZAxis,
    Cell
} from 'recharts'

interface Props {
    // Mock data structure for scatter plot points
    data: {
        timeSpent: number; // minutes
        accuracy: number; // percentage
        testId: string;
        difficulty: 'easy' | 'medium' | 'hard';
    }[]
}

const TimeEfficiencyChart: React.FC<Props> = ({ data }) => {
    return (
        <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-xl h-full">
            <div className="mb-6">
                <h3 className="text-lg font-semibold text-white">Time vs. Efficiency</h3>
                <p className="text-sm text-neutral-400">Speed and accuracy correlation</p>
            </div>

            <div className="h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                        <XAxis
                            type="number"
                            dataKey="timeSpent"
                            name="Time"
                            unit="m"
                            stroke="#525252"
                            tick={{ fill: '#737373', fontSize: 10 }}
                            axisLine={false}
                            tickLine={false}
                            dy={10}
                        />
                        <YAxis
                            type="number"
                            dataKey="accuracy"
                            name="Accuracy"
                            unit="%"
                            stroke="#525252"
                            tick={{ fill: '#737373', fontSize: 10 }}
                            axisLine={false}
                            tickLine={false}
                            dx={-10}
                        />
                        <ZAxis type="category" dataKey="difficulty" name="Difficulty" />
                        <Tooltip
                        contentStyle={{
                            backgroundColor: 'rgba(10, 10, 10, 0.95)',
                            border: '1px solid rgba(236, 40, 1, 0.2)',
                            borderRadius: '16px',
                            boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
                            padding: '12px',
                            color: '#fff'
                        }}
                        itemStyle={{ color: '#fff', fontSize: '13px' }}
                        labelStyle={{ color: '#737373', fontSize: '11px', marginBottom: '4px' }}
                    />
                        <Scatter
                            name="Attempts"
                            data={data}
                            fill="#FD7E14"
                            animationDuration={1500}
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.difficulty === 'hard' ? '#EC2801' : entry.difficulty === 'medium' ? '#FD7E14' : '#F59E0B'} />
                            ))}
                        </Scatter>
                    </ScatterChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

export default TimeEfficiencyChart

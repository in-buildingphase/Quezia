import React, { useMemo } from 'react'
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts'
import type { RankComparisonPoint } from '../types'

interface Props {
    data: RankComparisonPoint[]
}

const RankComparisonChart: React.FC<Props> = ({ data }) => {
    // Compute a safe Y-axis domain from the data so the chart never overflows,
    // regardless of what values come in. We pad by ~10 % so lines don't touch edges.
    const yDomain: [number, number] = useMemo(() => {
        if (data.length === 0) return [0, 100]

        const allRanks = data.flatMap(d => [d.studentRank, d.avgRank])
        const minRank = Math.min(...allRanks)
        const maxRank = Math.max(...allRanks)
        const padding = Math.max(10, Math.round((maxRank - minRank) * 0.12))

        return [
            Math.max(0, minRank - padding), // best rank (top of chart after reverse)
            maxRank + padding,              // worst rank (bottom of chart after reverse)
        ]
    }, [data])

    return (
        <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-xl h-full flex flex-col overflow-hidden">
            <div className="mb-4">
                <h3 className="text-lg font-semibold text-white">Rank Distribution</h3>
                <p className="text-sm text-neutral-400">Your standing against peers</p>
            </div>

            {/* overflow-hidden is critical here — it clips any stray SVG pixels */}
            <div className="flex-1 min-h-[280px] w-full overflow-hidden">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 30 }}>
                        <defs>
                            <linearGradient id="colorRank" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#ec2801" stopOpacity={0.15} />
                                <stop offset="95%" stopColor="#ec2801" stopOpacity={0} />
                            </linearGradient>
                        </defs>

                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />

                        <XAxis
                            dataKey="testId"
                            stroke="#525252"
                            tick={{ fill: '#737373', fontSize: 10 }}
                            tickLine={false}
                            axisLine={false}
                            dy={12}
                        />

                        <YAxis
                            stroke="#525252"
                            tick={{ fill: '#737373', fontSize: 10 }}
                            tickLine={false}
                            axisLine={false}
                            reversed          // lower rank = better = top of chart
                            domain={yDomain}  // explicit domain prevents overflow
                            allowDataOverflow={false}
                            width={40}
                        />

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

                        {/* Student rank — solid line + gradient fill */}
                        <Area
                            type="monotone"
                            dataKey="studentRank"
                            name="Your Rank"
                            stroke="#ec2801"
                            strokeWidth={3}
                            fillOpacity={1}
                            fill="url(#colorRank)"
                            animationDuration={1500}
                            isAnimationActive={true}
                        />

                        {/* Average peer rank — dashed reference line */}
                        <Area
                            type="monotone"
                            dataKey="avgRank"
                            name="Avg Peer Rank"
                            stroke="#404040"
                            strokeDasharray="4 4"
                            strokeWidth={2}
                            fillOpacity={0}
                            fill="transparent"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

export default RankComparisonChart

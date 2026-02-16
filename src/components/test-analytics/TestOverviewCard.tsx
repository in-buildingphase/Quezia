import React from 'react'
import { Trophy, Target, Clock, ChartLineUp, Gauge, ShieldCheck, ChartBar } from '@phosphor-icons/react'

interface Props {
    title: string
    date: string
    score: number
    totalMarks: number
    accuracy: number
    attemptRate: number
    timeTakenMinutes: number
    totalTimeMinutes: number
    riskRatio: number // Incorrect / Attempted
    efficiency: number // Score / Time
    correct: number
    incorrect: number
    unattempted: number
}

const TestOverviewCard: React.FC<Props> = ({
    title,
    date,
    score,
    totalMarks,
    accuracy,
    attemptRate,
    timeTakenMinutes,
    totalTimeMinutes,
    riskRatio,
    efficiency,
    correct,
    incorrect,
    unattempted
}) => {
    return (
        <div className="bg-neutral-900/80 backdrop-blur-md border border-white/10 rounded-3xl p-8 relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-blue-500/10 rounded-full blur-[100px]" />
            <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-[#EC2801]/10 rounded-full blur-[100px]" />

            <div className="relative space-y-8">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-white tracking-tight">{title}</h1>
                        <p className="text-neutral-500 text-sm mt-1 uppercase tracking-widest font-semibold">{date}</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="px-6 py-3 bg-white/5 border border-white/10 rounded-2xl text-center">
                            <div className="text-xs text-neutral-500 uppercase font-bold tracking-tighter mb-1">Final Score</div>
                            <div className="text-4xl font-bold text-white tracking-tighter">
                                {score}<span className="text-lg text-neutral-600 font-medium"> / {totalMarks}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Primary Metrics Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                    <MetricBlock
                        label="Accuracy"
                        value={`${accuracy}%`}
                        icon={<Target size={20} className="text-blue-400" />}
                        subValue={`${correct} Correct / ${incorrect} Incorrect`}
                    />
                    <MetricBlock
                        label="Attempt Rate"
                        value={`${attemptRate}%`}
                        icon={<ChartLineUp size={20} className="text-green-400" />}
                        subValue={`${correct + incorrect} / ${correct + incorrect + unattempted} Qs`}
                    />
                    <MetricBlock
                        label="Time Spent"
                        value={`${timeTakenMinutes}m`}
                        icon={<Clock size={20} className="text-yellow-400" />}
                        subValue={`of ${totalTimeMinutes}m limit`}
                    />
                    <MetricBlock
                        label="Efficiency"
                        value={efficiency.toFixed(2)}
                        icon={<ChartBar size={20} className="text-purple-400" />}
                        subValue="Marks per minute"
                    />
                </div>

                {/* Behavioral Strip */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-black/40 rounded-2xl border border-white/5">
                    <BehavioralMetric
                        label="Risk Ratio"
                        value={riskRatio.toFixed(2)}
                        icon={<ShieldCheck size={18} />}
                        desc="Incorrect per attempted Q"
                    />
                    <div className="w-px h-full bg-white/5 hidden md:block" />
                    <BehavioralMetric
                        label="Status"
                        value={accuracy > 70 ? 'Optimal' : accuracy > 50 ? 'Developing' : 'Critical'}
                        icon={<Gauge size={18} />}
                        desc="Overall performance health"
                    />
                    <div className="w-px h-full bg-white/5 hidden md:block" />
                    <BehavioralMetric
                        label="Accuracy Goal"
                        value="85%"
                        icon={<Trophy size={18} />}
                        desc="Competitive JEE target"
                    />
                </div>
            </div>
        </div>
    )
}

const MetricBlock = ({ label, value, icon, subValue }: { label: string, value: string, icon: React.ReactNode, subValue: string }) => (
    <div className="space-y-2">
        <div className="flex items-center gap-2 text-neutral-500">
            {icon}
            <span className="text-xs font-bold uppercase tracking-widest">{label}</span>
        </div>
        <div>
            <div className="text-3xl font-bold text-white tracking-tight">{value}</div>
            <div className="text-[10px] text-neutral-500 font-medium uppercase mt-0.5">{subValue}</div>
        </div>
    </div>
)

const BehavioralMetric = ({ label, value, icon, desc }: { label: string, value: string, icon: React.ReactNode, desc: string }) => (
    <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-neutral-400">
            {icon}
        </div>
        <div>
            <div className="flex items-center gap-2">
                <span className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider">{label}</span>
                <span className="text-sm font-bold text-white">{value}</span>
            </div>
            <div className="text-[10px] text-neutral-600 font-medium">{desc}</div>
        </div>
    </div>
)

export default TestOverviewCard

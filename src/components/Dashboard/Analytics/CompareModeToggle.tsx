import React from 'react'
import { User, Users, Trophy } from '@phosphor-icons/react'

export type CompareMode = 'personal' | 'peer' | 'top'

interface Props {
    mode: CompareMode
    onChange: (mode: CompareMode) => void
}

const CompareModeToggle: React.FC<Props> = ({ mode, onChange }) => {
    const options: { id: CompareMode; label: string; icon: React.ElementType }[] = [
        { id: 'personal', label: 'Personal', icon: User },
        { id: 'peer', label: 'vs Peers', icon: Users },
        { id: 'top', label: 'vs Top 1%', icon: Trophy },
    ]

    return (
        <div className="bg-white/5 p-1 rounded-xl border border-white/10 flex items-center">
            {options.map((option) => {
                const isActive = mode === option.id
                const Icon = option.icon

                return (
                    <button
                        key={option.id}
                        onClick={() => onChange(option.id)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${isActive
                            ? 'bg-white/10 text-white shadow-sm border border-white/10'
                            : 'text-neutral-500 hover:text-neutral-300 hover:bg-white/5'
                            }`}
                    >
                        <Icon weight={isActive ? "fill" : "regular"} className={isActive ? "text-[#EC2801]" : ""} />
                        <span>{option.label}</span>
                    </button>
                )
            })}
        </div>
    )
}

export default CompareModeToggle

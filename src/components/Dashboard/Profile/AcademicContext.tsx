import React, { useState, useEffect, useRef } from 'react'
import { GraduationCap, CalendarBlank, TrendUp, Target, BookOpen, CircleNotch, Check } from '@phosphor-icons/react'

interface AcademicContextProps {
    targetExam: string
    targetExamYear: number
    preparationStage: string
    studyGoal: string
    onUpdate: (fields: Partial<AcademicContextProps>) => void
}

const stageOptions = ['Beginner', 'Intermediate', 'Advanced']
const yearOptions = [2025, 2026, 2027, 2028]

const AcademicContext: React.FC<AcademicContextProps> = ({
    targetExam,
    targetExamYear,
    preparationStage,
    studyGoal,
    onUpdate,
}) => {
    const [localGoal, setLocalGoal] = useState(studyGoal)
    const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle')
    const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    // Sync local state with prop when prop changes
    useEffect(() => {
        setLocalGoal(studyGoal)
    }, [studyGoal])

    // Handle auto-save logic
    useEffect(() => {
        // If local matches prop, we are in sync (or initial load)
        if (localGoal === studyGoal) {
            return
        }

        // Clear existing timer
        if (debounceTimerRef.current) {
            clearTimeout(debounceTimerRef.current)
        }

        // Set status to indicate pending save (optional, could just be 'idle' visually until saving starts)
        // Here we just wait.

        // Set new timer
        debounceTimerRef.current = setTimeout(async () => {
            setSaveStatus('saving')
            await onUpdate({ studyGoal: localGoal })
            setSaveStatus('saved')
            
            // Clear saved status after 2 seconds
            setTimeout(() => {
                setSaveStatus('idle')
            }, 2000)
        }, 2000)

        return () => {
            if (debounceTimerRef.current) {
                clearTimeout(debounceTimerRef.current)
            }
        }
    }, [localGoal, onUpdate, studyGoal])

    return (
        <div className="rounded-2xl border border-[var(--color-border-default)] bg-[var(--color-bg-surface)] p-6">
            <h3 className="text-sm font-semibold text-[var(--color-text-primary)] mb-5 flex items-center gap-2">
                <GraduationCap size={18} className="text-[var(--color-accent)]" />
                Academic Context
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Target Exam (set during onboarding) */}
                <div>
                    <label className="text-xs font-medium text-[var(--color-text-disabled)] mb-1.5 flex items-center gap-1.5">
                        <Target size={12} /> Target Exam
                    </label>
                    <div className="w-full rounded-xl border border-[var(--color-border-default)] bg-[var(--color-bg-subtle)] text-sm text-[var(--color-text-primary)] px-3 py-2.5 flex items-center justify-between">
                        <span className="font-medium">{targetExam}</span>
                        <span className="text-[10px] text-[var(--color-text-disabled)] uppercase tracking-wider">Set in onboarding</span>
                    </div>
                </div>

                {/* Target Year */}
                <div>
                    <label className="text-xs font-medium text-[var(--color-text-disabled)] mb-1.5 flex items-center gap-1.5">
                        <CalendarBlank size={12} /> Target Year
                    </label>
                    <select
                        value={targetExamYear}
                        onChange={(e) => onUpdate({ targetExamYear: Number(e.target.value) })}
                        className="w-full rounded-xl border border-[var(--color-border-default)] bg-[var(--color-bg-raised)] text-sm text-[var(--color-text-primary)] px-3 py-2.5 outline-none focus:border-[var(--color-accent)] transition-colors"
                    >
                        {yearOptions.map((y) => (
                            <option key={y} value={y}>{y}</option>
                        ))}
                    </select>
                </div>

                {/* Preparation Stage */}
                <div>
                    <label className="text-xs font-medium text-[var(--color-text-disabled)] mb-1.5 flex items-center gap-1.5">
                        <TrendUp size={12} /> Preparation Stage
                    </label>
                    <select
                        value={preparationStage}
                        onChange={(e) => onUpdate({ preparationStage: e.target.value })}
                        className="w-full rounded-xl border border-[var(--color-border-default)] bg-[var(--color-bg-raised)] text-sm text-[var(--color-text-primary)] px-3 py-2.5 outline-none focus:border-[var(--color-accent)] transition-colors"
                    >
                        {stageOptions.map((s) => (
                            <option key={s} value={s}>{s}</option>
                        ))}
                    </select>
                </div>

                {/* Study Goal */}
                <div className="sm:col-span-2">
                    <div className="flex items-center justify-between mb-1.5 min-h-[20px]">
                        <label className="text-xs font-medium text-[var(--color-text-disabled)] flex items-center gap-1.5">
                            <BookOpen size={12} /> Study Goal
                        </label>
                        {/* Auto-save Status Indicator */}
                        {saveStatus === 'saving' && (
                            <span className="flex items-center gap-1.5 text-[10px] font-medium text-[var(--color-text-tertiary)] uppercase tracking-wider">
                                <CircleNotch size={14} className="animate-spin text-[var(--color-accent)]" />
                                Saving...
                            </span>
                        )}
                        {saveStatus === 'saved' && (
                            <span className="flex items-center gap-1.5 text-[10px] font-medium text-[var(--color-success)] uppercase tracking-wider animate-in fade-in zoom-in duration-300">
                                <Check size={14} weight="bold" />
                                Saved
                            </span>
                        )}
                    </div>
                    <textarea
                        value={localGoal}
                        onChange={(e) => setLocalGoal(e.target.value)}
                        placeholder="Describe your study goals..."
                        rows={3}
                        className="w-full rounded-xl border border-[var(--color-border-default)] bg-[var(--color-bg-raised)] text-sm text-[var(--color-text-primary)] px-3 py-2.5 outline-none focus:border-[var(--color-accent)] transition-colors placeholder:text-[var(--color-text-disabled)] resize-none"
                    />
                </div>
            </div>
        </div>
    )
}

export default AcademicContext

"use client";

import { useMemo, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { testPayloads } from '@/lib/tests/data';
import { OptionId, Question, TestProgress } from '@/lib/tests/types';

function TopBar({ onBack, onSubmit }: { onBack: () => void; onSubmit: () => void }) {
    return (
        <div className="sticky top-0 z-10 bg-[#0b0b0b]/95 backdrop-blur border-b border-[#222]">
            <div className="max-w-6xl mx-auto px-3 sm:px-4 py-2 sm:py-3 flex items-center justify-between gap-2">
                <button onClick={onBack} className="text-[#E0E0E0] hover:text-white text-sm sm:text-base">Back</button>
                <button onClick={onSubmit} className="px-3 sm:px-4 py-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm sm:text-base">Submit</button>
            </div>
        </div>
    );
}

function QuestionHeader({ index, total, onMark, onClear }: { index: number; total: number; onMark: () => void; onClear: () => void }) {
    return (
        <div className="max-w-6xl mx-auto px-3 sm:px-4 pt-4 sm:pt-6 pb-3 sm:pb-4">
            <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-4">
                <div className="text-xs sm:text-sm text-[#B0B0B0]">Question: {index + 1}</div>
                <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm">
                    <button onClick={onMark} className="px-3 py-1.5 rounded-full border border-[#333] bg-[#141414] text-[#E0E0E0] hover:border-[#FFB74D]/60">Mark for review</button>
                    <button onClick={onClear} className="px-3 py-1.5 rounded-full border border-[#333] bg-[#141414] text-[#E0E0E0] hover:border-[#FFB74D]/60">Clear Selection</button>
                    <button className="px-3 py-1.5 rounded-full border border-[#333] bg-[#141414] text-[#B0B0B0] hover:text-[#E0E0E0] hover:border-[#FFB74D]/60">Report Bug</button>
                </div>
            </div>
        </div>
    );
}

function OptionButton({ id, text, selected, onClick }: { id: OptionId; text: string; selected: boolean; onClick: () => void }) {
    return (
        <button onClick={onClick} className={`w-full text-left rounded-xl border px-4 sm:px-5 py-4 sm:py-5 flex items-center gap-4 sm:gap-5 transition-colors ${selected ? 'bg-[#251a0c] border-[#8a5a14]' : 'bg-[#111] border-[#2a2a2a] hover:border-[#8a5a14]/60'}`}>
            <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-bold ${selected ? 'bg-[#FFB74D] text-black' : 'bg-[#1f1f1f] text-[#E0E0E0]'}`}>{id}</div>
            <div className="text-[#E0E0E0] text-sm sm:text-base">{text}</div>
        </button>
    );
}

function BottomNav({ canBack, canNext, onBack, onNext, index, total, showOverview, onToggleOverview, selections, marked, onJump }: { canBack: boolean; canNext: boolean; onBack: () => void; onNext: () => void; index: number; total: number; showOverview: boolean; onToggleOverview: () => void; selections: Record<string, OptionId | undefined>; marked: Record<string, boolean>; onJump: (to: number) => void; }) {
    const percent = Math.round(((index + 1) / Math.max(total, 1)) * 100);
    return (
        <div className="max-w-6xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 justify-between text-sm mb-4">
                <button onClick={onBack} disabled={!canBack} className={`w-full sm:w-auto px-5 py-2 rounded-xl border ${canBack ? 'bg-[#191919] border-[#333] text-[#E0E0E0] hover:border-[#FFB74D]/60' : 'bg-[#111] border-[#222] text-[#555] cursor-not-allowed'}`}>Back</button>

                <button onClick={onToggleOverview} className="w-full sm:w-auto min-w-[220px] px-4 py-2 rounded-full border border-[#333] bg-[#141414] text-center text-[#E0E0E0] hover:border-[#FFB74D]/60">
                    <div className="flex items-center justify-center gap-2">
                        <span className="text-xs text-[#A0A0A0]">Progress</span>
                        <span className="text-xs font-semibold text-[#FFB74D]">{index + 1} / {total}</span>
                    </div>
                    <div className="mt-1.5 rounded-full bg-[#0f0f0f] p-0.5">
                        <div className="h-1.5 w-full bg-[#1e1e1e] rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-[#FF8F00] to-[#FFD54F]" style={{ width: `${percent}%` }} />
                        </div>
                    </div>
                </button>

                <button onClick={onNext} disabled={!canNext} className={`w-full sm:w-auto px-5 py-2 rounded-xl border ${canNext ? 'bg-[#191919] border-[#333] text-[#E0E0E0] hover:border-[#FFB74D]/60' : 'bg-[#111] border-[#222] text-[#555] cursor-not-allowed'}`}>Next</button>
            </div>

            {/* Question Overview Panel */}
            {showOverview && (
                <div className="w-full rounded-xl border border-[#333] bg-[#141414] p-4">
                    <div className="flex items-center justify-between mb-3">
                        <div className="text-sm font-medium text-[#E0E0E0]">Questions Overview</div>
                        <div className="flex items-center gap-2 text-xs text-[#B0B0B0]">
                            <span className="inline-flex items-center gap-1"><span className="inline-block w-2 h-2 rounded-sm bg-[#1f2a1f] border border-emerald-500"></span> Answered</span>
                            <span className="inline-flex items-center gap-1"><span className="inline-block w-2 h-2 rounded-sm bg-[#0f1a2a] border border-blue-500"></span> Marked</span>
                            <span className="inline-flex items-center gap-1"><span className="inline-block w-2 h-2 rounded-sm bg-[#1a1a1a] border border-[#333]"></span> Unanswered</span>
                        </div>
                    </div>
                    <div className="grid grid-cols-8 sm:grid-cols-10 md:grid-cols-12 gap-1.5">
                        {Array.from({ length: total }).map((_, idx) => {
                            const qId = `q${idx + 1}`;
                            const isAnswered = selections[qId] !== undefined;
                            const isMarked = !!marked[qId];
                            const isCurrent = idx === index;

                            const base = 'text-xs rounded px-0 py-1.5 border transition-colors text-center cursor-pointer';
                            let cls = 'bg-[#1a1a1a] border-[#333] text-[#E0E0E0]';
                            if (isAnswered) cls = 'bg-[#1f2a1f] border-emerald-500 text-[#E0E0E0]';
                            if (isMarked) cls = 'bg-[#0f1a2a] border-blue-500 text-blue-400';
                            return (
                                <button
                                    key={idx}
                                    onClick={() => onJump(idx)}
                                    className={`${base} ${cls} ${isCurrent ? 'ring-2 ring-[#FFB74D]' : ''} hover:scale-105 transition-transform`}
                                >
                                    {idx + 1}
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}



export default function TakeTestPage() {
    const params = useParams<{ testId: string }>();
    const router = useRouter();
    const payload = testPayloads[params.testId];

    const [progress, setProgress] = useState<TestProgress>(() => ({
        index: 0,
        selections: {},
        marked: {},
        startedAt: Date.now(),
    }));
    const [showSummary, setShowSummary] = useState(false);
    const [showOverview, setShowOverview] = useState(false);

    const q: Question | undefined = payload?.questions[progress.index];
    const total = payload?.questions.length ?? 0;
    const selected = q ? progress.selections[q.id] : undefined;

    const correctCount = useMemo(() => {
        if (!payload || !showSummary) return 0;
        return payload.questions.reduce((acc, qq) => acc + (progress.selections[qq.id] === qq.correctId ? 1 : 0), 0);
    }, [payload, progress.selections, showSummary]);

    if (!payload) {
        return (
            <div className="min-h-screen bg-black text-[#E0E0E0] flex items-center justify-center px-4">
                <div className="max-w-md w-full text-center">
                    <div className="text-xl mb-3">Test not found</div>
                    <button onClick={() => router.push('/tests')} className="text-[#FFB74D]">Go back</button>
                </div>
            </div>
        );
    }

    const select = (id: OptionId) => {
        setProgress((p) => ({
            ...p,
            selections: { ...p.selections, [q!.id]: id },
        }));
    };

    const clearSelection = () => {
        setProgress((p) => ({
            ...p,
            selections: { ...p.selections, [q!.id]: undefined },
        }));
    };

    const toggleMark = () => {
        setProgress((p) => ({
            ...p,
            marked: { ...p.marked, [q!.id]: !p.marked[q!.id] },
        }));
    };

    const go = (delta: number) => {
        setProgress((p) => ({ ...p, index: Math.min(total - 1, Math.max(0, p.index + delta)) }));
    };

    const submit = () => {
        setShowSummary(true);
    };

    return (
        <div className="min-h-screen bg-[#0b0b0b] text-[#E0E0E0]">
            <TopBar onBack={() => router.push('/tests')} onSubmit={submit} />
            <QuestionHeader index={progress.index} total={total} onMark={toggleMark} onClear={clearSelection} />

            <div className="max-w-6xl mx-auto px-3 sm:px-4 pb-6">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold mb-4 sm:mb-6">{q?.text}</h2>
                <div className="flex flex-col gap-3 sm:gap-4">
                    {q?.options.map((op) => (
                        <OptionButton key={op.id} id={op.id} text={op.text} selected={selected === op.id} onClick={() => select(op.id)} />
                    ))}
                </div>
            </div>

            <BottomNav
                canBack={progress.index > 0}
                canNext={progress.index < total - 1}
                onBack={() => go(-1)}
                onNext={() => go(+1)}
                index={progress.index}
                total={total}
                showOverview={showOverview}
                onToggleOverview={() => setShowOverview(!showOverview)}
                selections={progress.selections}
                marked={progress.marked}
                onJump={(to) => setProgress((p) => ({ ...p, index: to }))}
            />

            {showSummary && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="w-full max-w-lg rounded-2xl border border-[#333] bg-[#111] p-6">
                        <div className="text-xl font-bold mb-3">Submission Summary</div>
                        <div className="text-sm text-[#B0B0B0] mb-4">You answered {Object.values(progress.selections).filter(Boolean).length} of {total} questions.</div>
                        <div className="mb-4">Score (dummy): <span className="text-[#FFB74D] font-semibold">{correctCount}/{total}</span></div>
                        <div className="flex flex-col sm:flex-row justify-end gap-3">
                            <button onClick={() => setShowSummary(false)} className="px-4 py-2 rounded-xl border bg-[#191919] border-[#333]">Close</button>
                            <button onClick={() => router.push('/tests')} className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white">Finish</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

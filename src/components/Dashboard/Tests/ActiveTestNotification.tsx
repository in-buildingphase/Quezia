import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Warning, Timer, CaretRight, X, ListChecks } from '@phosphor-icons/react';
import { TestContext } from '../../../context/TestContextDefinition';

const ActiveTestNotification: React.FC = () => {
    const testContext = useContext(TestContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [isExpanded, setIsExpanded] = useState(true);
    const [timeLeft, setTimeLeft] = useState<number | null>(null);

    // Refresh attempts on mount to ensure we have the latest status
    useEffect(() => {
        if (testContext?.refreshAttempts) {
            testContext.refreshAttempts();
        }
    }, [])

    const { activeAttempt } = testContext || {};
    const currentPath = location.pathname;

    // Sync local timer when activeAttempt updates
    useEffect(() => {
        if (activeAttempt?.timeRemainingSeconds != null) {
            setTimeLeft(activeAttempt.timeRemainingSeconds);
        } else {
            setTimeLeft(null);
        }
    }, [activeAttempt?.timeRemainingSeconds]);

    // Countdown interval
    useEffect(() => {
        if (timeLeft === null) return;

        const interval = setInterval(() => {
            setTimeLeft(prev => {
                if (prev === null || prev <= 0) {
                    clearInterval(interval);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [timeLeft === null]); // Re-create interval if timeLeft switches between null/number

    // Don't show if active test data isn't loaded or doesn't exist
    if (!activeAttempt) return null;
    
    // Don't show if current URL contains the active attempt ID (TestSession or TestResultPage)
    if (activeAttempt && (
        currentPath.includes(`/attempt/${activeAttempt.id}`) || 
        currentPath.includes(`/result/${activeAttempt.id}`)
    )) {
        return null;
    }

    const formatTime = (seconds: number) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        
        if (h > 0) return `${h}h ${m}m left`;
        return `${m}m ${s}s left`;
    };

    const timeDisplay = timeLeft != null
        ? formatTime(timeLeft) 
        : 'In Progress';

    if (!isExpanded) {
        return (
            <button 
                onClick={() => setIsExpanded(true)}
                className="fixed bottom-6 right-6 z-50 animate-slide-up bg-neutral-900 border border-yellow-500/20 text-yellow-500 hover:bg-neutral-800 hover:border-yellow-500/40 p-3 rounded-xl shadow-lg transition-all transform hover:scale-105"
                title="Active Test in Progress"
            >
                <div className="flex flex-col items-center">
                    <Warning weight="fill" size={24} />
                     {timeLeft != null && (
                         <span className="text-[10px] font-mono font-medium block mt-1 whitespace-nowrap">
                            {formatTime(timeLeft).replace(' left', '')}
                         </span>
                    )}
                </div>
            </button>
        );
    }

    if (!isExpanded) {
        return (
            <button 
                onClick={() => setIsExpanded(true)}
                className="fixed bottom-6 right-6 z-50 animate-slide-up bg-neutral-900 border border-yellow-500/20 text-yellow-500 hover:bg-neutral-800 hover:border-yellow-500/40 p-3 rounded-xl shadow-lg transition-all transform hover:scale-105"
                title="Active Test in Progress"
            >
                <Warning weight="fill" size={24} />
            </button>
        );
    }

    return (
        <div className="fixed bottom-6 right-6 z-50 animate-slide-up">
            <div className="bg-neutral-900/95 border border-white/10 shadow-2xl rounded-xl p-4 w-80 flex flex-col gap-3 relative overflow-hidden backdrop-blur-xl">
                {/* Accent bar */}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-yellow-500" />

                <div className="flex items-start justify-between pl-2">
                    <div className="flex items-center gap-2 text-yellow-500">
                        <Warning weight="fill" size={20} />
                        <span className="font-semibold text-sm">Test in Progress</span>
                    </div>
                    <button 
                        onClick={() => setIsExpanded(false)}
                        className="text-neutral-500 hover:text-white transition-colors"
                    >
                        <X size={16} />
                    </button>
                </div>

                <div className="pl-2 flex flex-col gap-1">
                    <p className="text-sm text-neutral-400">
                        You have an unfinished test session.
                    </p>
                    
                    <div className="flex items-center gap-4 mt-1 text-xs text-neutral-500">
                        <div className="flex items-center gap-1.5">
                            <ListChecks size={14} />
                            <span>{activeAttempt.questionsAnswered ?? 0} Answered</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Timer size={14} />
                            <span>{timeDisplay}</span>
                        </div>
                    </div>
                </div>

                <button
                    onClick={() => navigate(`/dashboard/tests/thread/${activeAttempt.threadId || 'unknown'}/attempt/${activeAttempt.id}`)}
                    className="ml-2 flex items-center justify-between px-3 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all group"
                >
                    <span className="text-sm font-medium text-white">Resume Test</span>
                    <CaretRight size={16} className="text-neutral-500 group-hover:text-white transition-colors" />
                </button>
            </div>
        </div>
    );
};

export default ActiveTestNotification;

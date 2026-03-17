import { useEffect, useRef, useCallback } from 'react';
import { testEngineService } from '../../../../../services/test-engine/test-engine.service';

interface UseQuestionTimerProps {
    attemptId: string | undefined;
    questionId: string | undefined;
    isSubmitted: boolean;
}

export function useQuestionTimer({ attemptId, questionId, isSubmitted }: UseQuestionTimerProps) {
    // Current accumulated time for this "session" (since last flush)
    const accumulatedDeltaRef = useRef<number>(0);
    // Timestamp of the last time we accounted for time (checkpoint)
    const lastCheckpointRef = useRef<number>(Date.now());
    
    const isFirstVisitRef = useRef<boolean>(true);
    const currentQuestionIdRef = useRef<string | undefined>(questionId);
    
    // Refs for stable access in callbacks/effects without triggering re-runs
    const attemptIdRef = useRef(attemptId);
    const isSubmittedRef = useRef(isSubmitted);

    // Sync refs
    useEffect(() => {
        attemptIdRef.current = attemptId;
        isSubmittedRef.current = isSubmitted;
    }, [attemptId, isSubmitted]);

    const flush = useCallback(async () => {
        const aid = attemptIdRef.current;
        const qid = currentQuestionIdRef.current;
        
        // Calculate milliseconds elapsed since last checkpoint
        const now = Date.now();
        const timeSinceCheckpoint = now - lastCheckpointRef.current;
        
        // Add strictly positive time (sanity check)
        const delta = timeSinceCheckpoint > 0 ? timeSinceCheckpoint : 0;
        
        // Combine with any previously accumulated buffer
        const totalDelta = accumulatedDeltaRef.current + delta;

        // Reset tracking immediately for the next cycle
        lastCheckpointRef.current = now;
        accumulatedDeltaRef.current = 0;

        if (!aid || !qid || totalDelta <= 0) return;

        // Capture first visit flag and reset it
        const isFirst = isFirstVisitRef.current;
        isFirstVisitRef.current = false;

        try {
            // Send time update
            return testEngineService.updateQuestionTime(aid, {
                questionId: qid,
                deltaTime: totalDelta,
                ...(isFirst ? { isNewVisit: true } : {})
            });
        } catch (error) {
            console.warn('Failed to sync time', error);
        }
    }, []);

    // Handle Question Change
    useEffect(() => {
        // If question hasn't changed, do nothing
        if (questionId === currentQuestionIdRef.current) return;

        // 1. Flush time for the OLD question before switching
        if (currentQuestionIdRef.current) {
            flush();
        }

        // 2. Setup that NEW question
        currentQuestionIdRef.current = questionId;
        isFirstVisitRef.current = true;
        accumulatedDeltaRef.current = 0;
        lastCheckpointRef.current = Date.now(); // Reset checkpoint for new question
        
    }, [questionId, flush]);

    // Visibility Handling (Pause/Resume)
    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.hidden) {
                // User left tab -> Flush immediately to save time spent so far.
                // This essentially "pauses" the timer because we won't count time while hidden.
                flush();
            } else {
                // User returned -> Resume tracking.
                // Reset checkpoint to NOW so we explicitly ignore the duration they were hidden.
                lastCheckpointRef.current = Date.now();
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);
        return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
    }, [flush]);

    // Interval for periodic syncing (every 5s)
    useEffect(() => {
        if (!attemptId || !questionId || isSubmitted) return;

        // Ensure we start fresh if coming back or mounting
        lastCheckpointRef.current = Date.now();

        const interval = setInterval(() => {
            if (document.hidden) return; // Don't sync if hidden (we flushed on hide)

            // Just call flush, it will calculate delta from lastCheckpoint
            flush();
        }, 5000);

        return () => clearInterval(interval);
    }, [attemptId, questionId, isSubmitted, flush]);

    // Final safety flush on unmount
    useEffect(() => {
        return () => {
            flush();
        };
    }, [flush]);

    return { flush };
}

import { useState, useCallback } from 'react';
import type { DailyLimitErrorResponse } from '../services/test-engine/test-engine.service';

export const useDailyLimit = () => {
    const [isLimitModalOpen, setIsLimitModalOpen] = useState(false);
    const [limitData, setLimitData] = useState<DailyLimitErrorResponse | null>(null);

    const handleApiError = useCallback((error: any) => {
        // Check for the specific 403 error structure
        if (
            error.response?.status === 403 && 
            error.response?.data?.retryAfter &&
            error.response?.data?.resetAt
        ) {
            setLimitData(error.response.data as DailyLimitErrorResponse);
            setIsLimitModalOpen(true);
            return true; // Error was handled by this hook
        }
        return false; // Error was not handled
    }, []);

    const closeLimitModal = useCallback(() => {
        setIsLimitModalOpen(false);
        setLimitData(null);
    }, []);

    return {
        isLimitModalOpen,
        closeLimitModal,
        handleApiError,
        limitData
    };
};

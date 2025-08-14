import { useState, useEffect, RefObject, useCallback } from 'react';

interface MousePosition {
  x: number;
  y: number;
}

export function useGridMousePosition(gridRef: RefObject<HTMLElement | null>) {
  const [globalMousePos, setGlobalMousePos] = useState<MousePosition>({ x: 0, y: 0 });
  const [gridRect, setGridRect] = useState<DOMRect | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  const updateGridRect = useCallback(() => {
    const gridElement = gridRef.current;
    if (gridElement) {
      const rect = gridElement.getBoundingClientRect();
      setGridRect(rect);
      if (!isInitialized) {
        setIsInitialized(true);
      }
    }
  }, [gridRef, isInitialized]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    // Only update if we're initialized and have a grid rect
    if (!isInitialized || !gridRef.current) return;

    setGlobalMousePos({ x: e.clientX, y: e.clientY });
    
    const currentGridRect = gridRef.current.getBoundingClientRect();
    const padding = 100;
    const isNearGrid = 
      e.clientX >= currentGridRect.left - padding &&
      e.clientX <= currentGridRect.right + padding &&
      e.clientY >= currentGridRect.top - padding &&
      e.clientY <= currentGridRect.bottom + padding;
    
    setIsActive(isNearGrid);
  }, [gridRef, isInitialized]);

  const handleVisibilityChange = useCallback(() => {
    if (document.visibilityState === 'visible') {
      // Reset and re-initialize when page becomes visible
      setTimeout(() => {
        updateGridRect();
        setIsActive(false);
      }, 100);
    } else {
      // Deactivate when page is hidden
      setIsActive(false);
    }
  }, [updateGridRect]);

  const handleWindowFocus = useCallback(() => {
    // Re-initialize when window gains focus
    setTimeout(() => {
      updateGridRect();
      setIsActive(false);
    }, 100);
  }, [updateGridRect]);

  const handleWindowBlur = useCallback(() => {
    // Deactivate when window loses focus
    setIsActive(false);
  }, []);

  useEffect(() => {
    const gridElement = gridRef.current;
    if (!gridElement) return;

    // Initial setup with delay to ensure DOM is ready
    const initTimeout = setTimeout(() => {
      updateGridRect();
    }, 100);

    // Add all event listeners
    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('resize', updateGridRect);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', handleWindowFocus);
    window.addEventListener('blur', handleWindowBlur);

    // Additional initialization after component mount
    const rafId = requestAnimationFrame(() => {
      updateGridRect();
    });

    return () => {
      clearTimeout(initTimeout);
      cancelAnimationFrame(rafId);
      document.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', updateGridRect);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleWindowFocus);
      window.removeEventListener('blur', handleWindowBlur);
    };
  }, [gridRef, handleMouseMove, updateGridRect, handleVisibilityChange, handleWindowFocus, handleWindowBlur]);

  return { globalMousePos, gridRect, isActive: isActive && isInitialized };
}

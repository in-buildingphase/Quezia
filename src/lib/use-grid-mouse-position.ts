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

  // Reset function to clear positioning when mouse leaves
  const resetPosition = useCallback(() => {
    setGlobalMousePos({ x: 0, y: 0 });
    setIsActive(false);
  }, []);

  // Update grid rectangle function
  const updateGridRect = useCallback(() => {
    const gridElement = gridRef.current;
    if (!gridElement) return;
    
    const rect = gridElement.getBoundingClientRect();
    setGridRect(rect);
  }, [gridRef]);

  useEffect(() => {
    const gridElement = gridRef.current;
    if (!gridElement) return;

    // Initialize grid rect on mount and when window loads
    const initializeGridRect = () => {
      updateGridRect();
      setIsInitialized(true);
    };

    // Handle mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      if (!gridElement) return;
      
      // Always update grid rect on mouse move to ensure accuracy
      const currentGridRect = gridElement.getBoundingClientRect();
      setGridRect(currentGridRect);
      
      const padding = 100;
      const isNearGrid = 
        e.clientX >= currentGridRect.left - padding &&
        e.clientX <= currentGridRect.right + padding &&
        e.clientY >= currentGridRect.top - padding &&
        e.clientY <= currentGridRect.bottom + padding;
      
      if (isNearGrid) {
        setGlobalMousePos({ x: e.clientX, y: e.clientY });
        setIsActive(true);
      } else {
        // Reset when mouse is far from grid
        resetPosition();
      }
    };

    // Handle mouse enter on grid element
    const handleMouseEnter = (e: MouseEvent) => {
      updateGridRect();
      setGlobalMousePos({ x: e.clientX, y: e.clientY });
      setIsActive(true);
    };

    // Handle mouse leave from grid element
    const handleMouseLeave = () => {
      resetPosition();
    };

    // Handle window resize
    const handleResize = () => {
      updateGridRect();
      // Reset position on resize to avoid offset issues
      resetPosition();
    };

    // Handle window focus/blur to reset state
    const handleFocus = () => {
      updateGridRect();
    };

    const handleBlur = () => {
      resetPosition();
    };

    // Initialize
    initializeGridRect();

    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    gridElement.addEventListener('mouseenter', handleMouseEnter);
    gridElement.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', handleResize);
    window.addEventListener('focus', handleFocus);
    window.addEventListener('blur', handleBlur);
    window.addEventListener('load', initializeGridRect);

    // Handle visibility change (when tab becomes active/inactive)
    const handleVisibilityChange = () => {
      if (document.hidden) {
        resetPosition();
      } else {
        updateGridRect();
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      gridElement.removeEventListener('mouseenter', handleMouseEnter);
      gridElement.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('blur', handleBlur);
      window.removeEventListener('load', initializeGridRect);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [gridRef, updateGridRect, resetPosition]);

  return { 
    globalMousePos, 
    gridRect, 
    isActive: isActive && isInitialized,
    isInitialized 
  };
}

import { useState, useEffect, RefObject } from 'react';

interface MousePosition {
  x: number;
  y: number;
}

export function useGridMousePosition(gridRef: RefObject<HTMLElement | null>) {
  const [globalMousePos, setGlobalMousePos] = useState<MousePosition>({ x: 0, y: 0 });
  const [gridRect, setGridRect] = useState<DOMRect | null>(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const gridElement = gridRef.current;
    if (!gridElement) return;

    const updateGridRect = () => {
      const rect = gridElement.getBoundingClientRect();
      setGridRect(rect);
    };

    const handleMouseMove = (e: MouseEvent) => {
      setGlobalMousePos({ x: e.clientX, y: e.clientY });
      
      const currentGridRect = gridElement.getBoundingClientRect();
      const padding = 100;
      const isNearGrid = 
        e.clientX >= currentGridRect.left - padding &&
        e.clientX <= currentGridRect.right + padding &&
        e.clientY >= currentGridRect.top - padding &&
        e.clientY <= currentGridRect.bottom + padding;
      
      setIsActive(isNearGrid);
    };

    updateGridRect();
    document.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', updateGridRect);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', updateGridRect);
    };
  }, [gridRef]); // Added gridRef to dependency array

  return { globalMousePos, gridRect, isActive };
}

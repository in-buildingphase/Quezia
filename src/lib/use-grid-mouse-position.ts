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
      setGridRect(gridElement.getBoundingClientRect());
    };

    const handleMouseMove = (e: MouseEvent) => {
      setGlobalMousePos({ x: e.clientX, y: e.clientY });
      
      if (!gridRect) updateGridRect();
      
      if (gridRect) {
        const padding = 100;
        const isNearGrid = 
          e.clientX >= gridRect.left - padding &&
          e.clientX <= gridRect.right + padding &&
          e.clientY >= gridRect.top - padding &&
          e.clientY <= gridRect.bottom + padding;
        
        setIsActive(isNearGrid);
      }
    };

    updateGridRect();
    document.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', updateGridRect);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', updateGridRect);
    };
  }, [gridRect]);

  return { globalMousePos, gridRect, isActive };
}

import { useState, useEffect, RefObject, useRef, useCallback } from "react";

interface MousePosition {
  x: number;
  y: number;
}

export function useGridMousePosition(gridRef: RefObject<HTMLElement | null>) {
  const [globalMousePos, setGlobalMousePos] = useState<MousePosition>({ x: 0, y: 0 });
  const [gridRect, setGridRect] = useState<DOMRect | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  const gridRectRef = useRef<DOMRect | null>(null);
  const lastPointerRef = useRef<PointerEvent | null>(null);
  let rafId: number | null = null;
  let debounceTimer: number | undefined;
  let scrollPending = false;

  const setRectNow = () => {
    const gridElement = gridRef.current;
    if (!gridElement) return;
    const rect = gridElement.getBoundingClientRect();
    gridRectRef.current = rect;
    setGridRect(rect);
    if (!isInitialized) setIsInitialized(true);
  };

  const scheduleUpdateGridRect = (delay = 50) => {
    if (debounceTimer !== undefined) window.clearTimeout(debounceTimer);
    debounceTimer = window.setTimeout(() => {
      setRectNow();
      debounceTimer = undefined;
    }, delay);
  };

  const handlePointerMove = (e: PointerEvent) => {
    lastPointerRef.current = e;

    if (rafId !== null) return;
    rafId = window.requestAnimationFrame(() => {
      rafId = null;
      const gridElement = gridRef.current;
      if (!gridElement || !lastPointerRef.current) return;

      const currentRect =
        scrollPending || !gridRectRef.current
          ? gridElement.getBoundingClientRect()
          : gridRectRef.current;

      scrollPending = false;
      gridRectRef.current = currentRect;
      setGridRect(currentRect);
      if (!isInitialized) setIsInitialized(true);

      const { clientX, clientY } = lastPointerRef.current;
      const padding = 100;
      const isNearGrid =
        clientX >= currentRect.left - padding &&
        clientX <= currentRect.right + padding &&
        clientY >= currentRect.top - padding &&
        clientY <= currentRect.bottom + padding;

      if (isNearGrid) {
        setGlobalMousePos({ x: clientX, y: clientY });
        setIsActive(true);
      } else {
        setIsActive(false);
      }
    });
  };

  const handlePointerEnter = (e: PointerEvent) => {
    setRectNow();
    setGlobalMousePos({ x: e.clientX, y: e.clientY });
    setIsActive(true);
  };

  const handlePointerLeave = () => {
    setIsActive(false);
  };

  const handleScroll = () => {
    scrollPending = true;
    scheduleUpdateGridRect(40);
  };

  const handleResize = () => {
    scheduleUpdateGridRect(30);
  };

  const handleVisibilityChange = () => {
    if (document.hidden) {
      setIsActive(false);
    } else {
      scheduleUpdateGridRect(30);
    }
  };

  // Catch case where pointer is already over grid on mount
  useEffect(() => {
    const once = (e: MouseEvent) => {
      handlePointerMove(e as unknown as PointerEvent);
      document.removeEventListener("mousemove", once);
    };
    document.addEventListener("mousemove", once, { passive: true });
    return () => document.removeEventListener("mousemove", once);
  }, []);

  useEffect(() => {
    const gridElement = gridRef.current;
    if (!gridElement) return;

    window.requestAnimationFrame(() => setRectNow());

    document.addEventListener("pointermove", handlePointerMove, { passive: true });
    gridElement.addEventListener("pointerenter", handlePointerEnter);
    gridElement.addEventListener("pointerleave", handlePointerLeave);
    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("scroll", handleScroll, { passive: true, capture: true });
    window.addEventListener("focus", () => scheduleUpdateGridRect(20));
    window.addEventListener("blur", () => setIsActive(false));
    document.addEventListener("visibilitychange", handleVisibilityChange);

    const ro = new ResizeObserver(() => scheduleUpdateGridRect(30));
    ro.observe(gridElement);

    return () => {
      if (debounceTimer !== undefined) window.clearTimeout(debounceTimer);
      if (rafId !== null) window.cancelAnimationFrame(rafId);
      document.removeEventListener("pointermove", handlePointerMove);
      gridElement.removeEventListener("pointerenter", handlePointerEnter);
      gridElement.removeEventListener("pointerleave", handlePointerLeave);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("scroll", handleScroll, true);
      window.removeEventListener("focus", () => scheduleUpdateGridRect(20));
      window.removeEventListener("blur", () => setIsActive(false));
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      ro.disconnect();
    };
  }, [gridRef, isInitialized]);

  return {
    globalMousePos,
    gridRect,
    isActive: isActive && isInitialized,
    isInitialized,
  };
}

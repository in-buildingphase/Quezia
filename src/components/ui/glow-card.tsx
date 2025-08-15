"use client";

import { useRef, useState, useLayoutEffect } from "react";
import { CheckCircle, BookOpen, Target, TrendingUp } from "lucide-react";

interface GlowCardProps {
  iconName: "CheckCircle" | "BookOpen" | "Target" | "TrendingUp";
  title: string;
  description: string;
  index: number;
  globalMousePos: { x: number; y: number };
  gridRect: DOMRect | null;
  isGridActive: boolean;
}

const iconMap = {
  CheckCircle,
  BookOpen,
  Target,
  TrendingUp,
};

export function GlowCard({
  iconName,
  title,
  description,
  globalMousePos,
  gridRect,
  isGridActive,
}: GlowCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [cardRect, setCardRect] = useState<DOMRect | null>(null);
  const IconComponent = iconMap[iconName];

  // Update rect on size changes AND when mouse moves
  useLayoutEffect(() => {
    const updateCardRect = () => {
      if (cardRef.current) {
        setCardRect(cardRef.current.getBoundingClientRect());
      }
    };

    updateCardRect();
    const resizeObserver = new ResizeObserver(updateCardRect);
    if (cardRef.current) {
      resizeObserver.observe(cardRef.current);
    }

    // Also update when mouse moves for position changes (scroll)
    updateCardRect();

    return () => resizeObserver.disconnect();
  }, [globalMousePos.x, globalMousePos.y, isGridActive]);

  let intensity = 0;
  let localX = 0;
  let localY = 0;

  if (isGridActive && cardRect && gridRect && globalMousePos && 
      typeof globalMousePos.x === 'number' && 
      typeof globalMousePos.y === 'number' &&
      !isNaN(globalMousePos.x) && 
      !isNaN(globalMousePos.y)) {
    
    const cardCenterX = cardRect.left + cardRect.width / 2;
    const cardCenterY = cardRect.top + cardRect.height / 2;
    const mouseX = globalMousePos.x;
    const mouseY = globalMousePos.y;

    // Ensure all values are valid numbers
    if (!isNaN(cardCenterX) && !isNaN(cardCenterY) && !isNaN(mouseX) && !isNaN(mouseY)) {
      const distance = Math.sqrt(
        Math.pow(mouseX - cardCenterX, 2) + Math.pow(mouseY - cardCenterY, 2)
      );
      const maxDistance = 250;
      const rawIntensity = 1 - distance / maxDistance;
      intensity = Math.max(0, Math.pow(rawIntensity, 1.5));

      // Ensure intensity is a valid number
      if (isNaN(intensity)) {
        intensity = 0;
      }

      localX = Math.max(0, Math.min(cardRect.width, mouseX - cardRect.left));
      localY = Math.max(0, Math.min(cardRect.height, mouseY - cardRect.top));
      
      // Ensure local coordinates are valid numbers
      if (isNaN(localX)) localX = 0;
      if (isNaN(localY)) localY = 0;
    }
  }

  const isActive = !isNaN(intensity) && intensity > 0.05;

  return (
    <div className="aspect-square p-1 rounded-xl relative group">
      {/* Border glow */}
      <div
        className="absolute inset-0 rounded-xl transition-opacity duration-200 ease-out"
        style={{
          opacity: isNaN(intensity) ? 0 : Math.min(1, intensity * 1.2),
          background: `radial-gradient(circle 150px at ${localX}px ${localY}px, 
            rgba(255, 143, 0, 1), 
            rgba(255, 143, 0, 0.8) 30%, 
            rgba(255, 143, 0, 0.4) 50%, 
            rgba(255, 143, 0, 0.1) 70%,
            transparent 85%)`,
        }}
      />

      {/* Main card */}
      <div
        ref={cardRef}
        className="aspect-square p-6 rounded-xl bg-gradient-to-br from-[#1A1A1A] to-[#0F0F0F] border-0 transition-all duration-200 ease-out group flex flex-col justify-center relative overflow-hidden backdrop-blur-sm"
        style={{
          boxShadow:
            "0 4px 16px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.05)",
        }}
      >
        {/* Interior glow */}
        <div
          className="absolute inset-0 pointer-events-none rounded-xl transition-opacity duration-200 ease-out"
          style={{
            opacity: isNaN(intensity) ? 0 : Math.min(1, intensity * 0.8),
            background: `radial-gradient(circle 100px at ${localX}px ${localY}px, 
              rgba(255, 143, 0, 0.25), 
              rgba(255, 143, 0, 0.12) 50%, 
              transparent 75%)`,
          }}
        />

        {/* Content */}
        <div className="text-center space-y-5 relative z-10">
          <div className="flex justify-center">
            <div
              className="p-3 rounded-full bg-gradient-to-br from-[#FF8F00]/20 to-[#FF8F00]/10 border transition-all duration-300"
              style={{
                borderColor: isActive && !isNaN(intensity)
                  ? `rgba(255, 143, 0, ${Math.min(0.8, intensity * 2)})`
                  : "rgba(255, 143, 0, 0.3)",
                backgroundColor: isActive && !isNaN(intensity)
                  ? `rgba(255, 143, 0, ${intensity * 0.2})`
                  : undefined,
              }}
            >
              <IconComponent
                className="w-6 h-6 text-[#FF8F00] transition-all duration-300"
                style={{
                  filter: isActive && !isNaN(intensity)
                    ? `drop-shadow(0 0 ${20 * intensity}px rgba(255, 143, 0, ${intensity}))`
                    : "drop-shadow(0 0 4px rgba(255, 143, 0, 0.3))",
                  transform: isActive && !isNaN(intensity)
                    ? `scale(${1 + intensity * 0.1})`
                    : "scale(1)",
                }}
              />
            </div>
          </div>
          <div className="space-y-3">
            <h3 className="text-white font-semibold text-sm leading-tight tracking-wide">
              {title}
            </h3>
            <p className="text-[#999] text-xs leading-relaxed font-medium px-1">
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

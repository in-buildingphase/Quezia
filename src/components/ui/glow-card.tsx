'use client';

import { useRef, useState, useEffect } from 'react';
import { CheckCircle, BookOpen, Target, TrendingUp } from 'lucide-react';

interface GlowCardProps {
  iconName: 'CheckCircle' | 'BookOpen' | 'Target' | 'TrendingUp';
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

export function GlowCard({ iconName, title, description, globalMousePos, gridRect, isGridActive }: GlowCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [cardRect, setCardRect] = useState<DOMRect | null>(null);
  const IconComponent = iconMap[iconName];

  useEffect(() => {
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

    return () => resizeObserver.disconnect();
  }, []);

  // Calculate glow properties
  let intensity = 0;
  let localX = 0;
  let localY = 0;

  if (isGridActive && cardRect && gridRect) {
    // Calculate distance from mouse to card center
    const cardCenterX = cardRect.left + cardRect.width / 2;
    const cardCenterY = cardRect.top + cardRect.height / 2;
    const distance = Math.sqrt(
      Math.pow(globalMousePos.x - cardCenterX, 2) + 
      Math.pow(globalMousePos.y - cardCenterY, 2)
    );

    // Calculate intensity (closer = stronger)
    const maxDistance = 250;
    intensity = Math.max(0, Math.pow(1 - distance / maxDistance, 1.5));

    // Calculate local position within the card
    localX = Math.max(0, Math.min(cardRect.width, globalMousePos.x - cardRect.left));
    localY = Math.max(0, Math.min(cardRect.height, globalMousePos.y - cardRect.top));
  }

  const isActive = intensity > 0.05;

  return (
    <div className="aspect-square p-1 rounded-xl relative group">
      {/* Border glow */}
      <div 
        className="absolute inset-0 rounded-xl transition-opacity duration-300 ease-out"
        style={{
          opacity: intensity * 0.8,
          background: `radial-gradient(circle 100px at ${localX}px ${localY}px, 
            rgba(255, 143, 0, 1), 
            rgba(255, 143, 0, 0.6) 40%, 
            rgba(255, 143, 0, 0.2) 60%, 
            transparent 30%)`,
        }}
      />
      
      {/* Main card */}
      <div
        ref={cardRef}
        data-card
        className="aspect-square p-6 rounded-xl bg-gradient-to-br from-[#1A1A1A] to-[#0F0F0F] border transition-all duration-300 ease-out group flex flex-col justify-center relative overflow-hidden backdrop-blur-sm"
        style={{
          borderColor: isActive ? `rgba(255, 143, 0, ${Math.min(0.8, intensity * 1.5)})` : '#333',
          boxShadow: isActive 
            ? `0 8px 32px rgba(0, 0, 0, 0.4), 0 0 ${30 * intensity}px rgba(255, 143, 0, ${intensity * 0.5}), inset 0 1px 0 rgba(255, 255, 255, 0.1)` 
            : '0 4px 16px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
        }}
      >
        {/* Interior glow */}
        <div
          className="absolute inset-0 pointer-events-none rounded-xl transition-opacity duration-300 ease-out"
          style={{
            opacity: intensity * 0.6,
            background: `radial-gradient(circle 120px at ${localX}px ${localY}px, 
              rgba(255, 143, 0, 0.3), 
              rgba(255, 143, 0, 0.1) 60%, 
              transparent 80%)`,
          }}
        />
        
        {/* Content */}
        <div className="text-center space-y-5 relative z-10">
          <div className="flex justify-center">
            <div 
              className="p-3 rounded-full bg-gradient-to-br from-[#FF8F00]/20 to-[#FF8F00]/10 border transition-all duration-300"
              style={{
                borderColor: isActive ? `rgba(255, 143, 0, ${Math.min(0.8, intensity * 2)})` : 'rgba(255, 143, 0, 0.3)',
                backgroundColor: isActive ? `rgba(255, 143, 0, ${intensity * 0.2})` : undefined,
              }}
            >
              <IconComponent 
                className="w-6 h-6 text-[#FF8F00] transition-all duration-300" 
                style={{
                  filter: isActive 
                    ? `drop-shadow(0 0 ${20 * intensity}px rgba(255, 143, 0, ${intensity}))` 
                    : 'drop-shadow(0 0 4px rgba(255, 143, 0, 0.3))',
                  transform: isActive ? `scale(${1 + intensity * 0.1})` : 'scale(1)',
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

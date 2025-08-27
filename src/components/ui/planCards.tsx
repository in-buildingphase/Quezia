"use client";

import React, { useRef, useState, useLayoutEffect } from 'react';
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import Image from 'next/image';

interface Exam {
  _id?: string;
  _creationTime?: number;
  examId: string;
  name: string;
  shortName: string;
  description: string;
  iconPath: string;
  price: number;
  isActive: boolean;
  sortOrder: number;
  createdAt?: number;
}

interface ExamCardProps {
  examId: string;
  name: string;
  shortName: string;
  description: string;
  iconPath: string;
  price: number;
  onSelect?: (examId: string) => void;
  globalMousePos: { x: number; y: number };
  isGridActive: boolean;
}

const ExamCard: React.FC<ExamCardProps> = ({ 
  examId, 
  name, 
  shortName, 
  description, 
  iconPath, 
  price,
  onSelect,
  globalMousePos,
  isGridActive
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [cardRect, setCardRect] = useState<DOMRect | null>(null);

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

  if (isGridActive && cardRect && globalMousePos && 
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
      const maxDistance = 300;
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
    <div className="p-1 rounded-xl relative group">
      {/* Border glow */}
      <div
        className="absolute inset-0 rounded-xl transition-opacity duration-200 ease-out"
        style={{
          opacity: isNaN(intensity) ? 0 : Math.min(1, intensity * 1.2),
          background: `radial-gradient(circle 200px at ${localX}px ${localY}px, 
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
        onClick={() => onSelect?.(examId)}
        className="bg-gradient-to-br from-[#1A1A1A] to-[#0F0F0F] border-0 rounded-xl p-8 hover:border-[#FFB74D] transition-all duration-300 group cursor-pointer h-56 backdrop-blur-sm relative overflow-hidden"
        style={{
          boxShadow: "0 4px 16px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.05)",
        }}
      >
        {/* Interior glow */}
        <div
          className="absolute inset-0 pointer-events-none rounded-xl transition-opacity duration-200 ease-out"
          style={{
            opacity: isNaN(intensity) ? 0 : Math.min(1, intensity * 0.6),
            background: `radial-gradient(circle 150px at ${localX}px ${localY}px, 
              rgba(255, 143, 0, 0.25), 
              rgba(255, 143, 0, 0.12) 50%, 
              transparent 75%)`,
          }}
        />

        <div className="flex gap-6 h-full relative z-10">
          {/* Left side - Icon and Title */}
          <div className="flex flex-col items-center justify-start min-w-[110px]">
            <div className="w-20 h-20 mb-3 relative">
              <Image
                src={iconPath}
                alt={`${shortName} icon`}
                fill
                className="object-contain transition-transform duration-300"
                
              />
            </div>
            <h3 
              className="text-xl font-bold text-center transition-colors duration-300 mb-2"
              style={{
                color: isActive && !isNaN(intensity)
                  ? `rgba(255, 143, 0, ${0.8 + intensity * 0.2})`
                  : "#FFB74D",
              }}
            >
              {shortName}
            </h3>
            {/* Price tag below title */}
            <div className="flex justify-center">
              <span className="px-3 py-1.5 bg-gradient-to-r from-[#FF8F00] to-[#FFB74D] text-black text-sm font-bold rounded-lg shadow-lg transition-all duration-300 group-hover:scale-105">
                {price === 0 ? 'FREE' : `₹${price}`}
              </span>
            </div>
          </div>

          {/* Right side - Description and CTA */}
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <h4 className="text-base font-semibold text-[#E0E0E0] group-hover:text-white transition-colors duration-300 mb-3">
                {name}
              </h4>
              <p className="text-sm text-[#B0B0B0] leading-relaxed line-clamp-3 group-hover:text-[#D0D0D0] transition-colors duration-300">
                {description}
              </p>
            </div>
            
            <div className="mt-4">
              <div 
                className="inline-flex items-center text-sm font-medium transition-colors duration-300"
                style={{
                  color: isActive && !isNaN(intensity)
                    ? `rgba(255, 143, 0, ${0.8 + intensity * 0.2})`
                    : "#FFB74D",
                }}
              >
                Start Practice
                <svg 
                  className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ExamCards: React.FC = () => {
  // Get exams from database
  const exams = useQuery(api.exams.getActiveExams);
  const [globalMousePos, setGlobalMousePos] = useState({ x: 0, y: 0 });
  const [isGridActive, setIsGridActive] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);

  // Track mouse position globally
  useLayoutEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setGlobalMousePos({ x: e.clientX, y: e.clientY });
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleExamSelect = (examId: string) => {
    // Handle exam selection - you can customize this
    console.log(`Selected exam: ${examId}`);
    // Example: router.push(`/dashboard/tests?exam=${examId}`);
  };

  return (
    <section className="py-20 relative overflow-hidden">
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF8F00] to-[#FFB74D]">Exam</span>
          </h2>
          <p className="text-lg text-[#B0B0B0] max-w-2xl mx-auto leading-relaxed">
            Select from our comprehensive collection of entrance exams and start your preparation journey with AI-powered practice tests.
          </p>
        </div>
        
        {/* Loading skeleton while data is being fetched */}
        {!exams ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-gradient-to-br from-[#1A1A1A] to-[#0F0F0F] border border-[#333] rounded-xl p-8 animate-pulse h-56">
                <div className="flex gap-6">
                  <div className="flex flex-col items-center min-w-[110px]">
                    <div className="w-20 h-20 mb-3 bg-[#333] rounded-lg"></div>
                    <div className="h-5 w-16 bg-[#333] rounded mb-2"></div>
                    <div className="h-6 w-12 bg-[#333] rounded"></div>
                  </div>
                  <div className="flex-1">
                    <div className="h-5 w-3/4 bg-[#333] rounded mb-3"></div>
                    <div className="h-4 w-full bg-[#333] rounded mb-2"></div>
                    <div className="h-4 w-2/3 bg-[#333] rounded mb-6"></div>
                    <div className="h-10 w-32 bg-[#333] rounded"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div 
            ref={gridRef}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto"
            onMouseEnter={() => setIsGridActive(true)}
            onMouseLeave={() => setIsGridActive(false)}
          >
            {exams.map((exam: Exam) => (
              <ExamCard
                key={exam.examId}
                examId={exam.examId}
                name={exam.name}
                shortName={exam.shortName}
                description={exam.description}
                iconPath={exam.iconPath}
                price={exam.price}
                onSelect={handleExamSelect}
                globalMousePos={globalMousePos}
                isGridActive={isGridActive}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ExamCards;

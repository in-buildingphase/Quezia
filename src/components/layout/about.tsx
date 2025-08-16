'use client';

import { useRef } from "react";
import { CheckCircle, BookOpen, Target, TrendingUp } from "lucide-react";
import { GoldenText } from "../ui/goldentext";
import { GlowCard } from "../ui/glow-card";
import { useGridMousePosition } from "@/lib/use-grid-mouse-position";

const iconMap = {
  CheckCircle,
  BookOpen,
  Target,
  TrendingUp,
};

export default function About() {
  const gridRef = useRef<HTMLDivElement>(null);
  const { globalMousePos, gridRect, isActive } = useGridMousePosition(gridRef);
  
  const features = [
    {
      iconName: 'CheckCircle' as const,
      title: "Complete Past Paper Archive",
      description: "Access thousands of previous exam papers across all subjects"
    },
    {
      iconName: 'BookOpen' as const,
      title: "AI-Generated Practice Tests", 
      description: "Custom tests created by AI based on your weak areas and exam patterns"
    },
    {
      iconName: 'Target' as const,
      title: "Personalized Analytics",
      description: "Track your progress with detailed insights and performance metrics"
    },
    {
      iconName: 'TrendingUp' as const,
      title: "Predictive Scoring",
      description: "Get accurate score predictions and improvement recommendations"
    }
  ];

  return (
    <section className="py-20 pb-0 relative">
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-[3fr_2fr] gap-8 lg:gap-12 items-center">
          
          {/* Left Side - Description */}
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="inline-flex items-center px-3 py-1 rounded-full border border-[#FF8F00]/30 bg-[#FF8F00]/10 text-[#FFB74D] text-sm font-medium">
                About Quezia
              </div>
              
              <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
                Master Your Exams with 
                <span><GoldenText>AI-Powered</GoldenText></span> Learning
              </h2>
              
              <p className="text-[#B0B0B0] text-lg leading-relaxed">
                Quezia revolutionizes exam preparation by combining comprehensive past paper archives with advanced AI technology. Get personalized practice tests, detailed analytics, and smart recommendations tailored to your learning style.
              </p>
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <button className="inline-flex items-center gap-2 px-6 py-3 bg-[#FF8F00] text-black font-medium rounded-lg transition-all transform hover:scale-105 shadow-lg">
                Start Learning Today
                <CheckCircle className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Side - Features List */}
          <div className="flex justify-center lg:justify-start">
            {/* Desktop Layout - 2x2 Grid */}
            <div ref={gridRef} data-grid className="hidden lg:grid grid-cols-2 gap-6 w-full max-w-xl">
              {features.map((feature, index) => (
                <GlowCard
                  key={index}
                  iconName={feature.iconName}
                  title={feature.title}
                  description={feature.description}
                  index={index}
                  globalMousePos={globalMousePos}
                  gridRect={gridRect}
                  isGridActive={isActive}
                />
              ))}
            </div>
            
            {/* Mobile/Tablet Layout - Stacked Rectangular Cards */}
            <div className="lg:hidden w-full space-y-4">
              {features.map((feature, index) => {
                const IconComponent = iconMap[feature.iconName as keyof typeof iconMap];
                return (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-[#1A1A1A] to-[#0F0F0F] border border-[#333] transition-all duration-300 hover:border-[#FF8F00]/50"
                  >
                    {/* Icon */}
                    <div className="flex-shrink-0 p-3 rounded-full bg-gradient-to-br from-[#FF8F00]/20 to-[#FF8F00]/10 border border-[#FF8F00]/30">
                      <IconComponent className="w-5 h-5 text-[#FF8F00]" />
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-semibold text-sm leading-tight mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-[#999] text-xs leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

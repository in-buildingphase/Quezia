'use client';

import { useRef } from "react";
import { CheckCircle } from "lucide-react";
import { GoldenText } from "../ui/goldentext";
import { GlowCard } from "../ui/glow-card";
import { useGridMousePosition } from "@/lib/use-grid-mouse-position";

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
    <section id="about" className="py-20 pb-0 relative">
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
            <div ref={gridRef} data-grid className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-xl">
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
          </div>
        </div>
      </div>
    </section>
  );
}

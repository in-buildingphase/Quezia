"use client"
import { useEffect, useState } from "react"
import { Sparkles } from "lucide-react"

import { GoldenText } from "../ui/goldentext";
import { AnimatedGradientBadge } from "../ui/animatedgradienttext";
import { ChatContainer } from "../ui";

export default function Hero() {
  const heroFilters = [
    { id: 'mathematics', label: 'Mathematics', icon: Sparkles },
    { id: 'physics', label: 'Physics', icon: Sparkles },
    { id: 'chemistry', label: 'Chemistry', icon: Sparkles },
    { id: 'surprise', label: 'Surprise Test', icon: Sparkles }
  ];

  const handleSend = (message: string, filters: string[]) => {
    console.log('Hero message:', message);
    console.log('Hero selected filters:', filters);
    // Handle the message and filters here - maybe redirect to dashboard or process the query
  };

  return (
    <section id="hero" className="pt-24 sm:pt-28 lg:pt-32">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-8 py-20">
          {/* Heading + Badge */}
          <div className="space-y-8 text-center animate-slide-up-delay-200">
            <div className="animate-slide-up-delay-100">
              <AnimatedGradientBadge speed={1.5}>
                <span className="mr-2">New</span>
                <span>Top your exams now!</span>
              </AnimatedGradientBadge>
            </div>

            <div className="mx-auto max-w-screen-md text-center font-bold text-4xl md:text-6xl animate-slide-up-delay-300">
              <h1>
                Get Exam Ready with
                <GoldenText className="relative z-10">Quezia</GoldenText>
              </h1>
            </div>

            {/* CTA Buttons */}
          </div>

          {/* Unified Chat Interface */}
          <ChatContainer 
            placeholder="Ask me anything about your exams..."
            customFilters={heroFilters}
            onSend={handleSend}
            className="mt-10"
          />

        </div>
      </div>
    </section>
  )
}

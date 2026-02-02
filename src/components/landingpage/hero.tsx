import React from 'react';
import { ArrowRight } from '@phosphor-icons/react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import HeroBackground from './heroBackground';

const Hero: React.FC = () => {
  const { translateY, opacity } = useScrollAnimation();
  return (
    <div className="relative w-full h-screen pt-16 overflow-hidden">
    <HeroBackground />
      {/* Bottom gradient */}
      <div className="absolute inset-x-0 bottom-0 h-160 bg-gradient-to-t from-black/65 to-transparent" />

      {/* Top-right content */}
      <div className="absolute top-20 right-10 max-w-md w-full space-y-4">
        {/* Text card */}
        <div className="p-5">
          <p className="text-white/80 text-md leading-tight font-bold">
            A structured exam preparation system built for aspirants who value depth,
            clarity, and measurable progress. It focuses on understanding how
            competitive exams are designed, using real question patterns and
            performance insights to guide learning. Every element is intentional,
            reducing guesswork and supporting steady, focused improvement.
          </p>
        </div>

        {/* CTA buttons */}
        <div className="flex gap-3 w-full">
          <button className="group flex flex-1 items-center justify-center gap-2 bg-black text-white py-3 rounded-xl boldonse-regular text-sm transition hover:bg-black/80">
            Get started
            <ArrowRight
              size={16}
              weight="bold"
              className="transition-transform group-hover:translate-x-1"
            />
          </button>

          <button className="flex-1 border-3 border-white text-white py-3 rounded-xl boldonse-regular text-sm transition hover:bg-white/10">
            Log in
          </button>
        </div>
      </div>

      
      <div
        className="absolute bottom-10 left-10 text-white boldonse-regular text-5xl md:text-6xl lg:text-8xl leading-tight"
        style={{
          transform: `translateY(${translateY}px)`,
          opacity: opacity,
          transition: 'transform 0.1s ease-out, opacity 0.1s ease-out'
        }}
      >
       Practice Without Limits<br/>
       Until Mastery Becomes Inevitable
      </div>
    </div>
  );
};

export default Hero;

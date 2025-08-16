'use client';

import { Brain, TrendingUp, Target } from "lucide-react";

export default function Features() {
  const features = [
    {
      id: 1,
      icon: Brain,
      title: "AI-Generated Questions",
      description: "No random questions. Every problem is set from actual JEE trends.",
      videoPlaceholder: "bg-gradient-to-br from-[#FF8F00]/20 to-[#FFA000]/10",
      accent: "from-[#FF8F00] to-[#FFA000]"
    },
    {
      id: 2,
      icon: TrendingUp,
      title: "Personalized Analytics",
      description: "Know exactly where you're losing marks and where you're strong, topic by topic.",
      videoPlaceholder: "bg-gradient-to-br from-[#FFB74D]/20 to-[#FF8F00]/10",
      accent: "from-[#FFB74D] to-[#FF8F00]"
    },
    {
      id: 3,
      icon: Target,
      title: "Predictive Scoring",
      description: "Get accurate predictions and targeted improvement recommendations.",
      videoPlaceholder: "bg-gradient-to-br from-[#FFD54F]/20 to-[#FFB74D]/10",
      accent: "from-[#FFD54F] to-[#FFB74D]"
    }
  ];

  return (
    <section id="features" className="py-16 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        {/* Creative Staggered Layout */}
        <div className="space-y-12">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            const isEven = index % 2 === 0;
            
            return (
              <div
                key={feature.id}
                className={`flex flex-col lg:flex-row items-center gap-8 lg:gap-12 ${
                  isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
                }`}
              >
                {/* Video Section */}
                <div className="w-full lg:w-1/2">
                  <div className="group relative">
                    {/* Floating Icon */}
                    <div className={`absolute -top-4 ${isEven ? '-left-4' : '-right-4'} w-12 h-12 bg-gradient-to-r ${feature.accent} rounded-full flex items-center justify-center shadow-xl z-10 group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="w-6 h-6 text-black" />
                    </div>
                    
                    {/* Video Container with Enhanced Styling */}
                    <div className={`aspect-video rounded-2xl ${feature.videoPlaceholder} border border-[#444] flex items-center justify-center transition-all duration-500 group-hover:border-[#FF8F00]/50 group-hover:shadow-2xl relative overflow-hidden`}>
                      {/* Animated Background Pattern */}
                      <div className="absolute inset-0 opacity-10">
                        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-[#FF8F00]/20 to-transparent animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="w-full lg:w-1/2 space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-8 bg-gradient-to-b ${feature.accent} rounded-full`}></div>
                      <span className="text-[#FF8F00] text-sm font-semibold tracking-wider uppercase">
                        Feature {feature.id}
                      </span>
                    </div>
                    
                    <h3 className="text-2xl lg:text-3xl font-bold text-white leading-tight">
                      {feature.title}
                    </h3>
                    
                    <p className="text-[#B0B0B0] text-lg leading-relaxed">
                      {feature.description}
                    </p>
                  </div>

                  {/* Stats or Additional Info */}
                  <div className="flex items-center gap-6 pt-4">
                    <div className="text-center">
                      <div className={`text-2xl font-bold bg-gradient-to-r ${feature.accent} bg-clip-text text-transparent`}>
                        {index === 0 ? 'Unlimited' : index === 1 ? '95%' : '85%'}
                      </div>
                      <div className="text-[#888] text-xs">
                        {index === 0 ? 'Questions' : index === 1 ? 'Accuracy' : 'Score Pred.'}
                      </div>
                    </div>
                    
                    <div className="h-8 w-px bg-[#333]"></div>
                    
                    <button className={`px-4 py-2 rounded-full border border-[#FF8F00]/30 text-[#FF8F00] text-sm font-medium hover:bg-[#FF8F00]/10 transition-all duration-300 group`}>
                      Try Now
                      <span className="inline-block ml-2 transform group-hover:translate-x-1 transition-transform">→</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

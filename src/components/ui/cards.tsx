import { Check, BookOpen, Brain, TrendingUp, Award, Zap, Shield, Target } from "lucide-react"

import { GoldenText } from "./goldentext";

const freeFeatures = [
  {
    icon: Check,
    text: "Access to complete past paper archive",
    included: true,
  },
  {
    icon: Zap,
    text: "3 AI practice tests daily (100 credits)",
    included: true,
  },
  {
    icon: BookOpen,
    text: "Basic study materials and guides",
    included: true,
  },
  {
    icon: Award,
    text: "Weekly & monthly full-length mock tests",
    included: false,
  },
  {
    icon: TrendingUp,
    text: "Advanced analytics & performance insights",
    included: false,
  },
  {
    icon: Brain,
    text: "AI-powered personalized study plans",
    included: false,
  },
  {
    icon: Target,
    text: "Predictive scoring & rank predictions",
    included: false,
  },
];

const premiumFeatures = [
  {
    icon: Check,
    text: "Access to complete past paper archive",
  },
  {
    icon: Zap,
    text: "Unlimited AI practice tests daily (100 credits)",
  },
  {
    icon: BookOpen,
    text: "Superior study materials and guides",
  },
  {
    icon: Award,
    text: "Weekly & monthly full-length mock tests",
  },
  {
    icon: TrendingUp,
    text: "Advanced analytics & performance insights",
  },
  {
    icon: Brain,
    text: "AI-powered personalized study plans",
  },
  {
    icon: Target,
    text: "Predictive scoring & rank predictions",
  },
];

export default function PricingCards() {
  return (
    <section id="products" className="py-16 lg:py-24 relative z-10">
      <div className="container mx-auto px-4 relative z-11">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Choose Your <span><GoldenText>Learning Path</GoldenText></span>
          </h2>
          <p className="text-[#888] text-lg max-w-2xl mx-auto">
            Select the perfect plan to accelerate your exam preparation and achieve your academic goals
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 max-w-4xl mx-auto">
          
          {/* Starter Plan */}
          <div className="flex-1 relative group">
            <div className="relative bg-white/5 backdrop-blur-xl rounded-3xl p-8 lg:p-10 border border-white/10 shadow-2xl transition-all duration-500 hover:border-white/20 hover:bg-white/[0.07]  h-full flex flex-col">
              
              {/* Plan Name & Price */}
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-3">Starter Plan</h3>
                <div className="mb-4">
                  <span className="text-5xl font-bold text-white">Free</span>
                </div>
                <p className="text-[#B0B0B0] text-base leading-relaxed">
                  Perfect for students starting their exam preparation journey
                </p>
              </div>

              {/* Call to Action */}
              <div className="mb-8">
                <button className="w-full py-4 px-6 bg-white/10 hover:bg-white/15 text-white font-semibold rounded-2xl transition-all duration-300 border border-white/20 hover:border-white/30">
                  Get Started Free
                </button>
              </div>

              {/* Divider */}
              <div className="border-t border-white/10 mb-8"></div>

              {/* Features */}
              <div className="space-y-1 mb-6 flex-grow">
                <h4 className="text-xs uppercase tracking-wider text-[#888] font-semibold mb-6">ALL FEATURES</h4>
                
                <div className="space-y-4">
                  {freeFeatures.map((feature, index) => {
                    const IconComponent = feature.icon
                    const isIncluded = feature.included
                    
                    return (
                      <div key={index} className="flex items-start gap-4">
                        <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5 ${
                          isIncluded 
                            ? 'bg-green-500/20' 
                            : 'bg-red-500/20'
                        }`}>
                          {isIncluded ? (
                            <IconComponent className="w-3 h-3 text-green-400" />
                          ) : (
                            <span className="text-red-400 text-sm font-bold">×</span>
                          )}
                        </div>
                        <span className={`text-sm leading-relaxed ${
                          isIncluded 
                            ? 'text-[#E0E0E0]' 
                            : 'text-[#888] line-through'
                        }`}>
                          {feature.text}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Pro Plan */}
          <div className="flex-1 relative group">
            {/* Popular Badge */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
              <div className="bg-gradient-to-r from-[#FF8F00] to-[#FFA000] text-black text-xs font-bold px-6 py-2 rounded-full shadow-lg">
                MOST POPULAR
              </div>
            </div>

            <div className="relative bg-[#1A1A1A] backdrop-blur-xl rounded-3xl p-8 lg:p-10 border border-[#FF8F00]/30 shadow-2xl transition-all duration-500 hover:border-[#FF8F00]/50 hover:shadow-[#FF8F00]/20 hover:shadow-3xl  h-full flex flex-col overflow-hidden">
              
              {/* Glow Effect - Only on header area */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 h-32 w-[90%] rounded-full bg-[#FF8F00]/20 blur-3xl"></div>
              
              {/* Plan Name & Price */}
              <div className="relative text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-3">Pro Plan</h3>
                <div className="mb-4">
                  <span className="text-5xl font-bold"><GoldenText>₹2000</GoldenText></span>
                  <span className="text-xl text-[#B0B0B0] ml-1">/year</span>
                </div>
                <p className="text-[#B0B0B0] text-base leading-relaxed">
                  Comprehensive solution for serious exam candidates
                </p>
              </div>

              {/* Call to Action */}
              <div className="relative mb-8">
                <button className="w-full py-4 px-6 bg-gradient-to-r from-[#FF8F00] to-[#FFA000] hover:from-[#FFA000] hover:to-[#FFB300] text-black font-semibold rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02]">
                  Start Now
                </button>
              </div>

              {/* Divider */}
              <div className="border-t border-white/20 mb-8"></div>

              {/* Features */}
              <div className="relative space-y-1 mb-6 flex-grow">
                <h4 className="text-xs uppercase tracking-wider text-[#FF8F00] font-semibold mb-6">ALL FEATURES</h4>
                
                <div className="space-y-4">
                  {premiumFeatures.map((feature, index) => {
                    const IconComponent = feature.icon
                    
                    return (
                      <div key={index} className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#FF8F00]/20 flex items-center justify-center mt-0.5">
                          <IconComponent className="w-3 h-3 text-[#FF8F00]" />
                        </div>
                        <span className="text-[#E0E0E0] text-sm leading-relaxed">
                          {feature.text}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="text-center mt-16">
          <div className="flex items-center justify-center gap-8 text-[#666] text-xs">
            <span>✓ No Hidden Fees</span>
            <span>✓ Cancel Anytime</span>
            <span>✓ 30-Day Money Back</span>
          </div>
        </div>
      </div>
    </section>
  )
}
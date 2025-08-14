import { Check, X, Sparkles, Trophy, BarChart3, Target } from "lucide-react"

export default function PricingCards() {
  return (
    <section className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8 max-w-4xl mx-auto">
          
          {/* Freemium Card */}
          <div className="flex-1">
            <div className="relative rounded-2xl p-[1px] bg-gradient-to-r from-[#333] to-[#444]">
              <div className="h-full rounded-2xl bg-[#1A1A1A] border border-[#333] p-8">
                
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-white mb-2">Freemium</h3>
                  <div className="text-4xl font-bold text-[#E0E0E0] mb-1">
                    Free
                  </div>
                  <p className="text-[#888] text-sm">Get started with essential features</p>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-[#E0E0E0] text-sm leading-relaxed">
                      Access to complete archive of past papers
                    </span>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-[#E0E0E0] text-sm leading-relaxed">
                      3 AI-generated practice tests per day (100 credits)
                    </span>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <X className="w-5 h-5 text-[#666] mt-0.5 flex-shrink-0" />
                    <span className="text-[#666] text-sm leading-relaxed">
                      Weekly and monthly full-length tests
                    </span>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <X className="w-5 h-5 text-[#666] mt-0.5 flex-shrink-0" />
                    <span className="text-[#666] text-sm leading-relaxed">
                      In-depth performance analytics and personalized guidance
                    </span>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <X className="w-5 h-5 text-[#666] mt-0.5 flex-shrink-0" />
                    <span className="text-[#666] text-sm leading-relaxed">
                      Predictive scoring and leaderboards
                    </span>
                  </div>
                </div>

                <button className="w-full py-3 px-6 bg-[#2A2A2A] hover:bg-[#333] text-white rounded-lg transition-colors border border-[#444]">
                  Get Started
                </button>
              </div>
            </div>
          </div>

          {/* Premium Card */}
          <div className="flex-1">
            <div className="relative rounded-2xl p-[1px] bg-gradient-to-b from-[#FF8F00] to-[#444]">
              <div className="h-full rounded-2xl bg-[#1A1A1A] p-8 relative overflow-hidden">
                
                {/* Golden glow inside the card */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 h-24 w-[80%] rounded-full bg-[#FF8F00]/20 blur-2xl" />
                
                <div className="relative text-center mb-8">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Sparkles className="w-5 h-5 text-[#FF8F00]" />
                    <h3 className="text-2xl font-bold text-white">Premium</h3>
                  </div>
                  <div className="text-4xl font-bold bg-gradient-to-r from-[#FF8F00] to-[#FFD54F] bg-clip-text text-transparent mb-1">
                    ₹2000<span className="text-xl">/year</span>
                  </div>
                  <p className="text-[#888] text-sm">Unlock your full potential</p>
                </div>

                <div className="relative space-y-4 mb-8">
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#FF8F00] mt-0.5 flex-shrink-0" />
                    <span className="text-[#E0E0E0] text-sm leading-relaxed">
                      Access to complete archive of past papers
                    </span>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#FF8F00] mt-0.5 flex-shrink-0" />
                    <span className="text-[#E0E0E0] text-sm leading-relaxed">
                      3 AI-generated practice tests per day (100 credits)
                    </span>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Trophy className="w-5 h-5 text-[#FF8F00] mt-0.5 flex-shrink-0" />
                    <span className="text-[#E0E0E0] text-sm leading-relaxed">
                      Weekly and monthly full-length tests
                    </span>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <BarChart3 className="w-5 h-5 text-[#FF8F00] mt-0.5 flex-shrink-0" />
                    <span className="text-[#E0E0E0] text-sm leading-relaxed">
                      In-depth performance analytics and personalized guidance
                    </span>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Target className="w-5 h-5 text-[#FF8F00] mt-0.5 flex-shrink-0" />
                    <span className="text-[#E0E0E0] text-sm leading-relaxed">
                      Predictive scoring and leaderboards
                    </span>
                  </div>
                </div>

                <div className="relative">
                  <button className="w-full py-3 px-6 bg-gradient-to-r from-[#FF8F00] to-[#FFA000] hover:from-[#FFA000] hover:to-[#FFB300] text-white font-medium rounded-lg transition-all transform hover:scale-[1.02]">
                    Upgrade to Premium
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
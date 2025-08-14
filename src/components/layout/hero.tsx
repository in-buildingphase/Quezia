"use client"
import { useEffect } from "react"
import { Paperclip, Sparkles } from "lucide-react"

import { GoldenText } from "../ui/goldentext";
import { AnimatedGradientBadge } from "../ui/animatedgradienttext";

export default function Hero(){
  useEffect(() => {
  const textarea = document.getElementById("chatInput")
  if (!textarea) return

  const autoResize = () => {
    textarea.style.height = "auto"
    const newHeight = Math.min(textarea.scrollHeight, 160)
    textarea.style.height = newHeight + "px"
  }

  textarea.addEventListener("input", autoResize)
  return () => textarea.removeEventListener("input", autoResize)
}, [])

  return (
    <section>
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-8 py-20">
          {/* Heading + Badge */}
          <div className="space-y-8 text-center">
            <AnimatedGradientBadge speed={1.5}>
            <span className="mr-2">New</span>
            <span>Top your exams now!</span>
          </AnimatedGradientBadge>

            <div className="mx-auto max-w-screen-md text-center font-bold text-4xl md:text-6xl">
              <h1>
                Get Exam Ready with 
                <GoldenText className="relative z-10">Quezia</GoldenText>
              </h1>
            </div>

            {/* CTA Buttons */}
          </div>

          {/* Unified Chat Interface */}
          <div className="group relative w-full max-w-4xl mt-10 z-20">
            {/* Warm orange glow */}
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 h-32 w-[90%] rounded-full bg-[#FF8F00]/40 blur-3xl lg:h-30" />
            
            {/* Single unified chat container */}
            <div className="relative rounded-2xl p-[1px] bg-gradient-to-r from-[#FF8F00]/0 to-[#FFD54F]/0 focus-within:from-[#FF8F00] focus-within:to-[#FFD54F] transition-all duration-300 z-21">
              <div className="flex flex-col h-full rounded-2xl bg-[#1A1A1A] border border-[#333] focus-within:border-transparent relative z-22">
                
                
                <div className="flex-shrink-0 p-6 pt-4 mt-auto">
                  <div className="flex items-end gap-3">
                    <textarea
                      id="chatInput"
                      placeholder="Type your message here..."
                      rows={1}
                      className="flex-1 bg-transparent text-[#E0E0E0] placeholder-[#888] outline-none py-3 resize-none overflow-y-auto min-h-[15rem] max-h-[30rem]"
                    ></textarea>
                  </div>

                  {/* Filter badges at bottom */}
                 
                    <div className="flex items-center justify-between w-full">
                      <div className="flex flex-wrap gap-2">
                        <button className="p-2 hover:bg-[#2A2A2A] rounded-lg transition">
                          <Paperclip className="w-4 h-4 text-[#888]" />
                        </button>
                        <button className="px-2 py-1 bg-[#2A2A2A] hover:bg-[#333] text-[#888] text-xs rounded-md border border-[#444] transition">
                          Mathematics
                        </button>
                        <button className="px-2 py-1 bg-[#2A2A2A] hover:bg-[#333] text-[#888] text-xs rounded-md border border-[#444] transition">
                          Physics
                        </button>
                        <button className="px-2 py-1 bg-[#2A2A2A] hover:bg-[#333] text-[#888] text-xs rounded-md border border-[#444] transition">
                          Chemistry
                        </button>
                        <button className="px-2 py-1 bg-[#2A2A2A] hover:bg-[#333] text-[#888] text-xs rounded-md border border-[#444] transition flex items-center gap-1">
                          <Sparkles className="w-3 h-3" />
                          <span>Surprise Test</span>
                        </button>
                      </div>

                      {/* Right side: send button */}
                      <button className="p-3 bg-[#FF8F00] hover:bg-[#FFA000] rounded-lg transition-colors flex-shrink-0">
                        <div className="bg-[#AE6E00FF] rounded-full p-2"></div>
                      </button>
                    </div>

                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

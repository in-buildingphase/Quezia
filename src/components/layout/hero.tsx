"use client"
import { useEffect } from "react"
import { ArrowRight, Send, Paperclip, Sparkles } from "lucide-react"
import Link from "next/link"

// Firebase-style placeholder Badge
const Badge = ({ children, className }) => (
  <span
    className={`inline-flex items-center rounded-md border border-[#FFB74D] bg-[#FF8F00]/10 px-2 py-0.5 text-xs font-medium text-[#FFCC80] ${className}`}
  >
    {children}
  </span>
)

// Firebase-style placeholder Button
const Button = ({ asChild, children, className }) => {
  const Comp = asChild ? Link : "button"
  return (
    <Comp
      href="#"
      className={`inline-flex items-center justify-center px-6 py-2 font-medium rounded-md ${className}`}
    >
      {children}
    </Comp>
  )
}

export const Hero = () => {
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
    <section className="w-full min-h-screen bg-[#121212] text-[#E0E0E0]">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-8 py-20">
          {/* Heading + Badge */}
          <div className="space-y-8 text-center">
            <Badge className="rounded-5xl py-2 text-sm">
              <span className="mr-2">
                <Badge>New</Badge>
              </span>
              <span>Top your exams now!</span>
            </Badge>

            <div className="mx-auto max-w-screen-md text-center font-bold text-4xl md:text-6xl">
              <h1>
                Get Exam Ready with 
                <span className="bg-gradient-to-r from-[#FF8F00] to-[#FFD54F] bg-clip-text px-2 text-transparent">
                  Quezia
                </span>
              </h1>
            </div>

            <p className="mx-auto max-w-screen-sm text-[#FFECB3] text-xl">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col items-center space-y-4 md:flex-row md:justify-center md:space-x-4 md:space-y-0">
              <Button
                asChild
                className="rounded-full border border-[#FFB74D] text-[#FFB74D] hover:bg-[#FFB74D]/10 transition"
              >
                <span className="inline-block w-5 h-5 me-2 bg-[#FFCC80] rounded" />
                Create Account
              </Button>
            </div>
          </div>

          {/* Unified Chat Interface */}
          <div className="group relative w-full max-w-4xl mt-10">
            {/* Warm orange glow */}
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 h-32 w-[90%] rounded-full bg-[#FF8F00]/40 blur-3xl lg:h-40" />
            
            {/* Single unified chat container */}
            <div className="relative rounded-2xl p-[1px] bg-gradient-to-r from-[#FF8F00]/0 to-[#FFD54F]/0 focus-within:from-[#FF8F00] focus-within:to-[#FFD54F] transition-all duration-300">
              <div className="flex flex-col h-full rounded-2xl bg-[#1A1A1A] border border-[#333] focus-within:border-transparent">
                
                {/* Input area - fixed at bottom, part of same container */}
                <div className="flex-shrink-0 p-6 pt-4 mt-auto">
                  <div className="flex items-end gap-3">
                    <textarea
                      id="chatInput"
                      placeholder="Type your message here..."
                      rows={1}
                      className="flex-1 bg-transparent text-[#E0E0E0] placeholder-[#888] outline-none py-3 resize-none overflow-y-auto min-h-[3rem] max-h-[10rem]"
                    ></textarea>
                    <button className="p-3 bg-[#FF8F00] hover:bg-[#FFA000] rounded-lg transition-colors flex-shrink-0">
                      <Send className="w-4 h-4 text-black" />
                    </button>
                  </div>

                  {/* Filter badges at bottom */}
                  <div className="flex flex-wrap gap-2 mt-auto">
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
                      <span>Suprise Test</span>
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

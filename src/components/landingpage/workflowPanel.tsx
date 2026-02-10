import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface WorkflowPanelProps {
  sectionRef: React.RefObject<HTMLDivElement | null>
}

const WorkflowPanel: React.FC<WorkflowPanelProps> = ({ sectionRef }) => {
    const panelRef = useRef<HTMLDivElement>(null)
    const datasetRef = useRef<HTMLDivElement>(null)
    const chatRef = useRef<HTMLDivElement>(null)
    const outputRef = useRef<HTMLDivElement>(null)
    const path1Ref = useRef<SVGPathElement>(null)
    const path2Ref = useRef<SVGPathElement>(null)

    useEffect(() => {
      const section = sectionRef.current
      const dataset = datasetRef.current
      const chat = chatRef.current
      const output = outputRef.current
      const path1 = path1Ref.current
      const path2 = path2Ref.current

      if (!section || !dataset || !chat || !output || !path1 || !path2) return

      const path1Length = path1.getTotalLength()
      const path2Length = path2.getTotalLength()

      gsap.set(dataset, { opacity: 0, scale: 0.9 })
      gsap.set([chat, output], { opacity: 0, scale: 0.92 })
      
      gsap.set(path1, { 
        strokeDasharray: path1Length, 
        strokeDashoffset: path1Length,
        opacity: 0.8 
      })
      gsap.set(path2, { 
        strokeDasharray: path2Length, 
        strokeDashoffset: path2Length,
        opacity: 0.8 
      })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=300%',
          scrub: 0.5,
        },
      })

      tl.fromTo(dataset, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 20, ease: 'none' })
      tl.fromTo(path1, { strokeDashoffset: path1Length }, { strokeDashoffset: 0, duration: 20, ease: 'none' })
      tl.fromTo(chat, { opacity: 0, scale: 0.92 }, { opacity: 1, scale: 1, duration: 20, ease: 'none' })
      tl.fromTo(path2, { strokeDashoffset: path2Length }, { strokeDashoffset: 0, duration: 20, ease: 'none' })
      tl.fromTo(output, { opacity: 0, scale: 0.92 }, { opacity: 1, scale: 1, duration: 20, ease: 'none' })

      return () => {
        tl.scrollTrigger?.kill()
      }
    }, [sectionRef])

    // Intelligence card dimensions: w-48 (192px), h-32 (128px)
    // Panel center: 350, 250
    // Intelligence center position: left = 350 - 96 = 254, top = 250 - 64 = 186
    const intelLeft = 254
    const intelTop = 186
    const intelWidth = 192
    const intelHeight = 128
    const intelCenterY = intelTop + intelHeight / 2  // 250
    const intelRight = intelLeft + intelWidth        // 446
    const intelBottom = intelTop + intelHeight       // 314

    return (
      <div
        ref={panelRef}
        className="relative w-[700px] h-[500px] rounded-3xl bg-[#EC2801] shadow-2xl overflow-visible"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }}
      >
        {/* Subtle gradient overlay for depth */}
        <div 
          className="absolute inset-0 rounded-3xl pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at 30% 20%, rgba(255,255,255,0.03) 0%, transparent 50%)'
          }}
        />

        {/* Corner decorative arcs */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 700 500">
          {/* Top-left corner arc */}
          <path 
            d="M 80 0 A 80 80 0 0 1 0 80" 
            stroke="rgba(255,255,255,0.12)" 
            strokeWidth="1.5" 
            fill="none"
            strokeDasharray="6 4"
          />
          {/* Top-right corner arc */}
          <path 
            d="M 620 0 A 80 80 0 0 0 700 80" 
            stroke="rgba(255,255,255,0.12)" 
            strokeWidth="1.5" 
            fill="none"
            strokeDasharray="6 4"
          />
          {/* Bottom-left corner arc */}
          <path 
            d="M 0 420 A 80 80 0 0 0 80 500" 
            stroke="rgba(255,255,255,0.12)" 
            strokeWidth="1.5" 
            fill="none"
            strokeDasharray="6 4"
          />
          {/* Bottom-right corner arc */}
          <path 
            d="M 700 420 A 80 80 0 0 1 620 500" 
            stroke="rgba(255,255,255,0.12)" 
            strokeWidth="1.5" 
            fill="none"
            strokeDasharray="6 4"
          />
        </svg>

        {/* Scattered dots pattern */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 700 500">
          {/* Corner dots */}
          <circle cx="40" cy="40" r="2" fill="rgba(255,255,255,0.15)" />
          <circle cx="660" cy="40" r="2" fill="rgba(255,255,255,0.15)" />
          <circle cx="40" cy="460" r="2" fill="rgba(255,255,255,0.15)" />
          <circle cx="660" cy="460" r="2" fill="rgba(255,255,255,0.15)" />
          
          {/* Scattered decorative dots */}
          <circle cx="120" cy="150" r="1.5" fill="rgba(255,255,255,0.1)" />
          <circle cx="580" cy="120" r="1.5" fill="rgba(255,255,255,0.1)" />
          <circle cx="200" cy="420" r="1.5" fill="rgba(255,255,255,0.1)" />
          <circle cx="500" cy="400" r="1.5" fill="rgba(255,255,255,0.1)" />
          <circle cx="350" cy="80" r="1" fill="rgba(255,255,255,0.08)" />
          <circle cx="350" cy="420" r="1" fill="rgba(255,255,255,0.08)" />
          <circle cx="80" cy="250" r="1" fill="rgba(255,255,255,0.06)" />
          <circle cx="620" cy="280" r="1" fill="rgba(255,255,255,0.06)" />
        </svg>

        {/* Connection Lines - Solid Progress Bar Style */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
          viewBox="0 0 700 500"
          fill="none"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Path 1: Dataset (bottom-right of card) → down → right → Intelligence (left-center) */}
          <path
            ref={path1Ref}
            d={`M 110 142 V ${intelCenterY} H ${intelLeft}`}
            stroke="rgba(255,255,255,0.9)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          
          {/* Path 2: Intelligence (right-center) → right → down → Output (top-center) */}
          <path
            ref={path2Ref}
            d={`M ${intelRight} ${intelCenterY} H 590 V 358`}
            stroke="rgba(255,255,255,0.9)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>

        {/* Decorative dashed connection arcs */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-25" viewBox="0 0 700 500">
          {/* Arc from top-left to center */}
          <path 
            d={`M 180 86 Q 280 86 ${intelLeft} ${intelTop - 20}`}
            stroke="rgba(255,255,255,0.4)" 
            strokeWidth="1" 
            fill="none"
            strokeDasharray="4 4"
          />
          {/* Arc from center to bottom-right */}
          <path 
            d={`M ${intelRight + 20} ${intelBottom} Q 480 320 550 358`}
            stroke="rgba(255,255,255,0.4)" 
            strokeWidth="1" 
            fill="none"
            strokeDasharray="4 4"
          />
          {/* Horizontal dashed line top */}
          <path 
            d="M 200 60 H 480" 
            stroke="rgba(255,255,255,0.2)" 
            strokeWidth="1" 
            fill="none"
            strokeDasharray="5 5"
          />
          {/* Horizontal dashed line bottom */}
          <path 
            d="M 150 440 H 450" 
            stroke="rgba(255,255,255,0.2)" 
            strokeWidth="1" 
            fill="none"
            strokeDasharray="5 5"
          />
        </svg>

        {/* Dataset Card - Top Left Corner */}
        <div
          ref={datasetRef}
          className="absolute w-40 h-28 rounded-xl bg-white/8 backdrop-blur-sm border border-white/15 p-4 flex flex-col justify-between z-10"
          style={{ left: '30px', top: '30px' }}
        >
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-white/60" />
            <span className="text-[10px] font-semibold text-white/80 uppercase tracking-widest">
              Dataset
            </span>
          </div>
          <div className="space-y-2">
            <div className="h-1.5 w-full bg-white/40 rounded-sm" />
            <div className="h-1.5 w-4/5 bg-white/30 rounded-sm" />
            <div className="h-1.5 w-3/5 bg-white/20 rounded-sm" />
          </div>
        </div>

        {/* Placeholder Card 1 - Top Right */}
        <div
          className="absolute w-36 h-24 rounded-lg border border-white/20 bg-white/5 backdrop-blur-sm p-3 flex flex-col justify-between opacity-50"
          style={{ left: '480px', top: '30px' }}
        >
          <div className="flex items-center justify-between">
            <div className="w-6 h-6 rounded border border-white/30 bg-white/8 flex items-center justify-center">
              <div className="w-3 h-3 rounded-sm bg-white/40" />
            </div>
            <div className="text-[8px] text-white/50 font-mono">VECTOR</div>
          </div>
          <div className="space-y-1.5 mt-2">
            <div className="h-1 w-full bg-white/25 rounded-sm" />
            <div className="h-1 w-2/3 bg-white/15 rounded-sm" />
          </div>
        </div>

        {/* Intelligence Card - TRUE CENTER */}
        <div
          ref={chatRef}
          className="absolute w-48 h-32 rounded-2xl bg-white/12 backdrop-blur-sm border border-white/25 p-5 flex flex-col justify-between shadow-lg z-20"
          style={{ left: `${intelLeft}px`, top: `${intelTop}px` }}
        >
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-white/90" />
            <span className="text-[10px] font-semibold text-white uppercase tracking-widest">
              Intelligence
            </span>
          </div>
          <div className="space-y-2.5">
            <div className="h-2 w-full bg-white/50 rounded-sm" />
            <div className="h-2 w-5/6 bg-white/40 rounded-sm" />
            <div className="flex gap-2 pt-1">
              <div className="h-5 w-10 bg-white/25 rounded" />
              <div className="h-5 w-10 bg-white/15 rounded" />
            </div>
          </div>
        </div>

        {/* Placeholder Card 2 - Bottom Left */}
        <div
          className="absolute w-36 h-24 rounded-lg border border-white/20 bg-white/5 backdrop-blur-sm p-3 flex flex-col justify-between opacity-50"
          style={{ left: '30px', top: '340px' }}
        >
          <div className="flex items-center justify-between">
            <div className="w-6 h-6 rounded-full border border-white/30 bg-white/8 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-white/40" />
            </div>
            <div className="text-[8px] text-white/50 font-mono">CACHE</div>
          </div>
          <div className="space-y-1.5 mt-2">
            <div className="flex gap-1">
              <div className="h-1 w-1/3 bg-white/25 rounded-sm" />
              <div className="h-1 w-1/3 bg-white/15 rounded-sm" />
              <div className="h-1 w-1/3 bg-white/10 rounded-sm" />
            </div>
            <div className="h-1 w-3/4 bg-white/20 rounded-sm" />
          </div>
        </div>

        {/* Placeholder Card 3 - Middle Right */}
        <div
          className="absolute w-28 h-20 rounded-lg border border-white/15 bg-white/4 backdrop-blur-sm p-2.5 flex flex-col justify-between opacity-40"
          style={{ left: '580px', top: '200px' }}
        >
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-4 rounded border border-white/25 bg-white/8" />
            <div className="text-[7px] text-white/40 font-mono">API</div>
          </div>
          <div className="space-y-1">
            <div className="h-0.5 w-full bg-white/20 rounded-sm" />
            <div className="h-0.5 w-1/2 bg-white/12 rounded-sm" />
          </div>
        </div>

        {/* Placeholder Card 4 - Bottom Middle */}
        <div
          className="absolute w-32 h-22 rounded-lg border border-white/15 bg-white/4 backdrop-blur-sm p-3 flex flex-col justify-between opacity-35"
          style={{ left: '280px', top: '380px' }}
        >
          <div className="flex items-center gap-1.5">
            <div className="w-1 h-1 rounded-full bg-white/30" />
            <div className="text-[7px] text-white/35 font-mono">QUEUE</div>
          </div>
          <div className="flex gap-1">
            <div className="h-4 w-4 rounded-sm bg-white/10" />
            <div className="h-4 w-4 rounded-sm bg-white/8" />
            <div className="h-4 w-4 rounded-sm bg-white/6" />
          </div>
        </div>

        {/* Output Card - Bottom Right Corner */}
        <div
          ref={outputRef}
          className="absolute w-40 h-28 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 p-4 flex flex-col justify-between z-10"
          style={{ left: '510px', top: '358px' }}
        >
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-white/80" />
            <span className="text-[10px] font-semibold text-white/90 uppercase tracking-widest">
              Output
            </span>
          </div>
          <div className="space-y-2">
            <div className="h-1.5 w-full bg-white/50 rounded-sm" />
            <div className="h-1.5 w-4/5 bg-white/35 rounded-sm" />
            <div className="h-1.5 w-2/3 bg-white/25 rounded-sm" />
          </div>
        </div>

        {/* Additional floating decorative elements */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 700 500">
          {/* Small corner brackets */}
          <path d="M 25 100 L 25 85 L 40 85" stroke="rgba(255,255,255,0.1)" strokeWidth="1" fill="none" />
          <path d="M 675 100 L 675 85 L 660 85" stroke="rgba(255,255,255,0.1)" strokeWidth="1" fill="none" />
          <path d="M 25 400 L 25 415 L 40 415" stroke="rgba(255,255,255,0.1)" strokeWidth="1" fill="none" />
          <path d="M 675 400 L 675 415 L 660 415" stroke="rgba(255,255,255,0.1)" strokeWidth="1" fill="none" />
          
          {/* Tiny cross marks */}
          <path d="M 180 80 L 185 80 M 182.5 77.5 L 182.5 82.5" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
          <path d="M 520 420 L 525 420 M 522.5 417.5 L 522.5 422.5" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
        </svg>
      </div>
    )
  }

export default WorkflowPanel
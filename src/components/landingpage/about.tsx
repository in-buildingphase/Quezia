import React, { useEffect, useRef } from 'react'
import { Info } from '@phosphor-icons/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import WorkflowPanel from '../landingpage/workflowPanel'

gsap.registerPlugin(ScrollTrigger)

const About: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const textContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const textContainer = textContainerRef.current

    if (!section || !textContainer) return

    // Set initial state further left for more dramatic entrance
    gsap.set(textContainer, { 
      x: -180, 
      opacity: 0,
    })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: '+=200%',
        scrub: 1, // Increased from 0.5 for smoother scroll linking
        invalidateOnRefresh: true, // Recalculates on resize for smoothness
      },
    })

    // Single, long, smooth entrance 
    // Ends at same time as Dataset→Chat connection (40% through scroll)
    tl.to(textContainer, {
      x: 0,
      opacity: 1,
      duration: 40, // Takes 40% of scroll to fully arrive (slower = smoother)
      ease: 'none'
    }, 0)

    return () => {
      tl.scrollTrigger?.kill()
    }
  }, [])

  return (
    <section ref={sectionRef} className="relative bg-gray-50/50">
      <div className="h-screen flex flex-col sticky top-0 overflow-hidden">
        {/* Pill Header */}
        <div className="absolute top-20 left-0 right-0 flex justify-center z-20 pointer-events-none">
          <div className="flex items-center gap-2 bg-gray-100 rounded-full px-5 py-2">
            <Info size={18} weight="bold" color="#EC2801" />
            <span className="text-sm font-medium text-gray-800">About</span>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-1 items-center px-12 lg:px-24 gap-12 lg:gap-20">
          {/* Left Text - GPU accelerated transform */}
          <div 
            ref={textContainerRef} 
            className="flex-1 max-w-xl z-10"
            style={{ willChange: 'transform, opacity' }}
          >
            <h2 className="text-4xl lg:text-5xl font-semibold text-gray-900 mb-6 leading-tight">
              Designed for
              <br />
              serious preparation
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
             Quezia is a structured exam preparation system built for aspirants who care about depth, clarity, and measurable progress. It is designed around how competitive exams are actually constructed — not shortcuts, distractions, or surface-level practice. Every component is intentional, guiding learners from foundational concepts to applied mastery through focused practice, real exam patterns, and continuous feedback. The goal is simple: reduce noise, eliminate guesswork, and create a preparation flow where effort compounds into understanding, confidence, and performance.
            </p>
          </div>

          {/* Right Diagram */}
          <div className="flex-1 flex items-center justify-center h-full py-20">
            <WorkflowPanel sectionRef={sectionRef} />
          </div>
        </div>
      </div>
      
      <div className="h-[300vh]" />
    </section>
  )
}

export default About
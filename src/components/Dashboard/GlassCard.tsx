import React from 'react'

interface GlassCardProps {
  title: string
  subtitle: string
  children: React.ReactNode
}

const GlassCard: React.FC<GlassCardProps> = ({ title, subtitle, children }) => {
  return (
    <div className="relative z-10 px-8 py-10 overflow-x-hidden w-full">
      <div
        className="relative mx-auto max-w-6xl rounded-[28px] border border-white/10 backdrop-blur-xl px-10 py-12"
        style={{
          backgroundImage: "url('/images/SpectralDark.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* dark overlay */}
        <div className="absolute inset-0 rounded-[28px] bg-black/60" />

        {/* content */}
        <div className="relative z-10">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-3xl font-semibold text-white">{title}</h1>
            <p className="mt-2 text-neutral-400">{subtitle}</p>
          </div>

          {/* Chat container */}
          <div className="rounded-2xl border border-white/10 bg-black/30 backdrop-blur-md px-6 py-5">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default GlassCard

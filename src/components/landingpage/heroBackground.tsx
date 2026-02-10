import React from 'react';

const HeroBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden bg-[#EC2801] -z-10">
      {/* Base Grid */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px'
        }}
      />
      
      {/* Dense Micro Grid */}
      <div 
        className="absolute inset-0 w-full h-full pointer-events-none opacity-50"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.02) 1px, transparent 1px)
          `,
          backgroundSize: '16px 16px'
        }}
      />

      {/* MAIN ARCHITECTURE LAYER */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
        
        {/* Primary Data Highway (Thick Horizontal Spine) */}
        <line x1="5" y1="32" x2="35" y2="32" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" strokeLinecap="round"/>
        <line x1="35" y1="32" x2="65" y2="32" stroke="rgba(255,255,255,0.35)" strokeWidth="0.6" strokeLinecap="round"/>
        <line x1="65" y1="32" x2="95" y2="32" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" strokeLinecap="round" strokeDasharray="1 1"/>
        
        {/* Secondary Vertical Buses */}
        <line x1="15" y1="32" x2="15" y2="15" stroke="rgba(255,255,255,0.25)" strokeWidth="0.4"/>
        <line x1="35" y1="32" x2="35" y2="50" stroke="rgba(255,255,255,0.4)" strokeWidth="0.5"/>
        <line x1="55" y1="32" x2="55" y2="18" stroke="rgba(255,255,255,0.3)" strokeWidth="0.35"/>
        <line x1="75" y1="32" x2="75" y2="50" stroke="rgba(255,255,255,0.25)" strokeWidth="0.4"/>
        
        {/* Tertiary Buses (Lower Architecture) */}
        <line x1="20" y1="65" x2="50" y2="65" stroke="rgba(255,255,255,0.15)" strokeWidth="0.3" strokeDasharray="2 1"/>
        <line x1="50" y1="65" x2="80" y2="65" stroke="rgba(255,255,255,0.15)" strokeWidth="0.3"/>
        <line x1="35" y1="50" x2="35" y2="65" stroke="rgba(255,255,255,0.2)" strokeWidth="0.3"/>
        <line x1="75" y1="50" x2="75" y2="65" stroke="rgba(255,255,255,0.2)" strokeWidth="0.3"/>
        <line x1="50" y1="65" x2="50" y2="82" stroke="rgba(255,255,255,0.25)" strokeWidth="0.4"/>
        
        {/* Connection elbows (90 degree turns) */}
        <path d="M 15 15 L 15 12 L 18 12" stroke="rgba(255,255,255,0.15)" strokeWidth="0.2" fill="none"/>
        <path d="M 55 18 L 55 15 L 58 15" stroke="rgba(255,255,255,0.15)" strokeWidth="0.2" fill="none"/>
        <path d="M 20 65 L 20 68 L 23 68" stroke="rgba(255,255,255,0.1)" strokeWidth="0.2" fill="none"/>
        
        {/* Dotted Arcs - Filling corner spaces */}
        <path d="M 0 25 A 25 25 0 0 1 25 0" stroke="rgba(255,255,255,0.12)" strokeWidth="0.3" fill="none" strokeDasharray="3 3"/>
        <path d="M 100 25 A 25 25 0 0 0 75 0" stroke="rgba(255,255,255,0.1)" strokeWidth="0.3" fill="none" strokeDasharray="3 3"/>
        <path d="M 0 75 A 25 25 0 0 0 25 100" stroke="rgba(255,255,255,0.1)" strokeWidth="0.3" fill="none" strokeDasharray="3 3"/>
        <path d="M 100 75 A 25 25 0 0 1 75 100" stroke="rgba(255,255,255,0.08)" strokeWidth="0.3" fill="none" strokeDasharray="3 3"/>
        
        <path d="M 5 50 A 20 20 0 0 1 25 30" stroke="rgba(255,255,255,0.08)" strokeWidth="0.25" fill="none" strokeDasharray="2 2"/>
        <path d="M 95 50 A 20 20 0 0 0 75 30" stroke="rgba(255,255,255,0.08)" strokeWidth="0.25" fill="none" strokeDasharray="2 2"/>
        
        {/* Large orbital arcs behind central nodes */}
        <ellipse cx="50" cy="40" rx="35" ry="25" stroke="rgba(255,255,255,0.06)" strokeWidth="0.2" fill="none" strokeDasharray="5 5"/>
        <ellipse cx="50" cy="40" rx="45" ry="30" stroke="rgba(255,255,255,0.04)" strokeWidth="0.15" fill="none" strokeDasharray="8 4"/>
        
        {/* Junction Nodes (Where lines meet) */}
        <circle cx="15" cy="32" r="0.6" fill="rgba(255,255,255,0.5)"/>
        <circle cx="35" cy="32" r="0.8" fill="rgba(255,255,255,0.8)"/>
        <circle cx="55" cy="32" r="0.6" fill="rgba(255,255,255,0.5)"/>
        <circle cx="75" cy="32" r="0.6" fill="rgba(255,255,255,0.5)"/>
        <circle cx="35" cy="50" r="0.5" fill="rgba(255,255,255,0.6)"/>
        <circle cx="75" cy="50" r="0.5" fill="rgba(255,255,255,0.6)"/>
        <circle cx="50" cy="65" r="0.5" fill="rgba(255,255,255,0.4)"/>
        
        {/* Data Packets (Static dots along lines showing data flow) */}
        <circle cx="25" cy="32" r="0.4" fill="rgba(255,255,255,0.6)"/>
        <circle cx="45" cy="32" r="0.4" fill="rgba(255,255,255,0.8)"/>
        <circle cx="85" cy="32" r="0.3" fill="rgba(255,255,255,0.4)"/>
        <circle cx="35" cy="41" r="0.3" fill="rgba(255,255,255,0.5)"/>
        <circle cx="55" cy="25" r="0.3" fill="rgba(255,255,255,0.4)"/>
        
        {/* Blueprint Coordinate Markers */}
        <text x="2" y="8" fill="rgba(255,255,255,0.15)" fontSize="3" fontFamily="monospace">A1</text>
        <text x="96" y="8" fill="rgba(255,255,255,0.12)" fontSize="3" fontFamily="monospace">B1</text>
        <text x="2" y="95" fill="rgba(255,255,255,0.12)" fontSize="3" fontFamily="monospace">A4</text>
        <text x="96" y="95" fill="rgba(255,255,255,0.1)" fontSize="3" fontFamily="monospace">B4</text>
        
        {/* Dimension Lines */}
        <line x1="10" y1="5" x2="30" y2="5" stroke="rgba(255,255,255,0.1)" strokeWidth="0.1"/>
        <line x1="10" y1="4.5" x2="10" y2="5.5" stroke="rgba(255,255,255,0.1)" strokeWidth="0.1"/>
        <line x1="30" y1="4.5" x2="30" y2="5.5" stroke="rgba(255,255,255,0.1)" strokeWidth="0.1"/>
      </svg>

      {/* === CORE SYSTEM NODES === */}

      {/* 1. QUESTION VAULT (Primary Input) */}
      <div className="absolute left-[11%] top-[12%] w-36 h-24 rounded-xl bg-white/[0.09] backdrop-blur-sm border border-white/20 p-4 flex flex-col justify-between shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-white/60 animate-pulse"/>
            <span className="text-[9px] font-semibold text-white/90 uppercase tracking-widest">Question Vault</span>
          </div>
          <span className="text-[7px] font-mono text-white/40">TB-01</span>
        </div>
        <div className="space-y-2">
          <div className="h-1.5 w-full bg-white/30 rounded-sm"/>
          <div className="flex gap-1">
            <div className="h-1.5 flex-1 bg-white/20 rounded-xs"/>
            <div className="h-1.5 flex-1 bg-white/15 rounded-xs"/>
          </div>
          <div className="flex gap-0.5">
            <div className="w-1.5 h-1.5 rounded-sm bg-white/20"/>
            <div className="w-1.5 h-1.5 rounded-sm bg-white/20"/>
            <div className="w-1.5 h-1.5 rounded-sm bg-white/20"/>
          </div>
        </div>
      </div>

      {/* 2. METADATA LAYER (Left Middle) */}
      <div className="absolute left-[3%] top-[32%] w-24 h-16 rounded-lg bg-white/[0.06] backdrop-blur-sm border border-white/12 p-2.5 opacity-70">
        <div className="flex items-center gap-1.5 mb-2">
          <div className="w-1 h-1 rounded-full bg-white/40"/>
          <span className="text-[7px] font-medium text-white/60 uppercase tracking-wider">Metadata</span>
        </div>
        <div className="space-y-1">
          <div className="flex justify-between text-[6px] text-white/30 font-mono">
            <span>TOPIC</span>
            <span>DIFF</span>
          </div>
          <div className="h-2 w-full bg-white/15 rounded-sm"/>
          <div className="h-1.5 w-3/4 bg-white/10 rounded-sm"/>
        </div>
      </div>

      {/* 3. GENERATION CORE (Central Hub - Reduced Opacity) */}
      <div className="absolute left-[28%] top-[40%] w-48 h-32 rounded-2xl bg-white/[0.06] backdrop-blur-sm border border-white/15 p-5 flex flex-col justify-between shadow-lg z-20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-white/70 shadow-[0_0_8px_rgba(255,255,255,0.3)] animate-pulse"/>
            <span className="text-[10px] font-bold text-white/80 uppercase tracking-widest">Generation Core</span>
          </div>
          <div className="flex gap-0.5">
            <div className="w-1 h-1 rounded-full bg-green-400/50"/>
            <div className="w-1 h-1 rounded-full bg-white/20"/>
            <div className="w-1 h-1 rounded-full bg-white/20"/>
          </div>
        </div>
        
        <div className="grid grid-cols-5 gap-1 items-end h-12 pb-1">
          <div className="h-3 bg-white/15 rounded-sm"/>
          <div className="h-8 bg-white/40 rounded-sm"/>
          <div className="h-6 bg-white/30 rounded-sm"/>
          <div className="h-9 bg-white/35 rounded-sm"/>
          <div className="h-5 bg-white/20 rounded-sm"/>
        </div>
        
        <div className="space-y-2">
          <div className="flex gap-2">
            <div className="h-1.5 w-16 bg-white/20 rounded-full"/>
            <div className="h-1.5 w-12 bg-white/10 rounded-full"/>
          </div>
        </div>
      </div>

      {/* 4. DIFFICULTY ENGINE (Between Vault and Core) */}
      <div className="absolute left-[22%] top-[28%] w-16 h-16 rounded-full bg-white/[0.05] backdrop-blur-sm border border-white/15 flex flex-col items-center justify-center opacity-80">
        <span className="text-[6px] text-white/50 uppercase mb-1">Difficulty</span>
        <div className="flex flex-col gap-0.5">
          <div className="w-6 h-1 bg-white/30 rounded-full"/>
          <div className="w-6 h-1 bg-white/20 rounded-full"/>
          <div className="w-6 h-1 bg-white/10 rounded-full"/>
        </div>
      </div>

      {/* 5. INTELLIGENCE MODULE (Upper Center - Reduced Opacity) */}
      <div className="absolute left-[52%] top-[10%] w-32 h-22 rounded-xl bg-white/[0.05] backdrop-blur-sm border border-white/12 p-4 flex flex-col justify-between shadow-md">
        <div className="flex items-center justify-between">
          <span className="text-[9px] font-semibold text-white/70 uppercase tracking-widest">Intelligence</span>
          <div className="w-4 h-4 rounded-full border border-white/20 flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-white/40"/>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-white/15 border-t-white/40 rotate-45"/>
          <div className="flex-1 space-y-1">
            <div className="h-1 w-full bg-white/20 rounded-full"/>
            <div className="h-1 w-2/3 bg-white/10 rounded-full"/>
          </div>
        </div>
      </div>

      {/* 6. BIAS CHECK (Small node near Intelligence) */}
      <div className="absolute left-[63%] top-[20%] w-20 h-12 rounded-lg bg-white/[0.05] backdrop-blur-sm border border-white/10 p-2 opacity-60">
        <span className="text-[6px] text-white/40 uppercase">Bias Check</span>
        <div className="mt-1 flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-white/20"/>
          <div className="h-1 w-8 bg-white/20 rounded-full"/>
        </div>
      </div>

      {/* 7. VECTOR DB (Top Right - Light) */}
      <div className="absolute right-[6%] top-[15%] w-28 h-18 rounded-lg bg-white/[0.05] backdrop-blur-sm border border-white/10 p-3 opacity-50">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[8px] font-medium text-white/60 uppercase">Vector DB</span>
          <div className="flex flex-col gap-0.5">
            <div className="w-0.5 h-0.5 bg-white/30 rounded-full"/>
            <div className="w-0.5 h-0.5 bg-white/30 rounded-full"/>
            <div className="w-0.5 h-0.5 bg-white/30 rounded-full"/>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-1">
          <div className="h-3 bg-white/20 rounded-sm"/>
          <div className="h-3 bg-white/15 rounded-sm"/>
          <div className="h-3 bg-white/20 rounded-sm"/>
          <div className="h-3 bg-white/10 rounded-sm"/>
        </div>
      </div>

      {/* 8. MODEL STACK (Right Upper) */}
      <div className="absolute left-[72%] top-[18%] w-24 h-16 rounded-lg bg-white/[0.05] backdrop-blur-sm border border-white/10 p-2.5">
        <span className="text-[7px] text-white/50 uppercase block mb-2">Models</span>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-white/30"/>
            <div className="h-1 flex-1 bg-white/20 rounded-full"/>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-white/20"/>
            <div className="h-1 flex-1 bg-white/15 rounded-full"/>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-white/15"/>
            <div className="h-1 flex-1 bg-white/10 rounded-full"/>
          </div>
        </div>
      </div>

      {/* 9. ANALYTICS ENGINE (Right Middle - Reduced Opacity) */}
      <div className="absolute right-[19%] top-[48%] w-44 h-30 rounded-2xl bg-white/[0.06] backdrop-blur-sm border border-white/12 p-5 flex flex-col justify-between shadow-lg">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold text-white/70 uppercase tracking-widest">Analytics</span>
          <div className="flex items-center gap-1">
            <span className="text-[7px] font-mono text-white/30">v2.4</span>
            <div className="w-1.5 h-1.5 rounded-full bg-green-400/50"/>
          </div>
        </div>
        
        <div className="space-y-3">
          <svg className="w-full h-10" viewBox="0 0 100 25">
            <defs>
              <linearGradient id="chartLine" x1="0" y1="0" x2="100%" y2="0">
                <stop offset="0%" stopColor="rgba(255,255,255,0.15)"/>
                <stop offset="50%" stopColor="rgba(255,255,255,0.5)"/>
                <stop offset="100%" stopColor="rgba(255,255,255,0.3)"/>
              </linearGradient>
            </defs>
            <path d="M 0 20 Q 20 20 30 12 T 60 15 T 100 5" stroke="url(#chartLine)" strokeWidth="2" fill="none" strokeLinecap="round"/>
            <circle cx="30" cy="12" r="2" fill="rgba(255,255,255,0.7)"/>
            <circle cx="60" cy="15" r="1.5" fill="rgba(255,255,255,0.5)"/>
            <circle cx="100" cy="5" r="1.5" fill="rgba(255,255,255,0.4)"/>
          </svg>
          
          <div className="grid grid-cols-3 gap-2">
            <div className="text-center">
              <div className="text-[8px] font-mono text-white/60">99.2%</div>
              <div className="text-[5px] text-white/25 uppercase">Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-[8px] font-mono text-white/60">2ms</div>
              <div className="text-[5px] text-white/25 uppercase">Latency</div>
            </div>
            <div className="text-center">
              <div className="text-[8px] font-mono text-white/60">Top 1%</div>
              <div className="text-[5px] text-white/25 uppercase">Rank</div>
            </div>
          </div>
        </div>
      </div>

      {/* 10. RANK ENGINE (Right Lower) */}
      <div className="absolute right-[4%] top-[68%] w-28 h-20 rounded-xl bg-white/[0.06] backdrop-blur-sm border border-white/12 p-3 opacity-60">
        <span className="text-[8px] font-medium text-white/60 uppercase">Rank Engine</span>
        <div className="mt-2 flex items-end justify-around h-8">
          <div className="w-2 h-3 bg-white/20 rounded-t-sm"/>
          <div className="w-2 h-6 bg-white/40 rounded-t-sm"/>
          <div className="w-2 h-4 bg-white/30 rounded-t-sm"/>
          <div className="w-2 h-7 bg-white/50 rounded-t-sm relative">
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full"/>
          </div>
        </div>
      </div>

      {/* 11. SIMULATOR (Bottom Center) */}
      <div className="absolute left-[46%] top-[78%] w-40 h-26 rounded-xl bg-white/[0.08] backdrop-blur-sm border border-white/15 p-4 flex flex-col justify-between shadow-lg">
        <div className="flex items-center justify-between">
          <span className="text-[9px] font-semibold text-white/90 uppercase tracking-widest">Exam Simulator</span>
          <div className="w-6 h-3 rounded-full border border-white/30 flex items-center px-0.5">
            <div className="w-2 h-2 rounded-full bg-white/60"/>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative w-12 h-12">
            <div className="absolute inset-0 rounded-full border-2 border-white/20"/>
            <div className="absolute inset-2 rounded-full border border-white/30"/>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-[10px] font-mono text-white/70">180</span>
            </div>
            <div className="absolute top-0 left-1/2 w-0.5 h-2 bg-white/60 transform -translate-x-1/2"/>
          </div>
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded border border-white/20 flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-white/40 rounded-sm"/>
              </div>
              <div className="h-1 flex-1 bg-white/20 rounded-full"/>
            </div>
            <div className="h-1 w-full bg-white/25 rounded-full"/>
            <div className="h-1 w-4/5 bg-white/15 rounded-full"/>
          </div>
        </div>
      </div>

      {/* 12. PREDICTOR (Left Bottom) */}
      <div className="absolute left-[8%] top-[70%] w-24 h-16 rounded-lg bg-white/[0.05] backdrop-blur-sm border border-white/10 p-3 opacity-50">
        <span className="text-[8px] font-medium text-white/50 uppercase">Predictor</span>
        <div className="mt-2 flex items-center justify-between">
          <div className="text-center">
            <div className="text-[14px] font-mono text-white/60">94</div>
            <div className="text-[5px] text-white/30">SCORE</div>
          </div>
          <div className="w-px h-8 bg-white/20"/>
          <div className="w-8 h-8 rounded-full border-2 border-white/10 border-t-white/30 transform rotate-45"/>
        </div>
      </div>

      {/* 13. CACHE LAYER (Left Middle-Lower) */}
      <div className="absolute left-[15%] top-[55%] w-20 h-14 rounded-lg bg-white/[0.06] backdrop-blur-sm border border-white/10 p-2.5">
        <div className="flex items-center gap-1.5 mb-2">
          <div className="w-1 h-1 rounded-full bg-white/40"/>
          <span className="text-[7px] text-white/50 uppercase">Cache L2</span>
        </div>
        <div className="grid grid-cols-3 gap-1">
          <div className="h-2 bg-white/30 rounded-sm"/>
          <div className="h-2 bg-white/20 rounded-sm"/>
          <div className="h-2 bg-white/30 rounded-sm"/>
        </div>
      </div>

      {/* 14. QUEUE SYSTEM (Bottom Right) */}
      <div className="absolute right-[15%] top-[82%] w-28 h-16 rounded-lg bg-white/[0.05] backdrop-blur-sm border border-white/10 p-3 opacity-50">
        <span className="text-[8px] font-medium text-white/50 uppercase">Queue</span>
        <div className="mt-2 flex gap-1">
          <div className="h-6 w-4 bg-white/20 rounded-sm"/>
          <div className="h-6 w-4 bg-white/15 rounded-sm"/>
          <div className="h-6 w-4 bg-white/10 rounded-sm"/>
          <div className="flex-1 flex items-center justify-center">
            <div className="text-[8px] text-white/30">→</div>
          </div>
        </div>
      </div>

      {/* 15. TOPIC CLASSIFIER (Top Left Secondary) */}
      <div className="absolute left-[5%] top-[5%] w-20 h-12 rounded-md bg-white/[0.04] backdrop-blur-sm border border-white/8 p-2 opacity-40">
        <span className="text-[6px] text-white/40 uppercase tracking-wider block mb-1">Topics</span>
        <div className="flex flex-wrap gap-1">
          <span className="text-[5px] text-white/30 bg-white/10 px-1 py-0.5 rounded">MATH</span>
          <span className="text-[5px] text-white/30 bg-white/10 px-1 py-0.5 rounded">PHY</span>
        </div>
      </div>

      {/* 16. VALIDATION GATE (Far Right) */}
      <div className="absolute left-[88%] top-[35%] w-16 h-20 rounded-lg bg-white/[0.04] backdrop-blur-sm border border-white/8 p-2 opacity-40">
        <span className="text-[6px] text-white/40 uppercase block mb-2">Validate</span>
        <div className="flex flex-col gap-1 items-center">
          <div className="w-4 h-4 rounded-full border border-white/20 flex items-center justify-center">
            <div className="w-2 h-2 bg-white/30 transform rotate-45"/>
          </div>
          <div className="text-[8px] font-mono text-white/30">OK</div>
        </div>
      </div>

      {/* Connection Brackets (Decorative Architectural Elements) */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
        {/* Left side bracket */}
        <path d="M 8 40 L 8 60 L 10 60" stroke="rgba(255,255,255,0.1)" strokeWidth="0.2" fill="none"/>
        <path d="M 8 40 L 10 40" stroke="rgba(255,255,255,0.1)" strokeWidth="0.2" fill="none"/>
        
        {/* Right side bracket */}
        <path d="M 92 40 L 92 60 L 90 60" stroke="rgba(255,255,255,0.1)" strokeWidth="0.2" fill="none"/>
        <path d="M 92 40 L 90 40" stroke="rgba(255,255,255,0.1)" strokeWidth="0.2" fill="none"/>
        
        {/* Top bracket */}
        <path d="M 40 8 L 60 8 L 60 10" stroke="rgba(255,255,255,0.1)" strokeWidth="0.2" fill="none"/>
        <path d="M 40 8 L 40 10" stroke="rgba(255,255,255,0.1)" strokeWidth="0.2" fill="none"/>
        
        {/* Cross markers at grid intersections */}
        <path d="M 30 18 L 30 20 M 29 19 L 31 19" stroke="rgba(255,255,255,0.2)" strokeWidth="0.2"/>
        <path d="M 70 18 L 70 20 M 69 19 L 71 19" stroke="rgba(255,255,255,0.15)" strokeWidth="0.2"/>
        <path d="M 20 70 L 20 72 M 19 71 L 21 71" stroke="rgba(255,255,255,0.15)" strokeWidth="0.2"/>
        <path d="M 80 70 L 80 72 M 79 71 L 81 71" stroke="rgba(255,255,255,0.15)" strokeWidth="0.2"/>
      </svg>

      <div className="absolute left-[25%] top-[8%] px-2 py-1 rounded-full border border-white/10 bg-white/[0.03] opacity-40">
        <span className="text-[6px] font-mono text-white/50">Latency: 2ms</span>
      </div>
      
      <div className="absolute right-[30%] top-[5%] px-2 py-1 rounded-full border border-white/10 bg-white/[0.03] opacity-40">
        <span className="text-[6px] font-mono text-white/50">Processing: 10k/s</span>
      </div>

      <div className="absolute left-[5%] top-[45%] px-2 py-1 rounded-full border border-white/10 bg-white/[0.03] opacity-30">
        <span className="text-[6px] font-mono text-white/40">Sync: Active</span>
      </div>
      
      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.15)_100%)] pointer-events-none"/>
    </div>
  );
};

export default HeroBackground;
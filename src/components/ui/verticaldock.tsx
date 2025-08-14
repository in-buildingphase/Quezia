"use client";

import React, { useRef } from "react";
import {
  motion,
  MotionValue,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import {
  Calculator,
  TestTube,
  Atom,
  Trophy,
  Settings,
  HelpCircle,
} from "lucide-react";

const DEFAULT_SIZE = 48;
const DEFAULT_MAGNIFICATION = 72;
const DEFAULT_DISTANCE = 120;

interface VerticalDockIconProps {
  size?: number;
  magnification?: number;
  distance?: number;
  mouseY?: MotionValue<number>;
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
  tooltip?: string;
}

const VerticalDockIcon = ({
  size = DEFAULT_SIZE,
  magnification = DEFAULT_MAGNIFICATION,
  distance = DEFAULT_DISTANCE,
  mouseY,
  className = "",
  children,
  onClick,
  tooltip,
}: VerticalDockIconProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const defaultMouseY = useMotionValue(Infinity);

  // Calculate distance from icon center
  const distanceCalc = useTransform(mouseY ?? defaultMouseY, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect();
    if (!bounds) return Infinity;
    const centerY = bounds.top + bounds.height / 2;
    return val - centerY;
  });

  // Smooth mapping of distance to scale using a soft sigmoid
  const scaleTransform = useTransform(distanceCalc, (d) => {
    const absD = Math.min(Math.abs(d), distance);
    const factor = 1 - (absD / distance); // 0 at distance, 1 at center
    return size + (magnification - size) * factor ** 2; // smooth quadratic easing
  });

  const scaleSpring = useSpring(scaleTransform, {
    mass: 0.2,
    stiffness: 80,
    damping: 14,
  });

  return (
    <motion.div
      ref={ref}
      style={{ width: scaleSpring, height: scaleSpring }}
      className={`relative flex items-center justify-center cursor-pointer rounded-xl bg-[#2A2A2A] border border-[#444] hover:border-[#FF8F00]/50 hover:bg-[#333] transition-all duration-200 group ${className}`}
      onClick={onClick}
    >
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#FF8F00]/20 to-[#FFD54F]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
      <div className="relative z-10 text-[#E0E0E0] group-hover:text-[#FF8F00] transition-colors duration-200">
        {children}
      </div>
      {tooltip && (
        <div className="absolute right-full mr-3 px-3 py-1 bg-[#1A1A1A] text-[#E0E0E0] text-sm rounded-lg border border-[#444] opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
          {tooltip}
          <div className="absolute left-full top-1/2 -translate-y-1/2 w-0 h-0 border-l-4 border-l-[#444] border-t-4 border-t-transparent border-b-4 border-b-transparent" />
        </div>
      )}
    </motion.div>
  );
};

const VerticalDock = () => {
  const mouseY = useMotionValue(Infinity);

  const dockItems = [
    { icon: <Calculator size={20} />, tooltip: "Mathematics", onClick: () => console.log("Math") },
    { icon: <Atom size={20} />, tooltip: "Physics", onClick: () => console.log("Physics") },
    { icon: <TestTube size={20} />, tooltip: "Chemistry", onClick: () => console.log("Chemistry") },
    { icon: <Trophy size={20} />, tooltip: "Leaderboard", onClick: () => console.log("Goals") },
    { icon: <Settings size={20} />, tooltip: "Settings", onClick: () => console.log("Settings") },
    { icon: <HelpCircle size={20} />, tooltip: "Help", onClick: () => console.log("Help") },
  ];

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50">
      <motion.div
        onMouseMove={(e) => mouseY.set(e.pageY)}
        onMouseLeave={() => mouseY.set(Infinity)}
        className="relative flex flex-col items-center gap-3 p-3 rounded-2xl bg-[#1A1A1A]/90 border border-[#333] backdrop-blur-md"
        style={{ background: "linear-gradient(145deg, #1A1A1A/95, #2A2A2A/90)" }}
      >
        <div className="w-8 h-[2px] bg-gradient-to-r from-[#FF8F00] to-[#FFD54F] rounded-full" />
        {dockItems.map((item, index) => (
          <VerticalDockIcon
            key={index}
            mouseY={mouseY}
            onClick={item.onClick}
            tooltip={item.tooltip}
            size={DEFAULT_SIZE}
            magnification={DEFAULT_MAGNIFICATION}
            distance={DEFAULT_DISTANCE}
          >
            {item.icon}
          </VerticalDockIcon>
        ))}
        <div className="w-8 h-[2px] bg-gradient-to-r from-[#FF8F00] to-[#FFD54F] rounded-full" />
      </motion.div>
    </div>
  );
};

export default VerticalDock;

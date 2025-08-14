"use client";

import React, { useRef, useEffect, useState } from "react";
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

const DEFAULT_SIZE = 44;
const DEFAULT_MAGNIFICATION = 68;
const DEFAULT_DISTANCE = 100;

interface VerticalDockIconProps {
  size?: number;
  magnification?: number;
  distance?: number;
  mouseY?: MotionValue<number>;
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
  tooltip?: string;
  centerY?: number;
  containerTop?: number;
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
  centerY,
  containerTop = 0,
}: VerticalDockIconProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const defaultMouseY = useMotionValue(Infinity);

  // Distance from mouse to icon center
  const distanceCalc = useTransform(mouseY ?? defaultMouseY, (val: number) => {
    if (val === Infinity) return distance;
    const relativeMouseY = val - containerTop;
    const bounds = ref.current?.getBoundingClientRect();
    const iconCenterY =
      centerY ??
      (bounds ? bounds.top - containerTop + DEFAULT_SIZE / 2 : null);
    if (!iconCenterY) return distance;
    return Math.abs(relativeMouseY - iconCenterY);
  });

  // Animate size
  const targetSize = useTransform(distanceCalc, (d) => {
    const normalizedDistance = Math.min(d / distance, 1);
    const scale = 1 - Math.pow(normalizedDistance, 0.8);
    return size + (magnification - size) * scale;
  });

  const animatedSize = useSpring(targetSize, {
    mass: 0.15,
    stiffness: 90,
    damping: 18,
  });

  // Gap animation
  const animatedMargin = useTransform(animatedSize, (val) => {
    const extra = (val - size) * 0.15;
    return 8 + extra;
  });

  return (
    <motion.div
      ref={ref}
      style={{
        width: animatedSize,
        height: animatedSize,
        marginTop: animatedMargin,
        marginBottom: animatedMargin,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{
        y: -2,
        rotate: 0,
        transition: { type: "spring", stiffness: 120, damping: 12 },
      }}
      className={`relative flex items-center justify-center cursor-pointer rounded-xl bg-[#2A2A2A] border border-[#444] hover:border-[#FF8F00]/50 hover:bg-[#333] ${className}`}
      onClick={onClick}
      data-icon
    >
      {/* Hover glow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#FF8F00]/15 to-[#FFD54F]/8 "
      />

      {/* Icon */}
      <div className="relative z-10 text-[#E0E0E0] transition-colors duration-300 hover:text-[#FF8F00]">
        {children}
      </div>

      {/* Tooltip */}
      {tooltip && (
        <motion.div
          initial={{ opacity: 0, x: 10, filter: "blur(2px)" }}
          animate={{
            opacity: hovered ? 1 : 0,
            x: hovered ? 0 : 10,
            filter: hovered ? "blur(0px)" : "blur(2px)",
          }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="absolute right-full mr-3 px-3 py-1 bg-[#1A1A1A] text-[#E0E0E0] text-sm rounded-lg border border-[#444] whitespace-nowrap pointer-events-none shadow-lg z-52"
        >
          {tooltip}
          {/* Arrow */}
          <div className="absolute left-full top-1/2 -translate-y-1/2 w-0 h-0 border-l-4 border-l-[#1A1A1A] border-t-4 border-t-transparent border-b-4 border-b-transparent" />
        </motion.div>
      )}
    </motion.div>
  );
};

const VerticalDock = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseY = useMotionValue(Infinity);
  const [iconCenters, setIconCenters] = useState<number[]>([]);
  const [containerTop, setContainerTop] = useState(0);

  const dockItems = [
    { icon: <Calculator size={20} />, tooltip: "Mathematics", onClick: () => console.log("Math") },
    { icon: <Atom size={20} />, tooltip: "Physics", onClick: () => console.log("Physics") },
    { icon: <TestTube size={20} />, tooltip: "Chemistry", onClick: () => console.log("Chemistry") },
    { icon: <Trophy size={20} />, tooltip: "Leaderboard", onClick: () => console.log("Goals") },
    { icon: <Settings size={20} />, tooltip: "Settings", onClick: () => console.log("Settings") },
    { icon: <HelpCircle size={20} />, tooltip: "Help", onClick: () => console.log("Help") },
  ];

  useEffect(() => {
    const computeIconCenters = () => {
      if (!containerRef.current) return;
      const containerRect = containerRef.current.getBoundingClientRect();
      setContainerTop(containerRect.top);
      const icons = containerRef.current.querySelectorAll("[data-icon]");
      const centers: number[] = [];
      icons.forEach((icon) => {
        const rect = icon.getBoundingClientRect();
        const relativeCenter =
          rect.top - containerRect.top + rect.height / 2;
        centers.push(relativeCenter);
      });
      setIconCenters(centers);
    };

    computeIconCenters();
    const resizeObserver = new ResizeObserver(computeIconCenters);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }
    return () => resizeObserver.disconnect();
  }, []);

  return (
    <motion.div
      className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden lg:block"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
    >
      <motion.div
        ref={containerRef}
        onMouseMove={(e) => mouseY.set(e.clientY)}
        onMouseLeave={() => mouseY.set(Infinity)}
        className="relative flex flex-col items-center p-2 rounded-2xl border border-[#333] backdrop-blur-md z-51"
        style={{
          background: "linear-gradient(145deg, #1A1A1A 95%, #2A2A2A 90%)",
        }}
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
            centerY={iconCenters[index]}
            containerTop={containerTop}
          >
            {item.icon}
          </VerticalDockIcon>
        ))}
        <div className="w-8 h-[2px] bg-gradient-to-r from-[#FF8F00] to-[#FFD54F] rounded-full" />
      </motion.div>
    </motion.div>
  );
};

export default VerticalDock;

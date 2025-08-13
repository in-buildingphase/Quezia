"use client";

import React, { memo } from "react";

interface GoldenTextProps {
  children: React.ReactNode;
  className?: string;
  speed?: number;
}

export const GoldenText = memo(
  ({
    children,
    className = "",
    speed = 1,
  }: GoldenTextProps) => {
    const colors = ["#FFB74D", "#FFD700", "#FFA500", "#FFCC80"]; // warm gold gradient
    const gradientStyle = {
      backgroundImage: `linear-gradient(135deg, ${colors.join(", ")}, ${
        colors[0]
      })`,
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      animationDuration: `${10 / speed}s`,
    };

    return (
      <span className={`relative inline-block ${className}`}>
        {/* Screen reader friendly */}
        <span className="sr-only">{children}</span>
        
        {/* Visible animated gradient */}
        <span
          className="relative animate-aurora bg-[length:200%_auto] bg-clip-text text-transparent"
          style={gradientStyle}
          aria-hidden="true"
        >
          {children}
        </span>
      </span>
    );
  }
);

GoldenText.displayName = "GoldenText";

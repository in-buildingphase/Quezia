"use client";

import { cn } from "@/lib/utils";
import { ComponentPropsWithoutRef } from "react";

export interface AnimatedGradientBadgeProps
  extends ComponentPropsWithoutRef<"span"> {
  speed?: number;
  colorFrom?: string;
  colorMid?: string;
  colorTo?: string;
}

export function AnimatedGradientBadge({
  children,
  className,
  speed = 1,
  colorFrom = "#FFD700", // bright gold
  colorMid = "#FF8F00",  // rich warm orange-gold
  colorTo = "#FFF3B0",   // pale glowing yellow
  ...props
}: AnimatedGradientBadgeProps) {
  return (
    <span
      style={
        {
          "--bg-size": `${speed * 400}%`,
          "--color-from": colorFrom,
          "--color-mid": colorMid,
          "--color-to": colorTo,
        } as React.CSSProperties
      }
      className={cn(
        `inline-flex items-center rounded-3xl border border-[#FFD700]/80 
         bg-[#FF8F00]/10 px-3 py-1 text-sm font-medium
         animate-gradient bg-gradient-to-r 
         from-[var(--color-from)] via-[var(--color-mid)] to-[var(--color-to)] 
         bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`,
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

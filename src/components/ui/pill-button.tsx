"use client";

import { ReactNode } from "react";

interface PillButtonProps {
    children: ReactNode;
    isActive?: boolean;
    onClick?: () => void;
    className?: string;
    variant?: "default" | "active" | "outline";
}

export function PillButton({
    children,
    isActive = false,
    onClick,
    className = "",
    variant = "default"
}: PillButtonProps) {
    const baseClasses = "px-6 py-3 rounded-full font-medium text-sm transition-all duration-300 cursor-pointer hover:scale-105";

    const variantClasses = {
        default: "bg-white/10 text-[#E0E0E0] hover:bg-white/20 border border-white/20",
        active: "bg-gradient-to-r from-[#FF8F00] to-[#FFA000] text-black border border-[#FFB74D] shadow-lg",
        outline: "bg-transparent text-[#E0E0E0] border border-[#FFB74D]/50 hover:border-[#FFB74D] hover:bg-[#FFB74D]/10"
    };

    const classes = `${baseClasses} ${variantClasses[variant]} ${className}`;

    return (
        <button
            onClick={onClick}
            className={classes}
        >
            {children}
        </button>
    );
}

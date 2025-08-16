"use client";

interface MainHeadingProps {
    title?: string;
    className?: string;
}

export function MainHeading({
    title = "What will you design today?",
    className = ""
}: MainHeadingProps) {
    return (
        <div className={`text-center ${className}`}>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#E0E0E0] leading-tight tracking-tight">
                {title}
            </h1>
        </div>
    );
}

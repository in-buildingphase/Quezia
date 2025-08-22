"use client";

import { Search, ArrowRight } from "lucide-react";
import { useState } from "react";

interface SearchInputProps {
    placeholder?: string;
    onSearch?: (query: string) => void;
    className?: string;
}

export function SearchInput({
    placeholder = "Search millions of templates",
    onSearch,
    className = ""
}: SearchInputProps) {
    const [query, setQuery] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (onSearch && query.trim()) {
            onSearch(query.trim());
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            e.preventDefault();
            if (onSearch && query.trim()) {
                onSearch(query.trim());
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className={`w-full max-w-2xl mx-auto ${className}`}>
            <div className="relative group">
                {/* Search Input */}
                <div className="relative">
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder={placeholder}
                        className="w-full px-8 py-8 pl-20 pr-24 bg-black/40 backdrop-blur-xl border border-white/20 rounded-2xl text-[#E0E0E0] placeholder-[#E0E0E0]/50 focus:outline-none focus:border-[#FFB74D]/50 focus:ring-2 focus:ring-[#FFB74D]/20 transition-all duration-300 text-xl"
                        style={{ backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)' }}
                    />

                    {/* Search Icon */}
                    <div className="absolute left-6 top-1/2 transform -translate-y-1/2">
                        <Search className="w-7 h-7 text-[#E0E0E0]/60" />
                    </div>

                    {/* Search Button */}
                    <button
                        type="submit"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-[#FF8F00] to-[#FFA000] hover:from-[#FFA000] hover:to-[#FFB74D] text-black font-semibold p-3 rounded-xl transition-all duration-300 shadow-lg hover:scale-105"
                    >
                        <ArrowRight className="w-6 h-6" />
                    </button>
                </div>

                {/* Hover Effect Glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#FFB74D]/20 to-[#FF8F00]/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
            </div>
        </form>
    );
}

"use client";

import { MainHeading } from "@/components/ui/main-heading";
import { SearchInput } from "@/components/ui/search-input";

export default function ComponentsDemoPage() {
    const handleSearch = (query: string) => {
        console.log("Search query:", query);
        // Handle search functionality here
    };



    return (
        <div className="min-h-screen bg-black relative overflow-hidden">
            {/* Background decorative elements matching landing page */}
            <div className="absolute top-0 left-1/4 w-72 h-72 bg-[#FF8F00]/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#FFD54F]/5 rounded-full blur-3xl" />
            <div className="absolute top-1/2 left-1/3 w-80 h-80 bg-[#FFB74D]/8 rounded-full blur-3xl" />

            <div className="relative z-10 min-h-screen flex flex-col items-center px-4 pt-32">
                {/* Main Heading */}
                <MainHeading className="mb-12" />

                {/* Search Input */}
                <SearchInput
                    onSearch={handleSearch}
                    className="mb-12"
                />

                {/* Additional Info */}
                <div className="text-center text-[#E0E0E0]/60 max-w-md">
                    <p className="text-lg">
                        Start creating beautiful designs with our powerful tools and templates
                    </p>
                </div>
            </div>
        </div>
    );
}

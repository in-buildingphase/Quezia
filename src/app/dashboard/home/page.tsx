"use client";

import { MainHeading } from "@/components/ui/main-heading";
import { SearchInput } from "@/components/ui/search-input";
import VerticalDock from "@/components/ui/verticaldock";

export default function Home() {
  const handleSearch = (query: string) => {
    console.log("Dashboard search query:", query);
    // Handle dashboard search functionality here
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Background decorative elements matching landing page */}
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-[#FF8F00]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#FFD54F]/5 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/3 w-80 h-80 bg-[#FFB74D]/8 rounded-full blur-3xl" />

      <div className="relative z-10 min-h-screen flex px-4 pt-32">

        {/* Main Content positioned on the right side */}
        <div className="ml-auto flex flex-col items-start justify-center min-h-screen pr-8">
          {/* Main Heading */}
          <MainHeading
            title="Welcome to Your Dashboard"
            className="mb-12 text-left"
          />

          {/* Search Input */}
          <SearchInput
            placeholder="Search your designs, templates, and projects..."
            onSearch={handleSearch}
            className="mb-12"
          />

          {/* Additional Info */}
          <div className="text-left text-[#E0E0E0]/60 max-w-md mb-12">
            <p className="text-lg">
              Find and manage your creative projects with ease
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

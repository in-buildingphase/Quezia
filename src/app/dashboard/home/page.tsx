"use client";

import { ExamTextArea } from "@/components/ui/exam-text-area";
import VerticalDock from "@/components/ui/verticaldock";
import { useUserSync } from "@/lib/use-user-sync";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";

export default function DashboardHome() {
  // Add useUserSync hook to ensure user data is synced
  const { isSyncing, syncError, user, isLoaded, isSignedIn } = useUserSync();

  // Query user data from Convex
  const convexUser = useQuery(
    api.users.getUserByClerkId,
    user?.id ? { clerkId: user.id } : "skip"
  );

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF8F00] mx-auto mb-4"></div>
          <p className="text-[#B0B0B0]">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Background decorative elements matching landing page */}
      {/* Enhanced glow effects behind the text area */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-gradient-radial from-[#FF8F00]/20 via-[#FFD54F]/15 to-transparent rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[500px] bg-gradient-radial from-[#FFB74D]/25 via-[#FFD54F]/20 to-transparent rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[300px] bg-gradient-radial from-[#FF8F00]/30 via-[#FFB74D]/25 to-transparent rounded-full blur-2xl" />

      {/* Additional accent glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#FF8F00]/15 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#FFD54F]/20 rounded-full blur-3xl" />

      <div className="relative z-10 min-h-screen flex px-4 pt-16">
        {/* Main Content centered in the remaining space */}
        <div className="flex-1 flex flex-col items-center justify-center min-h-screen">
          {syncError && (
            <div className="mb-4 p-4 bg-red-900/20 border border-red-500/30 rounded-lg">
              <p className="text-red-300">Error syncing user data: {syncError}</p>
            </div>
          )}
          <ExamTextArea
            onSend={(message, subject) => {
              console.log("Message:", message, "Subject:", subject);
              // Handle exam message submission here
            }}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
}

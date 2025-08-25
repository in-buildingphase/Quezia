"use client";

import { useUser, SignOutButton } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";

export default function Profile() {
  const { user, isLoaded, isSignedIn } = useUser();
  const clerkId = user?.id || "";
  const dbUser = useQuery(
    api.users.getUserByClerkId,
    isLoaded && isSignedIn && clerkId ? { clerkId } : "skip"
  );

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-[#E0E0E0] px-6 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Profile</h1>
          {isLoaded && isSignedIn && (
            <SignOutButton>
              <button className="px-4 py-2 rounded-lg border border-[#333] bg-[#141414] hover:border-[#FFB74D]/60">Log out</button>
            </SignOutButton>
          )}
        </div>

        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-semibold mb-3">Account</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="bg-[#111] rounded-xl border border-[#222] p-4">
                <div className="text-[#9A9A9A]">Email</div>
                <div>{dbUser?.email || user?.emailAddresses?.[0]?.emailAddress || "—"}</div>
              </div>
              <div className="bg-[#111] rounded-xl border border-[#222] p-4">
                <div className="text-[#9A9A9A]">Username</div>
                <div>{dbUser?.username || user?.username || user?.emailAddresses?.[0]?.emailAddress?.split("@")[0] || "—"}</div>
              </div>
              <div className="bg-[#111] rounded-xl border border-[#222] p-4">
                <div className="text-[#9A9A9A]">Phone</div>
                <div>{dbUser?.phone || user?.phoneNumbers?.[0]?.phoneNumber || "—"}</div>
              </div>
              <div className="bg-[#111] rounded-xl border border-[#222] p-4">
                <div className="text-[#9A9A9A]">Clerk ID</div>
                <div className="truncate">{user?.id || "—"}</div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Onboarding</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="bg-[#111] rounded-xl border border-[#222] p-4">
                <div className="text-[#9A9A9A]">Country</div>
                <div>{dbUser?.country || "—"}</div>
              </div>
              <div className="bg-[#111] rounded-xl border border-[#222] p-4">
                <div className="text-[#9A9A9A]">Exam Preference</div>
                <div>{dbUser?.examPreference || "—"}</div>
              </div>
              <div className="bg-[#111] rounded-xl border border-[#222] p-4">
                <div className="text-[#9A9A9A]">Age Group</div>
                <div>{dbUser?.ageGroup || "—"}</div>
              </div>
            </div>
            <div className="mt-3 text-xs text-[#9A9A9A]">Onboarded: {dbUser?.onboarded ? "Yes" : dbUser ? "No" : "—"}</div>
          </section>
        </div>
      </div>
    </div>
  );
}

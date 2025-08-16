"use client";

import { useUserSync } from "@/lib/use-user-sync";
import { SignOutButton } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

export default function DashboardPage() {
    const { isSyncing, syncError, user, isLoaded, isSignedIn } = useUserSync();

    // Query user data from Convex
    const convexUser = useQuery(
        api.users.getUserByClerkId,
        user?.id ? { clerkId: user.id } : "skip"
    );

    if (!isLoaded) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FFB74D] mx-auto mb-4"></div>
                    <p className="text-[#E0E0E0]">Loading...</p>
                </div>
            </div>
        );
    }

    if (!isSignedIn) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-[#FFB74D] mb-4">Access Denied</h1>
                    <p className="text-[#E0E0E0] mb-4">You need to be signed in to view this page.</p>
                    <a
                        href="/sign-in"
                        className="bg-gradient-to-r from-[#FF8F00] to-[#FFA000] hover:from-[#FFA000] hover:to-[#FFB74D] text-black font-semibold py-2 px-6 rounded-full transition-all duration-300 shadow-lg"
                    >
                        Sign In
                    </a>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black relative overflow-hidden">
            {/* Background decorative elements matching landing page */}
            <div className="absolute top-0 left-1/4 w-72 h-72 bg-[#FF8F00]/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#FFD54F]/5 rounded-full blur-3xl" />
            <div className="absolute top-1/2 left-1/3 w-80 h-80 bg-[#FFB74D]/8 rounded-full blur-3xl" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
                {/* Header */}
                <div className="bg-black/40 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl p-6 mb-8" style={{ backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)' }}>
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-3xl font-bold text-[#FFB74D]">Dashboard</h1>
                            <p className="text-[#E0E0E0] mt-2">Welcome to your Quezia dashboard</p>
                        </div>
                        <SignOutButton>
                            <button className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold py-2 px-6 rounded-full transition-all duration-300 shadow-lg">
                                Sign Out
                            </button>
                        </SignOutButton>
                    </div>
                </div>

                {/* User Sync Status */}
                <div className="bg-black/40 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl p-6 mb-8" style={{ backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)' }}>
                    <h2 className="text-xl font-semibold text-[#E0E0E0] mb-4">User Sync Status</h2>

                    {isSyncing && (
                        <div className="flex items-center space-x-2 text-[#FFB74D]">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#FFB74D]"></div>
                            <span>Syncing user data to Convex...</span>
                        </div>
                    )}

                    {syncError && (
                        <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
                            <p className="text-red-300">
                                <strong>Sync Error:</strong> {syncError}
                            </p>
                        </div>
                    )}

                    {!isSyncing && !syncError && convexUser && (
                        <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
                            <p className="text-green-300">
                                <strong>✓ User data successfully synced to Convex</strong>
                            </p>
                            <p className="text-green-400 text-sm mt-1">
                                User ID: {convexUser._id}
                            </p>
                        </div>
                    )}
                </div>

                {/* User Information */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Clerk User Data */}
                    <div className="bg-black/40 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl p-6" style={{ backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)' }}>
                        <h2 className="text-xl font-semibold text-[#E0E0E0] mb-4">Clerk User Data</h2>
                        <div className="space-y-3">
                            <div>
                                <label className="text-sm font-medium text-[#E0E0E0]/60">User ID</label>
                                <p className="text-[#E0E0E0] font-mono text-sm break-all">{user?.id}</p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-[#E0E0E0]/60">Email</label>
                                <p className="text-[#E0E0E0]">{user?.emailAddresses?.[0]?.emailAddress}</p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-[#E0E0E0]/60">Username</label>
                                <p className="text-[#E0E0E0]">{user?.username || "Not set"}</p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-[#E0E0E0]/60">Phone</label>
                                <p className="text-[#E0E0E0]">{user?.phoneNumbers?.[0]?.phoneNumber || "Not set"}</p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-[#E0E0E0]/60">Created At</label>
                                <p className="text-[#E0E0E0]">
                                    {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "Unknown"}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Convex User Data */}
                    <div className="bg-black/40 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl p-6" style={{ backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)' }}>
                        <h2 className="text-xl font-semibold text-[#E0E0E0] mb-4">Convex User Data</h2>
                        {convexUser ? (
                            <div className="space-y-3">
                                <div>
                                    <label className="text-sm font-medium text-[#E0E0E0]/60">Convex ID</label>
                                    <p className="text-[#E0E0E0] font-mono text-sm break-all">{convexUser._id}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-[#E0E0E0]/60">Clerk ID</label>
                                    <p className="text-[#E0E0E0] font-mono text-sm break-all">{convexUser.clerkId}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-[#E0E0E0]/60">Email</label>
                                    <p className="text-[#E0E0E0]">{convexUser.email}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-[#E0E0E0]/60">Username</label>
                                    <p className="text-[#E0E0E0]">{convexUser.username}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-[#E0E0E0]/60">Grade</label>
                                    <p className="text-[#E0E0E0]">{convexUser.grade || "Not set"}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-[#E0E0E0]/60">Date of Birth</label>
                                    <p className="text-[#E0E0E0]">{convexUser.dob || "Not set"}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-[#E0E0E0]/60">Phone</label>
                                    <p className="text-[#E0E0E0]">{convexUser.phone || "Not set"}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-[#E0E0E0]/60">Created At</label>
                                    <p className="text-[#E0E0E0]">
                                        {new Date(convexUser.createdAt).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div className="text-[#E0E0E0]/60">
                                {isSyncing ? "Syncing..." : "User data not yet synced to Convex"}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

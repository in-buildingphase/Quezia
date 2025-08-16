"use client";

import { useUserSync } from "@/lib/use-user-sync";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useState } from "react";
import { validateUserProfile, sanitizeUserInput } from "@/lib/user-utils";

/**
 * Example component demonstrating user sync functionality
 * This shows how to use the useUserSync hook and interact with user data
 */
export function UserSyncExample() {
    const { isSyncing, syncError, user, isLoaded, isSignedIn } = useUserSync();
    const [isUpdating, setIsUpdating] = useState(false);
    const [updateError, setUpdateError] = useState<string | null>(null);

    // Query user data from Convex
    const convexUser = useQuery(
        api.users.getUserByClerkId,
        user?.id ? { clerkId: user.id } : "skip"
    );

    // Example of how you might add an update user mutation
    // const updateUser = useMutation(api.users.updateUser);

    if (!isLoaded) {
        return (
            <div className="p-6 bg-black/40 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl" style={{ backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)' }}>
                <div className="flex items-center space-x-2 text-[#FFB74D]">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#FFB74D]"></div>
                    <span>Loading user data...</span>
                </div>
            </div>
        );
    }

    if (!isSignedIn) {
        return (
            <div className="p-6 bg-black/40 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl" style={{ backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)' }}>
                <h3 className="text-lg font-semibold text-[#FFB74D] mb-2">
                    Authentication Required
                </h3>
                <p className="text-[#E0E0E0] mb-4">
                    Please sign in to view your user data and sync status.
                </p>
                <div className="space-x-3">
                    <a
                        href="/sign-in"
                        className="inline-block bg-gradient-to-r from-[#FF8F00] to-[#FFA000] hover:from-[#FFA000] hover:to-[#FFB74D] text-black font-semibold py-2 px-4 rounded-full transition-all duration-300 shadow-lg"
                    >
                        Sign In
                    </a>
                    <a
                        href="/sign-up"
                        className="inline-block bg-gradient-to-r from-[#FF8F00] to-[#FFA000] hover:from-[#FFA000] hover:to-[#FFB74D] text-black font-semibold py-2 px-4 rounded-full transition-all duration-300 shadow-lg"
                    >
                        Sign Up
                    </a>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* User Sync Status */}
            <div className="bg-black/40 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl p-6" style={{ backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)' }}>
                <h3 className="text-lg font-semibold text-[#E0E0E0] mb-4">
                    User Sync Status
                </h3>

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

            {/* Clerk User Information */}
            <div className="bg-black/40 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl p-6" style={{ backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)' }}>
                <h3 className="text-lg font-semibold text-[#E0E0E0] mb-4">
                    Clerk User Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    <div>
                        <label className="text-sm font-medium text-[#E0E0E0]/60">Last Sign In</label>
                        <p className="text-[#E0E0E0]">
                            {user?.lastSignInAt ? new Date(user.lastSignInAt).toLocaleDateString() : "Unknown"}
                        </p>
                    </div>
                </div>
            </div>

            {/* Convex User Data */}
            <div className="bg-black/40 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl p-6" style={{ backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)' }}>
                <h3 className="text-lg font-semibold text-[#E0E0E0] mb-4">
                    Convex User Data
                </h3>
                {convexUser ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

            {/* Usage Instructions */}
            <div className="bg-black/40 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl p-6" style={{ backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)' }}>
                <h3 className="text-lg font-semibold text-[#FFB74D] mb-4">
                    How to Use This System
                </h3>
                <div className="space-y-3 text-[#E0E0E0]">
                    <p>
                        <strong>1. Automatic Sync:</strong> The <code className="text-[#FFB74D]">useUserSync</code> hook automatically
                        syncs user data from Clerk to Convex when a user signs up.
                    </p>
                    <p>
                        <strong>2. Idempotent:</strong> The system prevents duplicate users by checking
                        if a user with the same <code className="text-[#FFB74D]">clerkId</code> already exists.
                    </p>
                    <p>
                        <strong>3. Real-time:</strong> Use Convex queries to get live user data updates.
                    </p>
                    <p>
                        <strong>4. Protected Routes:</strong> The middleware automatically protects
                        routes that require authentication.
                    </p>
                </div>
            </div>
        </div>
    );
}

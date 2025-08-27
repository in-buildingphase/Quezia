import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useEffect, useState } from "react";

/**
 * Custom hook to sync user data from Clerk to Convex
 * This hook automatically creates a user record in Convex when a user signs up
 * It's idempotent - won't create duplicate users
 */
export function useUserSync() {
  const { user, isLoaded, isSignedIn } = useUser();
  const createUser = useMutation(api.users.createUser);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncError, setSyncError] = useState<string | null>(null);
  const [hasSynced, setHasSynced] = useState(false);

  useEffect(() => {
    // Reset sync state when user changes
    if (!isLoaded || !isSignedIn || !user) {
      setHasSynced(false);
      setSyncError(null);
      return;
    }

    // Don't sync again if already synced for this user
    if (hasSynced) {
      return;
    }

    // Check if we have the required user data
    const hasRequiredData = user.emailAddresses?.[0]?.emailAddress;

    if (!hasRequiredData) {
      console.log("User data not fully loaded yet, waiting...");
      return;
    }

    const syncUserToConvex = async () => {
      try {
        setIsSyncing(true);
        setSyncError(null);

        // Extract user data from Clerk
        const userData = {
          clerkId: user.id,
          email: user.emailAddresses[0].emailAddress,
          username: user.username || user.emailAddresses[0].emailAddress.split('@')[0],
          grade: "", // Will be filled in by user later
          dob: "", // Will be filled in by user later
          phone: user.phoneNumbers?.[0]?.phoneNumber || "",
        };

        console.log("Syncing user to Convex:", userData);

        // Create user in Convex (idempotent operation)
        const userId = await createUser(userData);
        
        console.log("User synced to Convex successfully:", userId);
        setHasSynced(true);
      } catch (error) {
        console.error("Error syncing user to Convex:", error);
        setSyncError(error instanceof Error ? error.message : "Unknown error occurred");
      } finally {
        setIsSyncing(false);
      }
    };

    // Small delay to ensure Clerk data is fully loaded
    const timeoutId = setTimeout(syncUserToConvex, 1000);

    return () => clearTimeout(timeoutId);
  }, [isLoaded, isSignedIn, user, createUser, hasSynced]);

  return {
    isSyncing,
    syncError,
    hasSynced,
    user,
    isLoaded,
    isSignedIn,
  };
}

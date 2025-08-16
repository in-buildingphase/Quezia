"use client";

import { ConvexProvider, ConvexReactClient } from "convex/react";
import { ReactNode } from "react";

// Create a Convex client
const convex = new ConvexReactClient(
    process.env.NEXT_PUBLIC_CONVEX_URL!
);

interface ConvexProviderProps {
    children: ReactNode;
}

export function ConvexProviderWrapper({ children }: ConvexProviderProps) {
    return (
        <ConvexProvider client={convex}>
            {children}
        </ConvexProvider>
    );
}

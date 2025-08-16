"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { ReactNode } from "react";
import { dark } from '@clerk/themes'

interface ClerkProviderProps {
    children: ReactNode;
}

export function ClerkProviderWrapper({ children }: ClerkProviderProps) {
    return (
        <ClerkProvider
            publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!}
            appearance={{
            baseTheme: dark,
        }}
        >
            {children}
        </ClerkProvider>
    );
}

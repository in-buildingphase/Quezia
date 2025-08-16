import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProviderWrapper } from "@/components/providers/clerk-provider";
import { ConvexProviderWrapper } from "@/components/providers/convex-provider";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Quezia - Your Startup Platform",
  description: "A modern startup platform built with Next.js, Clerk, and Convex",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ClerkProviderWrapper>
          <ConvexProviderWrapper>
            {children}
          </ConvexProviderWrapper>
        </ClerkProviderWrapper>
      </body>
    </html>
  );
}

'use client';

import VerticalDock from '@/components/ui/verticaldock';
import { useUserSync } from '@/lib/use-user-sync';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Automatically sync user to Convex database when they access the dashboard
  useUserSync();

  return (
    <div className="h-screen bg-[#0C0C0CFF] flex overflow-hidden">
      {/* Fixed Sidebar */}
      <div className="w-20 flex-shrink-0 fixed left-0 top-0 h-full z-10">
        <VerticalDock />
      </div>

      {/* Scrollable Content Area */}
      <div className="flex-1 ml-20 overflow-y-auto">
        {children}
      </div>
    </div>
  );
}

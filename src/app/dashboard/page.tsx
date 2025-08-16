'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to home by default
    router.push('/dashboard/home');
  }, [router]);

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF8F00] mx-auto mb-4"></div>
        <p className="text-[#B0B0B0]">Loading...</p>
      </div>
    </div>
  );
}

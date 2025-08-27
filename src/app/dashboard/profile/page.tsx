'use client';

import { useUser, useClerk } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useQuery } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import { User, Mail, Settings, LogOut } from 'lucide-react';

export default function Profile() {
  const { user } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();
  const convexUser = useQuery(api.users.getUserByClerkId, 
    user ? { clerkId: user.id } : 'skip'
  );

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  if (!user || !convexUser) {
    return (
      <div className="min-h-screen bg-[#0C0C0CFF] p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#FF8F00] mx-auto"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0C0C0CFF] p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Profile Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-white">Profile Settings</h1>
          <button
            onClick={handleSignOut}
            className="flex items-center space-x-2 text-[#888] hover:text-white transition-colors"
          >
            <LogOut size={20} />
            <span>Sign Out</span>
          </button>
        </div>

        {/* Basic Info */}
        <div className="bg-[#1A1A1AFF] rounded-xl p-6 space-y-6">
          <h2 className="text-xl font-semibold text-white">Basic Information</h2>
          
          <div className="grid gap-4">
            <div className="flex items-center space-x-4 text-[#E0E0E0]">
              <User className="w-5 h-5 text-[#888]" />
              <div>
                <p className="text-sm text-[#888]">Username</p>
                <p>{convexUser.username}</p>
              </div>
            </div>

            <div className="flex items-center space-x-4 text-[#E0E0E0]">
              <Mail className="w-5 h-5 text-[#888]" />
              <div>
                <p className="text-sm text-[#888]">Email</p>
                <p>{convexUser.email}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Exam Preferences */}
        <div className="bg-[#1A1A1AFF] rounded-xl p-6 space-y-6">
          <h2 className="text-xl font-semibold text-white">Exam Preferences</h2>
          
          <div className="grid gap-4">
            <div className="flex items-center space-x-4 text-[#E0E0E0]">
              <Settings className="w-5 h-5 text-[#888]" />
              <div>
                <p className="text-sm text-[#888]">Preferred Exam</p>
                <p>{convexUser.examPreference || 'Not set'}</p>
              </div>
            </div>

            <div className="flex items-center space-x-4 text-[#E0E0E0]">
              <User className="w-5 h-5 text-[#888]" />
              <div>
                <p className="text-sm text-[#888]">Age Group</p>
                <p>{convexUser.ageGroup || 'Not set'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useUser, useClerk } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useMutation, useQuery } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import { useState } from 'react';
import { User, Mail, Phone, Calendar, GraduationCap, Settings, LogOut, Trash2, Edit3, Save, X } from 'lucide-react';
import { GoldenText } from '@/components/ui/goldentext';

export default function Profile() {
  const { user } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();
  const deleteUser = useMutation(api.users.deleteUser);
  const updateUser = useMutation(api.users.updateUser);
  const convexUser = useQuery(api.users.getUserByClerkId, 
    user ? { clerkId: user.id } : 'skip'
  );

  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [editForm, setEditForm] = useState({
    username: '',
    grade: '',
    dob: '',
    phone: '',
  });

  // Initialize form when convex user data loads
  useState(() => {
    if (convexUser) {
      setEditForm({
        username: convexUser.username || '',
        grade: convexUser.grade || '',
        dob: convexUser.dob || '',
        phone: convexUser.phone || '',
      });
    }
  });

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  const handleDeleteAccount = async () => {
    if (!user) return;
    
    try {
      setIsDeleting(true);
      
      // Delete from Convex first
      await deleteUser({ clerkId: user.id });
      
      // Sign out the user (Clerk account deletion requires additional verification)
      // For now, we'll remove the data and sign them out
      await signOut();
      
      // Redirect to home page with a message
      router.push('/?deleted=true');
    } catch (error) {
      console.error('Error deleting account:', error);
      if (error instanceof Error) {
        if (error.message.includes('verification')) {
          alert('Account deletion requires additional verification. Your data has been removed from our system, but you may need to complete additional steps in your account settings.');
        } else {
          alert('Failed to delete account. Please try again or contact support.');
        }
      } else {
        alert('Failed to delete account. Please try again.');
      }
    } finally {
      setIsDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  const handleUpdateProfile = async () => {
    if (!user) return;
    
    try {
      setIsUpdating(true);
      await updateUser({
        clerkId: user.id,
        ...editForm,
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again.');
    } finally {
      setIsUpdating(false);
    }
  };

  const startEditing = () => {
    if (convexUser) {
      setEditForm({
        username: convexUser.username || '',
        grade: convexUser.grade || '',
        dob: convexUser.dob || '',
        phone: convexUser.phone || '',
      });
    }
    setIsEditing(true);
  };

  if (!user) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen p-6 max-w-4xl mx-auto">
        <div className="w-8 h-8 border-2 border-[#FF8F00]/30 border-t-[#FF8F00] rounded-full animate-spin"></div>
        <p className="text-[#888] text-sm mt-3">Loading your profile...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen p-6 max-w-4xl mx-auto text-[#E0E0E0]">
      
      {/* Header */}
      <div className="mb-8 text-left animate-slide-up-delay-100">
        <h1 className="text-4xl md:text-5xl font-bold mb-2">
          <GoldenText>Profile Settings</GoldenText>
        </h1>
        <p className="text-[#888] text-lg">Manage your account and preferences</p>
      </div>

      {/* Main Profile Card */}
      <div className="relative rounded-2xl p-[1px] bg-gradient-to-r from-[#FF8F00]/20 to-[#FFD54F]/20 mb-6 animate-slide-up-delay-200">
        <div className="rounded-2xl bg-[#1A1A1A] border border-[#333] p-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div className="flex items-center space-x-6 mb-6 md:mb-0">
              {user.imageUrl ? (
                <img
                  src={user.imageUrl}
                  alt="Profile"
                  className="w-20 h-20 rounded-full border-2 border-[#FF8F00]/30"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#FF8F00] to-[#FFB74D] flex items-center justify-center">
                  <User className="w-10 h-10 text-white" />
                </div>
              )}
              <div>
                <h2 className="text-2xl font-bold text-white">
                  {user.fullName || 'User'}
                </h2>
                <p className="text-[#888] flex items-center mt-1">
                  <Mail className="w-4 h-4 mr-2" />
                  {user.primaryEmailAddress?.emailAddress}
                </p>
                <p className="text-sm text-[#FF8F00] mt-1">
                  Member since {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Unknown'}
                </p>
              </div>
            </div>
            
            <div className="flex space-x-3">
              {!isEditing && (
                <button
                  onClick={startEditing}
                  className="flex items-center space-x-2 bg-[#FF8F00] hover:bg-[#FFA000] text-white px-4 py-2 rounded-lg transition-colors duration-200"
                >
                  <Edit3 className="w-4 h-4" />
                  <span>Edit Profile</span>
                </button>
              )}
            </div>
          </div>

          {/* Profile Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#888] mb-2 flex items-center">
                  <User className="w-4 h-4 mr-2" />
                  Username
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editForm.username}
                    onChange={(e) => setEditForm({ ...editForm, username: e.target.value })}
                    className="w-full bg-[#2A2A2A] text-[#E0E0E0] px-4 py-3 rounded-lg border border-[#444] focus:border-[#FF8F00] focus:outline-none transition-colors"
                  />
                ) : (
                  <div className="bg-[#2A2A2A]/50 text-[#E0E0E0] px-4 py-3 rounded-lg border border-[#333]">
                    {convexUser?.username || 'Not set'}
                  </div>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[#888] mb-2 flex items-center">
                  <GraduationCap className="w-4 h-4 mr-2" />
                  Grade/Level
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editForm.grade}
                    onChange={(e) => setEditForm({ ...editForm, grade: e.target.value })}
                    placeholder="e.g., Grade 12, University"
                    className="w-full bg-[#2A2A2A] text-[#E0E0E0] px-4 py-3 rounded-lg border border-[#444] focus:border-[#FF8F00] focus:outline-none transition-colors"
                  />
                ) : (
                  <div className="bg-[#2A2A2A]/50 text-[#E0E0E0] px-4 py-3 rounded-lg border border-[#333]">
                    {convexUser?.grade || 'Not specified'}
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#888] mb-2 flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  Date of Birth
                </label>
                {isEditing ? (
                  <input
                    type="date"
                    value={editForm.dob}
                    onChange={(e) => setEditForm({ ...editForm, dob: e.target.value })}
                    className="w-full bg-[#2A2A2A] text-[#E0E0E0] px-4 py-3 rounded-lg border border-[#444] focus:border-[#FF8F00] focus:outline-none transition-colors"
                  />
                ) : (
                  <div className="bg-[#2A2A2A]/50 text-[#E0E0E0] px-4 py-3 rounded-lg border border-[#333]">
                    {convexUser?.dob || 'Not provided'}
                  </div>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[#888] mb-2 flex items-center">
                  <Phone className="w-4 h-4 mr-2" />
                  Phone Number
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={editForm.phone}
                    onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                    placeholder="Your phone number"
                    className="w-full bg-[#2A2A2A] text-[#E0E0E0] px-4 py-3 rounded-lg border border-[#444] focus:border-[#FF8F00] focus:outline-none transition-colors"
                  />
                ) : (
                  <div className="bg-[#2A2A2A]/50 text-[#E0E0E0] px-4 py-3 rounded-lg border border-[#333]">
                    {convexUser?.phone || 'Not provided'}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Edit Actions */}
          {isEditing && (
            <div className="flex space-x-3 border-t border-[#333] pt-6">
              <button
                onClick={handleUpdateProfile}
                disabled={isUpdating}
                className="flex items-center space-x-2 bg-[#FF8F00] hover:bg-[#FFA000] disabled:bg-[#666] text-white px-6 py-2 rounded-lg transition-colors duration-200"
              >
                <Save className="w-4 h-4" />
                <span>{isUpdating ? 'Saving...' : 'Save Changes'}</span>
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="flex items-center space-x-2 bg-[#2A2A2A] hover:bg-[#333] text-[#E0E0E0] px-6 py-2 rounded-lg border border-[#444] transition-colors duration-200"
              >
                <X className="w-4 h-4" />
                <span>Cancel</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Account Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-slide-up-delay-300">
        {/* Security Settings */}
        <div className="relative rounded-2xl p-[1px] bg-gradient-to-r from-[#FF8F00]/10 to-[#FFD54F]/10">
          <div className="rounded-2xl bg-[#1A1A1A] border border-[#333] p-6">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
              <Settings className="w-5 h-5 mr-2 text-[#FF8F00]" />
              Account Security
            </h3>
            <div className="space-y-4">
              <button
                onClick={handleSignOut}
                className="w-full flex items-center justify-center space-x-2 bg-[#FF8F00] hover:bg-[#FFA000] text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="relative rounded-2xl p-[1px] bg-gradient-to-r from-red-500/20 to-red-600/20">
          <div className="rounded-2xl bg-[#1A1A1A] border border-red-500/30 p-6">
            <h3 className="text-xl font-semibold text-red-400 mb-4 flex items-center">
              <Trash2 className="w-5 h-5 mr-2" />
              Danger Zone
            </h3>
            <p className="text-[#888] text-sm mb-4">
              Once you delete your account, there is no going back. This action cannot be undone.
            </p>
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="w-full flex items-center justify-center space-x-2 bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200"
            >
              <Trash2 className="w-4 h-4" />
              <span>Delete Account</span>
            </button>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="relative rounded-2xl p-[1px] bg-gradient-to-r from-red-500/50 to-red-600/50 max-w-md w-full">
            <div className="rounded-2xl bg-[#1A1A1A] border border-red-500/30 p-6">
              <h3 className="text-xl font-bold text-white mb-4">Delete Account</h3>
              <p className="text-[#E0E0E0] mb-4">
                Are you absolutely sure you want to delete your account? This action will:
              </p>
              <ul className="text-[#888] text-sm mb-4 space-y-1">
                <li>• Permanently delete your profile and data</li>
                <li>• Remove all your messages and history</li>
                <li>• Sign you out of the application</li>
              </ul>
              <p className="text-[#FFB74D] text-xs mb-6 bg-[#2A2A2A] p-3 rounded-lg border border-[#444]">
                Note: Your authentication account may require additional verification steps to be fully deleted. Contact support if needed.
              </p>
              <div className="flex space-x-3">
                <button
                  onClick={handleDeleteAccount}
                  disabled={isDeleting}
                  className="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-red-800 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                >
                  {isDeleting ? 'Deleting...' : 'Yes, Delete Account'}
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  disabled={isDeleting}
                  className="flex-1 bg-[#2A2A2A] hover:bg-[#333] disabled:bg-[#666] text-[#E0E0E0] font-medium py-2 px-4 rounded-lg border border-[#444] transition-colors duration-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

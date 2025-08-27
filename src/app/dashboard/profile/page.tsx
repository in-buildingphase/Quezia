'use client';

import { useUser, useClerk } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useMutation, useQuery } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import { useState, useEffect } from 'react';
import { User, Mail, Phone, Calendar, Settings, LogOut, Trash2, Edit3, Save, X } from 'lucide-react';
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
  const [editingField, setEditingField] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [editForm, setEditForm] = useState({
    username: '',
    dob: '',
    phone: '',
  });

  // Initialize form when convex user data loads
  useEffect(() => {
    if (convexUser) {
      setEditForm({
        username: convexUser.username || '',
        dob: convexUser.dob || '',
        phone: convexUser.phone || '',
      });
    }
  }, [convexUser]);

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
      setEditingField(null);
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again.');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleFieldUpdate = async (field: string, value: string) => {
    if (!user) return;
    
    try {
      await updateUser({
        clerkId: user.id,
        [field]: value,
      });
      setEditingField(null);
    } catch (error) {
      console.error('Error updating field:', error);
      alert('Failed to update. Please try again.');
    }
  };

  const startEditingField = (field: string) => {
    setEditingField(field);
    if (convexUser) {
      setEditForm({
        username: convexUser.username || '',
        dob: convexUser.dob || '',
        phone: convexUser.phone || '',
      });
    }
  };

  const startEditing = () => {
    if (convexUser) {
      setEditForm({
        username: convexUser.username || '',
        dob: convexUser.dob || '',
        phone: convexUser.phone || '',
      });
    }
    setIsEditing(true);
  };

  // Show loading state
  if (!user || convexUser === undefined) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#FF8F00]"></div>
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
      <div className={`relative rounded-2xl p-[1px] bg-gradient-to-r from-[#FF8F00]/20 to-[#FFD54F]/20 mb-6 animate-slide-up-delay-200 transition-all duration-300`}>
        <div className={`rounded-2xl bg-[#1A1A1A] p-8 transition-all duration-300 ${
          isEditing ? 'border-2 border-[#FF8F00]/50' : 'border border-[#333]'
        }`}>
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
                <div className="group relative">
                  {editingField === 'username' ? (
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={editForm.username}
                        onChange={(e) => setEditForm({ ...editForm, username: e.target.value })}
                        onBlur={() => handleFieldUpdate('username', editForm.username)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleFieldUpdate('username', editForm.username);
                          if (e.key === 'Escape') setEditingField(null);
                        }}
                        className="text-2xl font-bold bg-transparent text-white border-b-2 border-[#FF8F00] focus:outline-none transition-colors"
                        placeholder="Enter username"
                        autoFocus
                      />
                    </div>
                  ) : (
                    <h2 
                      className={`text-2xl font-bold text-white mt-2 transition-all duration-200 ${
                        isEditing ? 'cursor-pointer hover:text-[#FF8F00] group-hover:opacity-80' : ''
                      }`}
                      onClick={() => isEditing && startEditingField('username')}
                    >
                      {convexUser?.username || 'Click to add username'}
                      {isEditing && <Edit3 className="w-4 h-4 inline ml-2 opacity-0 group-hover:opacity-50 transition-opacity" />}
                    </h2>
                  )}
                </div>
                <p className="text-[#888] flex items-center mt-1">
                  <Mail className="w-4 h-4 mr-2" />
                  {user.primaryEmailAddress?.emailAddress}
                </p>
                <p className="text-sm text-[#FF8F00] mt-1">
                  Member since {user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  }) : 'Unknown'}
                </p>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="flex items-center space-x-2 bg-[#FF8F00] hover:bg-[#FFA000] text-white px-4 py-2 rounded-lg transition-colors duration-200"
              >
                <Edit3 className="w-4 h-4" />
                <span>{isEditing ? 'Done' : 'Edit Profile'}</span>
              </button>
            </div>
          </div>

          {/* Profile Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="space-y-4">
              <div className="group">
                <label className="block text-sm font-medium text-[#888] mb-2 flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  Date of Birth
                </label>
                {editingField === 'dob' ? (
                  <input
                    type="date"
                    value={editForm.dob}
                    onChange={(e) => setEditForm({ ...editForm, dob: e.target.value })}
                    onBlur={() => handleFieldUpdate('dob', editForm.dob)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleFieldUpdate('dob', editForm.dob);
                      if (e.key === 'Escape') setEditingField(null);
                    }}
                    className="w-full bg-[#2A2A2A] text-[#E0E0E0] px-4 py-3 rounded-lg border-2 border-[#FF8F00] focus:outline-none transition-colors"
                    autoFocus
                  />
                ) : (
                  <div 
                    className={`bg-[#2A2A2A]/50 text-[#E0E0E0] px-4 py-3 rounded-lg border border-[#333] transition-all duration-200 ${
                      isEditing ? 'hover:border-[#FF8F00] cursor-pointer hover:bg-[#2A2A2A]' : ''
                    } group-hover:shadow-lg`}
                    onClick={() => isEditing && startEditingField('dob')}
                  >
                    <div className="flex items-center justify-between">
                      <span>{convexUser?.dob || 'Not provided'}</span>
                      {isEditing && <Edit3 className="w-4 h-4 opacity-0 group-hover:opacity-50 transition-opacity" />}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div className="group">
                <label className="block text-sm font-medium text-[#888] mb-2 flex items-center">
                  <Phone className="w-4 h-4 mr-2" />
                  Phone Number
                </label>
                {editingField === 'phone' ? (
                  <input
                    type="tel"
                    value={editForm.phone}
                    onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                    onBlur={() => handleFieldUpdate('phone', editForm.phone)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleFieldUpdate('phone', editForm.phone);
                      if (e.key === 'Escape') setEditingField(null);
                    }}
                    placeholder="Your phone number"
                    className="w-full bg-[#2A2A2A] text-[#E0E0E0] px-4 py-3 rounded-lg border-2 border-[#FF8F00] focus:outline-none transition-colors"
                    autoFocus
                  />
                ) : (
                  <div 
                    className={`bg-[#2A2A2A]/50 text-[#E0E0E0] px-4 py-3 rounded-lg border border-[#333] transition-all duration-200 ${
                      isEditing ? 'hover:border-[#FF8F00] cursor-pointer hover:bg-[#2A2A2A]' : ''
                    } group-hover:shadow-lg`}
                    onClick={() => isEditing && startEditingField('phone')}
                  >
                    <div className="flex items-center justify-between">
                      <span>{convexUser?.phone || 'Not provided'}</span>
                      {isEditing && <Edit3 className="w-4 h-4 opacity-0 group-hover:opacity-50 transition-opacity" />}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Modern inline editing - no more traditional edit actions */}
        </div>
      </div>

      {/* Course Enrollment Section */}
      <div className="mt-8 mb-8 animate-slide-up-delay-200">
        <div className="relative rounded-2xl p-[1px] bg-gradient-to-r from-[#FF8F00]/20 to-[#FFD54F]/20">
          <div className="rounded-2xl bg-[#1A1A1A] border border-[#333] p-6">
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
              <Calendar className="w-5 h-5 mr-3 text-[#FF8F00]" />
              Course Enrollment
            </h3>
            
            {!convexUser ? (
              <div className="bg-[#2A2A2A]/50 border border-[#333] rounded-xl p-8">
                <div className="flex flex-col items-center justify-center space-y-3">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#FF8F00]"></div>
                  <p className="text-[#888] text-sm">Loading subscription details...</p>
                </div>
              </div>
            ) : convexUser.subscriptionType === "free" ? (
              <div className="bg-[#2A2A2A]/50 border border-[#333] rounded-xl p-8">
                <div className="flex flex-col items-center text-center space-y-6 max-w-md mx-auto">
                  {/* Plan Header */}
                  <div className="space-y-2">
                    <h4 className="text-xl font-semibold text-white">Free Plan</h4>
                    <p className="text-[#888]">You are currently on the free plan with limited access.</p>
                  </div>
                  
                  {/* Features List */}
                  <div className="w-full space-y-3">
                    <div className="flex items-center text-[#888] text-sm">
                      <div className="w-2 h-2 bg-[#666] rounded-full mr-4 flex-shrink-0"></div>
                      <span>Limited practice questions</span>
                    </div>
                    <div className="flex items-center text-[#888] text-sm">
                      <div className="w-2 h-2 bg-[#666] rounded-full mr-4 flex-shrink-0"></div>
                      <span>Basic analytics</span>
                    </div>
                    <div className="flex items-center text-[#888] text-sm">
                      <div className="w-2 h-2 bg-[#666] rounded-full mr-4 flex-shrink-0"></div>
                      <span>Community support</span>
                    </div>
                  </div>

                  {/* Upgrade Button */}
                  <button 
                    className="w-full max-w-xs px-8 py-4 bg-gradient-to-r from-[#FF8F00] to-[#FFB74D] text-black font-semibold rounded-xl hover:shadow-lg hover:shadow-orange-500/25 transition-all duration-300 transform hover:scale-105"
                    onClick={() => {
                      // TODO: Implement upgrade functionality
                      console.log("Upgrade to premium clicked");
                    }}
                  >
                    Upgrade to Premium
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-gradient-to-r from-[#2A2A2A]/50 to-[#333]/30 border border-[#FF8F00]/30 rounded-xl p-8">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between space-y-6 lg:space-y-0 lg:space-x-8">
                  {/* Left Section - Plan Info */}
                  <div className="flex-1 space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-[#FF8F00] rounded-full flex-shrink-0"></div>
                      <h4 className="text-xl font-semibold text-white">Premium Plan</h4>
                    </div>
                    
                    <p className="text-[#888]">You have access to all premium features</p>
                    
                    {/* Enrolled Course */}
                    {convexUser?.courseEnrolled && (
                      <div className="space-y-3 pt-2">
                        <div className="text-sm font-medium text-[#888]">Enrolled Course:</div>
                        <div className="inline-flex items-center px-4 py-2 bg-[#FF8F00]/20 border border-[#FF8F00]/30 rounded-lg">
                          <span className="text-[#FF8F00] font-semibold">{convexUser.courseEnrolled}</span>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Right Section - Features */}
                  <div className="lg:max-w-xs space-y-4">
                    <div className="text-sm font-medium text-[#888]">Premium Features:</div>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-[#FF8F00] rounded-full mr-3 flex-shrink-0"></div>
                        <span className="text-sm text-[#E0E0E0]">Unlimited practice questions</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-[#FF8F00] rounded-full mr-3 flex-shrink-0"></div>
                        <span className="text-sm text-[#E0E0E0]">Advanced analytics</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-[#FF8F00] rounded-full mr-3 flex-shrink-0"></div>
                        <span className="text-sm text-[#E0E0E0]">Priority support</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-[#FF8F00] rounded-full mr-3 flex-shrink-0"></div>
                        <span className="text-sm text-[#E0E0E0]">All course materials</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
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

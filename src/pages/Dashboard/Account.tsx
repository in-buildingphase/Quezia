import React, { useCallback } from 'react'
import ProfileHeader from '../../components/Dashboard/Profile/ProfileHeader'
import AcademicContext from '../../components/Dashboard/Profile/AcademicContext'
import SubscriptionCard from '../../components/Dashboard/Profile/SubscriptionCard'
import LoadingSpinner from '../../components/common/LoadingSpinner'
import { useAuthContext } from '../../hooks/useAuthContext'
import { authService, type UpdateProfileDto } from '../../services/auth/auth.service'

const toTitleCase = (s: string) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase()

const Account: React.FC = () => {
  const { user, updateUser, loading } = useAuthContext()

  const handleProfileUpdate = useCallback(
    async (fields: { displayName: string }) => {
      const updated = await authService.updateProfile(fields)
      updateUser(updated)
    },
    [updateUser],
  )

  const handleContextUpdate = useCallback(
    async (fields: Partial<{ targetExam: string; targetExamYear: number; preparationStage: string; studyGoal: string }>) => {
      const payload: UpdateProfileDto = {}
      if (fields.targetExam !== undefined) payload.targetExamId = fields.targetExam
      if (fields.targetExamYear !== undefined) payload.targetExamYear = fields.targetExamYear
      if (fields.preparationStage !== undefined) payload.preparationStage = fields.preparationStage.toUpperCase() as UpdateProfileDto['preparationStage']
      if (fields.studyGoal !== undefined) payload.studyGoal = fields.studyGoal
      const updated = await authService.updateProfile(payload)
      updateUser(updated)
    },
    [updateUser],
  )

  if (loading) return <LoadingSpinner fullScreen />
  if (!user) return null

  const p = user.profile

  return (
    <div className="min-h-screen bg-[var(--color-bg-base)] px-4 sm:px-6 py-8">
      <div className="max-w-3xl mx-auto space-y-5">
        {/* Page title */}
        <div className="mb-2">
          <h1 className="text-2xl font-semibold text-[var(--color-text-primary)]">Profile</h1>
          <p className="text-sm text-[var(--color-text-tertiary)] mt-1">
            Manage your identity, academic preferences, and subscription.
          </p>
        </div>

        <ProfileHeader
          displayName={p?.displayName ?? user.username}
          email={user.email}
          username={user.username}
          avatarUrl={p?.avatarUrl ?? null}
          accountTier={user.role}
          onUpdate={handleProfileUpdate}
        />

        <AcademicContext
          targetExam={p?.targetExamId ?? ''}
          targetExamYear={p?.targetExamYear ?? new Date().getFullYear()}
          preparationStage={p?.preparationStage ? toTitleCase(p.preparationStage) : ''}
          studyGoal={p?.studyGoal ?? ''}
          onUpdate={handleContextUpdate}
        />

        <SubscriptionCard
          planName="Free Tier"
          status="ACTIVE"
          expiresAt="Mar 15, 2026"
          daysRemaining={20}
        />
      </div>
    </div>
  )
}

export default Account
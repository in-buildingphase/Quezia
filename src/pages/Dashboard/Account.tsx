import React from 'react'
import { UserCircle } from '@phosphor-icons/react'

const Account: React.FC = () => {
  return (
    <div className="min-h-screen bg-[var(--color-bg-base)] px-6 py-12 flex items-center justify-center">
      <div className="text-center space-y-4 max-w-sm">
        <div className="mx-auto w-12 h-12 rounded-2xl bg-[var(--color-bg-subtle)] border border-[var(--color-border-default)] flex items-center justify-center">
          <UserCircle size={22} className="text-[var(--color-text-disabled)]" />
        </div>
        <h1 className="text-lg font-semibold text-[var(--color-text-primary)]">Account</h1>
        <p className="text-sm text-[var(--color-text-disabled)] leading-relaxed">
          Manage your profile, exam preferences, and subscription — coming soon.
        </p>
        <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-disabled)] border border-[var(--color-border-default)] rounded-full px-4 py-1.5">
          Coming Soon
        </span>
      </div>
    </div>
  )
}

export default Account
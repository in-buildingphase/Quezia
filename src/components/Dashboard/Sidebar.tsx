import React, { useState } from 'react'
import { useNavigate, NavLink, useLocation } from 'react-router-dom'
import {
  House,
  ClipboardText,
  Compass,
  ChartBar,
  User,
  Gear,
  CaretLeft,
  CaretRight,
  CaretDown,
  CaretUp,
  Trash,
} from '@phosphor-icons/react'
import ConfirmModal from '../common/ConfirmModal'
import { MockDatabase } from '../../services/mockDatabase'

interface NavItem {
  label: string
  href: string
  icon: React.ElementType
}

const topNav: NavItem[] = [
  { label: 'Home', href: '/dashboard/home', icon: House },
  { label: 'Tests', href: '/dashboard/tests', icon: ClipboardText },
  { label: 'Discover', href: '/dashboard/discover', icon: Compass },
  { label: 'Analytics', href: '/dashboard/analytics', icon: ChartBar },
]

const bottomNav: NavItem[] = [
  { label: 'Account', href: '/dashboard/account', icon: User },
  { label: 'Settings', href: '/dashboard/settings', icon: Gear },
]

const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  const isTestsRoute = location.pathname.startsWith('/dashboard/tests')
  const [testsOpen, setTestsOpen] = useState(isTestsRoute)

  // Use useMemo to get the most recent 10 tests from MockDatabase
  const recentTests = React.useMemo(() => {
    const allTests = MockDatabase.getAllTests()
    const allAttempts = MockDatabase.getAllAttempts()

    // Sort tests by their most recent interaction (attempt) date, or creation order if no attempt
    const sorted = [...allTests].sort((a, b) => {
      const attemptA = allAttempts.find(att => att.testId === a.id)
      const attemptB = allAttempts.find(att => att.testId === b.id)

      if (attemptA && attemptB) {
        return new Date(attemptB.createdAt).getTime() - new Date(attemptA.createdAt).getTime()
      }
      if (attemptA) return -1
      if (attemptB) return 1

      // Fallback: reverse order of creation (test-100 first)
      return parseInt(b.id.split('-')[1]) - parseInt(a.id.split('-')[1])
    })

    return sorted.slice(0, 10).map(t => ({
      id: t.id,
      name: t.title
    }))
  }, [])

  const [tests, setTests] = useState(recentTests)
  const [deleteModal, setDeleteModal] = useState<{ open: boolean; test: { id: string; name: string } | null }>({
    open: false,
    test: null,
  })

  const handleDeleteTest = () => {
    if (deleteModal.test) {
      setTests((prev) => prev.filter((t) => t.id !== deleteModal.test!.id))
      // Navigate away if we're on the deleted test's page
      if (location.pathname === `/dashboard/tests/thread/${deleteModal.test.id}`) {
        navigate('/dashboard/tests')
      }
    }
    setDeleteModal({ open: false, test: null })
  }

  return (
    <>
      <aside
        className={`h-screen sticky top-0 flex flex-col bg-[var(--color-bg-base)] border-r border-[var(--color-border-default)] transition-all duration-300 ease-out ${collapsed ? 'w-[72px]' : 'w-[260px]'
          }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 h-16 shrink-0">
          {!collapsed && (
            <span className="text-lg font-semibold text-[var(--color-text-primary)] tracking-tight">
              Quezia
            </span>
          )}

          <button
            onClick={() => setCollapsed(!collapsed)}
            className={`p-1.5 rounded-lg text-[var(--color-text-disabled)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-muted)] transition-all ${collapsed ? 'mx-auto' : ''
              }`}
          >
            {collapsed ? (
              <CaretRight size={16} weight="bold" />
            ) : (
              <CaretLeft size={16} weight="bold" />
            )}
          </button>
        </div>

        {/* Navigation */}
        <div className="flex-1 flex flex-col py-4 px-3 overflow-hidden">
          <nav className="space-y-0.5">
            {topNav.map((item) => {
              const Icon = item.icon
              const active =
                item.label === 'Tests'
                  ? isTestsRoute
                  : location.pathname === item.href

              if (item.label === 'Tests') {
                return (
                  <div key="Tests">
                    {/* Tests parent */}
                    <div
                      className={`group relative flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-all ${collapsed ? 'justify-center' : ''
                        }`}
                      onClick={() => navigate('/dashboard/tests')}
                    >
                      {active && (
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-[var(--color-text-primary)] rounded-r-full" />
                      )}

                      <Icon
                        size={20}
                        weight={active ? 'fill' : 'regular'}
                        className={`shrink-0 ${active
                          ? 'text-[var(--color-text-primary)]'
                          : 'text-[var(--color-text-tertiary)] group-hover:text-[var(--color-text-secondary)]'
                          }`}
                      />

                      {!collapsed && (
                        <>
                          <span
                            className={`text-sm font-medium flex-1 ${active ? 'text-[var(--color-text-primary)]' : 'text-[var(--color-text-tertiary)]'
                              }`}
                          >
                            Tests
                          </span>

                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              setTestsOpen((p) => !p)
                            }}
                            className="text-[var(--color-text-disabled)] hover:text-[var(--color-text-secondary)]"
                          >
                            {testsOpen ? (
                              <CaretUp size={14} />
                            ) : (
                              <CaretDown size={14} />
                            )}
                          </button>
                        </>
                      )}
                    </div>

                    {/* Tests dropdown */}
                    {!collapsed && testsOpen && (
                      <div className="mt-1 ml-8 pr-2">
                        <div className="max-h-[320px] overflow-y-auto space-y-0.5 scrollbar-thin scrollbar-thumb-white/10">
                          {tests.map((test) => {
                            const testActive =
                              location.pathname ===
                              `/dashboard/tests/thread/${test.id}`

                            return (
                              <div
                                key={test.id}
                                className={`group/test flex items-center justify-between rounded-md transition-colors ${testActive
                                  ? 'text-[var(--color-text-primary)] bg-[var(--color-bg-muted)]'
                                  : 'text-[var(--color-text-tertiary)] hover:text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-subtle)]'
                                  }`}
                              >
                                <NavLink
                                  to={`/dashboard/tests/thread/${test.id}`}
                                  className="flex-1 px-3 py-1.5 text-sm"
                                >
                                  {test.name}
                                </NavLink>
                                <button
                                  onClick={(e) => {
                                    e.preventDefault()
                                    e.stopPropagation()
                                    setDeleteModal({ open: true, test })
                                  }}
                                  className="opacity-0 group-hover/test:opacity-100 p-1.5 mr-1 rounded text-[var(--color-text-disabled)] hover:text-[var(--color-error)] hover:bg-[var(--color-bg-muted)] transition-all"
                                >
                                  <Trash size={14} />
                                </button>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                )
              }

              // Normal nav items
              return (
                <NavLink
                  key={item.label}
                  to={item.href}
                  className={`group relative flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${collapsed ? 'justify-center' : ''
                    }`}
                >
                  {active && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-[var(--color-text-primary)] rounded-r-full" />
                  )}

                  <Icon
                    size={20}
                    weight={active ? 'fill' : 'regular'}
                    className={`shrink-0 ${active
                      ? 'text-[var(--color-text-primary)]'
                      : 'text-[var(--color-text-tertiary)] group-hover:text-[var(--color-text-secondary)]'
                      }`}
                  />

                  {!collapsed && (
                    <span
                      className={`text-sm font-medium ${active ? 'text-[var(--color-text-primary)]' : 'text-[var(--color-text-tertiary)]'
                        }`}
                    >
                      {item.label}
                    </span>
                  )}
                </NavLink>
              )
            })}
          </nav>

          {/* Divider */}
          <div className="mt-auto mx-3 h-px bg-[var(--color-border-default)]" />

          {/* Bottom Nav */}
          <nav className="space-y-0.5 pb-4">
            {bottomNav.map((item) => {
              const active = location.pathname === item.href
              const Icon = item.icon

              return (
                <NavLink
                  key={item.label}
                  to={item.href}
                  className={`group relative flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${collapsed ? 'justify-center' : ''
                    }`}
                >
                  {active && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-[var(--color-text-primary)] rounded-r-full" />
                  )}

                  <Icon
                    size={20}
                    weight={active ? 'fill' : 'regular'}
                    className={`shrink-0 ${active
                      ? 'text-[var(--color-text-primary)]'
                      : 'text-[var(--color-text-tertiary)] group-hover:text-[var(--color-text-secondary)]'
                      }`}
                  />

                  {!collapsed && (
                    <span
                      className={`text-sm font-medium ${active ? 'text-[var(--color-text-primary)]' : 'text-[var(--color-text-tertiary)]'
                        }`}
                    >
                      {item.label}
                    </span>
                  )}
                </NavLink>
              )
            })}
          </nav>
        </div>

      </aside>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={deleteModal.open}
        onClose={() => setDeleteModal({ open: false, test: null })}
        title="Delete Test"
        description={`Are you sure you want to delete "${deleteModal.test?.name}"? This action cannot be undone.`}
        cancelButton={{
          label: 'Cancel',
          onClick: () => setDeleteModal({ open: false, test: null }),
        }}
        confirmButton={{
          label: 'Delete',
          onClick: handleDeleteTest,
          variant: 'danger',
        }}
      />
    </>
  )
}

export default Sidebar

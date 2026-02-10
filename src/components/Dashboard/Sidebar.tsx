import React, { useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
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

// Initial dummy tests
const initialTests = Array.from({ length: 14 }).map((_, i) => ({
  id: `test-${i + 1}`,
  name: `Test ${String.fromCharCode(65 + i)}`,
}))

const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  const isTestsRoute = location.pathname.startsWith('/dashboard/tests')
  const [testsOpen, setTestsOpen] = useState(isTestsRoute)
  const [tests, setTests] = useState(initialTests)
  const [deleteModal, setDeleteModal] = useState<{ open: boolean; test: typeof initialTests[0] | null }>({
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
      className={`h-screen sticky top-0 flex flex-col bg-[#0A0A0A] border-r border-white/[0.08] transition-all duration-300 ease-out ${
        collapsed ? 'w-[72px]' : 'w-[260px]'
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 h-16 shrink-0">
        {!collapsed && (
          <span className="text-lg font-semibold text-white tracking-tight">
            Quezia
          </span>
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className={`p-1.5 rounded-lg text-gray-500 hover:text-white hover:bg-white/10 transition-all ${
            collapsed ? 'mx-auto' : ''
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
                    className={`group relative flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-all ${
                      collapsed ? 'justify-center' : ''
                    }`}
                    onClick={() => navigate('/dashboard/tests')}
                  >
                    {active && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-white rounded-r-full" />
                    )}

                    <Icon
                      size={20}
                      weight={active ? 'fill' : 'regular'}
                      className={`shrink-0 ${
                        active
                          ? 'text-white'
                          : 'text-gray-400 group-hover:text-gray-200'
                      }`}
                    />

                    {!collapsed && (
                      <>
                        <span
                          className={`text-sm font-medium flex-1 ${
                            active ? 'text-white' : 'text-gray-400'
                          }`}
                        >
                          Tests
                        </span>

                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            setTestsOpen((p) => !p)
                          }}
                          className="text-gray-500 hover:text-gray-300"
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
                              className={`group/test flex items-center justify-between rounded-md transition-colors ${
                                testActive
                                  ? 'text-white bg-white/10'
                                  : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
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
                                className="opacity-0 group-hover/test:opacity-100 p-1.5 mr-1 rounded text-gray-500 hover:text-red-400 hover:bg-white/10 transition-all"
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
                className={`group relative flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${
                  collapsed ? 'justify-center' : ''
                }`}
              >
                {active && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-white rounded-r-full" />
                )}

                <Icon
                  size={20}
                  weight={active ? 'fill' : 'regular'}
                  className={`shrink-0 ${
                    active
                      ? 'text-white'
                      : 'text-gray-400 group-hover:text-gray-200'
                  }`}
                />

                {!collapsed && (
                  <span
                    className={`text-sm font-medium ${
                      active ? 'text-white' : 'text-gray-400'
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
        <div className="mt-auto mx-3 h-px bg-white/[0.08]" />

        {/* Bottom Nav */}
        <nav className="space-y-0.5 pb-4">
          {bottomNav.map((item) => {
            const active = location.pathname === item.href
            const Icon = item.icon

            return (
              <NavLink
                key={item.label}
                to={item.href}
                className={`group relative flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${
                  collapsed ? 'justify-center' : ''
                }`}
              >
                {active && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-white rounded-r-full" />
                )}

                <Icon
                  size={20}
                  weight={active ? 'fill' : 'regular'}
                  className={`shrink-0 ${
                    active
                      ? 'text-white'
                      : 'text-gray-400 group-hover:text-gray-200'
                  }`}
                />

                {!collapsed && (
                  <span
                    className={`text-sm font-medium ${
                      active ? 'text-white' : 'text-gray-400'
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

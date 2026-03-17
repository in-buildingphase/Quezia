import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../../components/Dashboard/Sidebar'
import ActiveTestNotification from '../../components/Dashboard/Tests/ActiveTestNotification'

const Dashboard: React.FC = () => {
  return (
    <div className="flex w-full min-h-screen bg-[var(--color-bg-base)]">
      {/* Sidebar */}
      <Sidebar />

      {/* Right content area */}
      <main className="flex-1 min-w-0 overflow-x-hidden overflow-y-auto">
        <Outlet />
      </main>

      {/* Global In-Test Popup */}
      <ActiveTestNotification />
    </div>
  )
}

export default Dashboard
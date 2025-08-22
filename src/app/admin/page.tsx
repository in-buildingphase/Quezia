import { EnhancedTagManager } from '../../components/admin/enhanced-tag-manager';

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-black w-full">
      {/* Header with gradient */}
      <div className="relative w-full">
        <div className="absolute inset-0 bg-gradient-to-r from-[#FF8F00]/10 to-[#FFD54F]/5 backdrop-blur-sm" />
        <div className="relative z-10 px-8 py-12 w-full">
          <div className="w-full">
            <div className="flex items-center gap-4 mb-2">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FF8F00] to-[#FFA000] flex items-center justify-center">
                <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-[#FF8F00] to-[#FFD54F] bg-clip-text text-transparent">
                  Admin Dashboard
                </h1>
                <p className="text-[#E0E0E0] text-lg">Manage your application tags and system settings</p>
              </div>
            </div>
            
            {/* Status indicators */}
            <div className="flex items-center gap-4 mt-6">
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#2A2A2A] border border-[#444]">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="text-sm text-[#E0E0E0]">System Online</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#2A2A2A] border border-[#444]">
                <div className="w-2 h-2 rounded-full bg-[#FF8F00]"></div>
                <span className="text-sm text-[#E0E0E0]">Database Connected</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="px-8 pb-8 w-full">
        <div className="w-full">
          <EnhancedTagManager />
        </div>
      </div>
    </div>
  );
}

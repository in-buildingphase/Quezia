'use client';

import { useState } from 'react';
import TagManager from '../../components/admin/tag-manager';
import FeatureManager from '../../components/admin/feature-manager';

type AdminSection = {
  id: string;
  label: string;
  component: React.ComponentType;
  description?: string;
};

const adminSections: AdminSection[] = [
  {
    id: 'tags',
    label: 'Tags Management',
    component: TagManager,
    description: 'Manage subject tags and filters'
  },
  {
    id: 'features',
    label: 'ActionDock Features',
    component: FeatureManager,
    description: 'Configure ActionDock input features'
  },
  // Add more sections here as needed:
  // {
  //   id: 'users',
  //   label: 'User Management',
  //   component: UserManager,
  //   description: 'Manage user accounts and permissions'
  // },
  // {
  //   id: 'messages',
  //   label: 'Message Management',
  //   component: MessageManager,
  //   description: 'View and moderate messages'
  // },
];

export default function AdminPage() {
  const [activeSection, setActiveSection] = useState<string>(adminSections[0].id);

  const currentSection = adminSections.find(section => section.id === activeSection);
  const CurrentComponent = currentSection?.component;

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#FF8F00] mb-2">Admin Panel</h1>
          <p className="text-gray-400">Manage system settings and content</p>
        </div>

        {/* Navigation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
          {adminSections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`p-4 rounded-lg text-left transition-all ${
                activeSection === section.id
                  ? 'bg-[#FF8F00] text-black shadow-lg scale-105'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:scale-102'
              }`}
            >
              <h3 className="font-medium mb-1">{section.label}</h3>
              {section.description && (
                <p className={`text-sm ${
                  activeSection === section.id ? 'text-black/70' : 'text-gray-500'
                }`}>
                  {section.description}
                </p>
              )}
            </button>
          ))}
        </div>

        {/* Active Section Header */}
        {currentSection && (
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-white mb-2">
              {currentSection.label}
            </h2>
            {currentSection.description && (
              <p className="text-gray-400">{currentSection.description}</p>
            )}
          </div>
        )}

        {/* Content */}
        <div className="bg-gray-900 rounded-lg p-6 min-h-[400px]">
          {CurrentComponent ? (
            <CurrentComponent />
          ) : (
            <div className="text-center text-gray-500 py-8">
              <p>Section not found</p>
            </div>
          )}
        </div>

        {/* Warning Notice */}
        <div className="mt-8 p-4 bg-red-900/20 border border-red-500/30 rounded-lg">
          <p className="text-red-400 text-sm">
            ⚠️ <strong>Development Only:</strong> This admin panel should be removed before production deployment.
            <br />
            <span className="text-red-300/80">
              Remove the entire <code>/src/app/admin</code> folder and <code>/src/components/admin</code> folder before going live.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

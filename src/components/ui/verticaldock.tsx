"use client";

import React, { useState } from "react";
import { useRouter, usePathname } from 'next/navigation';
import {
  Home,
  FileText,
  BarChart3,
  History,
  Trophy,
  Zap,
  Newspaper,
  User,
  HelpCircle,
} from "lucide-react";

interface VerticalDockIconProps {
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
  tooltip?: string;
  isSelected?: boolean;
}

const VerticalDockIcon = ({
  className = "",
  children,
  onClick,
  tooltip,
  isSelected = false,
}: VerticalDockIconProps) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative flex items-center justify-center cursor-pointer rounded-xl w-12 h-12 ${
        isSelected 
          ? 'bg-gradient-to-br from-[#FF8F00] to-[#FFA000] border border-[#FF8F00]' 
          : 'bg-[#2A2A2A] border border-[#444] hover:border-[#FF8F00]/50 hover:bg-[#333]'
      } ${className}`}
      onClick={onClick}
      data-icon
    >
      {/* Hover glow - only for non-selected items */}
      {!isSelected && (
        <div
          className={`absolute inset-0 rounded-xl bg-gradient-to-br from-[#FF8F00]/15 to-[#FFD54F]/8 transition-opacity duration-300 ${
            hovered ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}

      {/* Icon */}
      <div className={`relative z-10 transition-colors duration-300 ${
        isSelected 
          ? 'text-black' 
          : 'text-[#E0E0E0] hover:text-[#FF8F00]'
      }`}>
        {children}
      </div>
    </div>
  );
};

const VerticalDock = () => {
  const router = useRouter();
  const pathname = usePathname();
  
  // Determine selected item based on current path
  const getSelectedItem = () => {
    if (pathname === '/dashboard' || pathname === '/dashboard/home') return 'Home';
    if (pathname === '/dashboard/papers') return 'Papers';
    if (pathname === '/dashboard/analytics') return 'Analytics';
    if (pathname === '/dashboard/contests') return 'Contests';
    if (pathname === '/dashboard/news') return 'News';
    if (pathname === '/dashboard/history') return 'History';
    if (pathname === '/dashboard/profile') return 'Profile';
    if (pathname === '/dashboard/help') return 'Help';
    return 'Home';
  };

  const selectedItem = getSelectedItem();

  const mainDockItems = [
    { 
      icon: <Home size={18} />, 
      tooltip: "Home", 
      id: "Home",
      onClick: () => {
        router.push('/dashboard/home');
      }
    },
    { 
      icon: <FileText size={18} />, 
      tooltip: "Papers", 
      id: "Papers",
      onClick: () => {
        router.push('/dashboard/papers');
      }
    },
    { 
      icon: <BarChart3 size={18} />, 
      tooltip: "Analytics", 
      id: "Analytics",
      onClick: () => {
        router.push('/dashboard/analytics');
      }
    },
    { 
      icon: <Trophy size={18} />, 
      tooltip: "Contests", 
      id: "Contests",
      onClick: () => {
        router.push('/dashboard/contests');
      }
    },
    { 
      icon: <Newspaper size={18} />, 
      tooltip: "News", 
      id: "News",
      onClick: () => {
        router.push('/dashboard/news');
      }
    },
    { 
      icon: <History size={18} />, 
      tooltip: "History", 
      id: "History",
      onClick: () => {
        router.push('/dashboard/history');
      }
    },
  ];

  const bottomDockItems = [
    { 
      icon: <User size={18} />, 
      tooltip: "Profile", 
      id: "Profile",
      onClick: () => {
        router.push('/dashboard/profile');
      }
    },
    { 
      icon: <HelpCircle size={18} />, 
      tooltip: "Help", 
      id: "Help",
      onClick: () => {
        router.push('/dashboard/help');
      }
    },
  ];

  return (
    <div
      className="fixed left-0 top-0 flex flex-col w-20 p-4 rounded-r-2xl border-r border-t border-b border-[#333] backdrop-blur-md z-20"
      style={{
        background: "linear-gradient(145deg, #1A1A1A 95%, #2A2A2A 90%)",
        height: "100vh",
      }}
    >
      {/* Top section with main items */}
      <div className="flex flex-col items-center">
        <div className="w-8 h-[2px] bg-gradient-to-r from-[#FF8F00] to-[#FFD54F] rounded-full mb-2" />
        {mainDockItems.map((item, index) => (
          <div key={index} className="flex flex-col items-center mb-2">
            <div className={`rounded-lg p-2 transition-all duration-300 ${
              selectedItem === item.id 
                ? 'bg-gradient-to-br from-[#2A1F0A] to-[#3D2A0F] border border-[#FF8F00]/20' 
                : 'bg-transparent'
            }`}>
              <VerticalDockIcon
                onClick={item.onClick}
                tooltip={item.tooltip}
                isSelected={selectedItem === item.id}
              >
                {item.icon}
              </VerticalDockIcon>
              <div className={`text-xs font-medium text-center mt-1 ${
                selectedItem === item.id ? 'text-[#FF8F00]' : 'text-white'
              }`}>
                {item.tooltip}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Spacer to push bottom items down */}
      <div className="flex-1" />

      {/* Bottom section with Profile and Help */}
      <div className="flex flex-col items-center">
        {bottomDockItems.map((item, index) => (
          <div key={`bottom-${index}`} className="flex flex-col items-center mb-1">
            <div className={`rounded-lg p-2 transition-all duration-300 ${
              selectedItem === item.id 
                ? 'bg-gradient-to-br from-[#2A1F0A] to-[#3D2A0F] border border-[#FF8F00]/20' 
                : 'bg-transparent'
            }`}>
              <VerticalDockIcon
                onClick={item.onClick}
                tooltip={item.tooltip}
                isSelected={selectedItem === item.id}
              >
                {item.icon}
              </VerticalDockIcon>
              <div className={`text-xs font-medium text-center mt-1 ${
                selectedItem === item.id ? 'text-[#FF8F00]' : 'text-white'
              }`}>
                {item.tooltip}
              </div>
            </div>
          </div>
        ))}
        <div className="w-8 h-[2px] bg-gradient-to-r from-[#FF8F00] to-[#FFD54F] rounded-full" />
      </div>
    </div>
  );
};

export default VerticalDock;

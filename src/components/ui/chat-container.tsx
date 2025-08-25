'use client';

import { useState, useEffect, useRef } from 'react';
import { useMutation, useQuery } from 'convex/react';
import { useUser } from '@clerk/nextjs';
import { api } from '../../../convex/_generated/api';
import { Settings2, Calculator, Atom, TestTube, Zap, Send, Book, Brain, FileText, Target, Award, Star, Lightbulb, Microscope, Globe, Heart, Home, Music, Camera, Clock } from 'lucide-react';
import ActionDock from './actionDock';

interface FilterOption {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface ChatContainerProps {
  placeholder?: string;
  showFilters?: boolean;
  customFilters?: FilterOption[];
  className?: string;
  glow?: boolean;
}

// Icon mapping for dynamic tags
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Calculator,
  Atom,
  TestTube,
  Zap,
  Book,
  Brain,
  FileText,
  Target,
  Award,
  Star,
  Lightbulb,
  Microscope,
  Globe,
  Heart,
  Home,
  Music,
  Camera,
  Clock,
};

// Fallback options if database is unavailable
const fallbackFilterOptions: FilterOption[] = [
  { id: 'mathematics', label: 'Mathematics', icon: Calculator },
  { id: 'physics', label: 'Physics', icon: Atom },
  { id: 'chemistry', label: 'Chemistry', icon: TestTube },
  { id: 'surprise', label: 'Surprise Test', icon: Zap }
];

export function ChatContainer({
  placeholder = "Type your message here...",
  showFilters = true,
  customFilters,
  className = "",
  glow = false
}: ChatContainerProps) {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [message, setMessage] = useState('');
  const [isActionDockOpen, setIsActionDockOpen] = useState(false);
  const [actionDockValues, setActionDockValues] = useState<Record<string, any>>({
    numQuestions: 10 // Default value
  });
  const { user } = useUser();
  const settingsContainerRef = useRef<HTMLDivElement>(null);
  
  // Convex hooks
  const sendMessage = useMutation(api.messages.sendMessage);
  const tagsFromDB = useQuery(api.tags.getActiveTags);

  // Handle click outside to close ActionDock
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (settingsContainerRef.current && !settingsContainerRef.current.contains(event.target as Node) && isActionDockOpen) {
        setIsActionDockOpen(false);
      }
    };

    if (isActionDockOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isActionDockOpen]);

  // Convert database tags to FilterOption format
  const dynamicFilters: FilterOption[] = tagsFromDB?.map((tag: {
    tagId: string;
    label: string;
    icon: string;
    isActive: boolean;
    sortOrder: number;
  }) => ({
    id: tag.tagId,
    label: tag.label,
    icon: iconMap[tag.icon] || Calculator, // Fallback to Calculator if icon not found
  })) || [];

  // Use custom filters if provided, otherwise use dynamic filters, fallback to hardcoded
  const filterOptions = customFilters || (dynamicFilters.length > 0 ? dynamicFilters : fallbackFilterOptions);

  const toggleFilter = (filterId: string) => {
    setSelectedFilters(prev => 
      prev.includes(filterId) 
        ? prev.filter(id => id !== filterId)
        : [...prev, filterId]
    );
  };

  const handleSend = async () => {
    if (!message.trim()) return;

    try {
      await sendMessage({
        userId: user?.id || 'anonymous',
        text: message.trim(),
        tags: selectedFilters,
        actionDockSettings: actionDockValues, // Send all ActionDock values dynamically
      });
      setMessage('');
      setSelectedFilters([]);
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className={`group relative w-full max-w-4xl z-20 animate-slide-up-delay-500 ${className}`}>
      {/* Warm orange glow - conditional */}
      {glow && (
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 h-32 w-[90%] rounded-full bg-[#FF8F00]/40 blur-3xl lg:h-30" />
      )}

      {/* Single unified chat container */}
      <div className="relative rounded-2xl p-[1px] bg-gradient-to-r from-[#FF8F00]/0 to-[#FFD54F]/0 focus-within:from-[#FF8F00] focus-within:to-[#FFD54F] transition-all duration-300 z-21">
        <div className="flex flex-col rounded-2xl bg-[#1A1A1A] border border-[#333] focus-within:border-transparent relative z-22">
          
          {/* Message Input */}
          <div className="flex-shrink-0 p-6 pt-4">
            <div className="flex items-end gap-3">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={placeholder}
                rows={1}
                className="flex-1 bg-transparent text-[#E0E0E0] placeholder-[#888] outline-none py-3 resize-none overflow-y-auto min-h-[15rem] max-h-[30rem]"
              />
            </div>

            {/* Filter badges at bottom */}
            {showFilters && (
              <div className="flex items-center justify-between w-full mt-4">
                <div className="flex flex-wrap gap-2">
                  <div className="relative" ref={settingsContainerRef}>
                      <button 
                        onClick={() => setIsActionDockOpen((prev) => !prev)}
                        className="p-2 hover:bg-[#2A2A2A] rounded-lg transition"
                      >
                        <Settings2 className="w-5 h-5 text-[#888]" />
                      </button>

                      <ActionDock 
                        isOpen={isActionDockOpen} 
                        onClose={() => setIsActionDockOpen(false)}
                        onValuesChange={setActionDockValues}
                      />
                    </div>
                  {filterOptions.map((option: FilterOption) => {
                    const isSelected = selectedFilters.includes(option.id);
                    const IconComponent = option.icon;
                    return (
                      <button
                        key={option.id}
                        onClick={() => toggleFilter(option.id)}
                        className={`px-2 py-1 text-xs rounded-md border transition-all duration-300 flex items-center gap-1 ${
                          isSelected
                            ? 'bg-gradient-to-r from-[#FF8F00] to-[#FFA000] text-black border-[#FFB74D]'
                            : 'bg-[#2A2A2A] hover:bg-[#333] text-[#888] border-[#444] hover:border-[#555]'
                        }`}
                      >
                        {IconComponent && <IconComponent className="w-3 h-3" />}
                        <span>{option.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Right side: send button */}
                <button 
                  onClick={handleSend}
                  disabled={!message.trim()}
                  className="p-3 bg-[#FF8F00] hover:bg-[#FFA000] disabled:bg-[#444] disabled:cursor-not-allowed rounded-lg transition-colors flex-shrink-0"
                >
                  <Send className="w-4 h-4 text-white" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
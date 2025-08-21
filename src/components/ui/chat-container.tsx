'use client';

import { useState } from 'react';
import { Paperclip, Calculator, Atom, TestTube, Zap } from 'lucide-react';

interface FilterOption {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface ChatContainerProps {
  placeholder?: string;
  showFilters?: boolean;
  customFilters?: FilterOption[];
  onSend?: (message: string, filters: string[]) => void;
  className?: string;
}

const defaultFilterOptions: FilterOption[] = [
  { id: 'mathematics', label: 'Mathematics', icon: Calculator },
  { id: 'physics', label: 'Physics', icon: Atom },
  { id: 'chemistry', label: 'Chemistry', icon: TestTube },
  { id: 'surprise', label: 'Surprise Test', icon: Zap }
];

export function ChatContainer({
  placeholder = "Type your message here...",
  showFilters = true,
  customFilters = defaultFilterOptions,
  onSend,
  className = ""
}: ChatContainerProps) {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [message, setMessage] = useState('');

  const toggleFilter = (filterId: string) => {
    setSelectedFilters(prev => 
      prev.includes(filterId) 
        ? prev.filter(id => id !== filterId)
        : [...prev, filterId]
    );
  };

  const handleSend = () => {
    if (message.trim() && onSend) {
      onSend(message, selectedFilters);
      setMessage('');
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
      {/* Warm orange glow */}
      <div className="absolute -top-2 left-1/2 -translate-x-1/2 h-32 w-[90%] rounded-full bg-[#FF8F00]/40 blur-3xl lg:h-30" />

      {/* Single unified chat container */}
      <div className="relative rounded-2xl p-[1px] bg-gradient-to-r from-[#FF8F00]/0 to-[#FFD54F]/0 focus-within:from-[#FF8F00] focus-within:to-[#FFD54F] transition-all duration-300 z-21">
        <div className="flex flex-col h-full rounded-2xl bg-[#1A1A1A] border border-[#333] focus-within:border-transparent relative z-22">
          <div className="flex-shrink-0 p-6 pt-4 mt-auto">
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
                  <button className="p-2 hover:bg-[#2A2A2A] rounded-lg transition">
                    <Paperclip className="w-4 h-4 text-[#888]" />
                  </button>
                  {customFilters.map((option) => {
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
                  className="p-3 bg-[#FF8F00] hover:bg-[#FFA000] rounded-lg transition-colors flex-shrink-0"
                >
                  <div className="bg-[#AE6E00FF] rounded-full p-2"></div>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

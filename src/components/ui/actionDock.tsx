// --- ActionDock.tsx ---
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Info } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';

interface Feature {
  _id: string;
  featureId: string;
  heading: string;
  showInfo?: boolean;
  type: 'number' | 'text' | 'select';
  placeholder?: string;
  defaultValue: string | number;
  min?: number;
  max?: number;
  options?: string[];
  isActive: boolean;
  sortOrder: number;
  createdAt: number;
}

export default function ActionDock({
  isOpen,
  onValuesChange,
}: {
  isOpen: boolean;
  onValuesChange?: (values: Record<string, string | number>) => void;
}) {
  // Fetch features from database
  const featuresFromDB = useQuery(api.actionDockFeatures.getActiveFeatures);
  
  const [values, setValues] = useState<Record<string, string | number>>({});

  // Initialize values when features are loaded
  useEffect(() => {
    if (featuresFromDB && featuresFromDB.length > 0) {
      const initialValues = Object.fromEntries(
        featuresFromDB.map((f: Feature) => [f.featureId, f.defaultValue])
      );
      setValues(initialValues);
      // Notify parent of initial values
      onValuesChange?.(initialValues);
    }
  }, [featuresFromDB, onValuesChange]);

  const handleChange = (featureId: string, val: string | number) => {
    const newValues = { ...values, [featureId]: val };
    setValues(newValues);
    // Immediately notify parent of changes
    onValuesChange?.(newValues);
  };

  // Show loading or empty state if no features
  if (!featuresFromDB || featuresFromDB.length === 0) {
    return null;
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="dock"
          className="absolute bottom-full mb-2 left-0 w-72 z-50"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        >
          <div className="bg-[#1A1A1A] border border-[#333] rounded-2xl shadow-xl p-4 space-y-4">
            {featuresFromDB.map((f: Feature) => (
              <div
                key={f.featureId}
                className="flex items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-white font-medium">{f.heading}</h3>
                    {f.showInfo && (
                      <Info className="w-4 h-4 text-[#888]" />
                    )}
                  </div>
                </div>

                {f.type === 'number' && (
                  <input
                    type="number"
                    value={values[f.featureId] || f.defaultValue}
                    onChange={(e) =>
                      handleChange(f.featureId, Number(e.target.value))
                    }
                    min={f.min}
                    max={f.max}
                    placeholder={f.placeholder}
                    className="w-20 px-3 py-2 rounded-lg bg-[#2A2A2A] text-white border border-[#444] text-center outline-none focus:border-[#FF8F00] focus:ring-1 focus:ring-[#FF8F00]"
                  />
                )}

                {f.type === 'text' && (
                  <input
                    type="text"
                    value={values[f.featureId] || f.defaultValue}
                    onChange={(e) =>
                      handleChange(f.featureId, e.target.value)
                    }
                    placeholder={f.placeholder}
                    className="w-32 px-3 py-2 rounded-lg bg-[#2A2A2A] text-white border border-[#444] outline-none focus:border-[#FF8F00] focus:ring-1 focus:ring-[#FF8F00]"
                  />
                )}

                {f.type === 'select' && f.options && (
                  <select
                    value={values[f.featureId] || f.defaultValue}
                    onChange={(e) =>
                      handleChange(f.featureId, e.target.value)
                    }
                    className="w-32 px-3 py-2 rounded-lg bg-[#2A2A2A] text-white border border-[#444] outline-none focus:border-[#FF8F00] focus:ring-1 focus:ring-[#FF8F00]"
                  >
                    {f.options.map((option) => (
                      <option key={option} value={option} className="bg-[#2A2A2A] text-white">
                        {option}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

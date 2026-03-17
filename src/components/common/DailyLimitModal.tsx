import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { WarningCircle, Clock, X } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';
import type { DailyLimitErrorResponse } from '../../services/test-engine/test-engine.service';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  limitData: DailyLimitErrorResponse | null;
}

const DailyLimitModal: React.FC<Props> = ({ isOpen, onClose, limitData }) => {
  const [timeLeft, setTimeLeft] = useState<{ hours: number; minutes: number; seconds: number } | null>(null);

  useEffect(() => {
    if (!isOpen || !limitData) return;

    const calculateTimeLeft = () => {
      // Use resetAt from server which is absolute time
      const resetTime = new Date(limitData.resetAt).getTime();
      const now = new Date().getTime();
      const difference = resetTime - now;

      if (difference > 0) {
        return {
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }
      return null; // Time passed
    };

    // Calculate immediately
    setTimeLeft(calculateTimeLeft());

    // Update every second
    const timer = setInterval(() => {
      const remaining = calculateTimeLeft();
      setTimeLeft(remaining);
      if (!remaining) clearInterval(timer);
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, limitData]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-md scale-100 rounded-2xl border border-white/10 bg-neutral-900 p-6 shadow-2xl transition-all">
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 text-neutral-400 hover:text-white transition-colors"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        <div className="flex flex-col items-center text-center">
          <div className="mb-4 rounded-full bg-amber-500/10 p-4 text-amber-500 ring-1 ring-amber-500/20">
            <WarningCircle size={32} weight="duotone" />
          </div>

          <h3 className="mb-2 text-xl font-bold text-white">Daily Limit Reached</h3>
          
          <p className="mb-6 text-sm leading-relaxed text-neutral-400">
            You've reached your free daily limit for test generation.<br/>
            Upgrade specifically to continue generating unlimited tests.
          </p>

          {timeLeft ? (
            <div className="mb-6 flex items-center gap-2.5 rounded-lg bg-neutral-800/50 px-4 py-3 text-sm text-neutral-300 ring-1 ring-white/5">
              <Clock size={16} className="text-amber-500" />
              <span>Resets in:</span>
              <span className="font-mono font-medium text-white tabular-nums">
                {String(timeLeft.hours).padStart(2, '0')}:
                {String(timeLeft.minutes).padStart(2, '0')}:
                {String(timeLeft.seconds).padStart(2, '0')}
              </span>
            </div>
          ) : (
            <div className="mb-6 text-sm text-neutral-400">
               Limit will reset tomorrow.
            </div>
          )}

          <div className="flex w-full flex-col gap-3">
             <Link
              to="/subscription"
              className="flex w-full items-center justify-center rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-neutral-900 hover:bg-neutral-200 transition-colors"
              onClick={onClose}
            >
              Upgrade to Premium
            </Link>
            
            <button
              onClick={onClose}
              className="w-full rounded-lg px-4 py-2.5 text-sm font-medium text-neutral-400 hover:bg-white/5 hover:text-white transition-colors"
            >
              Pass for now
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default DailyLimitModal;

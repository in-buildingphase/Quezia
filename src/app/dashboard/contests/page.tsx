"use client";

import { useState, useEffect } from "react";
import { Calendar, Clock, Users, Trophy } from "lucide-react";
import Image from "next/image";

export default function Contests() {
  const [weeklyTimeLeft, setWeeklyTimeLeft] = useState("");
  const [monthlyTimeLeft, setMonthlyTimeLeft] = useState("");

  // Calculate time until next weekly exam (every Saturday at 10:00 AM)
  const getWeeklyTimeLeft = () => {
    const now = new Date();
    const nextSaturday = new Date();
    const daysUntilSaturday = (6 - now.getDay()) % 7 || 7; // 6 = Saturday
    nextSaturday.setDate(now.getDate() + daysUntilSaturday);
    nextSaturday.setHours(10, 0, 0, 0); // 10:00 AM

    if (nextSaturday <= now) {
      nextSaturday.setDate(nextSaturday.getDate() + 7);
    }

    const diff = nextSaturday.getTime() - now.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    return `${days}d ${hours}h ${minutes}m`;
  };

  // Calculate time until next monthly exam (first Sunday of each month at 2:00 PM)
  const getMonthlyTimeLeft = () => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    
    // Find first Sunday of current month
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
    const firstSunday = new Date(firstDayOfMonth);
    firstSunday.setDate(1 + (7 - firstDayOfMonth.getDay()) % 7);
    firstSunday.setHours(14, 0, 0, 0); // 2:00 PM

    // If first Sunday has passed, get first Sunday of next month
    if (firstSunday <= now) {
      const nextMonth = currentMonth === 11 ? 0 : currentMonth + 1;
      const nextYear = currentMonth === 11 ? currentYear + 1 : currentYear;
      const firstDayOfNextMonth = new Date(nextYear, nextMonth, 1);
      firstSunday.setFullYear(nextYear);
      firstSunday.setMonth(nextMonth);
      firstSunday.setDate(1 + (7 - firstDayOfNextMonth.getDay()) % 7);
    }

    const diff = firstSunday.getTime() - now.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    return `${days}d ${hours}h ${minutes}m`;
  };

  useEffect(() => {
    const updateTimers = () => {
      setWeeklyTimeLeft(getWeeklyTimeLeft());
      setMonthlyTimeLeft(getMonthlyTimeLeft());
    };

    updateTimers();
    const interval = setInterval(updateTimers, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  const handleRegister = (contestType: string) => {
    // Handle registration logic here
    alert(`Registered for ${contestType} contest!`);
  };

  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Weekly Contest */}
          <div className="bg-gradient-to-br from-[#0f0f0f] via-[#1a1a1a] to-[#262626] rounded-2xl overflow-hidden shadow-2xl border border-gray-800/50 hover:border-blue-500/30 transition-all duration-300">
            {/* Image space - larger area */}
            <div className="h-64 relative">
              <Image
                src="/assets/images/weekly-test.png"
                alt="Weekly Contest"
                fill
                className="object-cover"
              />
              {/* Minimal badge */}
              <div className="absolute top-4 left-4">
                <div className="bg-blue-500/90 backdrop-blur-sm rounded-lg px-3 py-1">
                  <span className="text-white text-sm font-medium">Weekly</span>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              {/* Title and timing */}
              <h2 className="text-2xl font-bold text-white mb-1">Weekly Challenge</h2>
              <p className="text-gray-400 text-sm mb-4">Every Saturday • 10:00 AM IST</p>

              {/* Timer */}
              <div className="bg-gradient-to-r from-[#1A1A1A] to-[#0F0F0F] border border-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-4 mb-4">
                <p className="text-gray-400 text-xs mb-1">Starts in:</p>
                <div className="text-2xl font-bold text-white">{weeklyTimeLeft}</div>
              </div>

              <button 
                onClick={() => handleRegister("Weekly")}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-xl font-semibold hover:from-blue-400 hover:to-blue-500 transition-all duration-300"
              >
                Join Challenge
              </button>
            </div>
          </div>

          {/* Monthly Contest */}
          <div className="bg-gradient-to-br from-[#0f0f0f] via-[#1a1a1a] to-[#262626] rounded-2xl overflow-hidden shadow-2xl border border-gray-800/50 hover:border-red-500/30 transition-all duration-300">
            {/* Image space - larger area */}
            <div className="h-64 relative">
              <Image
                src="/assets/images/monthly-test.png"
                alt="Monthly Contest"
                fill
                className="object-cover"
              />
              {/* Minimal badge */}
              <div className="absolute top-4 left-4">
                <div className="bg-red-500/90 backdrop-blur-sm rounded-lg px-3 py-1">
                  <span className="text-white text-sm font-medium">Monthly</span>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              {/* Title and timing */}
              <h2 className="text-2xl font-bold text-white mb-1">Monthly Masters</h2>
              <p className="text-gray-400 text-sm mb-4">First Sunday • 2:00 PM IST</p>

              {/* Timer */}
              <div className="bg-gradient-to-r from-[#1A1A1A] to-[#0F0F0F] border border-gradient-to-r from-red-500 to-red-600 rounded-xl p-4 mb-4">
                <p className="text-gray-400 text-xs mb-1">Starts in:</p>
                <div className="text-2xl font-bold text-white">{monthlyTimeLeft}</div>
              </div>

              <button 
                onClick={() => handleRegister("Monthly")}
                className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-3 rounded-xl font-semibold hover:from-red-400 hover:to-red-500 transition-all duration-300"
              >
                Enter Championship
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

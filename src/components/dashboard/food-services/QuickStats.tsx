"use client";

import { useTheme } from "next-themes";
import type { UserPlanSelection } from "@/lib/types/food-services.d";
import { CheckCircle } from "lucide-react";
import { useState } from 'react';

interface QuickStatsProps {
  data: UserPlanSelection;
}

export function QuickStats({ data }: QuickStatsProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Guard against missing data
  if (!data || !Array.isArray(data.mealTypes)) {
    return null;
  }

  const [selectedType, setSelectedType] = useState<string>(data.mealTypes[0] ?? '');
  const words = data.vendorName ? data.vendorName.split(' ') : [];
  const initials = words.length > 1
    ? `${words[0][0]}${words[words.length - 1][0]}`.toUpperCase()
    : (data.vendorName ? data.vendorName.slice(0, 2) : '').toUpperCase();

  return (
    <div className={`p-4 rounded-3xl shadow-2xl ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
      <h2 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Quick Stats</h2>
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-base font-medium ${isDark ? 'bg-blue-900 text-blue-300' : 'bg-blue-100 text-blue-600'}`}>
            {initials}
          </div>
          <h3 className={`text-base font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>{data.vendorName}</h3>
        </div>
        <div className="space-y-1 text-sm">
          <div className={isDark ? 'text-gray-300' : 'text-gray-600'}>
            <span className="font-medium">Selected plan:</span> {data.planName}
          </div>
          <div className={isDark ? 'text-gray-300' : 'text-gray-600'}>
            <span className="font-medium">Plan period:</span> {data.planPeriod}
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {data.mealTypes.map(type => {
            const isSelected = type === 'Veg';
            return (
              <span
                key={type}
                className={`px-3 py-1 rounded-full text-xs font-medium select-none
                  ${isSelected
                    ? (isDark ? 'bg-blue-500 text-white' : 'bg-blue-600 text-white')
                    : (isDark ? 'border border-gray-600 text-gray-300' : 'border border-gray-300 text-gray-800')
                  }
                `}
              >
                {type}
              </span>
            );
          })}
        </div>
        <div className={`mt-4 p-4 rounded-3xl shadow-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'} border ${isDark ? 'border-gray-600' : 'border-gray-200'}`}>
          <div className="flex items-center gap-2">
            <CheckCircle className={`w-5 h-5 ${isDark ? 'text-green-400' : 'text-green-600'}`} />
            <p className={`text-sm font-medium ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>Payment Status</p>
          </div>
          <p className={`mt-1 text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            {data.paymentDate}: <span className={`${isDark ? 'text-green-400' : 'text-green-600'} font-semibold`}>{data.paymentStatus}</span>
          </p>
        </div>
      </div>
    </div>
  );
} 
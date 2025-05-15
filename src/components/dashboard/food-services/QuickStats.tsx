"use client";

import { useTheme } from "next-themes";
import type { UserPlanSelection } from "@/lib/types/food-services.d";
import { CheckCircle, Trash2, Lock } from "lucide-react";
import { useState } from 'react';

interface QuickStatsProps {
  data: UserPlanSelection;
  onDelete?: () => void;
  canDelete?: boolean;
  formEnabled?: boolean;
  isAdmin?: boolean;
}

export function QuickStats({ 
  data, 
  onDelete, 
  canDelete = true, 
  formEnabled = true,
  isAdmin = false 
}: QuickStatsProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [isDeleting, setIsDeleting] = useState(false);

  const [selectedType, setSelectedType] = useState<string>(data.mealTypes[0] || '');
  const words = data.vendorName.split(' ');
  const initials = words.length > 1
    ? `${words[0][0]}${words[words.length - 1][0]}`.toUpperCase()
    : data.vendorName.slice(0, 2).toUpperCase();

  // Determine if delete is allowed (only when form is enabled)
  const deleteAllowed = canDelete && formEnabled;

  const handleDelete = () => {
    if (!deleteAllowed) return;
    
    if (confirm("Are you sure you want to cancel this meal plan selection?")) {
      setIsDeleting(true);
      if (onDelete) onDelete();
    }
  };

  return (
    <div className={`p-4 rounded-3xl shadow-2xl ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Quick Stats</h2>
        {canDelete && (
          <button 
            onClick={handleDelete}
            disabled={isDeleting || !deleteAllowed}
            className={`p-2 rounded-full ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} 
              ${(isDeleting || !deleteAllowed) ? 'opacity-50 cursor-not-allowed' : ''}`}
            title={!deleteAllowed ? "Meal plan changes are currently not available" : "Cancel meal plan"}
          >
            {!formEnabled ? (
              <Lock className="w-4 h-4 text-gray-400" />
            ) : (
              <Trash2 className="w-4 h-4 text-red-500" />
            )}
          </button>
        )}
      </div>
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
            <span className="font-medium">Price:</span> {data.price ? new Intl.NumberFormat('en-IN', {
              style: 'currency',
              currency: 'INR',
              maximumFractionDigits: 0
            }).format(data.price) : 'N/A'}
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {data.mealTypes.map(type => (
            <span
              key={type}
              className={`px-3 py-1 rounded-full text-xs font-medium select-none
                ${isDark ? 'border border-gray-600 text-gray-300' : 'border border-gray-300 text-gray-800'}
              `}
            >
              {type}
            </span>
          ))}
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
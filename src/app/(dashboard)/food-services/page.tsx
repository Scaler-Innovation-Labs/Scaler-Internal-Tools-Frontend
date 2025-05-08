"use client";

import { useTheme } from "next-themes";
import { Bell } from 'lucide-react';
import { MessMenu } from '@/components/dashboard/food-services/MessMenu';
import { QuickStats } from '@/components/dashboard/food-services/QuickStats';
import { MessFeedback } from '@/components/dashboard/food-services/MessFeedback';
import type { UserPlanSelection } from '@/lib/types/food-services.d';

const mockStats: UserPlanSelection = {
  vendorName: "Gaura's Secret Recipe",
  planName: 'Full Board (3 meals/day)',
  planPeriod: 'May 2025',
  mealTypes: ['Veg', 'Non Veg', 'Egg'],
  paymentStatus: 'Paid',
  paymentDate: 'May 2025 - Paid',
};

export default function FoodServicesPage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <header className="px-6 py-4 sticky top-0 z-10 bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
        <div className="container mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Food Services</h1>
            <p className="text-sm opacity-90">Track your meal plan and preferences</p>
          </div>
          <button
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-400 hover:bg-blue-300 text-white font-medium rounded-lg text-sm"
          >
            <Bell className="w-5 h-5" />
            Notifications Setting
          </button>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <MessMenu imageUrl="/images/Sep 4th to 10th 2024 - menu (pg 1).png" />
          </div>
          <div className="space-y-6">
            <QuickStats data={mockStats} />
            <MessFeedback />
          </div>
        </div>
      </main>
    </div>
  );
}

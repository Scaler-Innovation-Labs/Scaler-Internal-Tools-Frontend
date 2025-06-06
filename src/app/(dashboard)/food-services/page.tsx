"use client";

import { useTheme } from "next-themes";
import { FileText } from 'lucide-react';
import { MessMenu } from '@/components/dashboard/food-services/MessMenu';
import { QuickStats } from '@/components/dashboard/food-services/QuickStats';
import { MessFeedback } from '@/components/dashboard/food-services/MessFeedback';
import { MessOptInForm } from '@/components/dashboard/food-services/MessOptInForm';
import Link from "next/link";
  
import { useState, useEffect } from 'react';
import { getUserVendorPlanSelectionByUserId } from '@/lib/api/food-services';
import type { VendorPlanSelectionSummaryDto, UserPlanSelection } from '@/lib/types/food-services.d';

const USER_ID = 1;

export default function FoodServicesPage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [stats, setStats] = useState<UserPlanSelection | null>(null);
  const [loadingStats, setLoadingStats] = useState(true);
  const [activeTab, setActiveTab] = useState<'menu' | 'optIn'>('menu');

  useEffect(() => {
    async function fetchStats() {
      try {
        const summary: VendorPlanSelectionSummaryDto = await getUserVendorPlanSelectionByUserId(USER_ID);
        setStats({
          vendorName: summary.vendorName,
          planName: summary.vendorPlanName,
          planPeriod: summary.selectedMonth,
          mealTypes: summary.mealTypes,
          paymentStatus: 'Paid',
          paymentDate: `${summary.selectedMonth} - Paid`,
        });
      } catch (err) {
        console.error('Failed to fetch plan selection', err);
      } finally {
        setLoadingStats(false);
      }
    }
    fetchStats();
  }, []);

  const handleMessFormClick = () => {
    setActiveTab('optIn');
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <header className={`px-6 py-4 sticky top-0 z-10 text-white bg-gradient-to-r from-[#2E4DEE] to-[#040F75]`}>
        <div className="container mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Food Services</h1>
            <p className="text-sm opacity-90">Track your meal plan and preferences</p>
          </div>
          <div className="flex items-center gap-2">
          <button
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#0095FF] hover:bg-blue-400 text-white font-medium rounded-full text-base"
            onClick={handleMessFormClick}
          >
            <FileText className="w-5 h-5" />
            June Mess Form
          </button>
            <Link
              href="/food-services/admin"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 hover:bg-white/30 text-white font-medium rounded-full text-base"
            >
              Admin
            </Link>
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        {activeTab === 'menu' ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <MessMenu imageUrl="/images/Sep 4th to 10th 2024 - menu (pg 1).png" />
            </div>
            <div className="space-y-6">
              {loadingStats
                ? <div className={`text-center ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Loading stats…</div>
                : stats && <QuickStats data={stats} />
              }
              <MessFeedback />
            </div>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto">
            <MessOptInForm />
          </div>
        )}
      </main>
    </div>
  );
}
 
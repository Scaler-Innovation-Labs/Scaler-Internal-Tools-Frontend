"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { getAllVendors, getAllVendorPlans } from "@/lib/api/food-services";
import { 
  Building2, 
  Package, 
  TrendingUp, 
  Users,
  Plus,
  Settings,
  BarChart3,
  Clock
} from "lucide-react";

interface DashboardStats {
  totalVendors: number;
  totalPlans: number;
  activeVendors: number;
  plansByType: Record<string, number>;
}

export default function FoodServicesAdminIndex() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [stats, setStats] = useState<DashboardStats>({
    totalVendors: 0,
    totalPlans: 0,
    activeVendors: 0,
    plansByType: {}
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const [vendors, plans] = await Promise.all([
          getAllVendors(),
          getAllVendorPlans()
        ]);

        const plansByType = plans.reduce((acc: Record<string, number>, plan) => {
          plan.mealTypes.forEach(type => {
            acc[type] = (acc[type] || 0) + 1;
          });
          return acc;
        }, {});

        setStats({
          totalVendors: vendors.length,
          totalPlans: plans.length,
          activeVendors: vendors.length, // Assuming all vendors are active
          plansByType
        });
      } catch (error) {
        console.error('Failed to load dashboard stats:', error);
      } finally {
        setLoading(false);
      }
    }

    loadStats();
  }, []);

  const statCards = [
    {
      title: "Total Vendors",
      value: stats.totalVendors,
      icon: Building2,
      color: "blue",
      change: "+12%",
      changeColor: "green"
    },
    {
      title: "Total Plans",
      value: stats.totalPlans,
      icon: Package,
      color: "green",
      change: "+8%",
      changeColor: "green"
    },
    {
      title: "Active Vendors",
      value: stats.activeVendors,
      icon: Users,
      color: "purple",
      change: "+3%",
      changeColor: "green"
    },
    {
      title: "Plan Types",
      value: Object.keys(stats.plansByType).length,
      icon: BarChart3,
      color: "orange",
      change: "stable",
      changeColor: "gray"
    }
  ];

  const quickActions = [
    {
      title: "Add New Vendor",
      description: "Register a new food vendor",
      href: "/food-services/admin/vendors",
      icon: Plus,
      color: "blue"
    },
    {
      title: "Create Vendor Plan",
      description: "Set up a new meal plan",
      href: "/food-services/admin/vendor-plans",
      icon: Package,
      color: "green"
    },
    {
      title: "View Analytics",
      description: "Analyze vendor performance",
      href: "#",
      icon: TrendingUp,
      color: "purple"
    },
    {
      title: "System Settings",
      description: "Configure system preferences",
      href: "#",
      icon: Settings,
      color: "gray"
    }
  ];

  const recentActivity = [
    { action: "New vendor added", time: "2 hours ago", type: "create" },
    { action: "Plan updated", time: "4 hours ago", type: "update" },
    { action: "Vendor deleted", time: "1 day ago", type: "delete" },
    { action: "New plan created", time: "2 days ago", type: "create" }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: `${isDark ? 'bg-blue-900/20 border-blue-700' : 'bg-blue-50 border-blue-200'} text-blue-600`,
      green: `${isDark ? 'bg-green-900/20 border-green-700' : 'bg-green-50 border-green-200'} text-green-600`,
      purple: `${isDark ? 'bg-purple-900/20 border-purple-700' : 'bg-purple-50 border-purple-200'} text-purple-600`,
      orange: `${isDark ? 'bg-orange-900/20 border-orange-700' : 'bg-orange-50 border-orange-200'} text-orange-600`,
      gray: `${isDark ? 'bg-gray-800 border-gray-600' : 'bg-gray-50 border-gray-200'} text-gray-600`
    };
    return colors[color as keyof typeof colors] || colors.gray;
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <header className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b`}>
        <div className="px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Food Services Admin
              </h1>
              <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'} mt-1`}>
                Manage vendors, plans, and food service operations
              </p>
            </div>
            <div className="flex space-x-3">
              <Link
                href="/food-services/admin/vendors"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Vendor
              </Link>
              <Link
                href="/food-services/admin/vendor-plans"
                className={`inline-flex items-center px-4 py-2 border rounded-lg transition-colors ${
                  isDark 
                    ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Package className="w-4 h-4 mr-2" />
                Manage Plans
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="px-6 py-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {statCards.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.title}
                  className={`p-6 rounded-xl border ${
                    isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        {card.title}
                      </p>
                      <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mt-1`}>
                        {loading ? '...' : card.value}
                      </p>
                      <div className="flex items-center mt-2">
                        <span className={`text-xs ${
                          card.changeColor === 'green' ? 'text-green-600' : 'text-gray-500'
                        }`}>
                          {card.change}
                        </span>
                        <span className={`text-xs ml-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          vs last month
                        </span>
                      </div>
                    </div>
                    <div className={`p-3 rounded-lg border ${getColorClasses(card.color)}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Quick Actions */}
            <div className="lg:col-span-2">
              <h2 className={`text-xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Quick Actions
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {quickActions.map((action) => {
                  const Icon = action.icon;
                  return (
                    <Link
                      key={action.title}
                      href={action.href}
                      className={`group p-6 rounded-xl border transition-all hover:shadow-lg ${
                        isDark 
                          ? 'bg-gray-800 border-gray-700 hover:bg-gray-750' 
                          : 'bg-white border-gray-200 hover:shadow-md'
                      }`}
                    >
                      <div className="flex items-start">
                        <div className={`p-2 rounded-lg ${getColorClasses(action.color)} group-hover:scale-110 transition-transform`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="ml-4">
                          <h3 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {action.title}
                          </h3>
                          <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                            {action.description}
                          </p>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Recent Activity */}
            <div>
              <h2 className={`text-xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Recent Activity
              </h2>
              <div className={`rounded-xl border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <div className="p-6 space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center">
                      <div className={`w-2 h-2 rounded-full mr-3 ${
                        activity.type === 'create' ? 'bg-green-500' :
                        activity.type === 'update' ? 'bg-blue-500' :
                        'bg-red-500'
                      }`} />
                      <div className="flex-1">
                        <p className={`text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {activity.action}
                        </p>
                        <div className="flex items-center mt-1">
                          <Clock className={`w-3 h-3 mr-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                          <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            {activity.time}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className={`px-6 py-3 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                  <Link
                    href="#"
                    className={`text-sm ${isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'}`}
                  >
                    View all activity
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Management Links */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link
              href="/food-services/admin/vendors"
              className={`group p-8 rounded-xl border transition-all hover:shadow-lg ${
                isDark 
                  ? 'bg-gray-800 border-gray-700 hover:bg-gray-750' 
                  : 'bg-white border-gray-200 hover:shadow-md'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Vendor Management
                  </h3>
                  <p className={`text-sm mt-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Add, edit, and manage food service vendors
                  </p>
                  <div className="flex items-center mt-4">
                    <span className={`text-sm font-medium ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                      Manage Vendors
                    </span>
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
                <Building2 className={`w-12 h-12 ${isDark ? 'text-gray-600' : 'text-gray-400'} group-hover:scale-110 transition-transform`} />
              </div>
            </Link>

            <Link
              href="/food-services/admin/vendor-plans"
              className={`group p-8 rounded-xl border transition-all hover:shadow-lg ${
                isDark 
                  ? 'bg-gray-800 border-gray-700 hover:bg-gray-750' 
                  : 'bg-white border-gray-200 hover:shadow-md'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Plan Management
                  </h3>
                  <p className={`text-sm mt-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Create and manage vendor meal plans
                  </p>
                  <div className="flex items-center mt-4">
                    <span className={`text-sm font-medium ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                      Manage Plans
                    </span>
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
                <Package className={`w-12 h-12 ${isDark ? 'text-gray-600' : 'text-gray-400'} group-hover:scale-110 transition-transform`} />
              </div>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
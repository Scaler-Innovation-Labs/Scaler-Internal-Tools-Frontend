"use client";

import { useTheme } from "next-themes";
import { Users, BookOpen, Calendar, GraduationCap } from "lucide-react";

const stats = [
  {
    title: "Total Students",
    value: "1,234",
    icon: Users,
    change: "+12% from last month",
  },
  {
    title: "Active Courses",
    value: "24",
    icon: BookOpen,
    change: "+4 new courses this month",
  },
  {
    title: "Upcoming Classes",
    value: "48",
    icon: Calendar,
    change: "Next class in 2 hours",
  },
  {
    title: "Graduation Rate",
    value: "98%",
    icon: GraduationCap,
    change: "+2% from last year",
  },
];

export default function DashboardPage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className={`min-h-screen ${isDark ? 'bg-black' : 'bg-gray-50'}`}>
      <div className="p-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Dashboard
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div
              key={stat.title}
              className={`p-6 rounded-xl ${
                isDark
                  ? 'bg-[#111111] border border-gray-800'
                  : 'bg-white shadow-sm'
              }`}
            >
              <div className="flex items-center justify-between">
                <p className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  {stat.title}
                </p>
                <stat.icon className={`h-5 w-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
              </div>
              <p className={`mt-2 text-3xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {stat.value}
              </p>
              <p className={`mt-1 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                {stat.change}
              </p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-7 gap-6 mt-6">
          <div className={`lg:col-span-4 p-6 rounded-xl ${
            isDark
              ? 'bg-[#111111] border border-gray-800'
              : 'bg-white shadow-sm'
          }`}>
            <h2 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Overview
            </h2>
            <div className="h-[300px] mt-4">
              {/* Chart will be added here */}
            </div>
          </div>

          <div className={`lg:col-span-3 p-6 rounded-xl ${
            isDark
              ? 'bg-[#111111] border border-gray-800'
              : 'bg-white shadow-sm'
          }`}>
            <h2 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Recent Activity
            </h2>
            <div className="mt-4">
              {/* Activity feed will be added here */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Home, 
  BellRing, 
  UtensilsCrossed, 
  Search, 
  FileQuestion, 
  Settings, 
  LogOut 
} from "lucide-react";
import { useTheme } from "next-themes";

const navigation = [
  { name: "Home", href: "/dashboard", icon: Home },
  { name: "Announcements", href: "/announcements", icon: BellRing },
  { name: "Food Services", href: "/food-services", icon: UtensilsCrossed },
  { name: "Lost & Found", href: "/lost-found", icon: FileQuestion },
  { name: "Settings", href: "/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <aside className={`w-64 min-h-screen flex flex-col ${
      isDark 
        ? 'bg-[#0D0D0D] text-gray-100' 
        : 'bg-white text-gray-900'
    } border-r ${
      isDark ? 'border-[#0D0D0D]' : 'border-gray-200'
    } shadow-sm`}>
      {/* Logo header with gradient accent */}
      <div className="relative">
        <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${
          isDark 
            ? 'from-blue-600 via-indigo-600 to-purple-600' 
            : 'from-blue-500 via-indigo-500 to-purple-500'
        }`}></div>
        
        <div className="flex h-16 items-center px-6 mt-1">
          <div className="flex items-center">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg mr-3 bg-gradient-to-br from-blue-500 to-indigo-600 shadow-md">
              <svg className="w-5 h-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                <path fill="currentColor" d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"/>
              </svg>
            </div>
            <span className={`font-bold text-lg ${isDark ? 'text-white' : 'text-blue-600'}`}>
              SST Internals
            </span>
          </div>
        </div>
      </div>
      
      {/* Navigation section */}
      <nav className="flex-1 overflow-y-auto py-6">
        <ul className="space-y-1 px-3">
          {navigation.map((item) => {
            const isActive = pathname === item.href || 
                             (item.href !== '/dashboard' && pathname.startsWith(item.href));
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? isDark 
                        ? 'bg-gray-700 text-blue-400 border-l-4 border-blue-500' 
                        : 'bg-gray-50 text-blue-600 border-l-4 border-blue-600'
                      : isDark
                        ? 'text-gray-400 hover:bg-gray-700 hover:text-gray-100'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <span className={`flex items-center justify-center ${
                    isActive 
                      ? isDark ? 'text-blue' : 'text-blue-600' 
                      : isDark ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    <item.icon className="w-5 h-5" />
                  </span>
                  <span>{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      
      {/* User section */}
      <div className={`px-3 py-4 mt-auto border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
        <Link
          href="/logout"
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            isDark
              ? 'text-red-400 hover:bg-red-900/20 hover:text-red-300'
              : 'text-red-600 hover:bg-red-50 hover:text-red-700'
          }`}
        >
          <LogOut className="w-5 h-5" />
          <span>Sign Out</span>
        </Link>
      </div>
    </aside>
  );
} 
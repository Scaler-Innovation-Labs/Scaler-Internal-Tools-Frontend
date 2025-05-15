import { Bell, ChevronDown } from "lucide-react";
import { useTheme } from "next-themes";

export default function UserDetails() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <header className={`px-4 pb-2 ${isDark ? 'bg-[#0D0D0D] border-[#0D0D0D]' : 'bg-white border-gray-200'} border-b sticky top-0 z-10`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* Dark mode toggle */}
          <button
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className={`w-10 h-10 rounded-full flex items-center justify-center ${
              isDark ? 'bg-gray-800 hover:bg-[#1a1a1a]' : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            {isDark ? (
              <svg className="w-5 h-5 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>

          {/* Notification bell */}
          <button className={`w-10 h-10 rounded-full flex items-center justify-center ${
            isDark ? 'bg-gray-800 hover:bg-[#1a1a1a]' : 'bg-gray-100 hover:bg-gray-200'
          }`}>
            <Bell className={`h-5 w-5 ${isDark ? 'text-gray-300' : 'text-gray-600'}`} />
          </button>
          
          {/* User profile section */}
          <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${
            isDark ? 'bg-gray-800 hover:bg-[#1a1a1a]' : 'bg-gray-100 hover:bg-gray-200'
          }`}>
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
              AY
            </div>
            <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Adeniyi Ayo</span>
            <ChevronDown className={`h-4 w-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
          </div>
        </div>
      </div>
    </header>
  );
} 
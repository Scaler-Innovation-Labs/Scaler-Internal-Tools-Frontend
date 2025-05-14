"use client";

import { useTheme } from "next-themes";

interface MessMenuProps {
  imageUrl?: string;
}

export function MessMenu({ imageUrl }: MessMenuProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className={`p-6 rounded-3xl shadow-2xl ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
      <h2 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Monthly Mess Menu</h2>
      <div className="mt-4 overflow-auto">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="Monthly Mess Menu"
            className="w-full rounded-md"
          />
        ) : (
          <div className={`w-full h-64 flex items-center justify-center rounded-md ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
            <span className={isDark ? 'text-gray-300' : 'text-gray-500'}>Menu image not available</span>
          </div>
        )}
      </div>
    </div>
  );
}

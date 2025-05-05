import { Link2 } from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes";

export type AnnouncementType = 
  | "instructor" 
  | "admin" 
  | "exam" 
  | "club" 
  | "council" 
  | "general";

export type Announcement = {
  id: number;
  title: string;
  message: string;
  date: string;
  hasAttachment: boolean;
  attachmentLink?: string;
  type: AnnouncementType;
  author: {
    name: string;
    role: string;
    avatar?: string;
    initial: string;
  };
};

interface AnnouncementCardProps {
  announcement: Announcement;
}

// Color schema for different announcement types
const typeColors: Record<AnnouncementType, { bg: string, border: string, dot: string, darkBg: string, darkBorder: string }> = {
  instructor: {
    bg: 'bg-blue-100',
    border: 'border-blue-300',
    dot: 'bg-blue-600',
    darkBg: 'bg-blue-900/30',
    darkBorder: 'border-blue-700',
  },
  admin: {
    bg: 'bg-purple-100',
    border: 'border-purple-300',
    dot: 'bg-purple-600',
    darkBg: 'bg-purple-900/30',
    darkBorder: 'border-purple-700',
  },
  exam: {
    bg: 'bg-red-100',
    border: 'border-red-300',
    dot: 'bg-red-600',
    darkBg: 'bg-red-900/30',
    darkBorder: 'border-red-700',
  },
  club: {
    bg: 'bg-green-100',
    border: 'border-green-300',
    dot: 'bg-green-600',
    darkBg: 'bg-green-900/30',
    darkBorder: 'border-green-700',
  },
  council: {
    bg: 'bg-amber-100',
    border: 'border-amber-300',
    dot: 'bg-amber-600',
    darkBg: 'bg-amber-900/30',
    darkBorder: 'border-amber-700',
  },
  general: {
    bg: 'bg-gray-100',
    border: 'border-gray-300',
    dot: 'bg-gray-600',
    darkBg: 'bg-gray-800',
    darkBorder: 'border-gray-600',
  },
};

// Avatar background colors based on announcement type
const avatarColors: Record<AnnouncementType, string> = {
  instructor: 'bg-blue-200 text-blue-800',
  admin: 'bg-purple-200 text-purple-800',
  exam: 'bg-red-200 text-red-800',
  club: 'bg-green-200 text-green-800',
  council: 'bg-amber-200 text-amber-800',
  general: 'bg-gray-200 text-gray-800',
};

// Type labels
const typeLabels: Record<AnnouncementType, string> = {
  instructor: 'Course Announcement',
  admin: 'Administration',
  exam: 'Exam Notification',
  club: 'Club Activity',
  council: 'Student Council',
  general: 'General',
};

export function AnnouncementCard({ announcement }: AnnouncementCardProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  
  const typeColor = typeColors[announcement.type];
  const avatarColor = avatarColors[announcement.type];
  const typeLabel = typeLabels[announcement.type];

  return (
    <div className={`p-4 rounded-xl border shadow-sm transition-all duration-300 ease-in-out transform hover:scale-[1.02] hover:shadow-md ${
      isDark 
        ? `${typeColor.darkBg} ${typeColor.darkBorder}` 
        : `${typeColor.bg} ${typeColor.border}`
    }`}>
      <div className="flex items-start gap-3">
        <div className={`w-10 h-10 rounded-full ${avatarColor} flex items-center justify-center font-medium text-sm flex-shrink-0`}>
          {announcement.author.initial}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-1.5">
            <div>
              <div className="flex items-center gap-1.5 mb-0.5">
                <div className={`h-2 w-2 rounded-full ${typeColor.dot}`}></div>
                <span className={`text-xs font-medium ${
                  isDark ? `text-${announcement.type}-300` : `text-${announcement.type}-700`
                }`}>
                  {typeLabel}
                </span>
              </div>
              <h3 className={`text-base font-semibold leading-tight mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {announcement.title}
              </h3>
            </div>
            
            {announcement.hasAttachment && (
              <Link 
                href={announcement.attachmentLink || `/announcements/${announcement.id}`}
                className={`p-1.5 rounded-full ${
                  isDark 
                    ? 'bg-gray-800 text-blue-300 hover:bg-gray-700' 
                    : 'bg-white text-blue-700 hover:bg-blue-50'
                } flex-shrink-0 shadow-sm transition-colors`}
              >
                <Link2 className="h-4 w-4" />
              </Link>
            )}
          </div>
          
          <div className="flex items-center gap-2 mb-2 text-xs">
            <span className={`font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              {announcement.author.name}
            </span>
            <span className={`inline-block h-1 w-1 rounded-full ${isDark ? 'bg-gray-600' : 'bg-gray-400'}`}></span>
            <span className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {announcement.date}
            </span>
          </div>
          
          <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'} leading-snug line-clamp-2`}>
            {announcement.message}
          </p>
          
          {announcement.hasAttachment && (
            <div className="mt-3">
              <Link 
                href={announcement.attachmentLink || `/announcements/${announcement.id}`}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  isDark 
                    ? `bg-${announcement.type}-900/40 text-${announcement.type}-300 hover:bg-${announcement.type}-900/60` 
                    : `bg-${announcement.type}-200 text-${announcement.type}-800 hover:bg-${announcement.type}-300`
                }`}
              >
                View details
                <svg className="h-3.5 w-3.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 
"use client";

import { ArrowLeft, Calendar, Download, Link2, User } from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useParams } from "next/navigation";
import { AnnouncementType } from "@/components/dashboard/AnnouncementCard";

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

// Mock data - in a real app you would fetch this from an API
const announcements = [
  {
    id: 1,
    title: "New Assignment: Data Structures Implementation",
    message: "Hello everyone, I've posted a new assignment on Data Structures Implementation. It focuses on implementing binary trees and hash maps. Please check the attached resources and submit your work by June 25th. Let me know if you have any questions!",
    fullDescription: "This assignment will test your understanding of fundamental data structures. You will be implementing:\n\n1. Binary Search Tree with insertion, deletion, and traversal\n2. Hash Map with collision handling\n3. Priority Queue using a heap\n\nRemember to include proper test cases and documentation. This assignment counts for 15% of your final grade. The code should be submitted via the GitHub repository I've set up for the class.",
    date: "June 15, 2023",
    hasAttachment: true,
    type: "instructor",
    attachments: [
      { name: "assignment_details.pdf", size: "1.2 MB", type: "pdf" },
      { name: "sample_code.zip", size: "345 KB", type: "zip" }
    ],
    author: {
      name: "Prof. Williams",
      role: "Course Instructor",
      initial: "PW",
    },
  },
  {
    id: 2,
    title: "Mid-term Examination Schedule",
    message: "The mid-term examination for all courses will be held next week. Please check the attached schedule for your exam timings and venues. Make sure to bring your student ID and required stationery.",
    fullDescription: "The mid-term examinations will cover all topics discussed so far in the course. Please review the following modules:\n\n- Introduction to Algorithms (Weeks 1-3)\n- Data Structures (Weeks 4-6)\n- System Design Basics (Weeks 7-8)\n\nThe exam will consist of both multiple-choice questions and coding problems. You will have 2 hours to complete the examination. No electronic devices except for approved calculators will be permitted in the examination hall.",
    date: "June 18, 2023",
    hasAttachment: true,
    type: "exam",
    attachments: [
      { name: "midterm_schedule.pdf", size: "850 KB", type: "pdf" },
      { name: "study_guide.docx", size: "420 KB", type: "docx" }
    ],
    author: {
      name: "Academic Office",
      role: "Administration",
      initial: "AO",
    },
  },
  {
    id: 3,
    title: "Guest Lecture: Advanced Machine Learning",
    message: "We're excited to announce a special guest lecture on Advanced Machine Learning by Dr. Sarah Chen from Google AI. The lecture will be held on June 28th at 3:00 PM in the Main Auditorium.",
    fullDescription: "Dr. Sarah Chen is a Principal Research Scientist at Google AI specializing in deep learning and computer vision. She has published over 50 papers in top-tier conferences and journals, and her work on neural architecture search has been widely adopted in the industry.\n\nIn this lecture, Dr. Chen will cover:\n\n- Recent advances in transformer architectures\n- Self-supervised learning techniques\n- Efficient deployment of ML models\n- Ethical considerations in AI development\n\nThis is a rare opportunity to learn from one of the leading experts in the field. Attendance is optional but highly recommended for all students interested in machine learning and artificial intelligence.",
    date: "June 20, 2023",
    hasAttachment: false,
    type: "club",
    author: {
      name: "Events Team",
      role: "Student Affairs",
      initial: "ET",
    },
  },
];

export default function AnnouncementDetailPage() {
  const { id } = useParams();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  
  // Find the announcement by ID
  const announcement = announcements.find(a => a.id === parseInt(id as string)) || announcements[0];
  
  const typeColor = typeColors[announcement.type as AnnouncementType];
  const avatarColor = avatarColors[announcement.type as AnnouncementType];
  const typeLabel = typeLabels[announcement.type as AnnouncementType];
  
  return (
    <div className={`min-h-screen ${isDark ? 'bg-black' : 'bg-gray-50'}`}>
      <header className={`px-4 py-2 ${isDark ? 'bg-black border-gray-800' : 'bg-white border-gray-200'} border-b sticky top-0 z-10`}>
        <div className="container mx-auto">
          <div className="flex items-center gap-4">
            <Link 
              href="/dashboard" 
              className={`flex items-center gap-2 transition-colors ${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Dashboard</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className={`p-6 rounded-xl border shadow-md ${
            isDark 
              ? `${typeColor.darkBg} ${typeColor.darkBorder}` 
              : `${typeColor.bg} ${typeColor.border}`
          }`}>
            <div className="flex items-center gap-2 mb-4">
              <div className={`h-3 w-3 rounded-full ${typeColor.dot}`}></div>
              <span className={`text-sm font-semibold ${
                isDark ? `text-${announcement.type}-300` : `text-${announcement.type}-700`
              }`}>
                {typeLabel}
              </span>
            </div>
            
            <div className="flex items-start justify-between mb-6">
              <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {announcement.title}
              </h1>
            </div>
            
            <div className="flex flex-wrap gap-6 mb-6">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-full ${avatarColor} flex items-center justify-center`}>
                  <span className="font-medium text-base">{announcement.author.initial}</span>
                </div>
                <div>
                  <p className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {announcement.author.name}
                  </p>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    {announcement.author.role}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-full bg-blue-200 text-blue-800 flex items-center justify-center`}>
                  <Calendar className="h-5 w-5" />
                </div>
                <div>
                  <p className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Posted on
                  </p>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    {announcement.date}
                  </p>
                </div>
              </div>
            </div>
            
            <div className={`prose max-w-none mb-8 ${isDark ? 'prose-invert' : ''}`}>
              <p className={`text-base ${isDark ? 'text-gray-300' : 'text-gray-600'} leading-relaxed`}>
                {announcement.message}
              </p>
              
              {announcement.fullDescription && (
                <div className={`mt-6 p-6 rounded-lg ${
                  isDark
                    ? `border-l-4 border-l-${announcement.type}-500 bg-${announcement.type}-900/20`
                    : `border-l-4 border-l-${announcement.type}-500 bg-${announcement.type}-50/80`
                }`}>
                  <p className={`text-base whitespace-pre-line ${isDark ? 'text-gray-300' : 'text-gray-600'} leading-relaxed`}>
                    {announcement.fullDescription}
                  </p>
                </div>
              )}
            </div>
            
            {announcement.hasAttachment && announcement.attachments && (
              <div>
                <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Attachments
                </h3>
                <div className="space-y-3">
                  {announcement.attachments.map((attachment, index) => (
                    <div 
                      key={index}
                      className={`flex items-center justify-between p-4 rounded-lg border transition-colors ${
                        isDark 
                          ? 'bg-gray-800/70 border-gray-700 hover:bg-gray-800' 
                          : 'bg-white border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-xl ${avatarColor} flex items-center justify-center`}>
                          <Link2 className="h-5 w-5" />
                        </div>
                        <div>
                          <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {attachment.name}
                          </p>
                          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            {attachment.size} • {attachment.type.toUpperCase()}
                          </p>
                        </div>
                      </div>
                      
                      <button 
                        className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                          isDark 
                            ? `bg-${announcement.type}-900/40 text-${announcement.type}-300 hover:bg-${announcement.type}-900/60` 
                            : `bg-${announcement.type}-200 text-${announcement.type}-800 hover:bg-${announcement.type}-300`
                        }`}
                      >
                        <Download className="h-4 w-4" />
                        <span>Download</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
} 
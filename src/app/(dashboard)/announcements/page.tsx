"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Announcement, AnnouncementCard } from "@/components/dashboard/AnnouncementCard";

// Mock data
const announcements: Announcement[] = [
  {
    id: 1,
    title: "New Assignment: Data Structures Implementation",
    message: "Hello everyone, I've posted a new assignment on Data Structures Implementation. It focuses on implementing binary trees and hash maps. Please check the attached resources and submit your work by June 25th. Let me know if you have any questions!",
    date: "June 15, 2023",
    hasAttachment: true,
    attachmentLink: "/announcements/1",
    type: "instructor",
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
    date: "June 18, 2023",
    hasAttachment: true,
    attachmentLink: "/announcements/2",
    type: "exam",
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
    date: "June 20, 2023",
    hasAttachment: false,
    type: "club",
    author: {
      name: "Events Team",
      role: "Student Affairs",
      initial: "ET",
    },
  },
  {
    id: 4,
    title: "Campus Facilities Closure Notice",
    message: "Please be informed that the library and computer labs will be closed for maintenance from July 1-3. We apologize for any inconvenience this may cause.",
    date: "June 22, 2023",
    hasAttachment: false,
    type: "admin",
    author: {
      name: "Facilities Management",
      role: "Administration",
      initial: "FM",
    },
  },
  {
    id: 5,
    title: "Scholarship Applications Open",
    message: "Applications for the Fall 2023 Merit Scholarship are now open. Eligible students can apply through the student portal. The deadline for submissions is July 15th, 2023.",
    date: "June 25, 2023",
    hasAttachment: true,
    attachmentLink: "/announcements/5",
    type: "admin",
    author: {
      name: "Financial Aid Office",
      role: "Administration",
      initial: "FA",
    },
  },
  {
    id: 6,
    title: "Student Council Elections",
    message: "Our annual Student Council Elections will be held on August 5th. Nominations are now open for all positions. Don't miss this opportunity to represent your peers and make a difference!",
    date: "June 29, 2023",
    hasAttachment: true,
    attachmentLink: "/announcements/6",
    type: "council",
    author: {
      name: "Election Committee",
      role: "Student Council",
      initial: "EC",
    },
  },
];

export default function AnnouncementsPage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  
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
          <div className="flex items-center justify-between mb-8">
            <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Announcements
            </h1>
            <div className="flex gap-2">
              <div className={`h-3 w-3 rounded-full bg-blue-600`}></div>
              <div className={`h-3 w-3 rounded-full bg-red-600`}></div>
              <div className={`h-3 w-3 rounded-full bg-green-600`}></div>
              <div className={`h-3 w-3 rounded-full bg-purple-600`}></div>
              <div className={`h-3 w-3 rounded-full bg-amber-600`}></div>
            </div>
          </div>
          
          <div className="space-y-4">
            {announcements.map(announcement => (
              <AnnouncementCard key={announcement.id} announcement={announcement} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
} 
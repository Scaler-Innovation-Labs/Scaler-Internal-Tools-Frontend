"use client";

import { useTheme } from "next-themes";
import { Search, Bell, ChevronDown, AlertCircle, Eye, CheckCircle, Wrench as Tool } from "lucide-react";
import Link from "next/link";
import { AnnouncementCard, Announcement } from "@/components/dashboard/AnnouncementCard";
import { useState } from "react";

// Mock data
const announcements: Announcement[] = [
  {
    id: 1,
    title: "New Assignment: Data Structures Implementation",
    message: "Hello everyone, I've posted a new assignment on Data Structures Implementation. It focuses on implementing binary trees and hash maps. Please check the attached resources and submit your work by June 25th.",
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
];

const calendarData = {
  month: "JULY 2021+",
  days: [
    { dayOfWeek: "Mo", dates: [28, 5, 12, 19, 26] },
    { dayOfWeek: "Tu", dates: [29, 6, 13, 20, 27] },
    { dayOfWeek: "We", dates: [30, 7, 14, 21, 28] },
    { dayOfWeek: "Th", dates: [1, 8, 15, 22, 29] },
    { dayOfWeek: "Fr", dates: [2, 9, 16, 23, 30] },
    { dayOfWeek: "Sa", dates: [3, 10, 17, 24, 31] },
    { dayOfWeek: "Su", dates: [4, 11, 18, 25, 1] },
  ],
  currentDay: 8,
  highlights: [
    { date: 13, type: "exam" },
    { date: 18, type: "club" },
    { date: 19, type: "instructor" },
    { date: 23, type: "admin" }
  ],
};

const progressModules = [
  { name: "Life Contingency", chapter: 1, progress: 70 },
  { name: "Social Insurance", chapter: 4, progress: 60 },
  { name: "Advanced Maths", chapter: 2, progress: 40 },
  { name: "Pension", chapter: 3, progress: 50 },
];

const upcomingActivities = [
  { 
    id: 8, 
    title: "Life Contingency Tutorials", 
    time: "Monday, June 12, 2023 • 8:00 - 9:00 AM",
    link: "#",
    type: "instructor"
  },
  { 
    id: 13, 
    title: "Social Insurance Test", 
    time: "Tuesday, June 13, 2023 • 10:00 - 11:00 AM",
    link: "#",
    type: "exam"
  },
  { 
    id: 18, 
    title: "Adv. Maths Assignment Due", 
    time: "Monday, June 18, 2023 • 11:59 PM",
    link: "#",
    type: "club"
  },
  { 
    id: 23, 
    title: "Dr. Ogie's Tutorial Class", 
    time: "Friday, June 23, 2023 • 2:00 - 3:00 PM",
    link: "#",
    type: "admin"
  },
];

const messages = [
  {
    id: 1,
    sender: "Mayowa Ade",
    initial: "MA",
    role: "Class Captain",
    time: "10:25 am",
    avatar: "/avatars/mayowa.jpg",
    message: "New assignment posted..."
  },
  {
    id: 2,
    sender: "Oluwuyi Tobi",
    initial: "OT",
    role: "Classmate",
    time: "10:45 pm",
    avatar: "/avatars/tobi.jpg",
    message: "Did you check the homework yet?"
  },
  {
    id: 3,
    sender: "Joshua Adetayo",
    initial: "JA",
    role: "Class Rep",
    time: "11:20 am",
    avatar: "/avatars/joshua.jpg",
    message: "Quiz now posted for all students"
  },
  {
    id: 4,
    sender: "Mayowa Ade",
    initial: "MA",
    role: "Class Captain",
    time: "12:30 pm",
    avatar: "/avatars/mayowa.jpg",
    message: "Class meeting tomorrow at 3pm"
  },
];

const topPerformers = [
  {
    id: 1,
    name: "Joshua Adetayo",
    initial: "JA",
    score: "96%",
    color: "bg-emerald-100 text-emerald-700",
  },
  {
    id: 2,
    name: "Adeniyi Ayo",
    initial: "AA",
    score: "92%",
    color: "bg-blue-100 text-blue-700",
  },
  {
    id: 3,
    name: "Oluwuyi Tobi",
    initial: "OT",
    score: "88%",
    color: "bg-orange-100 text-orange-700",
  },
];

// Lost and Found items mock data
const lostAndFoundItems = [
  {
    id: 1,
    itemName: "Blue Water Bottle",
    personName: "John Smith",
    location: "Room 205",
    date: "June 10, 2023",
    description: "Blue Hydro Flask with stickers, left after the Physics class. Please contact if found.",
    image: "/images/water-bottle.jpg",
    isLost: true,
  },
  {
    id: 2, 
    itemName: "Calculator (TI-84)",
    personName: "Staff Office",
    location: "Room 101",
    date: "June 15, 2023",
    description: "Black TI-84 Plus calculator found after the Math exam. Please claim from the staff office with proper identification.",
    image: "/images/calculator.jpg",
    isLost: false,
  },
  {
    id: 3,
    itemName: "Apple Airpods",
    personName: "Sarah Johnson",
    location: "Library",
    date: "June 12, 2023",
    description: "White case with initials SJ on the back. Last seen in the library near the computer section.",
    image: "/images/airpods.jpg", 
    isLost: true,
  },
  {
    id: 4,
    itemName: "USB Flash Drive",
    personName: "Admin Office",
    location: "Room 301",
    date: "June 8, 2023",
    description: "16GB black Kingston drive with important class materials. Found in the student lounge.",
    image: "/images/usb.jpg",
    isLost: false,
  },
];

// Ticket system mock data
const tickets = [
  {
    id: "TKT-001",
    title: "Broken AC in Room 201",
    priority: "high",
    reporter: "John Smith",
    reportedDate: "June 15, 2023",
    status: "reported",
    department: "facilities"
  },
  {
    id: "TKT-002",
    title: "Projector not working",
    priority: "medium",
    reporter: "Sarah Williams",
    reportedDate: "June 16, 2023",
    status: "noticed",
    department: "it"
  },
  {
    id: "TKT-003",
    title: "Water leakage in Lab",
    priority: "high",
    reporter: "David Miller",
    reportedDate: "June 14, 2023",
    status: "work_started",
    department: "facilities"
  },
  {
    id: "TKT-004",
    title: "Library door stuck",
    priority: "low",
    reporter: "Emma Johnson",
    reportedDate: "June 13, 2023",
    status: "work_done",
    department: "facilities"
  },
  {
    id: "TKT-005",
    title: "Missing markers in Room 105",
    priority: "low",
    reporter: "Prof. Williams",
    reportedDate: "June 17, 2023",
    status: "reported",
    department: "supplies"
  },
  {
    id: "TKT-006",
    title: "WiFi connection issues",
    priority: "medium",
    reporter: "IT Department",
    reportedDate: "June 16, 2023",
    status: "work_started",
    department: "it"
  },
  {
    id: "TKT-007",
    title: "Broken chair in Room 103",
    priority: "low",
    reporter: "Student Council",
    reportedDate: "June 12, 2023",
    status: "work_done",
    department: "facilities"
  },
  {
    id: "TKT-008",
    title: "Scanner not working",
    priority: "medium",
    reporter: "Admin Office",
    reportedDate: "June 15, 2023",
    status: "noticed",
    department: "it"
  }
];

// Ticket status configurations
const ticketStatusConfig = {
  reported: {
    color: "red",
    icon: "alert-circle",
    label: "Reported"
  },
  noticed: {
    color: "orange",
    icon: "eye",
    label: "Noticed"
  },
  work_started: {
    color: "blue",
    icon: "tool",
    label: "Work Started"
  },
  work_done: {
    color: "green",
    icon: "check-circle",
    label: "Work Done"
  }
};

// Color schema for different announcement/event types
const typeColors = {
  instructor: {
    bg: 'bg-blue-500',
    hover: 'hover:bg-blue-600',
    light: 'bg-blue-100'
  },
  admin: {
    bg: 'bg-purple-500',
    hover: 'hover:bg-purple-600',
    light: 'bg-purple-100'
  },
  exam: {
    bg: 'bg-red-500',
    hover: 'hover:bg-red-600',
    light: 'bg-red-100'
  },
  club: {
    bg: 'bg-green-500',
    hover: 'hover:bg-green-600',
    light: 'bg-green-100'
  },
  council: {
    bg: 'bg-amber-500',
    hover: 'hover:bg-amber-600',
    light: 'bg-amber-100'
  },
  general: {
    bg: 'bg-gray-500',
    hover: 'hover:bg-gray-600',
    light: 'bg-gray-100'
  },
};

export default function DashboardPage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [itemType, setItemType] = useState<"lost" | "found">("lost");
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  
  // Filter lost and found items based on the selected type
  const filteredItems = lostAndFoundItems.filter(item => 
    itemType === "lost" ? item.isLost : !item.isLost
  );
  
  // Navigation functions for the carousel
  const goToNextItem = () => {
    setCurrentItemIndex(prevIndex => 
      prevIndex === filteredItems.length - 1 ? 0 : prevIndex + 1
    );
  };
  
  const goToPrevItem = () => {
    setCurrentItemIndex(prevIndex => 
      prevIndex === 0 ? filteredItems.length - 1 : prevIndex - 1
    );
  };
  
  // Group tickets by status
  const ticketsByStatus = {
    reported: tickets.filter(ticket => ticket.status === "reported"),
    noticed: tickets.filter(ticket => ticket.status === "noticed"),
    work_started: tickets.filter(ticket => ticket.status === "work_started"),
    work_done: tickets.filter(ticket => ticket.status === "work_done")
  };
  
  return (
    <div className={`min-h-screen ${isDark ? 'bg-black' : 'bg-gray-50'}`}>
      <header className={`px-4 py-2 ${isDark ? 'bg-black border-gray-800' : 'bg-white border-gray-200'} border-b sticky top-0 z-10`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center">
              <div className="flex items-center mr-2">
                <svg className="w-6 h-6 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                  <path fill="currentColor" d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"/>
                </svg>
              </div>
              <span className={`font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>SST Internals</span>
            </div>
            
            <div className={`h-5 w-px ${isDark ? 'bg-gray-700' : 'bg-gray-300'}`}></div>
            
            <div className="relative w-64">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className={`h-4 w-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
              </div>
              <input 
                type="text" 
                placeholder="Search Courses, Documents, Activities..." 
                className={`pl-10 pr-4 py-2 w-full text-sm rounded-md ${
                  isDark ? 'bg-gray-900 text-white border-gray-700' : 'bg-gray-50 text-gray-900 border-gray-300'
                } border focus:outline-none focus:ring-1 focus:ring-blue-500`}
              />
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center">
              <button className={`p-2 rounded-full ${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}>
                <Bell className={`h-5 w-5 ${isDark ? 'text-gray-300' : 'text-gray-600'}`} />
              </button>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
                AY
              </div>
              <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Adeniyi Ayo</span>
              <ChevronDown className={`h-4 w-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
            </div>
          </div>
        </div>
      </header>

      <main className="px-6 py-6">
        <div className="mb-8">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div>
              <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Welcome back, Ayo <span className="text-yellow-400">👋</span>
              </h1>
              <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                You're learning 70% of your goals. Keep it up and improve your progress.
              </p>
            </div>

            <div>
              <h2 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                My Progress
              </h2>
              <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {calendarData.month}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            <div className={`lg:col-span-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <h3 className={`font-semibold text-lg`}>Announcements</h3>
                  <div className="flex items-center gap-1.5">
                    <div className={`h-2 w-2 rounded-full bg-blue-600`}></div>
                    <div className={`h-2 w-2 rounded-full bg-red-600`}></div>
                    <div className={`h-2 w-2 rounded-full bg-green-600`}></div>
                  </div>
                </div>
                <Link href="/announcements" className={`text-sm font-medium ${isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'} transition-colors`}>
                  See all
                </Link>
              </div>
              
              <div className="space-y-4">
                {announcements.map(announcement => (
                  <AnnouncementCard key={announcement.id} announcement={announcement} />
                ))}
              </div>
            </div>
            
            <div className={`lg:col-span-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <h3 className={`font-semibold text-lg`}>Calendar</h3>
                  <div className="flex items-center gap-1.5">
                    <div className={`h-2 w-2 rounded-full bg-blue-600`}></div>
                    <div className={`h-2 w-2 rounded-full bg-red-600`}></div>
                    <div className={`h-2 w-2 rounded-full bg-green-600`}></div>
                  </div>
                </div>
              </div>
              
              {/* Enhanced Calendar */}
              <div className={`rounded-xl p-4 ${
                isDark ? 'bg-gray-900 border border-gray-800' : 'bg-white shadow-sm'
              }`}>
                <div className="flex items-center justify-between mb-4">
                  <h4 className={`font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    {calendarData.month}
                  </h4>
                  <div className="flex items-center gap-2">
                    <button className={`p-1.5 rounded-md ${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}>
                      <svg className={`h-4 w-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button className={`p-1.5 rounded-md ${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}>
                      <svg className={`h-4 w-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
                
                <div className="grid grid-cols-7 gap-1">
                  {calendarData.days.map((day, index) => (
                    <div key={index} className="text-center">
                      <div className={`text-xs font-medium mb-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        {day.dayOfWeek}
                      </div>
                      <div className="space-y-1">
                        {day.dates.map((date, dateIndex) => {
                          const isCurrentDay = date === calendarData.currentDay;
                          const highlightInfo = calendarData.highlights.find(h => h.date === date);
                          const isHighlighted = !!highlightInfo;
                          const type = highlightInfo?.type || "general";
                          const eventColor = typeColors[type as keyof typeof typeColors];
                          
                          return (
                            <div key={dateIndex} className="flex justify-center">
                              <button 
                                className={`
                                  w-9 h-9 flex items-center justify-center rounded-lg text-sm font-medium 
                                  transition-all duration-200 hover:scale-105
                                  ${isCurrentDay 
                                    ? `${typeColors.instructor.bg} text-white` 
                                    : isHighlighted
                                      ? isDark 
                                        ? `${eventColor.bg} text-white` 
                                        : `${eventColor.light} text-gray-900`
                                      : isDark
                                        ? 'hover:bg-gray-800 text-gray-300'
                                        : 'hover:bg-gray-100 text-gray-700'
                                  }
                                `}
                              >
                                {date}
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Legend */}
                <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="flex items-center gap-1.5">
                      <div className={`h-2.5 w-2.5 rounded-full ${typeColors.instructor.bg}`}></div>
                      <span className="text-xs">Classes</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className={`h-2.5 w-2.5 rounded-full ${typeColors.exam.bg}`}></div>
                      <span className="text-xs">Exams</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className={`h-2.5 w-2.5 rounded-full ${typeColors.club.bg}`}></div>
                      <span className="text-xs">Events</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className={`h-2.5 w-2.5 rounded-full ${typeColors.admin.bg}`}></div>
                      <span className="text-xs">Deadlines</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Upcoming Activities */}
              <div className="mt-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <h3 className={`font-semibold text-lg`}>Upcoming Activities</h3>
                    <div className="flex items-center gap-1.5">
                      <div className={`h-2 w-2 rounded-full ${typeColors.instructor.bg}`}></div>
                      <div className={`h-2 w-2 rounded-full ${typeColors.exam.bg}`}></div>
                      <div className={`h-2 w-2 rounded-full ${typeColors.club.bg}`}></div>
                    </div>
                  </div>
                  <Link href="#" className={`text-sm font-medium ${isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'} transition-colors`}>
                    See all
                  </Link>
                </div>
                
                <div className="space-y-2">
                  {upcomingActivities.slice(0, 3).map((activity) => {
                    const eventColor = typeColors[activity.type as keyof typeof typeColors];
                    
                    return (
                      <Link 
                        href={activity.link} 
                        key={activity.id} 
                        className={`
                          block p-3 rounded-lg transition-all duration-300 hover:scale-[1.01] 
                          ${isDark 
                            ? `bg-gray-900 hover:bg-gray-800 border border-gray-800` 
                            : `bg-white hover:bg-gray-50 shadow-sm`
                          }
                        `}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-lg shadow-sm ${eventColor.bg} flex items-center justify-center text-white font-bold text-sm`}>
                            {activity.id}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1 mb-0.5">
                              <div className={`h-1.5 w-1.5 rounded-full ${eventColor.bg}`}></div>
                              <span className={`text-xs ${
                                isDark ? `text-${activity.type}-300` : `text-${activity.type}-700`
                              }`}>
                                {activity.type === "instructor" ? "Class" : 
                                 activity.type === "exam" ? "Exam" : 
                                 activity.type === "club" ? "Event" : "Deadline"}
                              </span>
                            </div>
                            <h4 className={`font-medium text-sm truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>
                              {activity.title}
                            </h4>
                            <p className={`text-xs truncate ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                              {activity.time}
                            </p>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
          <div className={`lg:col-span-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-semibold">Lost and Found</h2>
                <div className="flex items-center gap-1.5">
                  <div className={`h-2 w-2 rounded-full ${typeColors.instructor.bg}`}></div>
                  <div className={`h-2 w-2 rounded-full ${typeColors.exam.bg}`}></div>
                  <div className={`h-2 w-2 rounded-full ${typeColors.club.bg}`}></div>
                </div>
              </div>
            </div>
            
            {/* Lost and Found Carousel */}
            <div className={`rounded-xl overflow-hidden ${
              isDark ? 'bg-gray-900 border border-gray-800' : 'bg-white shadow-sm'
            }`}>
              <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Lost and Found</h3>
                
                {/* Toggle between Lost and Found */}
                <div className="flex items-center rounded-lg border overflow-hidden text-sm font-medium bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                  <button 
                    className={`px-3 py-1.5 ${
                      itemType === "lost" 
                        ? "bg-blue-500 text-white" 
                        : isDark ? "text-gray-300" : "text-gray-700"
                    }`}
                    onClick={() => {
                      setItemType("lost");
                      setCurrentItemIndex(0);
                    }}
                  >
                    Lost
                  </button>
                  <button 
                    className={`px-3 py-1.5 ${
                      itemType === "found" 
                        ? "bg-blue-500 text-white" 
                        : isDark ? "text-gray-300" : "text-gray-700"
                    }`}
                    onClick={() => {
                      setItemType("found");
                      setCurrentItemIndex(0);
                    }}
                  >
                    Found
                  </button>
                </div>
              </div>
              
              {filteredItems.length > 0 ? (
                <div className="relative">
                  <div className="flex h-64 relative">
                    {/* Image section */}
                    <div className="w-1/2 bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center p-4 relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-purple-400 to-pink-500 opacity-90"></div>
                      <div className="w-48 h-48 bg-white rounded-xl shadow-xl relative z-10 overflow-hidden">
                        {filteredItems[currentItemIndex]?.image ? (
                          <img 
                            src={filteredItems[currentItemIndex].image} 
                            alt={filteredItems[currentItemIndex].itemName}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              // Fallback to placeholder if image fails to load
                              e.currentTarget.style.display = 'none';
                              e.currentTarget.nextElementSibling?.classList.remove('hidden');
                            }}
                          />
                        ) : null}
                        <div className={`w-full h-full absolute inset-0 flex items-center justify-center bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 ${filteredItems[currentItemIndex]?.image ? 'hidden' : ''}`}>
                          <svg className="w-14 h-14" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      </div>
                      
                      {/* Card number indicator */}
                      <div className="absolute top-4 right-4 z-20 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-white text-sm font-medium">
                        Card {currentItemIndex + 1}
                      </div>
                      
                      {/* Navigation buttons */}
                      <button 
                        onClick={goToPrevItem} 
                        className="absolute left-3 top-1/2 -mt-6 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors z-20"
                      >
                        <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      
                      <button 
                        onClick={goToNextItem} 
                        className="absolute right-3 top-1/2 -mt-6 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors z-20"
                      >
                        <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                    
                    {/* Details section */}
                    <div className="w-1/2 p-6">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className={`font-medium text-lg ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {filteredItems[currentItemIndex]?.itemName}
                        </h4>
                        <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                          filteredItems[currentItemIndex]?.isLost 
                            ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100" 
                            : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                        }`}>
                          {filteredItems[currentItemIndex]?.isLost ? "Lost" : "Found"}
                        </span>
                      </div>
                      
                      <div className="space-y-3 mt-4">
                        <div>
                          <span className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Contact Person: </span>
                          <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{filteredItems[currentItemIndex]?.personName}</span>
                        </div>
                        <div>
                          <span className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Location: </span>
                          <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{filteredItems[currentItemIndex]?.location}</span>
                        </div>
                        <div>
                          <span className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Date: </span>
                          <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{filteredItems[currentItemIndex]?.date}</span>
                        </div>
                        <div>
                          <span className={`text-sm font-medium block mb-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Description: </span>
                          <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'} line-clamp-3`}>
                            {filteredItems[currentItemIndex]?.description}
                          </p>
                        </div>
                      </div>
                      
                      {/* Pagination dots */}
                      <div className="absolute bottom-4 left-0 right-0 flex items-center justify-center gap-1.5">
                        {filteredItems.map((_, index) => (
                          <button 
                            key={index}
                            onClick={() => setCurrentItemIndex(index)}
                            className={`w-2 h-2 rounded-full transition-all ${
                              index === currentItemIndex 
                                ? 'bg-blue-500 w-5' 
                                : isDark ? 'bg-gray-600 hover:bg-gray-500' : 'bg-gray-300 hover:bg-gray-400'
                            }`}
                            aria-label={`Go to item ${index + 1}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className={`h-48 flex items-center justify-center text-center ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  <div>
                    <svg className="w-12 h-12 mx-auto mb-2 opacity-50" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 16h.01M17 18v1a1 1 0 01-1 1H8a1 1 0 01-1-1v-1m5-5a4 4 0 100-8 4 4 0 000 8z" />
                    </svg>
                    <p>No {itemType} items to display at the moment.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className={`lg:col-span-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-semibold">Ticketing System</h2>
                <div className="flex items-center gap-1.5">
                  <div className={`h-2 w-2 rounded-full bg-red-500`}></div>
                  <div className={`h-2 w-2 rounded-full bg-blue-500`}></div>
                  <div className={`h-2 w-2 rounded-full bg-green-500`}></div>
                </div>
              </div>
              <Link href="/tickets" className={`text-sm font-medium ${isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'} transition-colors`}>
                View All
              </Link>
            </div>
            
            <div className={`rounded-xl ${
              isDark ? 'bg-gray-900 border border-gray-800' : 'bg-white shadow-sm'
            }`}>
              {/* Kanban Board Header */}
              <div className="grid grid-cols-4 gap-1 p-3 border-b border-gray-200 dark:border-gray-700">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1.5 text-xs font-medium text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 rounded-full py-1 px-2">
                    <AlertCircle className="h-3 w-3" />
                    Reported
                  </div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1.5 text-xs font-medium text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/20 rounded-full py-1 px-2">
                    <Eye className="h-3 w-3" />
                    Noticed
                  </div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1.5 text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 rounded-full py-1 px-2">
                    <Tool className="h-3 w-3" />
                    Work Started
                  </div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1.5 text-xs font-medium text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 rounded-full py-1 px-2">
                    <CheckCircle className="h-3 w-3" />
                    Done
                  </div>
                </div>
              </div>
              
              {/* Kanban Board Columns */}
              <div className="grid grid-cols-4 gap-1 p-2 max-h-[340px] overflow-auto">
                {/* Reported Column */}
                <div className="space-y-2">
                  {ticketsByStatus.reported.map(ticket => (
                    <div 
                      key={ticket.id} 
                      className={`p-2 rounded-md text-xs ${
                        isDark ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-50 hover:bg-gray-100'
                      } cursor-pointer transition-colors`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-mono text-[10px] text-gray-500 dark:text-gray-400">{ticket.id}</span>
                        <span className={`inline-block h-1.5 w-1.5 rounded-full ${ticket.priority === "high" ? "bg-red-500" : ticket.priority === "medium" ? "bg-orange-500" : "bg-blue-500"}`}></span>
                      </div>
                      <div className="font-medium mb-1 line-clamp-2">{ticket.title}</div>
                      <div className="text-[10px] text-gray-500 dark:text-gray-400">{ticket.reportedDate}</div>
                    </div>
                  ))}
                </div>
                
                {/* Noticed Column */}
                <div className="space-y-2">
                  {ticketsByStatus.noticed.map(ticket => (
                    <div 
                      key={ticket.id} 
                      className={`p-2 rounded-md text-xs ${
                        isDark ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-50 hover:bg-gray-100'
                      } cursor-pointer transition-colors`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-mono text-[10px] text-gray-500 dark:text-gray-400">{ticket.id}</span>
                        <span className={`inline-block h-1.5 w-1.5 rounded-full ${ticket.priority === "high" ? "bg-red-500" : ticket.priority === "medium" ? "bg-orange-500" : "bg-blue-500"}`}></span>
                      </div>
                      <div className="font-medium mb-1 line-clamp-2">{ticket.title}</div>
                      <div className="text-[10px] text-gray-500 dark:text-gray-400">{ticket.reportedDate}</div>
                    </div>
                  ))}
                </div>
                
                {/* Work Started Column */}
                <div className="space-y-2">
                  {ticketsByStatus.work_started.map(ticket => (
                    <div 
                      key={ticket.id} 
                      className={`p-2 rounded-md text-xs ${
                        isDark ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-50 hover:bg-gray-100'
                      } cursor-pointer transition-colors`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-mono text-[10px] text-gray-500 dark:text-gray-400">{ticket.id}</span>
                        <span className={`inline-block h-1.5 w-1.5 rounded-full ${ticket.priority === "high" ? "bg-red-500" : ticket.priority === "medium" ? "bg-orange-500" : "bg-blue-500"}`}></span>
                      </div>
                      <div className="font-medium mb-1 line-clamp-2">{ticket.title}</div>
                      <div className="text-[10px] text-gray-500 dark:text-gray-400">{ticket.reportedDate}</div>
                    </div>
                  ))}
                </div>
                
                {/* Work Done Column */}
                <div className="space-y-2">
                  {ticketsByStatus.work_done.map(ticket => (
                    <div 
                      key={ticket.id} 
                      className={`p-2 rounded-md text-xs ${
                        isDark ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-50 hover:bg-gray-100'
                      } cursor-pointer transition-colors`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-mono text-[10px] text-gray-500 dark:text-gray-400">{ticket.id}</span>
                        <span className={`inline-block h-1.5 w-1.5 rounded-full ${ticket.priority === "high" ? "bg-red-500" : ticket.priority === "medium" ? "bg-orange-500" : "bg-blue-500"}`}></span>
                      </div>
                      <div className="font-medium mb-1 line-clamp-2">{ticket.title}</div>
                      <div className="text-[10px] text-gray-500 dark:text-gray-400">{ticket.reportedDate}</div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Stats footer */}
              <div className="flex items-center justify-between p-3 border-t border-gray-200 dark:border-gray-700 text-xs">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <span className={`inline-block h-2 w-2 rounded-full bg-red-500`}></span>
                    <span>High: {tickets.filter(t => t.priority === "high").length}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className={`inline-block h-2 w-2 rounded-full bg-orange-500`}></span>
                    <span>Medium: {tickets.filter(t => t.priority === "medium").length}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className={`inline-block h-2 w-2 rounded-full bg-blue-500`}></span>
                    <span>Low: {tickets.filter(t => t.priority === "low").length}</span>
                  </div>
                </div>
                <div>
                  Total: {tickets.length} tickets
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
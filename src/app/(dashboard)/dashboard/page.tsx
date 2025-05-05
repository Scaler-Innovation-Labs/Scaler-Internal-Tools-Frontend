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
    description: "Air conditioner in Room 201 is not cooling properly. Need immediate attention.",
    priority: "high",
    reporter: "John Smith",
    reportedDate: "June 15, 2023",
    status: "reported",
    department: "facilities",
    assignees: ["Jane Doe"],
    comments: 2,
    attachments: 1
  },
  {
    id: "TKT-002",
    title: "Projector not working",
    description: "Projector in the main auditorium shows blue screen. Checked cables and power.",
    priority: "medium",
    reporter: "Sarah Williams",
    reportedDate: "June 16, 2023",
    status: "noticed",
    department: "it",
    assignees: ["Mike Johnson", "Tech Support"],
    comments: 3,
    attachments: 1
  },
  {
    id: "TKT-003",
    title: "Water leakage in Lab",
    description: "Water leaking from ceiling in the chemistry lab. Might damage equipment.",
    priority: "high",
    reporter: "David Miller",
    reportedDate: "June 14, 2023",
    status: "work_started",
    department: "facilities",
    assignees: ["Maintenance Team"],
    comments: 4,
    attachments: 2
  },
  {
    id: "TKT-004",
    title: "Library door stuck",
    description: "The main library door doesn't close properly. Creates noise when people enter.",
    priority: "low",
    reporter: "Emma Johnson",
    reportedDate: "June 13, 2023",
    status: "work_done",
    department: "facilities",
    assignees: ["Repair Team"],
    comments: 2,
    attachments: 0
  },
  {
    id: "TKT-005",
    title: "Missing markers in Room 105",
    description: "All whiteboard markers are missing in Room 105. Need replacement.",
    priority: "low",
    reporter: "Prof. Williams",
    reportedDate: "June 17, 2023",
    status: "reported",
    department: "supplies",
    assignees: ["Admin Office"],
    comments: 1,
    attachments: 0
  },
  {
    id: "TKT-006",
    title: "WiFi connection issues",
    description: "WiFi network 'Campus-Main' has weak signal in the eastern wing.",
    priority: "medium",
    reporter: "IT Department",
    reportedDate: "June 16, 2023",
    status: "work_started",
    department: "it",
    assignees: ["Network Team"],
    comments: 5,
    attachments: 1
  },
  {
    id: "TKT-007",
    title: "Broken chair in Room 103",
    description: "Student chair in the back row of room 103 has a broken armrest.",
    priority: "low",
    reporter: "Student Council",
    reportedDate: "June 12, 2023",
    status: "work_done",
    department: "facilities",
    assignees: ["Maintenance"],
    comments: 2,
    attachments: 1
  },
  {
    id: "TKT-008",
    title: "Scanner not working",
    description: "Office scanner showing error code E-402. Tried restarting but issue persists.",
    priority: "medium",
    reporter: "Admin Office",
    reportedDate: "June 15, 2023",
    status: "noticed",
    department: "it",
    assignees: ["Tech Support"],
    comments: 2,
    attachments: 0
  }
];

// Ticket status configurations
const ticketStatusConfig = {
  reported: {
    label: "Next Up",
    color: "bg-amber-500",
    textColor: "text-amber-600 dark:text-amber-400",
    bgColor: "bg-amber-50 dark:bg-amber-900/20",
    icon: AlertCircle
  },
  noticed: {
    label: "In Progress",
    color: "bg-purple-500",
    textColor: "text-purple-600 dark:text-purple-400",
    bgColor: "bg-purple-50 dark:bg-purple-900/20",
    icon: Eye
  },
  work_started: {
    label: "Review",
    color: "bg-sky-500",
    textColor: "text-sky-600 dark:text-sky-400",
    bgColor: "bg-sky-50 dark:bg-sky-900/20",
    icon: Tool
  },
  work_done: {
    label: "Completed",
    color: "bg-green-500",
    textColor: "text-green-600 dark:text-green-400",
    bgColor: "bg-green-50 dark:bg-green-900/20",
    icon: CheckCircle
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
          {/* Header/Welcome Card */}
          <div className="relative overflow-hidden bg-blue-500 rounded-xl p-8 mb-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="relative z-10">
                <h1 className="text-3xl font-bold text-white mb-2">
                  Welcome back, Ayo <span className="text-yellow-300">👋</span>
                </h1>
                <p className="text-blue-100 max-w-md">
                  You've learned <span className="font-bold text-white">70%</span> of your goal this week!
                  Keep it up and improve your progress.
                </p>
              </div>
              
              {/* Decorative Circle & Illustration */}
              <div className="absolute right-0 top-0 bottom-0 flex items-center justify-center">
                <div className="relative w-64 h-64">
                  <div className="absolute inset-0 bg-blue-400 rounded-full opacity-50 translate-x-1/4"></div>
                  <div className="absolute right-5 top-8 transform -translate-y-1/4">
                    <svg width="150" height="150" viewBox="0 0 280 280" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                      <path d="M206.791 200.046C194.605 217.942 175.54 230.351 153.243 233.855C130.946 237.359 108.031 231.681 90.135 219.494C72.2399 207.308 60.8302 188.243 57.3263 165.946C53.8223 143.649 59.5003 120.734 71.687 102.838C83.8736 84.9426 102.939 73.5329 125.236 70.029C147.533 66.525 170.447 72.203 188.343 84.3896C206.239 96.5762 217.649 115.642 221.153 137.939C224.657 160.236 218.979 183.15 206.791 201.046" fill="#F0F7FF" stroke="#F0F7FF" strokeWidth="3" />
                      <path d="M82.5 221C84.5 219.5 87.5 216.5 87.5 216.5L92.5 209.5L88.5 197.5L78.5 197.5L73.5 201.5L70.5 204L67.5 208.5L67.5 213.5L70.5 218.5L76.5 221L82.5 221Z" fill="#FFB8C2" />
                      <path d="M142.5 147.5L154 149L156.5 158L165.5 161L171.5 172L168 181L155.5 189.5L149 195L141.885 207L121 212L104 207L94.5 200L89 192L85.5 183L83.5 173L84.5 163L87.5 154L92.5 146L99.5 138.5L108.5 132L118.5 127.5L129.5 125L138.5 126L142.5 147.5Z" fill="white" />
                      <path d="M112 155C119.2 155 125 149.2 125 142C125 134.8 119.2 129 112 129C104.8 129 99 134.8 99 142C99 149.2 104.8 155 112 155Z" fill="white" stroke="#001A72" />
                      <path d="M146.557, 170.907A24, 42 30 0 1 97.3516, 180.907A24, 42 30 0 1 107.352, 129.094A24, 42 30 0 1 156.557, 119.094A24, 42 30 0 1 146.557, 170.907Z" fill="#3A7BEF" stroke="#001A72" />
                      <path d="M117.5 120.5L119 112L123 105.5L129.5 97.5L138 92L145.5 88.5L154.5 86.5L163.5 87L170.5 89.5L176.5 93.5L181.5 98.5L186 106.5L188 113.5L188.5 124L186.5 135.5L184 142L180 149L174.5 154.5L167.5 159L161 162L153.5 163.5L142 162.5L136 160.5L131 158L126 155L127 145L144 143L154.5 135.5L158.5 128.5L159.5 121.5L157.5 113.5L152.5 105.5L146 102.5L138 101L131 103L126 106L121 109.5L119 113.5L118 118.5L117.5 120.5Z" fill="white" />
                      <path d="M140.5 126.5C140.5 126.5 145.5 121.5 151.5 121.5C157.5 121.5 161 126.5 161 126.5" stroke="#001A72" strokeWidth="2" strokeLinecap="round" />
                      <path d="M176 118V124" stroke="#001A72" strokeWidth="2" strokeLinecap="round" />
                      <path d="M146.5 116C146.5 116 147.5 111 151 111C154.5 111 156 115.5 156 115.5" stroke="#001A72" strokeLinecap="round" />
                      <path d="M146.5 152.5L141 157" stroke="#001A72" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </div>
                </div>
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
              <div className="flex flex-col">
                {/* Calendar Header with Month and Progress title */}
                <div className="flex items-center justify-between mb-4">
                  <h3 className={`font-semibold text-lg`}>My Progress</h3>
                  <div className="flex items-center gap-2">
                    <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      JULY 2021
                    </span>
                    <button className="text-gray-500 dark:text-gray-400">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                      </svg>
                    </button>
                  </div>
                </div>
                
                {/* Enhanced Calendar */}
                <div className={`rounded-xl p-4 ${
                  isDark ? 'bg-gray-900 border border-gray-800' : 'bg-white shadow-sm'
                }`}>
                  {/* Days of week header */}
                  <div className="grid grid-cols-7 gap-1 mb-2">
                    {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map((day, idx) => (
                      <div key={idx} className="text-center">
                        <div className={`text-xs font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          {day}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Calendar grid */}
                  <div className="grid grid-cols-7 gap-1">
                    {/* First week - placeholder for previous month */}
                    {[28, 29, 30, 1, 2, 3, 4].map((date, idx) => {
                      const isCurrentMonth = date < 10;
                      const isCurrentDay = date === calendarData.currentDay && isCurrentMonth;
                      const highlightInfo = calendarData.highlights.find(h => h.date === date);
                      const isHighlighted = !!highlightInfo;
                      const type = highlightInfo?.type || "general";
                      const eventColor = typeColors[type as keyof typeof typeColors];
                      
                      return (
                        <div key={`week1-${idx}`} className="text-center">
                          <button 
                            className={`
                              w-10 h-10 rounded-full flex items-center justify-center text-sm 
                              transition-all duration-200 hover:scale-105
                              ${isCurrentDay 
                                ? 'bg-blue-500 text-white font-medium' 
                                : isHighlighted
                                  ? isDark 
                                    ? `${eventColor.bg} text-white` 
                                    : `${eventColor.light} text-gray-900`
                                  : isCurrentMonth 
                                    ? isDark
                                      ? 'hover:bg-gray-800 text-gray-200'
                                      : 'hover:bg-gray-100 text-gray-700'
                                    : isDark
                                      ? 'text-gray-600'
                                      : 'text-gray-400'
                              }
                            `}
                          >
                            {date}
                          </button>
                        </div>
                      );
                    })}
                    
                    {/* Second week */}
                    {[5, 6, 7, 8, 9, 10, 11].map((date, idx) => {
                      const isCurrentDay = date === calendarData.currentDay;
                      const highlightInfo = calendarData.highlights.find(h => h.date === date);
                      const isHighlighted = !!highlightInfo;
                      const type = highlightInfo?.type || "general";
                      const eventColor = typeColors[type as keyof typeof typeColors];
                      
                      return (
                        <div key={`week2-${idx}`} className="text-center">
                          <button 
                            className={`
                              w-10 h-10 rounded-full flex items-center justify-center text-sm 
                              transition-all duration-200 hover:scale-105
                              ${isCurrentDay 
                                ? 'bg-blue-500 text-white font-medium' 
                                : isHighlighted
                                  ? isDark 
                                    ? `${eventColor.bg} text-white` 
                                    : `${eventColor.light} text-gray-900`
                                  : isDark
                                    ? 'hover:bg-gray-800 text-gray-200'
                                    : 'hover:bg-gray-100 text-gray-700'
                              }
                            `}
                          >
                            {date}
                          </button>
                        </div>
                      );
                    })}
                    
                    {/* Third week with days 12-18 */}
                    {[12, 13, 14, 15, 16, 17, 18].map((date, idx) => {
                      const isCurrentDay = date === calendarData.currentDay;
                      const highlightInfo = calendarData.highlights.find(h => h.date === date);
                      const isHighlighted = !!highlightInfo;
                      const type = highlightInfo?.type || "general";
                      const eventColor = typeColors[type as keyof typeof typeColors];
                      
                      return (
                        <div key={`week3-${idx}`} className="text-center">
                          <button 
                            className={`
                              w-10 h-10 rounded-full flex items-center justify-center text-sm 
                              transition-all duration-200 hover:scale-105
                              ${isCurrentDay 
                                ? 'bg-blue-500 text-white font-medium' 
                                : isHighlighted
                                  ? isDark 
                                    ? `${eventColor.bg} text-white` 
                                    : `${eventColor.light} text-gray-900`
                                  : isDark
                                    ? 'hover:bg-gray-800 text-gray-200'
                                    : 'hover:bg-gray-100 text-gray-700'
                              }
                            `}
                          >
                            {date}
                          </button>
                        </div>
                      );
                    })}
                    
                    {/* Fourth week with days 19-25 */}
                    {[19, 20, 21, 22, 23, 24, 25].map((date, idx) => {
                      const isCurrentDay = date === calendarData.currentDay;
                      const highlightInfo = calendarData.highlights.find(h => h.date === date);
                      const isHighlighted = !!highlightInfo;
                      const type = highlightInfo?.type || "general";
                      const eventColor = typeColors[type as keyof typeof typeColors];
                      
                      return (
                        <div key={`week4-${idx}`} className="text-center">
                          <button 
                            className={`
                              w-10 h-10 rounded-full flex items-center justify-center text-sm 
                              transition-all duration-200 hover:scale-105
                              ${isCurrentDay 
                                ? 'bg-blue-500 text-white font-medium' 
                                : isHighlighted
                                  ? isDark 
                                    ? `${eventColor.bg} text-white` 
                                    : `${eventColor.light} text-gray-900`
                                  : isDark
                                    ? 'hover:bg-gray-800 text-gray-200'
                                    : 'hover:bg-gray-100 text-gray-700'
                              }
                            `}
                          >
                            {date}
                          </button>
                        </div>
                      );
                    })}
                    
                    {/* Fifth week */}
                    {[26, 27, 28, 29, 30, 31, 1].map((date, idx) => {
                      const isCurrentMonth = date < 32;
                      const isCurrentDay = date === calendarData.currentDay && isCurrentMonth;
                      const highlightInfo = calendarData.highlights.find(h => h.date === date);
                      const isHighlighted = !!highlightInfo;
                      const type = highlightInfo?.type || "general";
                      const eventColor = typeColors[type as keyof typeof typeColors];
                      
                      return (
                        <div key={`week5-${idx}`} className="text-center">
                          <button 
                            className={`
                              w-10 h-10 rounded-full flex items-center justify-center text-sm 
                              transition-all duration-200 hover:scale-105
                              ${isCurrentDay 
                                ? 'bg-blue-500 text-white font-medium' 
                                : isHighlighted && isCurrentMonth
                                  ? isDark 
                                    ? `${eventColor.bg} text-white` 
                                    : `${eventColor.light} text-gray-900`
                                  : isCurrentMonth 
                                    ? isDark
                                      ? 'hover:bg-gray-800 text-gray-200'
                                      : 'hover:bg-gray-100 text-gray-700'
                                    : isDark
                                      ? 'text-gray-600'
                                      : 'text-gray-400'
                              }
                            `}
                          >
                            {date}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                  
                  {/* Legend */}
                  <div className="flex flex-wrap items-center justify-center gap-3 mt-4 text-xs">
                    <div className="flex items-center gap-1.5">
                      <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                      <span>Classes</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="h-3 w-3 rounded-full bg-red-500"></div>
                      <span>Exams</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="h-3 w-3 rounded-full bg-green-500"></div>
                      <span>Events</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="h-3 w-3 rounded-full bg-purple-500"></div>
                      <span>Deadlines</span>
                    </div>
                  </div>
                </div>
                
                {/* Upcoming Activities */}
                <div className="mt-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className={`font-semibold text-lg`}>Upcoming Activities</h3>
                    <Link href="#" className={`text-sm font-medium ${isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'} transition-colors`}>
                      See all
                    </Link>
                  </div>
                  
                  <div className="space-y-3">
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
                            <svg className={`h-5 w-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
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
              <div className="flex items-center gap-3">
                <h2 className="text-lg font-semibold">Ticketing System</h2>
              </div>
              <div className="flex items-center gap-2">
                <Link href="/tickets" className={`text-sm font-medium ${isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'} transition-colors`}>
                  View All
                </Link>
              </div>
            </div>
            
            <div className={`rounded-xl overflow-hidden ${
              isDark ? 'bg-gray-900 border border-gray-800' : 'bg-white shadow-sm'
            }`}>
              {/* Tabs or Filter options */}
              <div className="flex items-center border-b border-gray-200 dark:border-gray-700 px-4 py-2">
                <button className={`px-3 py-1.5 text-sm font-medium rounded-md ${isDark ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-900'}`}>
                  By Status
                </button>
                <button className={`px-3 py-1.5 text-sm font-medium ${isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-600 hover:text-gray-800'}`}>
                  By Assignee
                </button>
                <button className={`px-3 py-1.5 text-sm font-medium ${isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-600 hover:text-gray-800'}`}>
                  My Tickets
                </button>
                <button className={`px-3 py-1.5 text-sm font-medium ${isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-600 hover:text-gray-800'}`}>
                  Due Tickets
                </button>
                
                <div className="ml-auto flex items-center gap-2">
                  <span className="text-xs text-gray-500">Sort</span>
                  <button className={`px-2 py-1 text-xs font-medium rounded ${isDark ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-900'}`}>
                    A → Z
                  </button>
                </div>
              </div>
              
              {/* Kanban Board Columns */}
              <div className="grid grid-cols-4 gap-4 p-4 max-h-[420px] overflow-auto">
                {/* Map through the status types */}
                {Object.entries(ticketStatusConfig).map(([status, config]) => (
                  <div key={status} className="flex flex-col">
                    {/* Column Header */}
                    <div className={`flex items-center justify-between mb-3`}>
                      <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${config.textColor} ${config.bgColor}`}>
                        <config.icon className="h-3.5 w-3.5" />
                        <span>{config.label}</span>
                        <span className={`ml-1 w-5 h-5 rounded-full flex items-center justify-center text-xs ${config.color} text-white`}>
                          {ticketsByStatus[status].length}
                        </span>
                      </div>
                      <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                        <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                      </button>
                    </div>
                    
                    {/* Tickets in this column */}
                    <div className="space-y-3">
                      {ticketsByStatus[status].map(ticket => (
                        <div 
                          key={ticket.id} 
                          className={`p-3 rounded-lg ${
                            isDark 
                              ? 'bg-gray-800 hover:bg-gray-750 border border-gray-700' 
                              : 'bg-white hover:bg-gray-50 border border-gray-100 shadow-sm'
                          } cursor-pointer transition-all duration-200 hover:shadow-md`}
                        >
                          {/* Department Tag */}
                          <div className="text-xs text-gray-500 dark:text-gray-400 capitalize mb-1">
                            {ticket.department}
                          </div>
                          
                          {/* Ticket Title */}
                          <h4 className={`font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {ticket.title}
                          </h4>
                          
                          {/* Description */}
                          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-3 line-clamp-2`}>
                            {ticket.description}
                          </p>
                          
                          {/* Assignees */}
                          <div className="flex items-center gap-1 mb-3">
                            {ticket.assignees.map((assignee, idx) => (
                              <div 
                                key={idx} 
                                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                                  idx % 3 === 0 ? 'bg-blue-100 text-blue-700' : 
                                  idx % 3 === 1 ? 'bg-purple-100 text-purple-700' : 
                                  'bg-orange-100 text-orange-700'
                                }`}
                              >
                                {assignee.split(' ').map(word => word[0]).join('')}
                              </div>
                            ))}
                          </div>
                          
                          {/* Footer */}
                          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                            <div className="flex items-center gap-3">
                              <div className="flex items-center gap-1">
                                <svg className="w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                </svg>
                                {ticket.comments}
                              </div>
                              <div className="flex items-center gap-1">
                                <svg className="w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                                </svg>
                                {ticket.attachments}
                              </div>
                            </div>
                            
                            {/* Priority Badge */}
                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                              ticket.priority === 'high' 
                                ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' 
                                : ticket.priority === 'medium'
                                  ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400'
                                  : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                            }`}>
                              {ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1)}
                            </span>
                          </div>
                        </div>
                      ))}
                      
                      {/* Add Card button */}
                      {ticketsByStatus[status].length < 3 && (
                        <button 
                          className={`w-full py-2 rounded-lg border border-dashed flex items-center justify-center gap-1 text-sm ${
                            isDark 
                              ? 'border-gray-700 text-gray-500 hover:text-gray-400 hover:border-gray-600' 
                              : 'border-gray-300 text-gray-500 hover:text-gray-700 hover:border-gray-400'
                          }`}
                        >
                          <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                          Add Card
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
import Image from "next/image";
import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen w-full">
      {/* Left side - Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {children}
        </div>
      </div>
      
      {/* Right side - Banner image and branding */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-indigo-950 via-gray-900 to-black relative">
        <div className="absolute inset-0 bg-[url('/globe.svg')] opacity-10"></div>
        <div className="relative z-10 flex flex-col items-center justify-center w-full p-12 text-white">
          <div className="mb-12">
            <Image 
              src="/vercel.svg" 
              alt="Scaler School of Technology" 
              width={120} 
              height={120}
              className="mx-auto"
            />
          </div>
          <h1 className="text-4xl font-bold mb-6 text-center">Scaler School of Technology</h1>
          <p className="text-lg text-center max-w-md mb-8 text-gray-300">
            Unified management platform for a modern educational experience
          </p>
          <div className="grid grid-cols-3 gap-4 w-full max-w-md">
            {['Hostel', 'Attendance', 'Grades', 'Clubs', 'Mess', 'Resources'].map((feature) => (
              <div key={feature} className="bg-white/10 p-3 rounded-lg text-center backdrop-blur-sm">
                <p className="text-sm font-medium">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 
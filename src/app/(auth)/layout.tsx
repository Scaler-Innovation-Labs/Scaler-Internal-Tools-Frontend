import Link from "next/link";
import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen w-full bg-black text-white relative overflow-hidden">
      {/* Background with glow effect */}
      <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-1/4 left-1/4 w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[120px]"></div>
      
      {/* Simple nav bar */}
      <div className="absolute top-0 left-0 w-full p-6 z-10">
        <Link href="/" className="font-semibold text-xl">
          Scaler
        </Link>
      </div>
      
      {/* Center content */}
      <div className="w-full flex items-center justify-center p-8 z-10">
        <div className="w-full max-w-sm mx-auto">
          {children}
        </div>
      </div>
    </div>
  );
} 
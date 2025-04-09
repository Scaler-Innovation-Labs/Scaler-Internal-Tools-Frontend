import Link from "next/link";
import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen w-full bg-white dark:bg-black">
      {/* Simple nav bar */}
      <div className="absolute top-0 left-0 w-full p-6">
        <Link href="/" className="font-semibold text-xl">
          Scaler
        </Link>
      </div>
      
      {/* Center content */}
      <div className="w-full flex items-center justify-center p-8">
        <div className="w-full max-w-sm mx-auto">
          {children}
        </div>
      </div>
    </div>
  );
} 
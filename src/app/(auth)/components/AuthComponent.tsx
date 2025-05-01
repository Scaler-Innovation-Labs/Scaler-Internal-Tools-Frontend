import Link from "next/link";
import { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  skipText?: string;
  skipHref?: string;
  blob_1_colors: string[];
  blob_2_colors: string[];
}

export default function AuthLayout({ children, title = "Roll the Carpet.!", skipText = "Skip step →", skipHref = "#", blob_1_colors, blob_2_colors }: AuthLayoutProps) {
  const blob1Gradient = `linear-gradient(180deg, ${blob_1_colors[0]} 0%, ${blob_1_colors[1]} 100%)`
  const blob2Gradient = `linear-gradient(180deg, ${blob_2_colors[0]} 0%, ${blob_2_colors[1]} 100%)`
  return (
    <div className="flex min-h-screen w-full bg-black text-white relative overflow-hidden">
      {/* Glowing background blobs */}
      <div className="absolute pointer-events-none inset-0 z-0">
        <div
          className="absolute w-[300px] h-[300px] shrink-0 rounded-[302px] top-[8%] left-[60%]"
          style={{ background: blob1Gradient }}
        ></div>
        <div
          className="absolute w-[220px] h-[220px] rounded-[220px] shrink-0 rotate-[-28.5deg] bottom-[2.31%] right-[3%]"
          style={{ background: blob2Gradient }}
        ></div>
      </div>
      {/* Auth content layout */}
      <div className="flex w-full items-center justify-center p-8 z-10">
        <div className="flex flex-row items-center justify-center w-full h-full">
          {/* Left Side - Title and Skip */}
          <div className="text-center md:text-left space-y-4 w-[58%]">
            <h2 className="text-white font-[Noto Sans] text-[96px] not-italic font-semibold leading-none">{title}</h2>
            <div className="flex items-center justify-center w-full">
              <Link href={skipHref} className="inline-flex items-start gap-[10px] mx-5 px-[24px] py-[14px] border-4 border-white text-white font-noto-sans text-2xl italic font-semibold leading-normal">
                {skipText}
              </Link>
              <div className="flex-grow h-[2px] border-t-2 border-dashed border-[#4d4d4d]"></div>
            </div>
          </div>
          {/* Right Side - Form Card */}
          <div className="w-full max-w-sm h-full flex items-center justify-center">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

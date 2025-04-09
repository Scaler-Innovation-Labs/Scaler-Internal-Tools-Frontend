"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email"),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });
  
  const onSubmit = async (data: ForgotPasswordFormValues) => {
    setIsLoading(true);
    try {
      // This will be integrated with the Spring Boot backend
      console.log(data);
      // Will use API call here
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      setIsSubmitted(true);
    } catch (error) {
      console.error("Forgot password request failed:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div className="flex justify-center mb-2">
        <div className="w-10 h-10 flex items-center justify-center">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17 7H7C4.23858 7 2 9.23858 2 12C2 14.7614 4.23858 17 7 17H17C19.7614 17 22 14.7614 22 12C22 9.23858 19.7614 7 17 7Z" stroke="white" strokeWidth="2"/>
            <path d="M17 7H7C4.23858 7 2 9.23858 2 12C2 14.7614 4.23858 17 7 17H17C19.7614 17 22 14.7614 22 12C22 9.23858 19.7614 7 17 7Z" stroke="white" strokeWidth="2"/>
            <path d="M17 7C19.7614 7 22 9.23858 22 12C22 14.7614 19.7614 17 17 17C14.2386 17 12 14.7614 12 12C12 9.23858 14.2386 7 17 7Z" fill="white"/>
          </svg>
        </div>
      </div>

      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Reset your password</h1>
      </div>
      
      <div className="w-full max-w-sm bg-[#0c0c0c]/80 border border-gray-800 rounded-2xl backdrop-blur-sm shadow-[0_8px_30px_rgb(0,0,0,0.12)] p-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-800/5 to-transparent pointer-events-none"></div>
        
        {isSubmitted ? (
          <div className="flex flex-col items-center justify-center space-y-4 py-4 relative z-10">
            <div className="bg-emerald-900/30 rounded-full p-3">
              <svg className="w-8 h-8 text-emerald-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17L4 12" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-white">Check your email</h3>
            <p className="text-gray-400 text-center text-sm">
              We&apos;ve sent you a password reset link. Please check your inbox.
            </p>
            <div className="w-full pt-4">
              <Link 
                href="/login"
                className="w-full block text-center py-3.5 font-medium rounded-xl transition-colors uppercase text-sm tracking-wide bg-gradient-to-r from-gray-200 via-rose-200 to-amber-200 hover:from-gray-100 hover:via-rose-100 hover:to-amber-100 text-black mt-2 shadow-[0_4px_15px_rgba(0,0,0,0.3)]"
              >
                BACK TO LOGIN
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 relative z-10">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1.5 text-gray-300">
                Email address
              </label>
              <div className="bg-[#111111] border border-gray-800 rounded-xl overflow-hidden shadow-[0_4px_15px_rgba(0,0,0,0.2)] relative">
                <input
                  {...register("email")}
                  type="email"
                  id="email"
                  placeholder="you@example.com"
                  className="w-full px-4 py-3.5 bg-transparent text-white placeholder:text-gray-600 focus:outline-none z-10 relative"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-gray-800/5 to-transparent pointer-events-none"></div>
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 font-medium rounded-xl transition-colors uppercase text-sm tracking-wide bg-gradient-to-r from-gray-200 via-rose-200 to-amber-200 hover:from-gray-100 hover:via-rose-100 hover:to-amber-100 text-black disabled:opacity-70 mt-2 shadow-[0_4px_15px_rgba(0,0,0,0.3)]"
            >
              {isLoading ? "Sending link..." : "RESET PASSWORD"}
            </button>
          </form>
        )}
      </div>
      
      <p className="text-sm text-center text-gray-500 mt-6">
        Remember your password?{" "}
        <Link 
          href="/login" 
          className="font-medium text-white hover:underline"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
} 
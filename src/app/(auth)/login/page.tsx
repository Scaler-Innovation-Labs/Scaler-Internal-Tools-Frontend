"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    }
  });
  
  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    try {
      // This will be integrated with the Spring Boot backend
      console.log(data);
      // Will use API call here
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      // Will redirect to dashboard on success
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="space-y-6 py-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Sign in to Scaler</h1>
      </div>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1.5 text-gray-700 dark:text-gray-300">
            Email
          </label>
          <input
            {...register("email")}
            type="email"
            id="email"
            placeholder="you@example.com"
            className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-600"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>
        
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label htmlFor="password" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Password
            </label>
            <Link 
              href="/forgot-password" 
              className="text-sm font-medium text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
            >
              Forgot password?
            </Link>
          </div>
          <input
            {...register("password")}
            type="password"
            id="password"
            placeholder="••••••••"
            className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-600"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
          )}
        </div>
        
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-2 bg-black dark:bg-white text-white dark:text-black font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
        >
          {isLoading ? "Signing in..." : "Log in"}
        </button>
      </form>
      
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white dark:bg-black text-gray-500">Or</span>
        </div>
      </div>
      
      <div className="space-y-3">
        <button 
          type="button" 
          className="w-full flex items-center justify-center gap-2 py-2 border border-gray-300 dark:border-gray-700 rounded-md font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z" fill="#EA4335"/>
            <path d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.08L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z" fill="#4285F4"/>
            <path d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z" fill="#FBBC05"/>
            <path d="M12.0004 24C15.2404 24 17.9654 22.935 19.9454 21.095L16.0804 18.075C15.0054 18.785 13.6204 19.25 12.0004 19.25C8.87043 19.25 6.22043 17.14 5.27039 14.295L1.28039 17.39C3.25539 21.31 7.31039 24 12.0004 24Z" fill="#34A853"/>
          </svg>
          Sign in with Google
        </button>
        
        <button 
          type="button" 
          className="w-full flex items-center justify-center gap-2 py-2 border border-gray-300 dark:border-gray-700 rounded-md font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
        >
          <svg className="h-5 w-5" viewBox="0 0 98 96" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M48.854 0C21.839 0 0 22 0 49.217C0 70.973 13.993 89.389 33.405 95.907C35.832 96.397 36.721 94.848 36.721 93.545C36.721 92.371 36.654 88.728 36.654 84.613C23.064 87.541 20.171 78.586 20.171 78.586C17.943 72.894 14.726 71.344 14.726 71.344C10.314 68.293 15.059 68.293 15.059 68.293C19.937 68.539 22.499 73.376 22.499 73.376C26.844 80.855 33.873 78.832 36.853 77.528C37.316 74.356 38.6 72.209 39.994 71.083C29.138 70.028 17.736 65.79 17.736 46.904C17.736 41.521 19.64 37.161 22.566 33.777C22.036 32.547 20.37 27.51 23 20.65C23 20.65 27.079 19.347 36.654 25.78C40.546 24.723 44.704 24.195 48.862 24.195C53.02 24.195 57.178 24.723 61.07 25.78C70.644 19.347 74.723 20.65 74.723 20.65C77.353 27.51 75.688 32.547 75.157 33.777C78.15 37.161 79.987 41.521 79.987 46.904C79.987 65.79 68.585 69.96 57.73 71.015C59.54 72.396 61.087 75.033 61.087 79.188C61.087 85.127 61.02 91.909 61.02 93.545C61.02 94.848 61.909 96.397 64.336 95.907C83.747 89.389 97.74 70.973 97.74 49.217C97.74 22 75.835 0 48.854 0Z" fill="currentColor"/>
          </svg>
          Sign in with GitHub
        </button>
      </div>
      
      <p className="text-sm text-center text-gray-600 dark:text-gray-400">
        Don&apos;t have an account?{" "}
        <Link 
          href="/signup" 
          className="font-medium text-black dark:text-white hover:underline"
        >
          Sign up
        </Link>
      </p>
    </div>
  );
} 
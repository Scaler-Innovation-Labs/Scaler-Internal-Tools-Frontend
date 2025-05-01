"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import AuthLayout from "../components/AuthComponent";

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
    <AuthLayout title="No worries.!!" skipText="Take me back.!" skipHref="/login" blob_1_colors={['#61003A', '#2D0A30']} blob_2_colors={['#61004B', '#220A30']}>
      <div className="inline-flex flex-col justify-between items-center p-[97px_40px_47px_40px] h-[80%] rounded-[20px] border border-[#AFAFAF] bg-gradient-to-[321deg] from-[#bfbfbf10] via-[#00000000] to-[#00000024] shadow-[8px_4px_5px_0px_rgba(0,0,0,0.24)] backdrop-blur-[26.5px] gap-[14px] w-[400px] Frame5">
        <div className="flex flex-col justify-between h-[75%] Frame-4">
          <div className="flex flex-col gap-[14px] Upper-Section">
            <div className="flex flex-col items-start w-full Login-Text">
              <span className="text-white font-noto-sans text-3xl font-semibold leading-normal">Forgot Password?</span>
              <span className="text-white font-noto-sans text-[16px] text-base leading-normal font-medium">Please enter you're email</span>
            </div>
            {isSubmitted ? (
            <div className="flex flex-col items-center justify-center space-y-4 py-4 relative z-10">
              <div className="bg-emerald-900/30 rounded-full p-3">
                <svg className="w-8 h-8 text-emerald-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6L9 17L4 12" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-white">Check your email</h3>
              <p className="text-gray-400 text-center text-sm">
                We've sent you a password reset link. Please check your inbox.
              </p>
              <div className="w-full pt-4">
                <Link href="/login" className="block w-full">
                  <Button fullWidth gradient_color_1="#E948C5" gradient_color_2="#CD407B" gradient_color_3="#75042D">
                    BACK TO LOGIN
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 relative z-10">
              <Input
                {...register("email")}
                id="email"
                type="email"
                label="Email address"
                placeholder="you@example.com"
                error={errors.email?.message}
              />
              
              <Button
                type="submit"
                fullWidth
                isLoading={isLoading}
                gradient_color_1="#E948C5"
                gradient_color_2="#CD407B"
                gradient_color_3="#75042D"
              >
                {isLoading ? "Sending link..." : "RESET PASSWORD"}
              </Button>
            </form>
          )}
        </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-gray-800/5 to-transparent pointer-events-none"></div>
        <p className="text-sm text-center text-white mt-6 Frame9">
          Don't have an account?{" "}
          <Link 
            href="/signup" 
            className="font-medium text-white hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
} 
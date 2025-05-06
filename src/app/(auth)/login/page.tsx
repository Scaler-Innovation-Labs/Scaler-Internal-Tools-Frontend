"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import AuthLayout from "../components/AuthComponent";
import { useTheme } from "next-themes";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  
  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    try {
      // Temporary: Navigate to dashboard without authentication
      router.push("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const {theme, setTheme} = useTheme();
  const isDark = theme === "dark" ? true : false;

  let blob_1_colors = ['#A000BA', '#FFFFFF']
  let blob_2_colors = ['#FFFFFF', '#AE53D2']

  if(isDark){
    blob_1_colors = ["#530061", "#0D0A30"]
    blob_2_colors = ["#300061", "#0A1030"]
  }
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <AuthLayout
      title="Welcome Back!"
      skipText="Skip the lag ?"
      skipHref="/dashboard"
      blob_1_colors={blob_1_colors}
      blob_2_colors={blob_2_colors}
    >
      <div className="flex flex-col justify-between items-center p-[97px_40px_47px_40px] h-auto rounded-[20px] border border-[#AFAFAF] bg-gradient-to-[321deg] from-[#bfbfbf10] via-[#00000000] to-[#00000024] shadow-[8px_4px_5px_0px_rgba(0,0,0,0.24)] backdrop-blur-[26.5px] gap-[14px] w-[400px] Frame5">
        <div className="flex flex-col justify-between Frame-4">
          <div className="flex flex-col gap-[14px] Upper-Section">
            <div className="flex flex-col items-start w-full Login-Text">
              <span className="text-[var(--text-primary)] font-noto-sans text-3xl font-semibold leading-normal">Login</span>
              <span className="text-[var(--text-primary)] font-noto-sans text-[16px] text-base leading-normal font-medium">Glad you're back.!</span>
            </div>
              <div className="absolute inset-0 bg-gradient-to-b from-gray-800/5 to-transparent pointer-events-none"></div>
              
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 relative z-10 flex gap-[25px] flex-col bg-transparent Credentials">
              <Input
                {...register("email")}
                id="email"
                type="email"
                // label="Email address"
                placeholder="Username"
                error={errors.email?.message}
              />
              
              <Input
                {...register("password")}
                id="password"
                type="password"
                placeholder="Password"
                error={errors.password?.message}
              />
              
              <div className="flex justify-center flex-col items-center gap-[12px] LoginBT&FP">
                <Button
                  type="submit"
                  fullWidth
                  isLoading={isLoading}
                  gradient_color_1="#628eff"
                  gradient_color_2="#8740cd"
                  gradient_color_3="#580475"
                >
                  {isLoading ? "Signing in..." : "SIGN IN"}
                </Button>
                <Link href={'/forgot-password'}>Forgot Password?</Link>
              </div>
            </form>
          </div>

          <div className="relative flex flex-col items-center gap-4 my-4">
            <div className="relative w-full flex items-center">
              <div className="w-full border-t border-gray-700"></div>
              <span className="absolute left-1/2 -translate-x-1/2 bg-[var(--background)] px-3 text-xs text-[var(--text-primary)]">
                OR
              </span>
            </div>
            {/* Google Icon Button */}
            <button className="flex items-center gap-2 justify-center rounded-lg border border-gray-600 px-4 py-3 hover:bg-gray-800 transition text-[var(--text-primary)] text-sm font-medium w-full">
              <Image src="/images/Google.svg" alt="Google" width={20} height={20} />
              <span>Sign in with Google</span>
            </button>
          </div>
        </div>
        <p className="text-sm text-center text-[var(--text-primary)] mt-6 Frame9">
          Don't have an account?{" "}
          <Link 
            href="/signup" 
            className="font-medium text-[var(--text-primary)] hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
} 
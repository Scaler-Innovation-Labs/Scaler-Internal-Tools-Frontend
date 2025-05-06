"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import AuthLayout from "../components/AuthComponent";
import Image from "next/image"
import { useTheme } from "next-themes";

const signupSchema = z
.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters"),
  email: z.string().email("Please enter a valid email"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must include uppercase, lowercase, number and special character"
    ),
  confirmPassword: z.string(),
})
.refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});


type SignupFormValues = z.infer<typeof signupSchema>;

export default function SignupPage() {
  const [isLoading, setIsLoading] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },    
  });
  
  const onSubmit = async (data: SignupFormValues) => {
    setIsLoading(true);
    try {
      // This will be integrated with the backend
      console.log(data);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Will redirect to login page or dashboard on success
    } catch (error) {
      console.error("Signup failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const {theme, setTheme} = useTheme();
  const isDark = theme === "dark" ? true : false;

  let blob_1_colors = ['#2237EC', '#FFFFFF']
  let blob_2_colors = ['#FFFFFF', '#4D79FF']

  if(isDark){
    blob_1_colors = ['#190061', '#0A1B30']
    blob_2_colors = ['#000F61', '#000F61']
  }

  const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);
  
    if (!mounted) return null;
  
  return (
    <AuthLayout title="Roll the Carpet.!" skipText="Skit the lag.!" skipHref="/dashboard" blob_1_colors={blob_1_colors} blob_2_colors={blob_2_colors}>
      <div className="flex flex-col justify-between items-center p-[97px_40px_47px_40px] h-auto rounded-[20px] border border-[#AFAFAF] bg-gradient-to-[321deg] from-[#bfbfbf10] via-[#00000000] to-[#00000024] shadow-[8px_4px_5px_0px_rgba(0,0,0,0.24)] backdrop-blur-[26.5px] gap-[14px] w-[400px] Frame5">
        <div className="flex flex-col justify-between Frame-4">
          <div className="flex flex-col gap-[14px] Upper-Section">
            <div className="flex flex-col items-start w-full Login-Text">
              <span className="text-[var(--text-primary)] font-noto-sans text-3xl font-semibold leading-normal">Signup</span>
              <span className="text-[var(--text-primary)] font-noto-sans text-[16px] text-base leading-normal font-medium">Just some details to get you in.!</span>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 relative bg-transparent z-10 flex gap-[15px] flex-col Credentials">
            <Input
                {...register("name")}
                id="name"
                type="text"
                placeholder="Username"
                error={errors.name?.message}
              />
              
              <Input
                {...register("email")}
                id="email"
                type="email"
                placeholder="Email"
                error={errors.email?.message}
              />
              
              <div className="flex flex-col gap-2">
                <Input
                  {...register("password")}
                  id="password"
                  type="password"
                  placeholder="Password"
                  error={errors.password?.message}
                />
                <Input
                  {...register("confirmPassword")}
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm Password"
                  error={errors.confirmPassword?.message}
                  />
              </div>
              <Button
                type="submit"
                fullWidth
                isLoading={isLoading}
                gradient_color_1="#2E4CEE"
                gradient_color_2="#221EBF"
                gradient_color_3="#040F75"
              >
                {isLoading ? "Creating account..." : "SIGN UP"}
              </Button>
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
        <div className="absolute inset-0 bg-gradient-to-b from-gray-800/5 to-transparent pointer-events-none"></div>
        <p className="text-sm text-center text-[var(--text-primary)] mt-6 Frame9">
          Already registered?{" "}
          <Link 
            href="/login" 
            className="font-medium text-[var(--text-primary)] hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </AuthLayout>
    
  );
} 
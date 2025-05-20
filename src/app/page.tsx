"use client"

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import AuthUtil from "@/app/(auth)/utils/auth-util";

export default function Home() {
  const router = useRouter();
    console.log("HELLO FROM LAYOUT PAGE")

  useEffect(() => {
    const isLoggedIn = AuthUtil.isLoggedIn();
    const currentPath = window.location.pathname;

    if (isLoggedIn && currentPath === "/login") {
      router.replace("/dashboard");
    } else if (!isLoggedIn && currentPath !== "/login") {
      router.replace("/login");
    }
  }, []);

  return null;
}

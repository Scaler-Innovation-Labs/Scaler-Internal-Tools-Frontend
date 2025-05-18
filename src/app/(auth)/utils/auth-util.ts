import Cookies from "js-cookie";

export function getUserRoles(): string[] {
  if (typeof window === "undefined") return [];
  const userStr = window.localStorage.getItem("user");
  if (!userStr) return [];
  try {
    const user = JSON.parse(userStr);
    if (Array.isArray(user.userRoles)) {
      return user.userRoles.map((role: any) => role.roleName);
    }
    return [];
  } catch {
    return [];
  }
}

export function isLoggedIn(): boolean {
  if (typeof window === "undefined") return false;
  const userStr = window.localStorage.getItem("user");
  return !!userStr;
}

export function withAuthHeaders(config: any = {}) {
  // Try to get access token from cookie first, fallback to localStorage
  let accessToken = Cookies.get("accessToken") || window.localStorage.getItem("accessToken");
  if (!config.headers) config.headers = {};
  if (accessToken) {
    config.headers["Authorization"] = `Bearer ${accessToken}`;
  }
  return config;
}

// Example usage:
// import axios from "axios";
// import { withAuthHeaders } from "@/app/(auth)/utils/auth-util";
//
// axios.get("/api/protected", withAuthHeaders())
//   .then(res => { /* handle response */ })
//   .catch(err => { /* handle error */ });
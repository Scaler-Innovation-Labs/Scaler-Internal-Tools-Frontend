import { loginUser as apiLoginUser, refreshToken as apiRefreshToken, logout as apiLogout } from "@/context/authApi";

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function refreshToken() {
  const accessToken = window.localStorage.getItem("accessToken") || "";
  const response = await fetch(`${baseUrl}/auth/refresh`, {
    method: "POST",
    credentials: "include",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (!response.ok) {
    throw new Error("Token refresh failed");
  }
  const data = await response.json();
  window.localStorage.setItem("accessToken", data.accessToken);
}

export async function logout() {
  const accessToken = window.localStorage.getItem("accessToken") || "";
  await fetch(`${baseUrl}/logout`, {
    method: "POST",
    credentials: "include",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  window.localStorage.removeItem("user");
  window.localStorage.removeItem("accessToken");
  // Remove refresh token cookie if set
  if (typeof window !== "undefined") {
    document.cookie = "api/refresh=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "api/access=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  }
}
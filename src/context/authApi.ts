import axios from "axios";
import Cookies from "js-cookie";
import { refreshToken as refreshAccessToken } from "@/app/(auth)/service/authService";
import { access } from "fs";

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

const api = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => {
    // If backend sends a new access token, update cookie
    console.log("RESPONSE", response)
    if (response.data && response.data.accessToken) {
      Cookies.set("accessToken", response.data.accessToken, { path: "/", secure: true, sameSite: "strict" });
    }
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    console.log("HELLOOO 4")
    // If 401 and not already retried
    console.log(error)
    // console.log("error res", error.response)
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
    // if(error){
    console.log("HELLOOO3")
      originalRequest._retry = true;
      try {
        console.log("HELLOOO 2")
        const res = await refreshAccessToken(); // This should update the access token cookie
        console.log("Refresh response = ", res)

        // const newAccessToken = Cookies.get("accessToken");
        // if (newAccessToken) {
        //   originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        // }
        // Retry the original request after refreshing the token
        return api(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export function loginUser() {
  const backendLoginUrl = `${baseUrl}/oauth2/authorization/google`;
  window.location.href = backendLoginUrl;
}


export async function refreshToken() {
  const accessToken = Cookies.get("accessToken") || "";
  const response = await api.post("/refresh", null, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (response.status !== 200) {
    throw new Error("Token refresh failed");
  }
  Cookies.set("accessToken", response.data.accessToken, { path: "/", secure: true, sameSite: "strict" });
}

export async function logout() {
  const accessToken = Cookies.get("accessToken") || "";
  await api.post("/logout", null, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  window.localStorage.removeItem("user");
  Cookies.remove("accessToken", { path: "/" });
}

// Example: Full API usage for a protected resource

// Import the singleton api instance
// import api from "@/context/authApi";

// GET example
export async function getProfile() {
  try {
    const response = await api.get("/profile");
    // response.data contains the user profile
    return response.data;
  } catch (error) {
    // handle error (401, network, etc.)
    throw error;
  }
}

// POST example
export async function createTicket(ticketData: { title: string; description: string }) {
  try {
    const response = await api.post("/tickets", ticketData);
    // response.data contains the created ticket
    return response.data;
  } catch (error) {
    // handle error
    throw error;
  }
}

// PUT example
export async function updateProfile(profileData: { name: string; email: string }) {
  try {
    const response = await api.put("/profile", profileData);
    // response.data contains the updated profile
    return response.data;
  } catch (error) {
    throw error;
  }
}

// DELETE example
export async function deleteTicket(ticketId: string) {
  try {
    const response = await api.delete(`/tickets/${ticketId}`);
    // response.data contains the result
    return response.data;
  } catch (error) {
    throw error;
  }
}

export default api;

// Usage example:
// import api from "@/context/authApi";
// api.get("/protected-endpoint").then(...).catch(...);

// Yes, all requests made using the exported `api` instance (and the helper functions like getProfile, createTicket, etc.)
// will automatically:
// 1. Attach the access token in the Authorization header.
// 2. If the backend returns a new access token, update the cookie.
// 3. If a 401 is received, attempt to refresh the token and retry the request once.
// 4. If refresh fails, the error will be thrown for you to handle (e.g., redirect to login).

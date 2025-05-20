import api from "@/lib/api";

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

const AuthContextApi = {
    redirectUserLogin() {
        const backendLoginUrl = `${baseUrl}/oauth2/authorization/google`;
        window.location.href = backendLoginUrl;
    },

    userLoginSuccessful(user: any) {
        if (typeof window !== "undefined") {
            window.localStorage.setItem("user", JSON.stringify(user));
            window.localStorage.setItem("isLoggedIn", "true");
            if (Array.isArray(user.userRoles)) {
                window.localStorage.setItem(
                    "userRoles",
                    JSON.stringify(user.userRoles)
                );
            }
            if (user.email) {
                window.localStorage.setItem("userEmail", user.email);
            }
        }
    },

    async getUserUsingAccessToken() {
        try {
            const response = await api.get("/user/whoAmI");
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    async getUserByEmail(email: string) {
        try {
            const response = await api.get(`/user/fetchByEmail/${email}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    async refreshToken() {
        const response = await api.post(
            "/auth/refresh",
            {},
            { responseType: "text" }
        );
        if (response.status !== 200) {
            throw new Error("Token refresh failed");
        }
        if (typeof response.data === "object" && response.data.accessToken) {
            window.localStorage.setItem(
                "accessToken",
                response.data.accessToken
            );
        }
    },

    async logout() {
        await api.post("/auth/logout");
        if (typeof window !== "undefined") {
            window.localStorage.removeItem("user");
            window.localStorage.removeItem("isLoggedIn");
            window.localStorage.removeItem("userRoles");
            window.localStorage.removeItem("userEmail");
        }
        this.redirectUserLogin();
    },
};

export default AuthContextApi;

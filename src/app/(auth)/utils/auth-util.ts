const getUserRoles = (): string[] => {
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
};

const isLoggedIn = (): boolean => {
  if (typeof window === "undefined") return false;
  const userStr = window.localStorage.getItem("user");
  return !!userStr;
};

const getCurrentUser = () => {
  if (typeof window === "undefined") return null;
  const userStr = window.localStorage.getItem("user");
  return userStr ? JSON.parse(userStr) : null;
};

const getCurrentUserEmail = (): string | null => {
  if (typeof window === "undefined") return null;
  const userStr = window.localStorage.getItem("user");
  if (!userStr) return null;
  try {
    const user = JSON.parse(userStr);
    return user.email || null;
  } catch {
    return null;
  }
};

const AuthUtil = {
  getUserRoles,
  isLoggedIn,
  getCurrentUser,
  getCurrentUserEmail,
};

export default AuthUtil;
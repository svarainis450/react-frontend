import Cookies from "js-cookie";

export const useAuth = () => {
  const isAuthenticated = !!Cookies.get("token");

  return {
    isAuthenticated
  };
}
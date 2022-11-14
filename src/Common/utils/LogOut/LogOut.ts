import { redirectToLogin } from "../redirectToLogin";
import { sessionCleanUp } from "../sessionCleanUp";

export const LogOut = () => {
  sessionCleanUp();
  redirectToLogin()
}
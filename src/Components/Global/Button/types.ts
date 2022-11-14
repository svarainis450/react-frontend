import { ButtonHTMLAttributes } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  buttonType?: "light" | "dark" | "transparent" | "success";
  textWeight?: "thin" | "heavy";
  className?: string;
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}
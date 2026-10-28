import type { ButtonHTMLAttributes } from "react";
import { cn } from "./utils";
type Props = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "default" | "outline"; size?: "default" | "sm" };
export function Button({ className, variant = "default", size = "default", type = "button", ...props }: Props) {
  return <button type={type} className={cn("inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50", variant === "outline" ? "border bg-transparent" : "bg-white text-black", size === "sm" ? "h-9 px-3" : "h-10 px-4 py-2", className)} {...props} />;
}

import * as React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "gold" | "outline" | "dark" | "green" | "red";
}

const variantClasses = {
  gold: "bg-[#85A0B5] text-black",
  outline: "border border-[#85A0B5] text-[#85A0B5]",
  dark: "bg-[#1A1A1A] text-[#9A9A9A] border border-[#2A2A2A]",
  green: "bg-emerald-900/40 text-emerald-400 border border-emerald-800",
  red: "bg-red-900/40 text-red-400 border border-red-800",
};

export function Badge({ className, variant = "dark", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5",
        "text-[9px] font-sans font-medium tracking-[0.2em] uppercase",
        variantClasses[variant],
        className
      )}
      {...props}
    />
  );
}

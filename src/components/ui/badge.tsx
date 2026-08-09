import * as React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "gold" | "outline" | "dark" | "green" | "red";
}

const variantClasses = {
  gold: "bg-[#85A0B5] text-black",
  outline: "border border-[#3A5A78] text-[#3A5A78]",
  dark: "bg-[#F7F5F2] text-[#6B6B6B] border border-[#E4E1DA]",
  green: "bg-emerald-50 text-emerald-700 border border-emerald-200",
  red: "bg-red-50 text-red-700 border border-red-200",
};

export function Badge({ className, variant = "dark", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5",
        "text-[11px] font-sans font-medium tracking-[0.2em] uppercase",
        variantClasses[variant],
        className
      )}
      {...props}
    />
  );
}

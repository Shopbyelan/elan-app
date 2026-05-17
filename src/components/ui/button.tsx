"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "gold" | "outline" | "ghost" | "dark" | "link";
  size?: "sm" | "md" | "lg" | "icon";
  loading?: boolean;
  asChild?: boolean;
}

const sizeClasses = {
  sm: "h-8 px-4 text-xs",
  md: "h-11 px-6 text-xs",
  lg: "h-13 px-10 text-xs",
  icon: "h-10 w-10",
};

const variantClasses = {
  gold: "bg-[#C9A84C] text-black hover:bg-[#D4AF6C] font-medium tracking-[0.2em] uppercase",
  outline: "border border-[#C9A84C] text-[#C9A84C] hover:bg-[#C9A84C] hover:text-black tracking-[0.2em] uppercase",
  ghost: "text-[#9A9A9A] hover:text-white hover:bg-white/5 tracking-[0.15em] uppercase",
  dark: "bg-[#1A1A1A] text-white border border-[#2A2A2A] hover:border-[#C9A84C] tracking-[0.15em] uppercase",
  link: "text-[#C9A84C] hover:text-[#D4AF6C] underline-offset-4 hover:underline p-0 h-auto",
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "gold", size = "md", loading, children, disabled, asChild, ...props }, ref) => {
    const classes = cn(
      "inline-flex items-center justify-center gap-2 whitespace-nowrap",
      "font-sans transition-all duration-300 cursor-pointer",
      "disabled:opacity-50 disabled:cursor-not-allowed",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C]",
      sizeClasses[size],
      variantClasses[variant],
      className
    );

    if (asChild) {
      return (
        <Slot ref={ref} className={classes} {...props}>
          {children}
        </Slot>
      );
    }

    return (
      <button ref={ref} disabled={disabled || loading} className={classes} {...props}>
        {loading && (
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        )}
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button };

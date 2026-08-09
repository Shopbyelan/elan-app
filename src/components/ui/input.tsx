import * as React from "react";
import { cn } from "@/lib/utils";

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "prefix"> {
  label?: string;
  error?: string;
  suffix?: React.ReactNode;
  prefix?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, suffix, prefix, type, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-[12px] font-sans tracking-[0.2em] text-[#6B6B6B] uppercase mb-2">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {prefix && (
            <div className="absolute left-3 text-[#9A9A9A]">{prefix}</div>
          )}
          <input
            type={type}
            ref={ref}
            className={cn(
              "w-full h-11 px-4 py-3 font-sans text-sm text-[#3A3A3A]",
              "bg-[#F7F5F2] border border-[#E4E1DA]",
              "placeholder:text-[#9A9A9A]",
              "focus:outline-none focus:border-[#3A5A78] transition-colors duration-200",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              error && "border-red-500",
              prefix && "pl-10",
              suffix && "pr-10",
              className
            )}
            {...props}
          />
          {suffix && (
            <div className="absolute right-3 text-[#9A9A9A]">{suffix}</div>
          )}
        </div>
        {error && (
          <p className="mt-1.5 text-xs text-red-400 font-sans">{error}</p>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-[12px] font-sans tracking-[0.2em] text-[#6B6B6B] uppercase mb-2">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          className={cn(
            "w-full px-4 py-3 font-sans text-sm text-[#3A3A3A]",
            "bg-[#F7F5F2] border border-[#E4E1DA]",
            "placeholder:text-[#9A9A9A] resize-none",
            "focus:outline-none focus:border-[#3A5A78] transition-colors duration-200",
            error && "border-red-500",
            className
          )}
          {...props}
        />
        {error && (
          <p className="mt-1.5 text-xs text-red-400 font-sans">{error}</p>
        )}
      </div>
    );
  }
);
Textarea.displayName = "Textarea";

export { Input, Textarea };

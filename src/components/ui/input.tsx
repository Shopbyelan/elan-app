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
          <label className="block text-[10px] font-sans tracking-[0.2em] text-[#9A9A9A] uppercase mb-2">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {prefix && (
            <div className="absolute left-3 text-[#5A5A5A]">{prefix}</div>
          )}
          <input
            type={type}
            ref={ref}
            className={cn(
              "w-full h-11 px-4 py-3 font-sans text-sm text-[#E8E8E8]",
              "bg-[#141414] border border-[#2A2A2A]",
              "placeholder:text-[#5A5A5A]",
              "focus:outline-none focus:border-[#C9A84C] transition-colors duration-200",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              error && "border-red-500",
              prefix && "pl-10",
              suffix && "pr-10",
              className
            )}
            {...props}
          />
          {suffix && (
            <div className="absolute right-3 text-[#5A5A5A]">{suffix}</div>
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
          <label className="block text-[10px] font-sans tracking-[0.2em] text-[#9A9A9A] uppercase mb-2">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          className={cn(
            "w-full px-4 py-3 font-sans text-sm text-[#E8E8E8]",
            "bg-[#141414] border border-[#2A2A2A]",
            "placeholder:text-[#5A5A5A] resize-none",
            "focus:outline-none focus:border-[#C9A84C] transition-colors duration-200",
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

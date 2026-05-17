"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
  placeholder?: string;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, options, placeholder, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-[10px] font-sans tracking-[0.2em] text-[#9A9A9A] uppercase mb-2">
            {label}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            className={cn(
              "w-full h-11 px-4 py-3 font-sans text-sm text-[#E8E8E8] appearance-none",
              "bg-[#141414] border border-[#2A2A2A]",
              "focus:outline-none focus:border-[#C9A84C] transition-colors duration-200",
              "disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer",
              error && "border-red-500",
              className
            )}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#5A5A5A] pointer-events-none" />
        </div>
        {error && (
          <p className="mt-1.5 text-xs text-red-400 font-sans">{error}</p>
        )}
      </div>
    );
  }
);
Select.displayName = "Select";

export { Select };

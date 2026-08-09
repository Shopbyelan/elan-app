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
          <label className="block text-[12px] font-sans tracking-[0.2em] text-[#6B6B6B] uppercase mb-2">
            {label}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            className={cn(
              "w-full h-11 px-4 py-3 font-sans text-sm text-[#3A3A3A] appearance-none",
              "bg-[#F7F5F2] border border-[#E4E1DA]",
              "focus:outline-none focus:border-[#3A5A78] transition-colors duration-200",
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
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#9A9A9A] pointer-events-none" />
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

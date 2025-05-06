import React, { useState } from "react";
import { EyeClosed, Eye } from "lucide-react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", label, error, fullWidth = true, type, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    
    const isPassword = type === "password";
    const inputType = isPassword && showPassword ? "text" : type;
    
    return (
      <div className={`${fullWidth ? "w-full bg-transparent relative" : ""}`}>
        {label && (
          <label
            htmlFor={props.id}
            className="block text-sm font-medium mb-1.5 text-gray-300"
          >
            {label}
          </label>
        )}
        <div className="flex w-[300px] p-[14px_16px] items-center gap-[10px] rounded-[12px] border border-[var(--foreground)]">
          <input
            ref={ref}
            className={`w-full bg-transparent text-[var(--text-primary)] placeholder:text-[var(--text-primary)] focus:outline-none z-10 relative ${
              isPassword ? "pr-10" : ""
            } ${className}`}
            type={inputType}
            {...props}
          />
          {isPassword && (
            <button
              type="button"
              className="text-[var(--text-primary)] z-10 h-[18px] w-[18px]"
              onClick={() => setShowPassword(!showPassword)}
              tabIndex={-1}
            >
              {showPassword ? (
                (<Eye size={18} />)
              ) : (<EyeClosed size={18}/>)}
            </button>
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-gray-800/5 to-transparent pointer-events-none"></div>
        </div>
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input"; 
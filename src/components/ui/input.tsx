import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", label, error, fullWidth = true, ...props }, ref) => {
    return (
      <div className={`${fullWidth ? "w-full" : ""}`}>
        {label && (
          <label
            htmlFor={props.id}
            className="block text-sm font-medium mb-1.5 text-gray-300"
          >
            {label}
          </label>
        )}
        <div className="bg-[#111111] border border-gray-800 rounded-xl overflow-hidden shadow-[0_4px_15px_rgba(0,0,0,0.2)] relative">
          <input
            ref={ref}
            className={`w-full px-4 py-3.5 bg-transparent text-white placeholder:text-gray-600 focus:outline-none z-10 relative ${className}`}
            {...props}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-gray-800/5 to-transparent pointer-events-none"></div>
        </div>
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input"; 
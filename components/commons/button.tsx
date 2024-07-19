import React, { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ children, className, disabled, type = "button", ...props }, ref) => {
        return (
            <button
                type={type}
                className={twMerge(
                    "rounded-xl bg-white border-transparent p-2 disabled:cursor-not-allowed disabled:opacity-50 text-black font-bold hover:opacity-75 transition text-nowrap",
                    className
                )}
                disabled={disabled}
                ref={ref}
                {...props}
            >
                {children}
            </button>
        );
    }
);

Button.displayName = "Button";

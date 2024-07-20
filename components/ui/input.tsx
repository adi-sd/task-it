import * as React from "react";

import { cn } from "@/lib/utils";
import { useState } from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
    const [currentValue, setCurrentValue] = useState(props.value);

    return (
        <input
            type={type}
            className={cn(
                "flex w-full border-0 bg-transparent px-3 py-1 text-md font-semibold shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 focus-visible:border-b-[1px] focus-within:border-b-black disabled:cursor-not-allowed disabled:opacity-50",
                className
            )}
            ref={ref}
            {...props}
            value={currentValue}
            onChange={(e) => setCurrentValue(e.target.value)}
        />
    );
});

Input.displayName = "Input";

export { Input };

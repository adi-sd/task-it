import * as React from "react";

import { cn } from "@/lib/utils";
import { OptionType } from "@/lib/types";

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    options: OptionType[];
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(({ className, options, ...props }, ref) => {
    return (
        <select
            className={cn(
                "flex w-[50%] border-0 bg-white/50 px-2 py-2 rounded-lg text-md shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
                className
            )}
            ref={ref}
            {...props}
        >
            {options.map((item) => (
                <option key={item.value} value={item.value}>
                    {item.label}
                </option>
            ))}
        </select>
    );
});

Select.displayName = "Select";

export { Select };

import * as React from "react";

import { cn } from "@/lib/utils";
import { useState } from "react";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, ...props }, ref) => {
    const [currentValue, setCurrentValue] = useState(props.value);

    return (
        <textarea
            className={cn(
                "flex min-h-[60px] h-[150px] w-full border-0 bg-transparent px-2 py-2 text-lg shadow-sm placeholder:text-black focus-visible:outline-none focus-visible:ring-0 focus-visible:border-b-[2px] focus-within:border-b-black disabled:cursor-not-allowed disabled:opacity-50 resize-none",
                className
            )}
            ref={ref}
            {...props}
            value={currentValue}
            onChange={(e) => setCurrentValue(e.target.value)}
        />
    );
});
Textarea.displayName = "Textarea";

export { Textarea };

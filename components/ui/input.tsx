import * as React from "react";
import { cn } from "@/lib/utils";

// Option 1: Remove the interface and use the type directly
type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

// Option 2: If you might add custom props later, add at least one property
// interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
//   // Add any custom props here if needed
//   wrapperClassName?: string;
// }

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };

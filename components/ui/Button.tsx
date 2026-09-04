import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", ...props }, ref) => {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center rounded-xl text-[12px] font-semibold tracking-eyebrow uppercase transition-colors duration-500 ease-luxury focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 h-12 px-8",
          {
            "bg-rose text-white hover:bg-roseHover": variant === "primary",
            "bg-beige text-ink hover:bg-line": variant === "secondary",
            "border border-line bg-transparent hover:bg-beige text-ink": variant === "outline",
            "hover:bg-beige/40 text-ink": variant === "ghost",
          },
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
export default Button;

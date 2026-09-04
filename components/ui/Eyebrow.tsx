import * as React from "react";
import { cn } from "@/lib/utils";

type EyebrowProps = React.HTMLAttributes<HTMLParagraphElement>;

export default function Eyebrow({ className, ...props }: EyebrowProps) {
  return (
    <p
      className={cn(
        "text-[11px] tracking-eyebrow uppercase font-semibold text-roseDeep mb-3 block",
        className
      )}
      {...props}
    />
  );
}

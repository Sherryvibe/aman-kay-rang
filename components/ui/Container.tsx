import * as React from "react";
import { cn } from "@/lib/utils";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  clean?: boolean;
}

export default function Container({ className, clean = false, ...props }: ContainerProps) {
  return (
    <div
      className={cn(
        !clean && "max-w-[1400px] mx-auto px-6 md:px-10 w-full",
        className
      )}
      {...props}
    />
  );
}

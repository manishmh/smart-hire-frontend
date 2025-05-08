import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export const H1 = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <h1
      className={cn(
        "bg-gradient-to-b to-[#000000] from-[#3F3F47] dark:from-[#eaeaea] dark:to-[#b8b8b8] text-transparent bg-clip-text font-semibold text-5xl",
        className
      )}
    >
      {children}
    </h1>
  );
};

export const Text = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "text-[#3f3f47] bg-gradient-to-b dark:text-transparent dark:bg-clip-text dark:from-[#eaeaea] dark:to-[#b8b8b8] text-xl font-mono",
        className
      )}
    >
      {children}
    </div>
  );
};

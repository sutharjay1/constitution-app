import { cn } from "@/lib/utils";
import React from "react";

const AppLogo = ({ className }: { className?: string }) => {
  return (
    <div>
      <span
        className={cn(
          "inline-block text-2xl font-bold text-mediumBlue dark:text-zinc-100 lg:text-3xl",
          className,
        )}
      >
        samvidhan
      </span>
    </div>
  );
};

export default AppLogo;

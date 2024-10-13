import { DINRoundProBlack } from "@/config/font";
import { cn } from "@/lib/utils";
import React, { PropsWithChildren } from "react";

type HeadingProps = {
  className?: string;
  children: React.ReactNode;
};

const Heading = ({ className, children }: HeadingProps) => {
  return (
    <h2
      className={cn(
        "text-balance text-center text-3xl text-zinc-700 sm:text-4xl",
        DINRoundProBlack.className,
        className,
      )}
    >
      {children}
    </h2>
  );
};

export default Heading;

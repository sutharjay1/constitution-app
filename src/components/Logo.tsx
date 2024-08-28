import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

const Logo = ({ className }: { className?: string }) => {
  return (
    <Image
      src="/logo.svg"
      alt="Logo"
      width={100}
      height={100}
      className={cn("select-none", className)}
      draggable={false}
    />
  );
};

export default Logo;

"use client";

import { cn } from "@/lib/utils";
import React from "react";

const GameButton = ({
  className,
  children,
  onClick,
  variant = "default",
  divClassName,
  disable,
}: {
  disable?: boolean;
  divClassName?: string;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "default" | "white" | "blue" | "transparent" | "red";
}) => {
  const variants = {
    default:
      "border-mediumBlue perspective-800 rotate-x-30 bg-mediumBlue flex w-full transform cursor-pointer items-center gap-5 rounded-2xl border-2 border-b-[4.5px] p-4 text-sm font-medium shadow-[0_8px_0_#a79980] transition-all duration-200 hover:translate-y-[3px] hover:shadow-[0_5px_0_#a79980] active:translate-y-[8px] active:shadow-none",
    white:
      "flex w-full translate-y-[2px] cursor-pointer items-center gap-5 rounded-2xl border-2 border-b-2  p-4 px-6 text-sm font-medium transition-all duration-200 ease-in-out active:translate-y-[6px] active:shadow-none border-[#ecf7fd] bg-zinc-50 shadow-[0_4px_0_#ecf7fd90]",
    blue: "flex w-full translate-y-[2px] cursor-pointer items-center gap-5 rounded-2xl border-2 border-b-2 p-4 px-6 text-sm font-medium transition-all duration-200 ease-in-out active:translate-y-[6px] active:shadow-none border-[#a79980] bg-mediumBlue text-zinc-900 shadow-[0_4px_0_#a7998080]",
    transparent:
      "flex w-full translate-y-[2px] cursor-pointer items-center gap-5 rounded-2xl border-2 border-b-2 p-4 px-6 text-sm font-medium transition-all duration-200 ease-in-out active:translate-y-[6px] active:shadow-none border-[#a79980] bg-transparent text-zinc-300 shadow-[0_4px_0_#a79980]",
    disableBtn:
      "flex w-full translate-y-[2px] cursor-pointer items-center gap-5 rounded-2xl border-2 border-b-2 p-4 text-sm font-medium transition-all duration-200 ease-in-out active:translate-y-[6px] active:shadow-none border-zinc-600 bg-zinc-500/80 text-zinc-300 shadow-[0_4px_0_#52525b]",
    red: "flex w-full translate-y-[2px] cursor-pointer items-center gap-5 rounded-2xl border-2 border-b-2 p-4 px-6 text-sm font-medium transition-all duration-200 ease-in-out active:translate-y-[6px] active:shadow-none border-[#dc2626] bg-red-500 text-zinc-900 shadow-[0_4px_0_#dc262680]",
  };

  return (
    <div className={cn("w-full perspective-800", divClassName)}>
      <button
        onClick={() => onClick && onClick()}
        className={cn(
          disable ? variants.disableBtn : variants[variant],
          className,
        )}
        disabled={disable}
        // className={`flex w-full items-center gap-5 rounded-xl border-2 border-b-[4.5px] border-gray-500/60  p-4 text-sm font-medium transition-colors focus:outline-none ${
        //   selectedReason === reason.title
        //     ? "border-blue-500/65 bg-blue-500/15"
        //     : "hover:bg-zinc-500/20"
        // }`}
      >
        {children}
      </button>
    </div>
  );
};

export default GameButton;

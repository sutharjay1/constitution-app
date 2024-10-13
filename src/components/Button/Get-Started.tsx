"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { HiMiniArrowLongRight } from "react-icons/hi2";
import { cn } from "@/lib/utils";
import { DINRoundProBold, DINRoundProMedi } from "@/config/font";
import GameButton from "./GameButton";
import Heading from "../Heading";

const GetStartedButton = () => {
  const router = useRouter();
  return (
    <div className="flex w-full items-center justify-center">
      <GameButton
        className="mt-2 flex w-56 items-center justify-center rounded-xl px-6 py-2.5"
        onClick={() => router.push("/register")}
        variant="blue"
        divClassName="w-full flex items-center justify-center mt-3"
      >
        <Heading
          className={cn(
            "text-balance text-center text-sm font-bold text-zinc-900 sm:text-base",
            DINRoundProMedi.className,
          )}
        >
          Get Started
        </Heading>
      </GameButton>
    </div>
  );
};

export default GetStartedButton;

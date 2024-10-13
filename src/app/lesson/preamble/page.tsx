"use client";
import React from "react";
import { Options } from "@/type";
import { useRouter } from "next/navigation";
import { useOptions } from "@/hooks/useOptions";
import { cn } from "@/lib/utils";

const Blur = ({
  children,
  className,
  blurStrength = "md",
}: {
  className?: string;
  children: React.ReactNode;
  blurStrength?: string;
}) => {
  return (
    <div className="inline-block underline underline-offset-4">
      <span
        className={cn(
          "inline-block",
          blurStrength ? `blur-${blurStrength}` : "blur-0",
          className,
        )}
      >
        {children}
      </span>
    </div>
  );
};

function Preamble() {
  const router = useRouter();
  const { option, setOption } = useOptions();

  const handleClick = () => {
    setOption(Options.SOVEREIGN);
    router.push(`/lesson/preamble/c?option=${option}`);
  };

  return (
    <div
      className="mx-auto w-full max-w-3xl bg-amber-50 p-2 sm:p-4 md:p-6 lg:p-8"
      onClick={handleClick}
    >
      <div className="border-4 border-amber-700 p-2 sm:border-8 sm:p-4 md:p-6 lg:p-8">
        <div className="border-2 border-amber-600 p-2 sm:border-4 sm:p-4 md:p-6 lg:p-8">
          <h1 className="mb-3 text-center font-serif text-xl text-amber-800 sm:mb-6 sm:text-2xl md:text-3xl">
            THE CONSTITUTION OF INDIA
          </h1>
          <div className="mb-3 text-center sm:mb-6">
            <span className="inline-block h-8 w-8 rounded-full bg-amber-700 sm:h-12 sm:w-12 md:h-16 md:w-16"></span>
          </div>
          <p className="mb-3 text-center font-serif text-sm text-amber-900 sm:mb-6 sm:text-base md:text-lg">
            WE, THE PEOPLE OF INDIA, having solemnly resolved to constitute
            India into a <Blur blurStrength="lg">SOVEREIGN</Blur>{" "}
            <Blur blurStrength="lg">SOCIALIST</Blur>
            <Blur blurStrength="lg">SECULAR</Blur>{" "}
            <Blur blurStrength="lg">DEMOCRATIC</Blur>{" "}
            <Blur blurStrength="lg">REPUBLIC</Blur> and to secure to all its
            citizens:
          </p>
          <p className="mb-2 text-center font-serif text-base text-amber-800 sm:mb-4 sm:text-lg md:text-xl">
            <Blur blurStrength="lg">JUSTICE</Blur>, social, economic and
            political;
          </p>
          <p className="mb-2 text-center font-serif text-base text-amber-800 sm:mb-4 sm:text-lg md:text-xl">
            <Blur blurStrength="lg">LIBERTY</Blur> of thought, expression,
            belief, faith and worship;
          </p>
          <p className="mb-2 text-center font-serif text-base text-amber-800 sm:mb-4 sm:text-lg md:text-xl">
            <Blur blurStrength="lg"> EQUALITY</Blur> of status and of
            opportunity;
          </p>
          <p className="mb-3 text-center font-serif text-sm text-amber-900 sm:mb-6 sm:text-base md:text-lg">
            and to promote among them all
          </p>
          <p className="mb-3 text-center font-serif text-base text-amber-800 sm:mb-6 sm:text-lg md:text-xl">
            <Blur blurStrength="lg">FRATERNITY</Blur>, assuring the dignity of
            the individual and the unity of the Nation;
          </p>
          <p className="mb-3 text-center font-serif text-sm text-amber-900 sm:mb-6 sm:text-base md:text-lg">
            IN OUR CONSTITUENT ASSEMBLY this twenty-sixth day of November, 1949,
            do HEREBY ADOPT, ENACT AND GIVE TO OURSELVES THIS CONSTITUTION.
          </p>
        </div>
      </div>
    </div>
  );
}

const Page = () => {
  return (
    <div className="flex h-full w-full items-center justify-center p-2 sm:p-4">
      <Preamble />
    </div>
  );
};

export default Page;

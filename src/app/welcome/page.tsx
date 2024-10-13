"use client";

import Heading from "@/components/Heading";
import Logo from "@/components/Logo";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import CourseOverviewSection from "@/components/Onboarding/CourseOverviewSection";
import DailyGoalSection from "@/components/Onboarding/DailyGoalSection";
import LearningReasonSection from "@/components/Onboarding/LearningReasonSection";
import ProficiencySection from "@/components/Onboarding/ProficiencySection";
import { Progress } from "@/components/ui/progress";
import { DINRoundProBold, DINRoundProMedi } from "@/config/font";
import { cn } from "@/lib/utils";
import { EState } from "@/type";
import { useRouter, useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";
import { HiMiniArrowLongLeft } from "react-icons/hi2";
import { motion } from "framer-motion";

import { useRef } from "react";

import GameButton from "@/components/Button/GameButton";
import type { ConfettiRef } from "@/components/magicui/confetti";
import confetti from "canvas-confetti";
import OvalLoading from "@/components/Loading/OvalLoading";
import { Loader2 } from "lucide-react";

const WelcomeContent: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [welcomeState, setWelcomeState] = useState<
    EState | "INITIAL" | "GREETING"
  >(() => (searchParams.get("welcomeState") as EState) || "INITIAL");
  const [progress, setProgress] = useState<number>(0);

  const confettiRef = useRef<ConfettiRef>(null);

  useEffect(() => {
    const progressMap = {
      [EState.LEARNING_REASON]: 25,
      [EState.PROFICIENCY]: 50,
      [EState.COURSEOVERVIEW]: 75,
      [EState.DAILYGOAL]: 100,
    };
    setProgress(progressMap[welcomeState as keyof typeof progressMap] || 0);
  }, [welcomeState]);

  const [isCompleted, setIsCompleted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleClick = () => {
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) =>
      Math.random() * (max - min) + min;

    const interval = window.setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);
  };

  const [showLoading, setShowLoading] = useState(false);

  // useEffect(() => {
  //   const params = searchParams.get("welcomeState") as EState;
  //   if (params === "dailyGoal") {
  //     setShowLoading(true);
  //   }
  // }, [searchParams, setShowLoading]);

  const handleContinue = () => {
    // if (!showConfetti) {
    //   handleClick();
    //   setShowConfetti(true);
    // }

    if (welcomeState === "INITIAL") {
      setWelcomeState("GREETING");
    } else if (welcomeState === "GREETING") {
      router.push(`/welcome?welcomeState=${EState.LEARNING_REASON}`);
      setWelcomeState(EState.LEARNING_REASON);
    } else {
      const stateOrder = [
        EState.LEARNING_REASON,
        EState.PROFICIENCY,
        EState.COURSEOVERVIEW,
        EState.DAILYGOAL,
      ];
      const currentIndex = stateOrder.indexOf(welcomeState as EState);
      if (currentIndex < stateOrder.length - 1) {
        const nextState = stateOrder[currentIndex + 1];
        router.push(`/welcome?welcomeState=${nextState}`);
        setWelcomeState(nextState);

        console.log(nextState);
      } else if (welcomeState === EState.DAILYGOAL) {
        setShowLoading(true); // Show loading spinner
        setIsCompleted(true);
        router.push("/learn");
      }
    }

    // confettiRef.current?.fire({});
  };

  // useEffect(() => {
  //   if (isCompleted) {
  //     OvalLoading();
  //   }
  // }, [isCompleted]);

  const handleGoBack = () => {
    const stateOrder = [
      EState.LEARNING_REASON,
      EState.PROFICIENCY,
      EState.COURSEOVERVIEW,
      EState.DAILYGOAL,
    ];
    const currentIndex = stateOrder.indexOf(welcomeState as EState);
    if (currentIndex > 0) {
      const previousState = stateOrder[currentIndex - 1];
      router.push(`/welcome?welcomeState=${previousState}`);
      setWelcomeState(previousState);
    }
  };

  const renderContent = () => {
    switch (welcomeState) {
      case "INITIAL":
      case "GREETING":
        return (
          // <Confetti
          //   ref={confettiRef}
          //   className="absolute left-0 top-0 z-0 size-full"
          // >
          <div className="relative flex flex-grow flex-col items-center justify-center">
            <div className="relative mt-48 flex w-full max-w-[26rem] items-center justify-center">
              {welcomeState === "INITIAL" ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  exit={{ opacity: 0 }}
                  className="absolute top-0 z-50 overflow-hidden rounded-lg border px-4 py-3 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
                >
                  <Heading
                    className={cn(
                      "text-md text-balance text-center text-zinc-300 sm:text-lg",
                      DINRoundProBold.className,
                    )}
                  >
                    Hi there! I&apos;m Constitution!
                  </Heading>{" "}
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-0 z-50 overflow-hidden rounded-lg border px-4 py-3 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
                >
                  <Heading
                    className={cn(
                      "text-md text-balance text-center text-zinc-300 sm:text-lg",
                      DINRoundProBold.className,
                    )}
                  >
                    Let&apos;s get started!
                  </Heading>{" "}
                </motion.div>
              )}

              <Logo className="z-10 mt-[4.5rem]" />
            </div>
          </div>
          // </Confetti>
        );
      case EState.LEARNING_REASON:
        return <LearningReasonSection />;
      case EState.PROFICIENCY:
        return <ProficiencySection />;
      case EState.COURSEOVERVIEW:
        return <CourseOverviewSection />;
      case EState.DAILYGOAL:
        return <DailyGoalSection />;
      default:
        return null;
    }
  };

  return (
    <div className="mx-auto flex h-screen w-full flex-col bg-background">
      <div className="mx-auto w-full max-w-6xl p-4">
        <div className="flex w-full items-center justify-center gap-4">
          {welcomeState !== "INITIAL" &&
            welcomeState !== "GREETING" &&
            welcomeState !== EState.LEARNING_REASON && (
              <HiMiniArrowLongLeft
                className="h-5 w-5 cursor-pointer text-zinc-200 transition-all duration-100 hover:-translate-x-1 dark:text-zinc-300"
                onClick={handleGoBack}
              />
            )}
          <Progress value={progress} className="flex-grow" />
        </div>
      </div>

      <MaxWidthWrapper
        paddingTop="medium"
        className="flex flex-grow items-start justify-center"
      >
        {welcomeState !== "INITIAL" &&
          welcomeState !== "GREETING" &&
          welcomeState === null && (
            <>
              <MaxWidthWrapper paddingTop="medium" className="">
                <div className="relative flex flex-grow flex-col items-center justify-center">
                  <Heading className="text-2xl text-zinc-400 sm:text-3xl">
                    {// @ts-ignore
                    welcomeState?.replace(/([A-Z])/g, " $1").trim()}
                  </Heading>
                  <div className="relative mt-48 flex w-full max-w-[26rem] items-center justify-center">
                    <div className="absolute top-0 z-50 overflow-hidden rounded-lg border px-4 py-3 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2">
                      <h2
                        className={cn(
                          "text-md text-balance text-center text-zinc-300 sm:text-lg",
                          DINRoundProBold.className,
                        )}
                      >
                        {welcomeState === EState.LEARNING_REASON
                          ? "Welcome to Constitution"
                          : //@ts-ignore
                            welcomeState.replace(/([A-Z])/g, " $1").trim()}
                      </h2>
                    </div>
                    <Logo className="z-10 mt-[4.5rem]" />
                  </div>
                </div>
              </MaxWidthWrapper>
            </>
          )}

        {renderContent()}
      </MaxWidthWrapper>

      <div className="w-full">
        <div className="fixed bottom-0 left-0 right-0 border-t-[1.8px] border-zinc-500 bg-background p-4 py-12">
          <div className="mx-auto flex w-full max-w-7xl items-center justify-end">
            <GameButton
              onClick={handleContinue}
              divClassName="w-full flex items-center justify-end"
              variant="blue"
              className="flex w-full items-center justify-center py-3 sm:w-44"
            >
              <Heading
                className={cn(
                  "flex items-center justify-center gap-2 text-balance text-center text-sm font-bold text-zinc-900 sm:text-base",
                  DINRoundProMedi.className,
                )}
              >
                {showLoading && (
                  <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                )}{" "}
                Continue
              </Heading>
            </GameButton>
          </div>
        </div>
      </div>
    </div>
  );
};

const Welcome: React.FC = () => {
  return (
    <div className="mx-auto flex h-[calc(100vh-2rem)] w-full flex-col overflow-y-auto bg-background">
      <Suspense fallback={<OvalLoading />}>
        <WelcomeContent />
      </Suspense>
    </div>
  );
};

export default Welcome;

"use client";

import GameButton from "@/components/Button/GameButton";
import Heading from "@/components/Heading";
import { Button } from "@/components/ui/button";
import {
  DINRoundProBlack,
  DINRoundProBold,
  DINRoundProLight,
  DINRoundProMedi,
} from "@/config/font";
import { cn } from "@/lib/utils";
import { Loader2, Star } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { HiMiniArrowLongLeft } from "react-icons/hi2";
import { IoTriangleSharp } from "react-icons/io5";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { FaFire } from "react-icons/fa6";
import Image from "next/image";
import { useHeart } from "@/hooks/useHeart";
import { useGems } from "@/hooks/useGems";
import { useHover } from "@uidotdev/usehooks";
import {
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useOnboarding } from "@/hooks/useOnboarding";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { signOut, useSession } from "next-auth/react";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";
import { trpc } from "@/trpc/client";

const HoverCard = ({ text, top }: { text: string; top?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.2 }}
    className="absolute z-20 min-w-52 rounded-lg border-2 border-zinc-700 bg-background p-2 shadow-lg"
    style={{ top }}
  >
    <DropdownMenuLabel className="px-2 text-left text-base text-zinc-500 sm:text-base">
      <Heading
        className={cn(
          "text-left text-base font-medium uppercase text-zinc-500 sm:text-base",
          DINRoundProMedi.className,
        )}
      >
        My Course
      </Heading>
    </DropdownMenuLabel>
    <DropdownMenuSeparator className="bg-zinc-700" />
    <DropdownMenuLabel className="px-2 text-left text-base text-zinc-500 sm:text-base">
      <Heading className="text-left text-base text-zinc-300 sm:text-base">
        {text}
      </Heading>
    </DropdownMenuLabel>
  </motion.div>
);

const Learn = () => {
  const [streak, setStreak] = useState(0);
  const [isStartClicked, setIsStartClicked] = useState(false);
  const [chapter2Clicked, setChapter2Clicked] = useState(false);
  const [chapter3Clicked, setChapter3Clicked] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [hoverCardPosition, setHoverCardPosition] = useState<{
    [key: string]: { top: string };
  }>({});

  const lessonId = getCookie("lesson_1");

  const { heart } = useHeart();
  const { gems } = useGems();

  const { onboarding } = useOnboarding();

  const router = useRouter();
  const startGameRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    startGameRef.current?.focus();
  }, []);

  const handleGameButton = () => {
    setIsStartClicked(!isStartClicked);
    router.push(`/lesson/c3f20f6e-7d89-47b0-b0b6-2ed546080cdd/?q=1`);
  };

  const handleGameButton2 = () => {
    setChapter2Clicked(!chapter2Clicked);
    router.push(`/lesson/cbc1dced-5cc7-49e1-b877-eae22c820ad0/?q=1`);
  };

  const handleGameButton3 = () => {
    setChapter3Clicked(!chapter3Clicked);
    router.push(`/lesson/f8a9d2e1-6b3c-4f5a-9d7e-1c2b3a4f5e6d?q=1`);
  };

  const handleMouseEnter = (
    item: string,
    event: React.MouseEvent<HTMLDivElement>,
  ) => {
    setHoveredItem(item);
    const rect = event.currentTarget.getBoundingClientRect();
    setHoverCardPosition({
      ...hoverCardPosition,
      [item]: {
        top: `${rect.bottom + window.scrollY - 30}px`,
      },
    });
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

  const { data, status } = useSession();

  const { data: lesson } = trpc.getLesson.useQuery();

  console.log(JSON.stringify(lesson, null, 2));

  return (
    <div className="min-h-screen w-full bg-background p-4 sm:p-6 md:p-8 lg:p-10">
      <Dialog>
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 md:grid-cols-2">
            <div className="mt-2 flex flex-col space-y-6">
              <div className="rounded-xl border-2 border-b-4 border-[#b39d74]/70 bg-[#b39d74] p-2 sm:p-4">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-start gap-2">
                    <HiMiniArrowLongLeft
                      className={cn(
                        "h-6 w-6 cursor-pointer text-zinc-800 transition-all hover:-translate-x-1",
                        DINRoundProBlack.className,
                      )}
                    />
                    <p
                      className={cn(
                        "text-base font-medium text-zinc-800 sm:text-lg",
                        DINRoundProBold.className,
                      )}
                    >
                      Section 1
                    </p>
                  </div>
                  <p
                    className={cn(
                      "text-balance text-lg text-zinc-800 sm:text-xl md:text-2xl",
                      DINRoundProBlack.className,
                    )}
                  >
                    Discuss on Indian Constitution
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center">
                <div className="perspective-3d w-full active:-translate-y-0">
                  {/* Easy Button */}

                  <div className="flex w-full flex-col items-center justify-center -space-y-4 border-t-[1.8px] border-zinc-500 bg-background py-12">
                    <motion.div
                      animate={{ y: [0, -10, 0] }}
                      transition={{
                        duration: 1.8,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="relative z-20 mx-auto flex w-fit items-center justify-center rounded-lg border-2 border-zinc-600 bg-background px-4 py-2"
                    >
                      <Heading className="text-2xl uppercase text-mediumBlue sm:text-2xl">
                        Easy
                      </Heading>
                    </motion.div>

                    <div className="z-0 mx-auto flex w-full max-w-7xl items-center justify-center perspective-800">
                      {/* <div className="flex w-fit items-center justify-center gap-3 rounded-2xl border-4 border-zinc-500/50 p-3 rotate-x-45"> */}
                      <div className="flex w-fit items-center justify-center gap-3 rounded-2xl p-3 rotate-x-45">
                        <GameButton
                          className="w-fit"
                          onClick={() => handleGameButton()}
                        >
                          {isStartClicked ? (
                            <Loader2 className="h-10 w-10 animate-spin text-zinc-300" />
                          ) : (
                            <Star
                              className="h-10 w-10 rounded-full text-zinc-300"
                              color="#D4D4D8"
                            />
                          )}
                        </GameButton>
                      </div>
                    </div>
                  </div>

                  {/* Medium Button */}
                  <div className="flex w-full flex-col items-center justify-center -space-y-4 border-zinc-500 bg-background">
                    <motion.div
                      animate={{ y: [0, -10, 0] }}
                      transition={{
                        duration: 1.8,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="relative z-20 mx-auto flex w-fit items-center justify-center rounded-lg border-2 border-zinc-600 bg-background px-4 py-2"
                    >
                      <Heading className="text-2xl uppercase text-mediumBlue sm:text-2xl">
                        Medium
                      </Heading>
                    </motion.div>

                    <div className="z-0 mx-auto flex w-full max-w-7xl items-center justify-center perspective-800">
                      {/* <div className="flex w-fit items-center justify-center gap-3 rounded-2xl border-4 border-zinc-500/50 p-3 rotate-x-45"> */}
                      <div className="flex w-fit items-center justify-center gap-3 rounded-2xl p-3 rotate-x-45">
                        <GameButton
                          className="w-fit"
                          onClick={() => handleGameButton2()}
                        >
                          {chapter2Clicked ? (
                            <Loader2 className="h-10 w-10 animate-spin text-zinc-300" />
                          ) : (
                            <Star
                              className="h-10 w-10 rounded-full text-zinc-300"
                              color="#D4D4D8"
                            />
                          )}
                        </GameButton>
                      </div>
                    </div>
                  </div>

                  {/* Hard Button */}
                  <div className="flex w-full flex-col items-center justify-center -space-y-4 border-zinc-500 bg-background pt-12">
                    <motion.div
                      animate={{ y: [0, -10, 0] }}
                      transition={{
                        duration: 1.8,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="relative z-20 mx-auto flex w-fit items-center justify-center rounded-lg border-2 border-zinc-600 bg-background px-4 py-2"
                    >
                      <Heading className="text-2xl uppercase text-mediumBlue sm:text-2xl">
                        Hard
                      </Heading>
                    </motion.div>

                    <div className="z-0 mx-auto flex w-full max-w-7xl items-center justify-center perspective-800">
                      {/* <div className="flex w-fit items-center justify-center gap-3 rounded-2xl border-4 border-zinc-500/50 p-3 rotate-x-45"> */}
                      <div className="flex w-fit items-center justify-center gap-3 rounded-2xl p-3 rotate-x-45">
                        <GameButton
                          className="w-fit"
                          onClick={() => handleGameButton3()}
                        >
                          {chapter3Clicked ? (
                            <Loader2 className="h-10 w-10 animate-spin text-zinc-300" />
                          ) : (
                            <Star
                              className="h-10 w-10 rounded-full text-zinc-300"
                              color="#D4D4D8"
                            />
                          )}
                        </GameButton>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex w-full flex-col space-y-4 sm:ml-2 sm:w-96">
              <div className="grid w-full max-w-xl grid-cols-4 gap-2">
                <div
                  className="group relative flex w-fit items-center justify-center gap-3 rounded-2xl px-4 py-2 hover:bg-zinc-500/20"
                  onMouseEnter={(e) => handleMouseEnter("india", e)}
                  onMouseLeave={handleMouseLeave}
                >
                  <Image src="/india.svg" alt="India" width={32} height={32} />
                  {hoveredItem === "india" && (
                    <>
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute z-20 min-w-52 rounded-lg border-2 border-zinc-700 bg-background p-2 shadow-lg"
                        style={{ top: hoverCardPosition.india?.top }}
                      >
                        <DropdownMenuLabel className="px-2 text-left text-base text-zinc-500 sm:text-base">
                          <Heading
                            className={cn(
                              "text-left text-base font-medium uppercase text-zinc-500 sm:text-base",
                              DINRoundProMedi.className,
                            )}
                          >
                            My Proficiency
                          </Heading>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator className="bg-zinc-700" />
                        <DropdownMenuLabel className="px-2 text-left text-base text-zinc-500 sm:text-base">
                          <Heading className="flex items-center justify-start gap-4 text-left text-base text-zinc-300 sm:text-base">
                            <Image
                              src="/india.svg"
                              alt="India"
                              width={32}
                              height={32}
                            />{" "}
                            <Heading className="text-base text-mediumBlue sm:text-base">
                              {onboarding.proficiency}
                            </Heading>
                          </Heading>
                        </DropdownMenuLabel>
                      </motion.div>
                    </>
                  )}
                </div>
                <div
                  className="relative flex w-fit items-center justify-center gap-3 rounded-2xl px-4 py-2 hover:bg-zinc-500/20"
                  onMouseEnter={(e) => handleMouseEnter("streak", e)}
                  onMouseLeave={handleMouseLeave}
                >
                  <FaFire className="h-6 w-6 text-zinc-600" />
                  <Heading className="text-base text-zinc-600 sm:text-base">
                    {streak}
                  </Heading>
                  {hoveredItem === "streak" && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-none absolute -left-[6.3rem] right-4 z-20 w-[25rem] rounded-lg border-2 border-zinc-700 shadow-lg"
                      style={{ top: hoverCardPosition.streak?.top }}
                    >
                      <div className="bg-zinc-600 p-3">
                        <div className="flex w-full items-center justify-center gap-3">
                          <div className="w-full">
                            <DropdownMenuLabel className="px-2 text-left text-base text-zinc-500 sm:text-base">
                              <Heading
                                className={cn(
                                  "text-left text-xl font-medium text-zinc-400/60 sm:text-2xl",
                                  DINRoundProBold.className,
                                )}
                              >
                                {streak} Day Streak
                              </Heading>
                            </DropdownMenuLabel>
                            <Heading
                              className={cn(
                                "w-full text-balance px-2 text-left text-base font-medium text-zinc-300/80 sm:text-base",
                                DINRoundProBold.className,
                              )}
                            >
                              Do a lesson today to start a new
                              <br /> streak!
                            </Heading>
                          </div>
                          <FaFire className="absolute right-4 top-6 size-24 text-zinc-600" />
                        </div>
                        <DropdownMenuLabel className="mt-6 px-2 text-left text-base text-zinc-500 sm:text-base">
                          <div className="flex w-full flex-col gap-2">
                            <div className="flex w-full items-center justify-between text-xs text-zinc-400">
                              <Heading
                                className={cn(
                                  "w-full text-balance px-2 text-left text-base font-medium text-zinc-300/80 sm:text-base",
                                  DINRoundProBold.className,
                                )}
                              >
                                S
                              </Heading>
                              <Heading
                                className={cn(
                                  "w-full text-balance px-2 text-left text-base font-medium text-zinc-300/80 sm:text-base",
                                  DINRoundProBold.className,
                                )}
                              >
                                M
                              </Heading>
                              <Heading
                                className={cn(
                                  "w-full text-balance px-2 text-left text-base font-medium text-zinc-300/80 sm:text-base",
                                  DINRoundProBold.className,
                                )}
                              >
                                T
                              </Heading>
                              <Heading
                                className={cn(
                                  "w-full text-balance px-2 text-left text-base font-medium text-zinc-300/80 sm:text-base",
                                  DINRoundProBold.className,
                                )}
                              >
                                W
                              </Heading>
                              <Heading
                                className={cn(
                                  "w-full text-balance px-2 text-left text-base font-medium text-zinc-300/80 sm:text-base",
                                  DINRoundProBold.className,
                                )}
                              >
                                T
                              </Heading>
                              <Heading
                                className={cn(
                                  "w-full text-balance px-2 text-left text-base font-medium text-zinc-300/80 sm:text-base",
                                  DINRoundProBold.className,
                                )}
                              >
                                F
                              </Heading>
                              <Heading
                                className={cn(
                                  "w-full text-balance px-2 text-left text-base font-medium text-zinc-300/80 sm:text-base",
                                  DINRoundProBold.className,
                                )}
                              >
                                S
                              </Heading>
                            </div>
                            <div className="relative flex w-full items-center gap-1">
                              <div className="mt-2 h-4 flex-1 rounded-full bg-zinc-500">
                                <div
                                  className="h-4 rounded-full bg-mediumBlue"
                                  style={{ width: `${(streak / 7) * 100}%` }} // Adjust based on the streak value
                                />
                              </div>
                            </div>
                          </div>
                        </DropdownMenuLabel>
                      </div>
                      <div className="flex w-full flex-col items-center justify-center rounded-lg bg-background p-3">
                        <div className="relative flex w-full items-center justify-center gap-3 rounded-xl border-2 border-zinc-700 p-2">
                          <div className="flex w-fit items-center justify-center p-1">
                            <Image
                              src="/lock.svg"
                              alt="lock"
                              width={64}
                              height={64}
                            />{" "}
                          </div>
                          <div className="w-full flex-grow">
                            <DropdownMenuLabel className="p-2 text-left text-base text-zinc-500 sm:text-base">
                              <Heading
                                className={cn(
                                  "text-left text-xl font-bold text-zinc-300/95 sm:text-2xl",
                                  DINRoundProBold.className,
                                )}
                              >
                                Streak Society
                              </Heading>
                            </DropdownMenuLabel>
                            <Heading
                              className={cn(
                                "w-full px-2 pb-2 text-left text-sm font-medium text-zinc-300/95 sm:text-sm",
                                DINRoundProBold.className,
                              )}
                            >
                              Reach a 7 day streak to join the Streak Society
                              and earn exclusive rewards.
                              <br /> streak!
                            </Heading>
                          </div>
                        </div>{" "}
                        <div className="flex w-full items-center justify-center py-2">
                          <DialogTrigger className="w-full">
                            <GameButton
                              className="mt-2 flex w-full items-center justify-center rounded-2xl py-2.5"
                              // onClick={() => router.push("/lesson")}
                              variant="blue"
                            >
                              <Heading
                                className={cn(
                                  "text-balance text-center text-sm font-bold text-zinc-900 sm:text-base",
                                  DINRoundProMedi.className,
                                )}
                              >
                                View More
                              </Heading>
                            </GameButton>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>
                                Are you absolutely sure?
                              </DialogTitle>
                              <DialogDescription>
                                This action cannot be undone. This will
                                permanently delete your account and remove your
                                data from our servers.
                              </DialogDescription>
                            </DialogHeader>
                          </DialogContent>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>

                <div
                  className="relative flex w-fit items-center justify-center gap-3 rounded-2xl px-4 py-2 hover:bg-zinc-500/20"
                  onMouseEnter={(e) => handleMouseEnter("heart", e)}
                  onMouseLeave={handleMouseLeave}
                >
                  <Image src="/heart.svg" alt="Heart" width={28} height={28} />
                  <Heading className="text-base text-rose-500 sm:text-base">
                    {heart}
                  </Heading>
                  {hoveredItem === "heart" && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute z-20 w-96 rounded-lg border-2 border-zinc-700 bg-background shadow-lg"
                      style={{ top: hoverCardPosition.gems?.top }}
                    >
                      <div className="flex w-full items-center justify-center space-x-2 rounded-lg bg-background p-3">
                        <div className="flex w-full flex-1 flex-grow flex-col">
                          <DropdownMenuLabel className="space-y-2 p-2 text-center text-base text-zinc-500 sm:text-base">
                            <Heading
                              className={cn(
                                "text-center text-xl font-bold text-zinc-300/95 sm:text-2xl",
                                DINRoundProBold.className,
                              )}
                            >
                              Hearts
                            </Heading>
                            <Heading
                              className={cn(
                                "mt-1 flex items-center justify-center text-center text-xl font-bold text-zinc-300/95 sm:text-2xl",
                                DINRoundProBold.className,
                              )}
                            >
                              <div className="grid grid-cols-5 place-items-center space-x-1">
                                {" "}
                                <Image
                                  src="/heart.svg"
                                  alt="Heart"
                                  width={28}
                                  height={28}
                                />
                                <Image
                                  src="/heart.svg"
                                  alt="Heart"
                                  width={28}
                                  height={28}
                                />
                                <Image
                                  src="/heart.svg"
                                  alt="Heart"
                                  width={28}
                                  height={28}
                                />
                                <Image
                                  src="/heart.svg"
                                  alt="Heart"
                                  width={28}
                                  height={28}
                                />
                                <Image
                                  src="/heart.svg"
                                  alt="Heart"
                                  width={28}
                                  height={28}
                                />
                              </div>
                            </Heading>
                            <Heading
                              className={cn(
                                "text-center text-lg font-bold text-zinc-300/95 sm:text-xl",
                                DINRoundProMedi.className,
                              )}
                            >
                              You have {heart} hearts
                            </Heading>
                            <Heading
                              className={cn(
                                "text-center text-base font-semibold text-zinc-300/75 sm:text-lg",
                                DINRoundProLight.className,
                              )}
                            >
                              Keep on learning
                            </Heading>
                          </DropdownMenuLabel>
                          <div className="flex w-full flex-col items-center justify-center gap-2">
                            <GameButton
                              className="mt-2 flex w-full items-center justify-center rounded-2xl py-2.5"
                              // onClick={() => router.push("/lesson")}
                              variant="transparent"
                            >
                              <div className="flex w-full items-center justify-between">
                                <div className="flex w-full items-center justify-start gap-2">
                                  {" "}
                                  <Image
                                    src="/heart.svg"
                                    alt="Heart"
                                    width={28}
                                    height={28}
                                  />
                                  <Heading
                                    className={cn(
                                      "text-balance text-center text-sm font-bold text-zinc-400 sm:text-base",
                                      DINRoundProMedi.className,
                                    )}
                                  >
                                    Unlimited Hearts
                                  </Heading>
                                </div>{" "}
                                <Heading
                                  className={cn(
                                    "text-balance text-center text-sm font-bold text-zinc-400 sm:text-base",
                                    DINRoundProMedi.className,
                                  )}
                                >
                                  Shop
                                </Heading>
                              </div>
                            </GameButton>
                            <GameButton
                              className="mt-2 flex w-full items-center justify-center rounded-2xl py-2.5"
                              // onClick={() => router.push("/lesson")}
                              variant="transparent"
                            >
                              <div className="flex w-full items-center justify-between">
                                <div className="flex w-full items-center justify-start gap-2">
                                  {" "}
                                  <Image
                                    src="/heart.svg"
                                    alt="Heart"
                                    width={28}
                                    height={28}
                                  />
                                  <Heading
                                    className={cn(
                                      "text-balance text-center text-sm font-bold text-zinc-400 sm:text-base",
                                      DINRoundProMedi.className,
                                    )}
                                  >
                                    Refill Hearts
                                  </Heading>
                                </div>{" "}
                                <Heading
                                  className={cn(
                                    "text-balance text-center text-sm font-bold text-zinc-400 sm:text-base",
                                    DINRoundProMedi.className,
                                  )}
                                >
                                  350
                                </Heading>
                              </div>
                            </GameButton>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
              <div className="hidden w-full max-w-xl grid-cols-4 gap-2">
                <div
                  className="group relative flex w-fit items-center justify-center gap-3 rounded-2xl px-4 py-2 hover:bg-zinc-500/20"
                  onMouseEnter={(e) => handleMouseEnter("india", e)}
                  onMouseLeave={handleMouseLeave}
                >
                  <Image src="/india.svg" alt="India" width={32} height={32} />
                  {hoveredItem === "india" && (
                    <>
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute z-20 min-w-52 rounded-lg border-2 border-zinc-700 bg-background p-2 shadow-lg"
                        style={{ top: hoverCardPosition.india?.top }}
                      >
                        <DropdownMenuLabel className="px-2 text-left text-base text-zinc-500 sm:text-base">
                          <Heading
                            className={cn(
                              "text-left text-base font-medium uppercase text-zinc-500 sm:text-base",
                              DINRoundProMedi.className,
                            )}
                          >
                            My Proficiency
                          </Heading>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator className="bg-zinc-700" />
                        <DropdownMenuLabel className="px-2 text-left text-base text-zinc-500 sm:text-base">
                          <Heading className="flex items-center justify-start gap-4 text-left text-base text-zinc-300 sm:text-base">
                            <Image
                              src="/india.svg"
                              alt="India"
                              width={32}
                              height={32}
                            />{" "}
                            <Heading className="text-base text-mediumBlue sm:text-base">
                              {onboarding.proficiency}
                            </Heading>
                          </Heading>
                        </DropdownMenuLabel>
                      </motion.div>
                    </>
                  )}
                </div>
                <div
                  className="relative flex w-fit items-center justify-center gap-3 rounded-2xl px-4 py-2 hover:bg-zinc-500/20"
                  onMouseEnter={(e) => handleMouseEnter("streak", e)}
                  onMouseLeave={handleMouseLeave}
                >
                  <FaFire className="h-6 w-6 text-zinc-600" />
                  <Heading className="text-base text-zinc-600 sm:text-base">
                    {streak}
                  </Heading>
                  {hoveredItem === "streak" && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-none absolute -left-[6.3rem] right-4 z-20 w-[25rem] rounded-lg border-2 border-zinc-700 shadow-lg"
                      style={{ top: hoverCardPosition.streak?.top }}
                    >
                      <div className="bg-zinc-600 p-3">
                        <div className="flex w-full items-center justify-center gap-3">
                          <div className="w-full">
                            <DropdownMenuLabel className="px-2 text-left text-base text-zinc-500 sm:text-base">
                              <Heading
                                className={cn(
                                  "text-left text-xl font-medium text-zinc-400/60 sm:text-2xl",
                                  DINRoundProBold.className,
                                )}
                              >
                                {streak} Day Streak
                              </Heading>
                            </DropdownMenuLabel>
                            <Heading
                              className={cn(
                                "w-full text-balance px-2 text-left text-base font-medium text-zinc-300/80 sm:text-base",
                                DINRoundProBold.className,
                              )}
                            >
                              Do a lesson today to start a new
                              <br /> streak!
                            </Heading>
                          </div>
                          <FaFire className="absolute right-4 top-6 size-24 text-zinc-600" />
                        </div>
                        <DropdownMenuLabel className="mt-6 px-2 text-left text-base text-zinc-500 sm:text-base">
                          <div className="flex w-full flex-col gap-2">
                            <div className="flex w-full items-center justify-between text-xs text-zinc-400">
                              <Heading
                                className={cn(
                                  "w-full text-balance px-2 text-left text-base font-medium text-zinc-300/80 sm:text-base",
                                  DINRoundProBold.className,
                                )}
                              >
                                S
                              </Heading>
                              <Heading
                                className={cn(
                                  "w-full text-balance px-2 text-left text-base font-medium text-zinc-300/80 sm:text-base",
                                  DINRoundProBold.className,
                                )}
                              >
                                M
                              </Heading>
                              <Heading
                                className={cn(
                                  "w-full text-balance px-2 text-left text-base font-medium text-zinc-300/80 sm:text-base",
                                  DINRoundProBold.className,
                                )}
                              >
                                T
                              </Heading>
                              <Heading
                                className={cn(
                                  "w-full text-balance px-2 text-left text-base font-medium text-zinc-300/80 sm:text-base",
                                  DINRoundProBold.className,
                                )}
                              >
                                W
                              </Heading>
                              <Heading
                                className={cn(
                                  "w-full text-balance px-2 text-left text-base font-medium text-zinc-300/80 sm:text-base",
                                  DINRoundProBold.className,
                                )}
                              >
                                T
                              </Heading>
                              <Heading
                                className={cn(
                                  "w-full text-balance px-2 text-left text-base font-medium text-zinc-300/80 sm:text-base",
                                  DINRoundProBold.className,
                                )}
                              >
                                F
                              </Heading>
                              <Heading
                                className={cn(
                                  "w-full text-balance px-2 text-left text-base font-medium text-zinc-300/80 sm:text-base",
                                  DINRoundProBold.className,
                                )}
                              >
                                S
                              </Heading>
                            </div>
                            <div className="relative flex w-full items-center gap-1">
                              <div className="mt-2 h-4 flex-1 rounded-full bg-zinc-500">
                                <div
                                  className="h-4 rounded-full bg-mediumBlue"
                                  style={{ width: `${(streak / 7) * 100}%` }} // Adjust based on the streak value
                                />
                              </div>
                            </div>
                          </div>
                        </DropdownMenuLabel>
                      </div>
                      <div className="flex w-full flex-col items-center justify-center rounded-lg bg-background p-3">
                        <div className="relative flex w-full items-center justify-center gap-3 rounded-xl border-2 border-zinc-700 p-2">
                          <div className="flex w-fit items-center justify-center p-1">
                            <Image
                              src="/lock.svg"
                              alt="lock"
                              width={64}
                              height={64}
                            />{" "}
                          </div>
                          <div className="w-full flex-grow">
                            <DropdownMenuLabel className="p-2 text-left text-base text-zinc-500 sm:text-base">
                              <Heading
                                className={cn(
                                  "text-left text-xl font-bold text-zinc-300/95 sm:text-2xl",
                                  DINRoundProBold.className,
                                )}
                              >
                                Streak Society
                              </Heading>
                            </DropdownMenuLabel>
                            <Heading
                              className={cn(
                                "w-full px-2 pb-2 text-left text-sm font-medium text-zinc-300/95 sm:text-sm",
                                DINRoundProBold.className,
                              )}
                            >
                              Reach a 7 day streak to join the Streak Society
                              and earn exclusive rewards.
                              <br /> streak!
                            </Heading>
                          </div>
                        </div>{" "}
                        <div className="flex w-full items-center justify-center py-2">
                          <DialogTrigger className="w-full">
                            <GameButton
                              className="mt-2 flex w-full items-center justify-center rounded-2xl py-2.5"
                              // onClick={() => router.push("/lesson")}
                              variant="blue"
                            >
                              <Heading
                                className={cn(
                                  "text-balance text-center text-sm font-bold text-zinc-900 sm:text-base",
                                  DINRoundProMedi.className,
                                )}
                              >
                                View More
                              </Heading>
                            </GameButton>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>
                                Are you absolutely sure?
                              </DialogTitle>
                              <DialogDescription>
                                This action cannot be undone. This will
                                permanently delete your account and remove your
                                data from our servers.
                              </DialogDescription>
                            </DialogHeader>
                          </DialogContent>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
                <div
                  className="relative flex w-fit items-center justify-center gap-3 rounded-2xl px-4 py-2 hover:bg-zinc-500/20"
                  onMouseEnter={(e) => handleMouseEnter("gems", e)}
                  onMouseLeave={handleMouseLeave}
                >
                  <Image src="/gems.svg" alt="Gems" width={32} height={32} />
                  <Heading className="text-base text-zinc-600 sm:text-base">
                    {gems}
                  </Heading>
                  {hoveredItem === "gems" && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute z-20 w-96 rounded-lg border-2 border-zinc-700 bg-background shadow-lg"
                      style={{ top: hoverCardPosition.gems?.top }}
                    >
                      <div className="flex w-full items-center justify-center space-x-2 rounded-lg bg-background p-3">
                        <div className="flex w-fit items-center justify-center p-1">
                          <Image
                            src="/treasure-chest.svg"
                            alt="treasure-chest"
                            width={96}
                            height={96}
                          />{" "}
                        </div>
                        <div className="flex w-full flex-1 flex-grow flex-col">
                          <DropdownMenuLabel className="p-2 text-left text-base text-zinc-500 sm:text-base">
                            <Heading
                              className={cn(
                                "text-left text-xl font-bold text-zinc-300/95 sm:text-2xl",
                                DINRoundProBold.className,
                              )}
                            >
                              Gems
                            </Heading>
                          </DropdownMenuLabel>
                          <Heading
                            className={cn(
                              "w-full px-2 pb-2 text-left text-base font-medium text-zinc-300/95 sm:text-lg",
                              DINRoundProBold.className,
                            )}
                          >
                            You have {gems} gems
                          </Heading>
                          <Heading
                            className={cn(
                              "w-full cursor-pointer px-2 pb-2 text-left text-base font-medium uppercase text-mediumBlue/95 sm:text-base",
                              DINRoundProBold.className,
                            )}
                          >
                            Go to shop
                          </Heading>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
                <div
                  className="relative flex w-fit items-center justify-center gap-3 rounded-2xl px-4 py-2 hover:bg-zinc-500/20"
                  onMouseEnter={(e) => handleMouseEnter("heart", e)}
                  onMouseLeave={handleMouseLeave}
                >
                  <Image src="/heart.svg" alt="Heart" width={28} height={28} />
                  <Heading className="text-base text-rose-500 sm:text-base">
                    {heart}
                  </Heading>
                  {hoveredItem === "heart" && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute z-20 w-96 rounded-lg border-2 border-zinc-700 bg-background shadow-lg"
                      style={{ top: hoverCardPosition.gems?.top }}
                    >
                      <div className="flex w-full items-center justify-center space-x-2 rounded-lg bg-background p-3">
                        <div className="flex w-full flex-1 flex-grow flex-col">
                          <DropdownMenuLabel className="space-y-2 p-2 text-center text-base text-zinc-500 sm:text-base">
                            <Heading
                              className={cn(
                                "text-center text-xl font-bold text-zinc-300/95 sm:text-2xl",
                                DINRoundProBold.className,
                              )}
                            >
                              Hearts
                            </Heading>
                            <Heading
                              className={cn(
                                "mt-1 flex items-center justify-center text-center text-xl font-bold text-zinc-300/95 sm:text-2xl",
                                DINRoundProBold.className,
                              )}
                            >
                              <div className="grid grid-cols-5 place-items-center space-x-1">
                                {" "}
                                <Image
                                  src="/heart.svg"
                                  alt="Heart"
                                  width={28}
                                  height={28}
                                />
                                <Image
                                  src="/heart.svg"
                                  alt="Heart"
                                  width={28}
                                  height={28}
                                />
                                <Image
                                  src="/heart.svg"
                                  alt="Heart"
                                  width={28}
                                  height={28}
                                />
                                <Image
                                  src="/heart.svg"
                                  alt="Heart"
                                  width={28}
                                  height={28}
                                />
                                <Image
                                  src="/heart.svg"
                                  alt="Heart"
                                  width={28}
                                  height={28}
                                />
                              </div>
                            </Heading>
                            <Heading
                              className={cn(
                                "text-center text-lg font-bold text-zinc-300/95 sm:text-xl",
                                DINRoundProMedi.className,
                              )}
                            >
                              You have {heart} hearts
                            </Heading>
                            <Heading
                              className={cn(
                                "text-center text-base font-semibold text-zinc-300/75 sm:text-lg",
                                DINRoundProLight.className,
                              )}
                            >
                              Keep on learning
                            </Heading>
                          </DropdownMenuLabel>
                          <div className="flex w-full flex-col items-center justify-center gap-2">
                            <GameButton
                              className="mt-2 flex w-full items-center justify-center rounded-2xl py-2.5"
                              // onClick={() => router.push("/lesson")}
                              variant="transparent"
                            >
                              <div className="flex w-full items-center justify-between">
                                <div className="flex w-full items-center justify-start gap-2">
                                  {" "}
                                  <Image
                                    src="/heart.svg"
                                    alt="Heart"
                                    width={28}
                                    height={28}
                                  />
                                  <Heading
                                    className={cn(
                                      "text-balance text-center text-sm font-bold text-zinc-400 sm:text-base",
                                      DINRoundProMedi.className,
                                    )}
                                  >
                                    Unlimited Hearts
                                  </Heading>
                                </div>{" "}
                                <Heading
                                  className={cn(
                                    "text-balance text-center text-sm font-bold text-zinc-400 sm:text-base",
                                    DINRoundProMedi.className,
                                  )}
                                >
                                  Shop
                                </Heading>
                              </div>
                            </GameButton>
                            <GameButton
                              className="mt-2 flex w-full items-center justify-center rounded-2xl py-2.5"
                              // onClick={() => router.push("/lesson")}
                              variant="transparent"
                            >
                              <div className="flex w-full items-center justify-between">
                                <div className="flex w-full items-center justify-start gap-2">
                                  {" "}
                                  <Image
                                    src="/heart.svg"
                                    alt="Heart"
                                    width={28}
                                    height={28}
                                  />
                                  <Heading
                                    className={cn(
                                      "text-balance text-center text-sm font-bold text-zinc-400 sm:text-base",
                                      DINRoundProMedi.className,
                                    )}
                                  >
                                    Refill Hearts
                                  </Heading>
                                </div>{" "}
                                <Heading
                                  className={cn(
                                    "text-balance text-center text-sm font-bold text-zinc-400 sm:text-base",
                                    DINRoundProMedi.className,
                                  )}
                                >
                                  350
                                </Heading>
                              </div>
                            </GameButton>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>

              <div className="mt-4 w-full">
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="w-full overflow-visible rounded-2xl border-2 border-zinc-700 bg-background shadow-lg sm:w-96"
                  style={{ top: hoverCardPosition.gems?.top }}
                >
                  <div className="flex w-full flex-col items-start justify-start space-x-2 rounded-2xl bg-background p-3">
                    <DropdownMenuLabel className="w-full p-2 text-left text-base text-zinc-500 sm:text-base">
                      <Heading
                        className={cn(
                          "text-left text-lg font-bold text-zinc-300/95 sm:text-lg",
                          DINRoundProBold.className,
                        )}
                      >
                        Create a profile to save your progress!
                      </Heading>
                    </DropdownMenuLabel>
                  </div>
                  <div className="mx-auto flex w-full flex-col items-center justify-center space-y-2 px-3 pb-5">
                    <GameButton
                      className="mt-2 flex w-full items-center justify-center rounded-2xl py-2.5"
                      onClick={() => router.push("/login")}
                      variant="blue"
                    >
                      <Heading
                        className={cn(
                          "text-balance text-center text-sm font-bold text-zinc-900 sm:text-base",
                          DINRoundProMedi.className,
                        )}
                      >
                        Create a Profile
                      </Heading>
                    </GameButton>{" "}
                    {data?.user && status === "authenticated" ? (
                      <GameButton
                        className="mt-2 flex w-full items-center justify-center rounded-2xl py-2.5"
                        onClick={() => signOut({ callbackUrl: "/learn" })}
                        variant="white"
                      >
                        <Heading
                          className={cn(
                            "text-balance text-center text-sm font-bold text-zinc-900 sm:text-base",
                            DINRoundProMedi.className,
                          )}
                        >
                          Sign Out
                        </Heading>
                      </GameButton>
                    ) : (
                      <GameButton
                        className="mt-2 flex w-full items-center justify-center rounded-2xl py-2.5"
                        onClick={() => router.push("/login")}
                        variant="white"
                      >
                        <Heading
                          className={cn(
                            "text-balance text-center text-sm font-bold text-zinc-900 sm:text-base",
                            DINRoundProMedi.className,
                          )}
                        >
                          Sign In
                        </Heading>
                      </GameButton>
                    )}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default Learn;

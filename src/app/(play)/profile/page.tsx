"use client";

import GameButton from "@/components/Button/GameButton";
import Heading from "@/components/Heading";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  DINRoundProBold,
  DINRoundProLight,
  DINRoundProMedi,
} from "@/config/font";
import { useGems } from "@/hooks/useGems";
import { useHeart } from "@/hooks/useHeart";
import { useOnboarding } from "@/hooks/useOnboarding";
import { cn } from "@/lib/utils";
import { trpc } from "@/trpc/client";
import { motion } from "framer-motion";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaFire } from "react-icons/fa6";
import { RiUser3Fill } from "react-icons/ri";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";

const Profile = () => {
  const router = useRouter();
  const [isStartClicked, setIsStartClicked] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [hoverCardPosition, setHoverCardPosition] = useState<{
    [key: string]: { top: string };
  }>({});
  const [streak, setStreak] = useState(0);
  const { heart } = useHeart();
  const { gems } = useGems();

  const { data, status } = useSession();

  const { onboarding } = useOnboarding();

  const handleGameButton = () => {
    setIsStartClicked(!isStartClicked);
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

  const { data: user, isLoading, isInitialLoading } = trpc.getUser.useQuery();

  return (
    <div className="min-h-screen w-full overflow-y-scroll bg-background p-4 sm:p-6 md:p-8 lg:p-10">
      <Dialog>
        <div className="mx-auto h-screen w-full max-w-6xl overflow-y-scroll">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
            <div className="mt-2 flex flex-col space-y-6">
              <div className="relative mx-auto flex w-full rounded-xl bg-[url('/magicpattern-mesh-gradient-1724770105236.png')] bg-cover bg-center bg-no-repeat p-16 sm:p-24">
                <div className="absolute inset-1.5 flex flex-col gap-1 rounded-xl border-2 border-dashed border-zinc-300/30 p-2">
                  {/* <RiUser3Fill className="absolute -bottom-2 left-1/2 size-28 -translate-x-1/2 translate-y-[0.5px] transform text-mediumBlue sm:size-44 sm:translate-y-[6px]" /> */}
                </div>
              </div>

              <div className="flex flex-col items-start justify-start space-y-0 px-2">
                <Heading
                  className={cn(
                    "text-left text-xl font-medium capitalize text-zinc-200 sm:text-2xl",
                    DINRoundProBold.className,
                  )}
                >
                  {isLoading || isInitialLoading ? (
                    <Skeleton className="mb-1 h-5 w-44 bg-mediumBlue/5" />
                  ) : (
                    data?.user?.name
                  )}
                </Heading>
                <Heading
                  className={cn(
                    "text-left text-base font-light text-zinc-500 sm:text-xl",
                    DINRoundProMedi.className,
                  )}
                >
                  {isLoading || isInitialLoading ? (
                    <Skeleton className="my-1 h-5 w-44 bg-mediumBlue/5" />
                  ) : (
                    data?.user?.name
                      ?.replaceAll(" ", "")
                      .slice(0, 6)
                      .toLowerCase()
                  )}
                </Heading>{" "}
                <Heading
                  className={cn(
                    "flex items-end justify-center gap-2 pt-1 text-left text-base font-medium capitalize text-zinc-300 sm:text-lg",
                    DINRoundProMedi.className,
                  )}
                >
                  Joined{" "}
                  {isLoading || isInitialLoading ? (
                    <Skeleton className="h-5 w-[7.5rem] bg-mediumBlue/5" />
                  ) : (
                    user?.user?.createdAt &&
                    format(new Date(user.user.createdAt), "MMMM yyyy")
                  )}
                </Heading>
              </div>
            </div>
            <div className="flex w-full flex-col items-center justify-center space-y-4 sm:ml-2 sm:w-96">
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
                                from our servers.
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
                  className="w-full overflow-auto rounded-2xl border-2 border-zinc-700 bg-background shadow-lg sm:w-96"
                  style={{ top: hoverCardPosition.gems?.top }}
                >
                  <div className="flex w-full flex-col items-start justify-start space-x-2 space-y-2 bg-background p-3">
                    <DropdownMenuLabel className="p-2 text-left text-base text-zinc-500 sm:text-base">
                      <Heading
                        className={cn(
                          "text-left text-xl font-bold text-zinc-300/95 sm:text-2xl",
                          DINRoundProBold.className,
                        )}
                      >
                        Unlock Leaderboards!
                      </Heading>
                    </DropdownMenuLabel>
                    <div className="flex w-full items-center justify-center">
                      <div className="mr-2 flex w-fit items-center justify-center">
                        <Image
                          src="/shield.svg"
                          alt="shield"
                          width={64}
                          height={64}
                        />{" "}
                      </div>
                      <div className="ml-4 flex w-full flex-1 flex-grow flex-col">
                        <Heading
                          className={cn(
                            "w-full px-2 pb-2 text-left text-base font-medium text-zinc-300/95 sm:text-lg",
                            DINRoundProBold.className,
                          )}
                        >
                          Complete 10 more lessons to start competing
                        </Heading>
                      </div>
                    </div>
                  </div>
                </motion.div>
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

export default Profile;

"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import AppLogo from "./AppLogo";
import { SideBarName } from "@/type";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { cn } from "@/lib/utils";
import Heading from "./Heading";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { getServerSession } from "next-auth";
import { getSession } from "@/app/api/getSession";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

const MORE = [
  {
    title: "Create a Profile",
    href: "/settings/account?isLoggingIn=true",
  },
  {
    title: "Settings",
    href: "/settings/account",
  },
  {
    title: "Help",
    href: "/help",
  },
  {
    title: "Logout",
    href: "/logout",
  },
];

const SideBarNav = () => {
  const { data, status } = useSession();
  const router = useRouter();
  const param = useSearchParams();

  const [modalOpen, setModalOpen] = useState(false);

  const handleProfileClick = () => {
    if (!data?.user) {
      setModalOpen(true);
      // router.push(`/learn?isLoggingIn=${modalOpen}`);
    } else {
      handleSectionChange(SideBarName.PROFILE);
    }
  };

  const SIDE_NAV_LINKS = [
    {
      name: SideBarName.LEARN,
      icon: () => (
        <div className="rounded-full p-1.5">
          <Image src="/home.svg" alt="home" width={32} height={32} />{" "}
        </div>
      ),
      href: "/learn",
    },
    {
      name: SideBarName.LEADERBOARD,
      icon: () => (
        <div className="rounded-full p-1.5">
          <Image src="/rank.svg" alt="rank" width={32} height={32} />{" "}
        </div>
      ),
      href: "/leaderboard",
    },
    {
      name: SideBarName.QUESTS,
      icon: () => (
        <div className="rounded-full p-1.5">
          <Image src="/book.svg" alt="quest" width={32} height={32} />
        </div>
      ),
      href: "/quests",
    },
    {
      name: SideBarName.PROFILE,
      icon: () =>
        data?.user ? (
          <div className="rounded-full border border-dashed border-zinc-500 p-[2.5px] sm:border-2 sm:p-1">
            <Image
              src={data.user.image?.toString() as string}
              alt={data.user.name as string}
              width={30}
              height={30}
              className="rounded-full"
            />
          </div>
        ) : (
          <div className="rounded-full p-1.5">
            <Image src="/avatar.svg" alt="avatar" width={32} height={32} />
          </div>
        ),
      href: data?.user ? "/profile" : `/learn?isLoggingIn=true`,
      onClick: handleProfileClick,
    },
  ];

  const [selectedSection, setSelectedSection] = useState<SideBarName>(
    SideBarName.LEARN,
  );

  const handleSectionChange = (section: SideBarName) => {
    setSelectedSection(section);
  };

  return (
    <>
      {/* Desktop */}
      <div className="hidden border-r-2 border-zinc-500/40 bg-background lg:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center px-4 lg:h-[60px] lg:px-6">
            <Link
              href="/"
              className="mt-4 flex items-center gap-2 font-semibold"
            >
              <AppLogo className="text-neutral-50" />
            </Link>
          </div>
          <div className="flex-1">
            <nav className="mt-4 grid items-start space-y-2 px-2 text-sm font-medium lg:px-4">
              {SIDE_NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-3 rounded-xl px-4 py-[0.375rem] transition-all ${
                    selectedSection === link.name
                      ? "border-2 border-mediumBlue bg-[#a79980]/20 text-[#a79980]"
                      : "border-2 border-transparent text-muted-foreground hover:bg-zinc-500/20"
                  }`}
                  onClick={() => handleSectionChange(link.name)}
                >
                  <link.icon />
                  <span
                    className={`text-base font-medium uppercase tracking-wide ${
                      selectedSection === link.name
                        ? "font-semibold text-[#a79980]"
                        : "text-zinc-300"
                    }`}
                  >
                    {link.name}
                  </span>
                </Link>
              ))}
              <Tooltip>
                <TooltipTrigger className="w-full">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button
                        className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 transition-all ${
                          selectedSection === SideBarName.MORE
                            ? "border-2 border-blue-500/55 bg-blue-400/20 text-primary"
                            : "border-2 border-transparent text-muted-foreground hover:bg-zinc-500/20"
                        }`}
                        onClick={() => handleSectionChange(SideBarName.MORE)}
                      >
                        <div className="rounded-full px-0 py-1.5">
                          <Image
                            src="/more.svg"
                            alt="More"
                            width={36}
                            height={36}
                          />{" "}
                        </div>
                        <span
                          className={`pl-1.5 text-base font-medium uppercase tracking-wide ${
                            selectedSection === SideBarName.MORE
                              ? "font-semibold text-[#60a5fa]"
                              : "text-zinc-300"
                          }`}
                        >
                          More
                        </span>
                      </button>
                    </DropdownMenuTrigger>
                  </DropdownMenu>
                </TooltipTrigger>
                <TooltipContent
                  side="right"
                  className="rounded-lg border-2 border-zinc-700 bg-background"
                >
                  <div className="flex w-full min-w-48 flex-col">
                    <DropdownMenuLabel className="px-4 text-left text-base text-zinc-300 sm:text-base">
                      Panel Position
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-zinc-700" />
                    {MORE.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="w-full p-2 px-4 hover:bg-zinc-600/50"
                      >
                        <Heading className="text-left text-base text-zinc-300 sm:text-base">
                          {item.title}
                        </Heading>
                      </Link>
                    ))}
                  </div>
                </TooltipContent>
              </Tooltip>
            </nav>
          </div>
        </div>
      </div>

      {/* Mobile */}
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t-[1.8px] border-zinc-500 bg-background p-4 lg:hidden">
        <nav className="grid grid-cols-5 place-items-center items-center justify-between">
          {SIDE_NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center justify-center rounded-xl p-1 ${
                selectedSection === link.name
                  ? "bg-blue-400/20 text-primary"
                  : "text-muted-foreground hover:bg-zinc-500/20"
              }`}
              onClick={() => handleSectionChange(link.name)}
            >
              <link.icon />
            </Link>
          ))}
          <Tooltip>
            <TooltipTrigger>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    className={`flex items-center justify-center rounded-xl p-1 ${
                      selectedSection === "More"
                        ? "bg-blue-400/20 text-primary"
                        : "text-muted-foreground hover:bg-zinc-500/20"
                    }`}
                    onClick={() => handleSectionChange(SideBarName.MORE)}
                  >
                    <Image src="/more.svg" alt="More" width={32} height={32} />
                  </button>
                </DropdownMenuTrigger>
              </DropdownMenu>
            </TooltipTrigger>
            <TooltipContent
              side="top"
              className="rounded-lg border-2 border-zinc-700 bg-background"
            >
              <div className="flex w-full min-w-48 flex-col">
                <DropdownMenuLabel className="px-4 text-left text-sm text-zinc-300">
                  More Options
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-zinc-700" />
                {MORE.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="w-full p-2 px-4 hover:bg-zinc-600/50"
                  >
                    <Heading className="text-left text-sm text-zinc-300">
                      {item.title}
                    </Heading>
                  </Link>
                ))}
              </div>
            </TooltipContent>
          </Tooltip>
        </nav>
      </div>
    </>
  );
};

export default SideBarNav;

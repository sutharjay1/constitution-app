"use client";

import { Button } from "./ui/button";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { PRODUCT_CATEGORIES } from "@/config";

type Category = (typeof PRODUCT_CATEGORIES)[number];

interface NavItemProps {
  category: Category;
  handleOpen: () => void;
  isOpen: boolean;
  isAnyOpen: boolean;
  row?: boolean;
}

const NavItem = ({
  category,
  handleOpen,
  isOpen,
  isAnyOpen,
  row,
}: NavItemProps) => {
  return (
    <div className={cn("flex gap-4", { "flex-col": row })}>
      <div className="relative flex items-center">
        <Button
          className="gap-1.5"
          onClick={handleOpen}
          variant={isOpen ? "secondary" : "ghost"}
        >
          {category.label}
          <ChevronDown
            className={cn("h-4 w-4 text-muted-foreground transition-all", {
              "-rotate-180": isOpen,
            })}
          />
        </Button>
      </div>

      {isOpen ? (
        <div
          onClick={() => close()}
          className={cn(
            "absolute inset-x-0 top-full text-sm text-muted-foreground",
            {
              "animate-in fade-in-10 slide-in-from-top-5": !isAnyOpen,
            },
          )}
        >
          <div
            className="light:bg-zinc-50 absolute inset-0 top-1/2 shadow"
            aria-hidden="true"
          />

          <div className="dark:borde-y-[1px] relative flex w-full flex-col border-zinc-900 bg-zinc-50 shadow-xl shadow-zinc-900/5 dark:border-zinc-100 dark:bg-transparent dark:shadow-black/5 dark:backdrop-blur-2xl lg:block lg:flex-row">
            <div className="mx-auto max-w-7xl px-8">
              <div className="grid grid-cols-4 gap-x-8 gap-y-10 py-16">
                <div className="col-span-4 col-start-1 grid grid-cols-3 gap-x-8">
                  {category.featured.map((item) => (
                    <div
                      onClick={() => close}
                      key={item.name}
                      className="group relative text-base sm:text-sm"
                    >
                      <div className="relative aspect-video overflow-hidden rounded-lg bg-zinc-100 group-hover:opacity-75">
                        <Image
                          src={item.imageSrc}
                          alt="product category image"
                          fill
                          className="object-cover object-center"
                          draggable="false"
                          priority
                        />
                      </div>

                      <Link
                        href={item.href}
                        className="mt-6 block font-medium text-zinc-900 dark:text-zinc-100"
                      >
                        {item.name}
                      </Link>
                      <p className="mt-1" aria-hidden="true">
                        Shop now
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default NavItem;

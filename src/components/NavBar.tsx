"use client";

import Link from "next/link";
import { Button, buttonVariants } from "./ui/button";
import MaxWidthWrapper from "./MaxWidthWrapper";
import NavItems from "./NavItems";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Menu } from "lucide-react";
import { useEffect, useState } from "react";
import MobileNav from "./MobileNav";
import { BiChevronDown } from "react-icons/bi";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
} from "@radix-ui/react-navigation-menu";
import { HiMiniArrowLongRight } from "react-icons/hi2";
import AppLogo from "./AppLogo";
import { usePathname, useRouter } from "next/navigation";

interface NavLinkProps {
  href: string;
  title: string;
  submenu?: { title: string; path: string }[];
}

const NAV_LINKS: NavLinkProps[] = [
  {
    href: "/",
    title: "Home",
  },
  {
    href: "/products",
    title: "Products",
  },
  {
    href: "/about",
    title: "About",
    submenu: [
      {
        title: "Team",
        path: "/about/team",
      },
      {
        title: "Careers",
        path: "/about/careers",
      },
    ],
  },
  {
    href: "/contact",
    title: "Contact",
  },
];

const Navbar = () => {
  //   const nextCookies = cookies();

  const user = false;
  const session = { status: "unauthenticated" };

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentHash, setCurrentHash] = useState<string>("");
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleNavLinkClick = (link: NavLinkProps) => {
    setCurrentHash(link.href.split("#")[1]);
    setMobileMenuOpen(false);

    if (link.submenu) {
      setExpandedMenu(expandedMenu === link.title ? null : (link.title as any));
    } else {
      setIsOpen(false);
      setExpandedMenu(null);
    }
  };

  const pathname = usePathname();
  const router = useRouter();

  //   const session = useSession();

  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    setIsOpen(false);
    setExpandedMenu(null);
  }, [pathname]);

  const handleMenuClick = (link: NavLinkProps) => {
    if (link.submenu) {
      setExpandedMenu(expandedMenu === link.title ? null : (link.title as any));
    } else {
      setIsOpen(false);
      setExpandedMenu(null);
    }
  };

  return (
    <div className="sticky inset-x-0 top-0 z-50 h-16 border-b border-zinc-200 bg-zinc-50 backdrop-blur-lg transition-all dark:border-zinc-800 dark:bg-black/75">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <header className="relative">
          <MaxWidthWrapper className="h-full">
            <div className="flex h-16 items-center">
              <div className="ml-2 flex lg:ml-0">
                <Link href="/">
                  <AppLogo />
                </Link>
              </div>

              <div className="z-50 hidden lg:ml-8 lg:block lg:self-stretch">
                <NavItems />
              </div>

              <div className="ml-auto flex items-center">
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  {user ? null : (
                    <Link
                      href="/welcome"
                      className={buttonVariants({
                        variant: "ghost",
                      })}
                    >
                      Sign in
                    </Link>
                  )}

                  <div className="ml-4 flow-root lg:ml-6">{/* <Cart /> */}</div>
                </div>
                <div className="ml-4 mr-2 flow-root lg:ml-6">
                  {/* <ModeToggle /> */}
                </div>
              </div>
              <div className="flex lg:hidden">
                <SheetTrigger asChild className="lg:hidden">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="relative float-right flex cursor-pointer select-none p-2 text-2xl [-ms-user-select:none] [-webkit-tap-highlight-color:rgba(0,0,0,0)] [-webkit-user-select:none] [tap-highlight-color:rgba(0,0,0,0)] lg:hidden"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label="menu"
                  >
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
              </div>

              <SheetContent
                side="left"
                //   close={handleMenu}
                className="h-full w-full p-3 pt-8"
              >
                <SheetHeader>
                  <SheetTitle>
                    {" "}
                    <Link href={"/"} onClick={() => setIsOpen(false)}>
                      <AppLogo />
                    </Link>
                  </SheetTitle>
                </SheetHeader>

                <div
                  className="fixed inset-0 top-16 z-50 mt-2 flex w-full flex-col items-center justify-start bg-opacity-95 md:top-20 lg:hidden lg:backdrop-blur-xl"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <div className="flex w-full flex-col gap-8 px-3 py-5">
                    <NavigationMenu className="grid w-full place-items-center">
                      <NavigationMenuList className="mt-6 w-full flex-1 gap-y-4 pt-4">
                        <NavItems row={true} />
                      </NavigationMenuList>
                    </NavigationMenu>

                    {session.status === "authenticated" ? (
                      <Button
                        className="group flex h-10 w-full items-center justify-center gap-1.5 rounded-lg border border-green-900 bg-gradient-to-br from-green-900 to-blue-900 dark:border-green-900 dark:from-green-950 dark:to-blue-950 sm:h-8 sm:w-36"
                        // onClick={() => signOut({ callbackUrl: "/" })}
                      >
                        <span className="text-zinc-200 dark:text-zinc-300">
                          Log out
                        </span>
                        <HiMiniArrowLongRight className="h-5 w-5 text-zinc-200 transition-all group-hover:translate-x-1 dark:text-zinc-300" />
                      </Button>
                    ) : (
                      <Button
                        className="group flex h-10 w-full items-center justify-center gap-1.5 rounded-lg border border-green-900 bg-gradient-to-br from-green-900 to-blue-900 dark:border-green-900 dark:from-green-950 dark:to-blue-950 sm:h-8 sm:w-36"
                        // onClick={handleLogin}
                      >
                        <span className="text-zinc-200 dark:text-zinc-300">
                          Sign in
                        </span>
                        <HiMiniArrowLongRight className="h-5 w-5 text-zinc-200 transition-all group-hover:translate-x-1 dark:text-zinc-300" />
                      </Button>
                    )}
                  </div>
                </div>
                {/* )} */}
              </SheetContent>
            </div>
          </MaxWidthWrapper>
        </header>
      </Sheet>
    </div>
  );
};

export default Navbar;

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
    <div className="sticky z-50 top-0 inset-x-0 h-16 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-black/75  backdrop-blur-lg transition-all">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <header className="relative ">
          <MaxWidthWrapper className="h-full">
            <div className="flex h-16 items-center">
              <div className="ml-2   flex lg:ml-0">
                <Link href="/">
              <AppLogo />
                </Link>
              </div>

              <div className="hidden z-50 lg:ml-8 lg:block lg:self-stretch">
                <NavItems />
              </div>

              <div className="ml-auto flex items-center">
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  {user ? null : (
                    <Link
                      href="/sign-in"
                      className={buttonVariants({
                        variant: "ghost",
                      })}
                    >
                      Sign in
                    </Link>
                  )}

                  {user ? null : (
                    <span className="h-6 w-px bg-zinc-200" aria-hidden="true" />
                  )}

                  {user ? null : ( //   <UserAccountNav user={user} />
                    <Link
                      href="/sign-up"
                      className={buttonVariants({
                        variant: "ghost",
                      })}
                    >
                      Create account
                    </Link>
                  )}

                  {user ? (
                    <span className="h-6 w-px bg-zinc-200" aria-hidden="true" />
                  ) : null}

                  {user ? null : (
                    <div className="flex lg:ml-6">
                      <span
                        className="h-6 w-px bg-zinc-200"
                        aria-hidden="true"
                      />
                    </div>
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
                    className="float-right flex lg:hidden cursor-pointer [-webkit-tap-highlight-color:rgba(0,0,0,0)] [tap-highlight-color:rgba(0,0,0,0)] [-webkit-user-select:none] [-ms-user-select:none] select-none text-2xl relative p-2"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label="menu"
                  >
                    <Menu className="w-6 h-6" />
                  </Button>
                </SheetTrigger>
              </div>

              <SheetContent
                side="left"
                //   close={handleMenu}
                className="  w-full h-full p-3 pt-8"
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
                  className="fixed inset-0 z-50 top-16 md:top-20   mt-2 w-full flex flex-col lg:backdrop-blur-xl justify-start items-center  bg-opacity-95 lg:hidden"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <div className="w-full flex flex-col gap-8 px-3 py-5">
                    <NavigationMenu className="w-full grid place-items-center">
                      <NavigationMenuList className="w-full flex-1 mt-6  gap-y-4 pt-4">
                        <NavItems row={true} />
                      </NavigationMenuList>
                    </NavigationMenu>

                    {session.status === "authenticated" ? (
                      <Button
                        className="group h-10 sm:h-8 w-full sm:w-36 bg-gradient-to-br from-green-900 dark:from-green-950 to-blue-900 dark:to-blue-950 border border-green-900 dark:border-green-900 rounded-lg flex items-center justify-center gap-1.5"
                        // onClick={() => signOut({ callbackUrl: "/" })}
                      >
                        <span className="text-zinc-200 dark:text-zinc-300">
                          Log out
                        </span>
                        <HiMiniArrowLongRight className="w-5 h-5 text-zinc-200 dark:text-zinc-300 group-hover:translate-x-1 transition-all" />
                      </Button>
                    ) : (
                      <Button
                        className="group h-10 sm:h-8 w-full sm:w-36 bg-gradient-to-br from-green-900 dark:from-green-950 to-blue-900 dark:to-blue-950 border border-green-900 dark:border-green-900 rounded-lg flex items-center justify-center gap-1.5"
                        // onClick={handleLogin}
                      >
                        <span className="text-zinc-200 dark:text-zinc-300">
                          Sign in
                        </span>
                        <HiMiniArrowLongRight className="w-5 h-5 text-zinc-200 dark:text-zinc-300 group-hover:translate-x-1 transition-all" />
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

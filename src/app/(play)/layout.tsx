"use client";
import Login from "@/components/Login";
import SideBarNav from "@/components/SideBarNav";
import { DINRoundProMedi } from "@/config/font";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Diplomata } from "next/font/google";
import { useSearchParams } from "next/navigation";

const inter = Diplomata({ weight: "400", subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const param = useSearchParams();

  return (
    <div
      className={cn(
        "min-h-screen scroll-smooth bg-background font-sans antialiased",
        DINRoundProMedi.className,
      )}
    >
      {param.get("isLoggingIn") === "true" ? (
        <Login />
      ) : (
        <div className="lg::grid-cols-[220px_1fr] grid min-h-screen w-full bg-background lg:grid-cols-[280px_1fr]">
          <SideBarNav />
          {children}
        </div>
      )}
    </div>
  );
}

"use client";

import GameButton from "@/components/Button/GameButton";
import Heading from "@/components/Heading";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { DINRoundProMedi } from "@/config/font";
import { cn } from "@/lib/utils";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { toast } from "sonner";

const AuthPage = () => {
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleGoogleLogin = () => {
    setIsLoggingIn(true);

    signIn("google", { callbackUrl: "/auth-callback" })
      .then((data) => {
        setIsLoggingIn(false);
        console.log(`data`, data);
      })
      .catch((error: Error) => {
        toast(error.message, {
          style: {
            color: "red",
          },
        });
        setIsLoggingIn(false);
      });

    console.log(`setting user setUser`);
  };

  return (
    <>
      <MaxWidthWrapper className="flex h-screen flex-col items-center justify-center">
        <div className="flex w-full flex-col items-center justify-center">
          <GameButton
            onClick={handleGoogleLogin}
            divClassName="w-full flex items-center justify-center"
            variant={"blue"}
            className="flex w-full items-center justify-center py-3 sm:w-64"
          >
            <Heading
              className={cn(
                "text-balance text-center text-sm font-bold uppercase text-zinc-900 sm:text-base",
                DINRoundProMedi.className,
              )}
            >
              Continue with Google
            </Heading>
          </GameButton>
        </div>
      </MaxWidthWrapper>
    </>
  );
};

export default AuthPage;

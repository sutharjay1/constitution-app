import {
  DINRoundProBlack,
  DINRoundProBold,
  DINRoundProMedi,
} from "@/config/font";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";
import Heading from "./Heading";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import GameButton from "./Button/GameButton";

const Login = () => {
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleGoogleLogin = () => {
    setIsLoggingIn(true);

    console.log(`isLoggingIn`, isLoggingIn);

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
        <Card className="relative z-30 mx-1.5 mt-12 w-full overflow-hidden rounded-2xl border-none bg-transparent font-medium text-zinc-50 outline-none">
          {" "}
          <CardHeader className="z-20 space-y-1 pt-8">
            <CardTitle
              className={cn(
                DINRoundProBold.className,
                "text-center text-3xl font-medium tracking-normal text-zinc-50 md:text-3xl",
              )}
            >
              Log in
            </CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-10 sm:px-8">
            <span className="mx-auto flex max-w-sm items-center py-6">
              <span className="h-px flex-1 bg-zinc-700"></span>
              <span className="shrink-0 px-2">
                <span
                  className={cn(
                    DINRoundProBlack.className,
                    "relative z-10 text-xl text-zinc-700 sm:text-2xl",
                  )}
                >
                  OR
                </span>
              </span>
              <span className="h-px flex-1 bg-zinc-700"></span>
            </span>

            <GameButton
              onClick={handleGoogleLogin}
              divClassName="w-full flex items-center justify-center"
              variant="transparent"
              className="flex w-full items-center justify-center py-3 sm:w-72"
            >
              <Heading
                className={cn(
                  "flex items-center justify-center gap-2 text-balance text-center text-sm font-bold uppercase text-mediumBlue sm:text-base",
                  DINRoundProMedi.className,
                )}
              >
                <FcGoogle className="mr-2 h-4 w-4" size={36} />
                Continue with Google
              </Heading>
            </GameButton>
          </CardContent>
        </Card>
      </MaxWidthWrapper>
    </>
  );
};

export default Login;

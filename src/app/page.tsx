"use client";

import GameButton from "@/components/Button/GameButton";
import GetStartedButton from "@/components/Button/Get-Started";
import Heading from "@/components/Heading";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Navbar from "@/components/NavBar";
import { DINRoundProBold, DINRoundProMedi } from "@/config/font";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Home = () => {
  const router = useRouter();

  const { data, status } = useSession();

  return (
    <main className="relative h-screen overflow-y-scroll bg-zinc-50">
      <Navbar />

      <MaxWidthWrapper className="grid-cols-1 place-content-start place-items-start overflow-hidden bg-zinc-50 p-0 px-2 sm:grid sm:items-center sm:px-6 md:px-8 lg:grid-cols-2">
        <div className="p-8 pb-0 pt-2 md:py-12 lg:py-24">
          <div className="flex-1 py-8">
            <div className="max-w-[640px]">
              <div className="mb-4 flex items-center">
                <span className="mr-3 rounded-full bg-[#EEF2FF] px-3 py-1 text-sm font-medium text-[#6366F1]">
                  What&#39;s new
                </span>
                <span className="text-sm text-[#6B7280]">
                  Just shipped v1.0
                </span>
                <ChevronRight className="h-4 w-4 text-[#6B7280]" />
              </div>

              <Heading
                className={cn(
                  "mb-6 text-left font-bold leading-tight text-[#111827]",
                  "text-4xl sm:text-5xl md:text-6xl",
                  DINRoundProBold.className,
                )}
              >
                Deploy to the cloud with confidence
              </Heading>

              <Heading
                className={cn(
                  "mb-8 text-left font-normal leading-relaxed text-[#4B5563]",
                  "text-base sm:text-lg md:text-xl",
                  DINRoundProMedi.className,
                )}
              >
                Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui
                lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat
                fugiat aliqua.
              </Heading>

              <div className="flex w-full flex-col sm:flex-row sm:space-y-0">
                {/* <GetStartedButton /> */}

                <GameButton
                  divClassName="w-full flex items-center justify-center"
                  variant="blue"
                  onClick={() =>
                    router.push(
                      status === "authenticated" ? "/learn" : "/welcome",
                    )
                  }
                  className="flex w-full items-center justify-center rounded-xl py-3 sm:w-52 md:mt-5"
                >
                  <Heading
                    className={cn(
                      "flex items-center justify-center gap-2 text-balance text-center text-sm font-bold uppercase text-zinc-900 sm:text-base",
                      DINRoundProMedi.className,
                    )}
                  >
                    Get started
                  </Heading>
                </GameButton>

                <GameButton
                  divClassName="w-full flex items-center justify-center"
                  variant="transparent"
                  className="mt-3 flex w-full items-center justify-center rounded-xl py-3 sm:w-52 md:mt-5"
                >
                  <Heading
                    className={cn(
                      "flex items-center justify-center gap-2 text-balance text-center text-sm font-bold uppercase text-zinc-900 sm:text-base",
                      DINRoundProMedi.className,
                    )}
                  >
                    Learn more <ChevronRight className="ml-1 h-5 w-5" />
                  </Heading>
                </GameButton>
              </div>
            </div>
          </div>
        </div>

        <div className="-right-64 top-28 mx-2 overflow-hidden rounded-xl rounded-l-2xl bg-zinc-900/5 p-2 shadow-2xl ring-1 ring-inset ring-zinc-900/10 md:-right-52 lg:absolute lg:-right-48 lg:-m-4 lg:rounded-2xl lg:p-3">
          <Image
            src="/placeholder.png"
            alt="Dashboard preview"
            // layout="fill"
            width={1000}
            height={1000}
            objectFit="cover"
            className="h-auto rounded-xl lg:h-[80%]"
          />
        </div>
      </MaxWidthWrapper>
      {/* </MaxWidthWrapper> */}
    </main>
  );
};

export default Home;

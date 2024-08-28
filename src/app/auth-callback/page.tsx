"use client";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import { DINRoundProMedi } from "@/config/font";
import { useUser } from "@/hooks/useUser";
import { cn } from "@/lib/utils";
import { trpc } from "@/trpc/client";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { setCookie } from "cookies-next";

interface PageProps {
  params: {
    email: string;
  };
}

const Page = ({ params }: PageProps) => {
  const router = useRouter();

  const { user, setUser } = useUser();

  const { data, isError, isSuccess, error } = trpc.authCallback.useQuery();

  useEffect(() => {
    if (data?.user) {
      setUser({
        id: data?.user?.id,
        name: data?.user?.name,
        email: data?.user?.email,
        avatar: data?.user?.avatar,
      });
      setCookie("userId", data?.user?.id);
      setCookie("loggedIn", "true");
      router.push(`/learn?u=${data?.user?.id}`);
    }
  }, [data?.user]);

  console.log(data?.user?.id);

  const isLoading = false;

  return (
    <MaxWidthWrapper
      padding="large"
      paddingTop="large"
      maxw="w-full"
      className="relative h-full px-3 lg:pt-44"
    >
      <section className="mx-auto h-full w-full pb-24 pt-10">
        <div className="flex h-full flex-col items-center gap-2">
          <Button
            onClick={() => router.push(`/u/${data?.user?.id}`)}
            className={cn(DINRoundProMedi.className, "mt-4")}
          >
            Go to profile
          </Button>
          <Button
            onClick={() => signOut({ callbackUrl: "/learn" })}
            className={cn(DINRoundProMedi.className, "mt-4")}
          >
            Sign out
          </Button>
        </div>
      </section>
    </MaxWidthWrapper>
  );
};

export default Page;

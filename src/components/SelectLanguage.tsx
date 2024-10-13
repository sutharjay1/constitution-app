"use client";

import { Language } from "@/config/language";
import { ELanguage, useLang } from "@/hooks/useLang";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Loading from "./Loading/Loading";

const SelectLanguage = () => {
  const router = useRouter();

  const { lang, setLang } = useLang();

  const [isSettingLanguage, setIsSettingLanguage] = useState(false);

  const changeLanguage = async (lng: ELanguage) => {
    if (isSettingLanguage) return;
    setLang(lng);
    setIsSettingLanguage(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    router.push("/welcome");
  };

  return (
    <div className="flex w-full flex-col items-center justify-center">
      {isSettingLanguage ? (
        <div className="mt-20 flex w-full items-center justify-center">
          <Loading />
        </div>
      ) : (
        Language?.map((item, index) => (
          <button
            key={item.lang}
            onClick={() => changeLanguage(item.enum!)}
            className={cn(
              "flex w-full items-center justify-start gap-2 bg-zinc-100 px-6 py-4 text-left text-white transition duration-300 hover:bg-zinc-300",
              index === 0 && "rounded-t-lg",
              index === lang.length - 1 && "rounded-b-lg",
              index !== 0 && index !== lang.length - 1 && "rounded-none",
            )}
          >
            <span
              className="flex items-center justify-center text-xl"
              dangerouslySetInnerHTML={{ __html: item.flag }}
            />
            <span className="ml-2 text-lg font-medium text-zinc-800">
              {item.lang}
            </span>
          </button>
        ))
      )}
    </div>
  );
};

export default SelectLanguage;

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export enum ELanguage {
  English = "English",
  Hindi = "Hindi",
  Chinese = "Chinese",
  Japanese = "Japanese",
  Spanish = "Spanish",
  Portuguese = "Portuguese",
  French = "French",
}

interface LangState {
  lang: ELanguage;
  setLang: (lang: ELanguage) => void;
}

export const useLang = create<LangState>()(
  persist(
    (set) => ({
      lang: ELanguage.English,
      setLang: (lang: ELanguage) => set({ lang }),
    }),
    {
      name: "lang-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

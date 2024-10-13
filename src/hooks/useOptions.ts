import { Options } from "@/type";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface OptionProps {
  option: Options;
  setOption: (option: Options) => void;
}

export const useOptions = create<OptionProps>()(
  persist(
    (set) => ({
      option: Options.SOVEREIGN,
      setOption: (option: Options) => set({ option }),
    }),
    { name: "option-state", storage: createJSONStorage(() => localStorage) },
  ),
);

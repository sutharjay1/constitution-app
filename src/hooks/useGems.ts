import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface GemState {
  gems: number;
  incrementGems: () => void;
  decrementGems: () => void;
}

export const useGems = create<GemState>()(
  persist(
    (set) => ({
      gems: 500,
      incrementGems: () => set((state) => ({ gems: state.gems + 1 })),
      decrementGems: () => set((state) => ({ gems: state.gems - 1 })),
    }),
    { name: "heart-state", storage: createJSONStorage(() => localStorage) },
  ),
);

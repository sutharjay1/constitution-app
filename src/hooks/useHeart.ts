import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";


interface HeartState {
    heart: number
    // incrementHeart: () => void
    // decrementHeart: () => void
    setHeart: (heart: number) => void
}


export const useHeart = create<HeartState>()(
    persist((set) => ({
        heart: 5,
        setHeart: (heart: number) => set({ heart }),
        // incrementHeart: () => set((state) => ({ heart: state.heart + 1 })),
        // decrementHeart: () => set((state) => ({ heart: state.heart - 1 })),
    }

    ), { name: "heart-state", storage: createJSONStorage(() => localStorage) })
)
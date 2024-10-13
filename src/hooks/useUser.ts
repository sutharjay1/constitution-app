import { TUser } from "@/type";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type UserState = {
  user: TUser | {};
  setUser: (userData: TUser) => void;
};

export const useUser = create<UserState>()(
  persist(
    (set) => ({
      user: {},
      setUser: (userData) => set(() => ({ user: userData })),
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

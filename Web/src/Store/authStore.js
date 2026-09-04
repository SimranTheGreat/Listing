import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set) => ({
      id: null,
      created_at: null,
      userName: null,
      userPic: null,
      googleId: null,
      email: null,
      isLoggedIn: false,

      login(user) {
        set({
          id: user.id,
          created_at: user.created_at,
          userName: user.userName,
          userPic: user.userPic,
          googleId: user.googleId,
          email: user.email,
          isLoggedIn: true,
        });
      },

      logout() {
        set({
          id: null,
          created_at: null,
          userName: null,
          userPic: null,
          googleId: null,
          email: null,
          isLoggedIn: false,
        });
      },
    }),
    {
      name: "auth-storage",
    }
  )
);

export default useAuthStore;
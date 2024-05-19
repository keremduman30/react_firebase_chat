import { doc, getDoc } from "firebase/firestore";
import { create } from "zustand";
import { db } from "./firebase";
export type User = {
  avatar: string;
  blocked: string[];
  email: string;
  id: string;
  username: string;
};
type UserStore = {
  currentUser: User | null;
  isLoading: boolean;
};
export const useUserStore = create<UserStore>((set) => ({
  currentUser: null,
  isLoading: true,
  fethcUserInfo: async (uid: string) => {
    if (!uid) return set({ currentUser: null, isLoading: false });
    try {
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);
      console.log("istek atıldı");

      if (docSnap.exists()) {
        const userData: User = docSnap.data() as User;
        set({ currentUser: userData, isLoading: false });
      } else {
        set({ currentUser: null, isLoading: false });
      }
    } catch (error) {
      return set({ currentUser: null, isLoading: false });
    }
  },
}));

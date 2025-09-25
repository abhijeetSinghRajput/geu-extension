// stores/useStudentStore.js
import axios from "axios";
import { create } from "zustand";

export const useStudentStore = create((set, get) => ({
  profile: null,
  loading: false,
  error: null,

  getProfile: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axios.post(
        "https://student.geu.ac.in/Account/StudentIDCardPrint",
      );
      const profile = JSON.parse(res.data)[0];
      // console.log("Profile fetched:", profile);
      set({ profile });
    } catch (error) {
      console.error("❌ Error fetching profile:", error);
      set({ error: error.message, loading: false });
    } finally {
      set({ loading: false });
    }
  },
}));

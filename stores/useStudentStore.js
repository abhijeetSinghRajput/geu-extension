// stores/useStudentStore.js
import { axiosInstance } from "@/lib/axiosInstance";
import axios from "axios";
import { create } from "zustand";

export const useStudentStore = create((set, get) => ({
  profile: null,
  loading: false,
  error: null,
  idCard: null,
  loadingIdCard: false,

  getProfile: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axiosInstance.post("Account/StudentIDCardPrint");
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

  getIdCard: async () => {
    set({ loadingIdCard: true });
    try {
      const res = await axiosInstance.post("/Account/StudentIDCardPrint");
      const parsed = JSON.parse(res.data)[0];
      console.log(parsed);
      const idCard = {
        ...parsed,
        AuthoritySignature: `data:image/bmp;base64,${parsed?.AuthoritySignature}`,
        Photo: `data:image/bmp;base64,${parsed?.Photo}`,
      };

      set({ idCard });
    } catch (error) {
      console.log(error);
    } finally {
      set({ loadingIdCard: false });
    }
  },
}));

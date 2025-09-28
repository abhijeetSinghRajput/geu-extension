import { axiosInstance } from "@/lib/axiosInstance";
import { create } from "zustand";

export const useStudentStore = create((set, get) => ({
  student: null,
  idCard: null,

  loadingStudent: false,
  loadingIdCard: false,

  errors: {
    getStudentProfile: null,
    getIdCard: null,
  },

  // 📌 Get Student Profile
  getStudentProfile: async () => {
    set({
      loadingStudent: true,
      errors: { ...get().errors, getStudentProfile: null },
    });
    try {
      const res = await axiosInstance.post("/Account/GetStudentDetail");
      const student = JSON.parse(res.data.state || "[]")[0];
      set({ student });
    } catch (error) {
      console.error("❌ Error fetching student:", error);
      set({
        errors: {
          ...get().errors,
          getStudentProfile: error.message || "Unknown error",
        },
        student: null,
      });
    } finally {
      set({ loadingStudent: false });
    }
  },

  // 📌 Get ID Card
  getIdCard: async () => {
    set({ loadingIdCard: true, errors: { ...get().errors, getIdCard: null } });
    try {
      const res = await axiosInstance.post("/Account/StudentIDCardPrint");
      let idCard = JSON.parse(res.data || "[]")[0];
      idCard = {
        ...idCard,
        AuthoritySignature: `data:image/bmp;base64,${idCard?.AuthoritySignature}`,
        Photo: `data:image/bmp;base64,${idCard?.Photo}`,
      };
      set({ idCard });
    } catch (error) {
      console.error("❌ Error fetching idCard:", error);
      set({
        errors: {
          ...get().errors,
          getIdCard: error.message || "Unknown error",
        },
        idCard: null,
      });
    } finally {
      set({ loadingIdCard: false });
    }
  },
}));

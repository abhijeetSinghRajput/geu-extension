import axios from "axios";
import { toast } from "sonner";
import { create } from "zustand";
import qs from "qs";

export const useNoticeStore = create((set, get) => ({
  popupCirculars: [],
  circulars: [],
  allCirculars: [],
  isLoadingCirculars: false,
  isLoadingCircularDetails: false,
  errors: {
    getCirculars: null,
    getAllCirculars: null,
  },

  // 🔹 Fetch popup & regular circulars
  getCirculars: async () => {
    set({
      isLoadingCirculars: true,
      errors: { ...get().errors, getCirculars: null },
    });
    try {
      const res = await axios.post(
        "https://student.geu.ac.in/Account/GetCircularIntention"
      );
      const circularData = JSON.parse(res.data.circular || "[]");
      set({
        popupCirculars: circularData.filter((c) => c.ShowAsAPopup),
        circulars: circularData,
      });
    } catch (error) {
      const message = error?.response?.data?.message || "Failed to fetch circulars";
      toast.error(message);
      set({
        popupCirculars: [],
        circulars: [],
        errors: { ...get().errors, getCirculars: message },
      });
      console.error("getCirculars error:", error);
    } finally {
      set({ isLoadingCirculars: false });
    }
  },

  // 🔹 Fetch all circular details
  getAllCirculars: async () => {
    set({
      isLoadingCircularDetails: true,
      errors: { ...get().errors, getAllCirculars: null },
    });
    try {
      const res = await axios.post(
        "https://student.geu.ac.in/Web_Teaching/GetCircularDetails"
      );
      const circulars = JSON.parse(res.data.state || "[]");
      set({ allCirculars: circulars });
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        "Something went wrong while fetching all circulars";
      toast.error(message);
      set({
        allCirculars: [],
        errors: { ...get().errors, getAllCirculars: message },
      });
      console.error("getAllCirculars error:", error);
    } finally {
      set({ isLoadingCircularDetails: false });
    }
  },
}));

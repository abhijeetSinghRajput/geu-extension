import { create } from "zustand";
import { useStudentStore } from "./useStudentStore";
import axios from "axios";
import qs from "qs";
import { axiosInstance } from "@/lib/axiosInstance";

export const useAttendanceStore = create((set, get) => ({
  attendance: null,
  subjectAttendanceCache: {},
  isLoadingSubjects: false,
  isLoadingSubjectDetails: false,
  errors: {
    getAllAttendanceSubjects: null,
    getAttendanceBySubject: null,
  },

  getAllAttendanceSubjects: async ({ RegID }) => {
    if (!RegID) return;
    set({
      isLoadingSubjects: true,
      errors: { ...get().errors, getAllAttendanceSubjects: null },
    });

    try {
      console.log("fetching attendance...");
      const res = await axiosInstance.post(
        `Web_StudentAcademic/GetSubjectDetailStudentAcademicFromLive`,
        { RegID }
      );
      const state = JSON.parse(res.data.state || "[]");
      const data = JSON.parse(res.data.data || "[]")[0] || {};
      set({ attendance: { state, data } });
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        "Something went wrong while fetching attendance.";
      console.log(message);
      set({
        attendance: null,
        errors: { ...get().errors, getAllAttendanceSubjects: message },
      });
    } finally {
      set({ isLoadingSubjects: false });
    }
  },

  getAttendanceBySubject: async (SubjectID, data = {}) => {
    const { profile } = useStudentStore.getState();

    if (!profile?.RegID) {
      console.log("Student registration ID not found");
      return null;
    }

    set({
      isLoadingSubjectDetails: true,
      errors: { ...get().errors, getAttendanceBySubject: null },
    });

    try {
      // Create cache key
      const cacheKey = `${profile.RegID}-${SubjectID}-${data.DateFrom || ""}-${
        data.DateTo || ""
      }`;

      // Check cache
      const { subjectAttendanceCache } = get();
      if (subjectAttendanceCache[cacheKey]) {
        return subjectAttendanceCache[cacheKey];
      }

      // Prepare payload
      const payload = {
        SubjectID,
        RegID: profile.RegID,
        PeriodAssignID: data.PeriodAssignID || 0,
        TTID: data.TTID || 0,
        LectureTypeID: data.LectureTypeID || 0,
        DateFrom: data.DateFrom || "",
        DateTo: data.DateTo || "",
      };

      // Fetch from API
      const res = await axiosInstance.post(
        `Web_StudentAcademic/FillAttendanceDetail_ostulgn`,
        qs.stringify(payload),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
          },
        }
      );

      // Parse response safely
      const parsedState = (() => {
        try {
          return JSON.parse(res.data.state || "[]");
        } catch {
          return [];
        }
      })();

      const parsedData = (() => {
        try {
          return JSON.parse(res.data.data || "[]")[0] || {};
        } catch {
          return {};
        }
      })();

      const parsedDtLecture = (() => {
        try {
          return JSON.parse(res.data.dtLecture || "[]");
        } catch {
          return [];
        }
      })();

      const finalResult = {
        state: parsedState,
        data: parsedData,
        dtLecture: parsedDtLecture,
      };

      // Update cache
      set((store) => ({
        subjectAttendanceCache: {
          ...store.subjectAttendanceCache,
          [cacheKey]: finalResult,
        },
      }));

      return finalResult;
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        "Something went wrong while fetching attendance details.";
      console.error(message, error);
      set({ errors: { ...get().errors, getAttendanceBySubject: message } });
      return null;
    } finally {
      set({ isLoadingSubjectDetails: false });
    }
  },

  clearSubjectCache: (subjectId = null) => {
    if (subjectId) {
      set((state) => {
        const newCache = { ...state.subjectAttendanceCache };
        Object.keys(newCache).forEach((key) => {
          if (key.includes(`-${subjectId}-`)) {
            delete newCache[key];
          }
        });
        return { subjectAttendanceCache: newCache };
      });
    } else {
      set({ subjectAttendanceCache: {} });
    }
  },
}));

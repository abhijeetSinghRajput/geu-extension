import { axiosInstance } from "@/lib/axiosInstance";
import axios from "axios";
import { toast } from "sonner";
import { create } from "zustand";

export const useExamStore = create((set, get) => ({
  examSummary: null,
  backlogs: null,
  loadingExamSummary: false,
  loadingBacklogs: false,
  loadingMarksheet: 0,
  loadingAdmitCard: false,
  errors: {
    getExamSummary: null,
    downloadMarksheet: null,
  },
  admitCards: {
    sessional: null,
    endTerm: null,
    midTerm: null,
  },

  getExamSummary: async () => {
    set({
      loadingExamSummary: true,
      errors: { ...get().errors, getExamSummary: null },
    });
    try {
      const res = await axiosInstance.post(
        `Web_StudentAcademic/GetStudentExamSummary`
      );

      // Extract and parse ExamSummary
      const examSummary = JSON.parse(res.data.ExamSummary || "[]");
      set({ examSummary });
    } catch (error) {
      const message =
        error?.response?.data.message || "Failed to fetch exam summary";
      // console.log(message, error);
      toast.error(message);
      set({
        examSummary: null,
        errors: { ...get().errors, getExamSummary: message },
      });
    } finally {
      set({ loadingExamSummary: false });
    }
  },

  getBacklogs: async () => {
    set({
      loadingBacklogs: true,
      errors: { ...get().errors, getBacklogs: null },
    });
    try {
      const res = await axiosInstance.post(
        "Web_StudentAcademic/GetStudentBackPapers"
      );
      const backlogs = JSON.parse(res.data._backData || "[]");
      set({ backlogs });
    } catch (error) {
      const message =
        error?.response?.data.message || "Failed to fetch backlogs";
      // console.log(message, error);
      toast.error(message);
      set({
        errors: { ...get().errors, getBacklogs: message },
        backlogs: null,
      });
    } finally {
      set({ loadingBacklogs: false });
    }
  },

  getAdmitCard: async (examType) => {
    set({ loadingAdmitCard: examType });
    try {
      const examTypes = {
        sessional: "1",
        endTerm: "2",
        midTerm: "3",
      };

      const payload = {
        ExamType: 1, // 1:main 2:back
        MarksType: examTypes[examType],
        BackSetting: -1,
      };

      const res = await axiosInstance.post(
        `Web_Exam/GetAdmitCardSlctStudentRecord`,
        payload,
        {
          "Content-Type": "application/x-www-form-urlencoded",
        }
      );
      const parsed = JSON.parse(res.data.state || "[]");
      const admitCard =
        Array.isArray(parsed) && parsed.length ? parsed[0] : null;
      set({
        admitCards: { ...get().admitCards, [examType]: admitCard },
      });
    } catch (error) {
      const message =
        error?.response?.data.message || "Failed to fetch backlogs";
      // console.log(message, error);
      toast.error(message);
      set({ errors: { ...get().errors, getAdmitCard: message } });
    } finally {
      set({ loadingAdmitCard: false });
    }
  },

  downloadMarksheet: async (yearSem) => {
    set({
      loadingMarksheet: yearSem,
      errors: { ...get().errors, downloadMarksheet: null },
    });

    try {
      // Step 1: Get docNo
      const res = await axiosInstance.post(
        `Web_StudentAcademic/FillMarksheet`,
        { yearSem },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      // {msg: 'OK', data: 1, docNo: '1102959_1'}
      const { docNo } = res.data;

      // Step 2: Fetch the PDF using docNo
      const pdfRes = await axios.get(
        `Web_StudentAcademic/DownloadFile?docNo=${docNo}`,
        {
          responseType: "arraybuffer", // important
          headers: { Accept: "application/pdf" },
        }
      );

      // Step 3: Create a Blob from the pdfRes.data
      const blob = new Blob([pdfRes.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);

      // Step 4: Download link
      const a = document.createElement("a");
      a.href = url;
      a.download = `marksheet_${yearSem}.pdf`; // filename
      document.body.appendChild(a);
      a.click();

      // Step 5: Clean up
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      const message =
        error?.response?.data?.message || "Failed to download marksheet";
      toast.error(message);
      set({
        errors: { ...get().errors, downloadMarksheet: message },
        backlogs: [],
      });
    } finally {
      set({ loadingMarksheet: 0 });
    }
  },
}));

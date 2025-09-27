import { axiosInstance } from "@/lib/axiosInstance";
import axios from "axios";
import qs from "qs";
import { toast } from "sonner";
import { create } from "zustand";

export const useFeeStore = create((set, get) => ({
  feeSubmissions: null,
  feeReceipts: null,
  loadingFeeSubmissions: false,
  loadingFeeReceipts: false,
  downloadingReceipt: null,
  errors: {
    getFeeSubmissions: null,
    getFeeReceipts: null,
    downloadReceipt: null,
  },

  // 🔹 Fetch fee submissions
  getFeeSubmissions: async ({ feeType = 2, duration = 0 } = {}) => {
    set({
      loadingFeeSubmissions: true,
      errors: { ...get().errors, getFeeSubmissions: null },
    });
    try {
      const payload = qs.stringify({ FeeType: feeType, duration });
      const res = await axiosInstance.post(
        `Web_StudentFinance/FillHead`,
        payload,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            "X-Requested-With": "XMLHttpRequest",
          },
        }
      );

      const feeSubmissions = {
        ...res.data,
        headdata: JSON.parse(res.data.headdata || "[]"),
        headdatahostel: JSON.parse(res.data.headdatahostel || "[]"),
      };

      set({ feeSubmissions });
    } catch (error) {
      const message =
        error?.response?.data?.message || "Failed to load fee submissions";
      set({
        errors: {
          ...get().errors,
          getFeeSubmissions: message,
          feeSubmissions: null,
        },
      });
      toast.error(message);
      console.error("Fee submissions error:", error);
    } finally {
      set({ loadingFeeSubmissions: false });
    }
  },

  // 🔹 Fetch fee receipts
  getFeeReceipts: async () => {
    set({
      loadingFeeReceipts: true,
      errors: { ...get().errors, getFeeReceipts: null },
    });
    try {
      const res = await axiosInstance.post(
        `Web_StudentFinance/GetStudentFeeReceipt_ostulgn`
      );
      const feeReceipts = JSON.parse(res.data);
      set({ feeReceipts });
    } catch (error) {
      const message =
        error?.response?.data?.message || "Failed to load fee receipts";
      set({
        errors: { ...get().errors, getFeeReceipts: message },
        feeReceipts: null,
      });
      toast.error(message);
      console.error("Fee receipts error:", error);
    } finally {
      set({ loadingFeeReceipts: false });
    }
  },

  // 🔹 Download receipt
  downloadReceipt: async (ReceiptModeID, BookID, CombineReceiptNo) => {
    set({
      downloadingReceipt: CombineReceiptNo,
      errors: { ...get().errors, downloadReceipt: null },
    });
    try {
      // 1️⃣ Get ReceiptNo from ERP
      const res = await axiosInstance.post(
        `Web_StudentFinance/ShowFeeReceipt_ostulgn`,
        qs.stringify({ ReceiptModeID, BookID, CombineReceiptNo }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      const ReceiptNo = res.data;
      if (!ReceiptNo) throw new Error("ReceiptNo not found");

      // 2️⃣ Request ERP PDF
      const pdfRes = await axios.get(
        `Web_StudentFinance/DownloadFile?ReceiptNo=${ReceiptNo}`,
        {
          responseType: "blob",
        }
      );

      // 3️⃣ Extract filename from headers or fallback
      const contentDisposition = pdfRes.headers["content-disposition"];
      const filename =
        contentDisposition?.match(/filename="?(.+)"?/)?.[1] ||
        `${ReceiptNo}-fee-receipt.pdf`;

      // 4️⃣ Trigger download
      const url = window.URL.createObjectURL(new Blob([pdfRes.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      const message =
        error?.response?.data?.message || "Failed to download receipt";
      set({ errors: { ...get().errors, downloadReceipt: message } });
      toast.error(message);
      console.error("Download error:", error);
    } finally {
      set({ downloadingReceipt: null });
    }
  },
}));

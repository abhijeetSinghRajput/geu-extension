"use client";

import React, { useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { HomeIcon, FileTextIcon, WalletIcon } from "lucide-react";
import { useFeeStore } from "@/stores/useFeeStore";

import FeeSkeleton from "./FeeSkeleton";
import CourseFee from "./CourseFee";
import HostelFee from "./HostelFee";
import FeeReceipts from "./FeeReceipts";
import FeeError from "./FeeError";

const FeeSubmissions = () => {
  const {
    getFeeSubmissions,
    feeSubmissions,
    loadingFeeSubmissions,
    getFeeReceipts,
    feeReceipts,
    errors,
  } = useFeeStore();

  useEffect(() => {
    getFeeSubmissions();
    getFeeReceipts();
  }, []);

  if (loadingFeeSubmissions) {
    return <FeeSkeleton header={"Fee Submissions"} />;
  }

  if (errors.getFeeSubmissions || !feeSubmissions) {
    return (
      <FeeError
        description={errors.getFeeSubmissions}
        onReload={getFeeSubmissions}
      />
    );
  }

  // Calculate totals
  const calculateTotals = (data) => {
    if (!Array.isArray(data)) return;
    return data.reduce(
      (acc, item) => ({
        DueAmount: acc.DueAmount + item.DueAmount,
        ReceivedAmount: acc.ReceivedAmount + item.ReceivedAmount,
        BalanceAmount: acc.BalanceAmount + item.BalanceAmount,
        SCAmount: acc.SCAmount + (item.SCAmount || 0),
        SecurityAdjusted: acc.SecurityAdjusted + (item.SecurityAdjusted || 0),
      }),
      {
        DueAmount: 0,
        ReceivedAmount: 0,
        BalanceAmount: 0,
        SCAmount: 0,
        SecurityAdjusted: 0,
      }
    );
  };

  const courseTotals = calculateTotals(feeSubmissions.headdata);
  const hostelTotals = calculateTotals(feeSubmissions.headdatahostel);
  const hasHostelFees = feeSubmissions.headdatahostel.length > 0;

  // Columns configuration
  const feeColumns = [
    { id: "FeeHead", header: "Fee Head", sortable: false },
    { id: "DueAmount", header: "Due", sortable: true, prefix: "₹" },
    { id: "ReceivedAmount", header: "Received", sortable: true, prefix: "₹" },
    { id: "BalanceAmount", header: "Balance", sortable: true, prefix: "₹" },
    { id: "status", header: "Status", sortable: true },
  ];

  // Prepare data with status field
  const prepareTableData = (data) =>
    data.map((item) => ({
      ...item,
      status: item.BalanceAmount > 0 ? "Pending" : "Paid",
    }));

  return (
    <div className="w-full space-y-4">
      <h2 className="text-primary text-2xl sm:text-3xl font-bold p-0 my-[16px]">
        Fee Submissions
      </h2>

      <Tabs defaultValue="course" className="w-full">
        <TabsList className="flex h-[36px] w-max">
          <TabsTrigger value="course" className="h-full">
            Course Fees
          </TabsTrigger>
          <TabsTrigger value="hostel" className="h-full">
            Hostel Fees
          </TabsTrigger>
          <TabsTrigger value="receipts" className="h-full">
            Receipts Fees
          </TabsTrigger>
        </TabsList>

        <TabsContent value="course">
          <CourseFee
            data={prepareTableData(feeSubmissions.headdata)}
            totals={courseTotals}
            columns={feeColumns}
          />
        </TabsContent>

        <TabsContent value="hostel">
          <HostelFee
            data={prepareTableData(feeSubmissions.headdata)}
            totals={hostelTotals}
            columns={feeColumns}
            hasHostelFees={hasHostelFees}
          />
        </TabsContent>

        <TabsContent value="receipts">
          <FeeReceipts data={feeReceipts} />
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle className="text-[16px]">Payment Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-6 text-[14px]">
            <div className="flex-1 space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  Total Course Fees:
                </span>
                <span>₹{courseTotals.DueAmount.toLocaleString()}</span>
              </div>
              {courseTotals.SCAmount > 0 && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Scholarship Applied:
                  </span>
                  <span className="text-green-600">
                    -₹{courseTotals.SCAmount.toLocaleString()}
                  </span>
                </div>
              )}
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between font-semibold">
                  <span>Total Amount Paid:</span>
                  <span>₹{courseTotals.ReceivedAmount.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {hasHostelFees && (
              <div className="flex-1">
                <h4 className="font-semibold mb-3">Hostel Payment Details</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Total Hostel Fees:
                    </span>
                    <span>₹{hostelTotals.DueAmount.toLocaleString()}</span>
                  </div>
                  {hostelTotals.SCAmount > 0 && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Security Adjusted:
                      </span>
                      <span className="text-green-600">
                        -₹{hostelTotals.SCAmount.toLocaleString()}
                      </span>
                    </div>
                  )}
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between font-semibold">
                      <span>Total Amount Paid:</span>
                      <span>
                        ₹{hostelTotals.ReceivedAmount.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {hasHostelFees && (
            <div className="border-t mt-4 pt-4">
              <div className="flex justify-between text-lg font-bold">
                <span>Grand Total Paid:</span>
                <span>
                  ₹
                  {(
                    courseTotals.ReceivedAmount + hostelTotals.ReceivedAmount
                  ).toLocaleString()}
                </span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default FeeSubmissions;

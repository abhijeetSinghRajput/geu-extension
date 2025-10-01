import TableSkeleton from "@/components/table/TableSkeleton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { FileTextIcon, HomeIcon, WalletIcon } from "lucide-react";

const FeeSkeleton = ({ heading = "Fee Submissions" }) => {
  return (
    <div className="w-full space-y-[16px]">
      <h2 className="text-primary text-[24px] sm:text-3xl font-bold p-0 my-[16px]">
        Fee Submissions
      </h2>

      <Tabs defaultValue="course" className="w-full">
        <TabsList className="grid h-[36px] grid-cols-3 w-max">
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
      </Tabs>

      <TableSkeleton
        className={"max-w-full md:p-0 sm:p-0 p-0"}
        heading={heading}
      />
      <FeeSummaryCards />
      <PaymentSummary />
    </div>
  );
};

const PaymentSummary = () => {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-[16px] max-w-[176px]" />
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <PaymentDetail />
          <PaymentDetail className="hidden md:block" />
        </div>
      </CardContent>
    </Card>
  );
};

const PaymentDetail = ({ className = "" }) => {
  return (
    <div className={className}>
      <Skeleton className="h-[24px] max-w-[176px] mb-3" />
      <div className="space-y-[8px]">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex justify-between">
            <Skeleton className="h-[24px] w-[144px]" />
            <Skeleton className="h-[24px] w-[80px]" />
          </div>
        ))}
        <div className="border-t pt-2 mt-2">
          <div className="flex justify-between">
            <Skeleton className="h-[24px] w-[96px]" />
            <Skeleton className="h-[24px] w-[80px]" />
          </div>
        </div>
      </div>
    </div>
  );
};

const FeeSummaryCards = () => {
  return (
    <Card className="rounded-[16px] p-[24px] grid grid-cols-1 md:grid-cols-3 gap-4">
      {[...Array(3)].map((_, i) => (
        <Card key={i} className="bg-muted">
          <CardHeader className="p-4">
            <Skeleton className="h-[20px] max-w-[320px]" />
            <Skeleton className="h-[32px] max-w-[96px]" />
          </CardHeader>
        </Card>
      ))}
    </Card>
  );
};

export default FeeSkeleton;

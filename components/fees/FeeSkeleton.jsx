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
    <div className="w-full">
      <h2 className="text-primary text-2xl sm:text-3xl font-bold p-0 m-0">
        Fee Submissions
      </h2>

      <Tabs defaultValue="course" className="w-full">
        <TabsList className="grid h-[36px] grid-cols-3 w-max">
          <TabsTrigger value="course" className="h-full">
            <FileTextIcon className="w-4 h-4 mr-2" />
            Course Fees
          </TabsTrigger>
          <TabsTrigger value="hostel" className="h-full">
            <HomeIcon className="w-4 h-4 mr-2" />
            Hostel Fees
          </TabsTrigger>
          <TabsTrigger value="receipts" className="h-full">
            <WalletIcon className="w-4 h-4 mr-2" />
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
        <Skeleton className="h-4 max-w-44" />
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
      <Skeleton className="h-6 max-w-44 mb-3" />
      <div className="space-y-2">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex justify-between">
            <Skeleton className="h-6 w-36" />
            <Skeleton className="h-6 w-20" />
          </div>
        ))}
        <div className="border-t pt-2 mt-2">
          <div className="flex justify-between">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-6 w-20" />
          </div>
        </div>
      </div>
    </div>
  );
};

const FeeSummaryCards = () => {
  return (
    <Card className="rounded-2xl p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
      {[...Array(3)].map((_, i) => (
        <Card key={i} className="bg-muted">
          <CardHeader className="p-4">
            <Skeleton className="h-5 max-w-80" />
            <Skeleton className="h-8 max-w-24" />
          </CardHeader>
        </Card>
      ))}
    </Card>
  );
};

export default FeeSkeleton;

import React from "react";
import { Progress } from "../ui/progress";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertCircleIcon,
  CheckCircleIcon,
  FileTextIcon,
  WalletIcon,
} from "lucide-react";

const FeeCard = ({ icon, title, amount, subAmount, children, bgColor, textColor }) => (
  <Card className={`h-full border ${bgColor} p-2`}>
    <CardHeader className="pb-2">
      <CardDescription className={`flex items-center gap-2 ${textColor}`}>
        {icon}
        {title}
      </CardDescription>
    </CardHeader>
    <CardContent>
      {amount !== undefined && (
        <div className="flex items-end justify-between">
          <CardTitle className="text-2xl font-bold">{amount}</CardTitle>
          {subAmount && (
            <div className="text-[14px] text-muted-foreground">{subAmount}</div>
          )}
        </div>
      )}
      {children}
    </CardContent>
  </Card>
);

const FeeSummaryCards = ({ totals }) => {
  const paymentProgress = (totals.ReceivedAmount / totals.DueAmount) * 100;
  const isFullyPaid = totals.BalanceAmount <= 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <FeeCard
        icon={<FileTextIcon className="w-4 h-4" />}
        title="Total Fees"
        amount={`₹${totals.DueAmount.toLocaleString()}`}
        subAmount={
          totals.SCAmount > 0
            ? `₹${(totals.DueAmount + totals.SCAmount).toLocaleString()}`
            : null
        }
        bgColor="border-blue-100 dark:border-blue-900/50 bg-blue-50/50 dark:bg-blue-900/10"
        textColor="text-blue-600 dark:text-blue-300"
      />

      <FeeCard
        icon={<WalletIcon className="w-4 h-4" />}
        title="Paid Amount"
        amount={`₹${totals.ReceivedAmount.toLocaleString()}`}
        bgColor="border-emerald-100 dark:border-emerald-900/50 bg-emerald-50/50 dark:bg-emerald-900/10"
        textColor="text-emerald-600 dark:text-emerald-300"
      >
        <Progress
          value={paymentProgress}
          indicatorClass={`rounded-full ${isFullyPaid ? "bg-emerald-500" : "bg-amber-500"}`}
        />
        <p className="text-[14px] text-muted-foreground">
          {paymentProgress.toFixed(0)}% of total fees paid
        </p>
      </FeeCard>

      <FeeCard
        icon={<AlertCircleIcon className="w-4 h-4" />}
        title={isFullyPaid ? "Fully Paid" : "Pending Amount"}
        amount={
          isFullyPaid ? (
            <span className="flex items-center gap-1">
              <CheckCircleIcon className="w-5 h-5" /> ₹0
            </span>
          ) : (
            `₹${totals.BalanceAmount.toLocaleString()}`
          )
        }
        bgColor="border-rose-100 dark:border-rose-900/50 bg-rose-50/50 dark:bg-rose-900/10"
        textColor="text-rose-600 dark:text-rose-300"
      >
        {totals.SecurityAdjusted > 0 && (
          <div className="mt-2 text-[14px]">
            <span className="text-muted-foreground">Security adjusted: </span>
            <span className="text-emerald-600">
              ₹{totals.SecurityAdjusted.toLocaleString()}
            </span>
          </div>
        )}
      </FeeCard>
    </div>
  );
};

export default FeeSummaryCards;

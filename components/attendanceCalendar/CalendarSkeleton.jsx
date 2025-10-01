import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const CalendarSkeleton = () => {
  return (
    <div className="bg-input/30 rounded-md border p-3 space-y-[16px]">
      {/* Calendar Header */}
      <div className="flex justify-between items-center gap-2">
        <Skeleton className="h-[32px] w-[32px] rounded-md" />
        <Skeleton className="h-[24px] w-[128px]" />
        <Skeleton className="h-[32px] w-[32px] rounded-md" />
      </div>

      {/* Day Names */}
      <div className=" grid grid-cols-7 gap-2">
        {[...Array(7)].map((_, i) => (
          <Skeleton key={i} className="h-[19.2px] w-full" />
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-[5px]">
        {[...Array(42)].map((_, i) => (
          <Skeleton key={i} className="aspect-square h-[36px] w-full rounded-md" />
        ))}
      </div>
    </div>
  );
};

export default CalendarSkeleton;

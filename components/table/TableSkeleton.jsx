import React from "react";
import { Card } from "../ui/card";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Skeleton } from "../ui/skeleton";
import { cn } from "@/lib/utils";

const TableSkeleton = ({ className, heading }) => {
  return (
    <div className={cn("w-full", className)}>
      <Card className="overflow-hidden">
        <div className="sticky top-0 z-10 bg-muted">
          <div className="p-[16px] border-b flex justify-between gap-[16px]">
            <div className="space-y-1">
              <div className="flex items-center gap-[12px]">
                <Skeleton className="text-xl font-semibold h-[28px] w-[112px]" />
                <Skeleton className={"h-[28px] w-[64px]"} />
              </div>
              <Skeleton className={"h-[20px] w-38"} />
            </div>

            <Skeleton className="ml-auto gap-1 bg-input h-8 w-[96px]" />
          </div>
        </div>
        <ScrollArea className="w-full whitespace-nowrap">
          <Table>
            <TableBody>
              {[...Array(7)].map((_, idx) => (
                <TableRow key={idx} className={idx === 0 && "bg-muted/30 h-14"}>
                  <TableCell>
                    <Skeleton className={"h-[28px] w-[96px]"} />
                  </TableCell>
                  <TableCell>
                    <Skeleton className={"h-[28px] w-[96px]"} />
                  </TableCell>
                  <TableCell>
                    <Skeleton className={"h-[28px] w-[96px]"} />
                  </TableCell>
                  <TableCell>
                    <Skeleton className={"h-[28px] w-[96px]"} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </Card>
    </div>
  );
};

export default TableSkeleton;

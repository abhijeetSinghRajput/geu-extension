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
import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

const TableError = ({
  variant = "destructive",
  heading = "Data Loading Failed",
  description,
  onReload,
  className,
}) => {
  return (
    <div
      className={cn(
        "max-w-screen-lg mx-auto px-4 sm:px-6 md:px-4 py-2",
        className
      )}
    >
      <Card className="overflow-hidden relative">
        <div className="absolute z-20 inset-0 bg-background/70 flex items-center justify-center p-4">
          <div className="text-center space-y-4">
            <AlertTriangle className="h-[48px] w-[48px] mx-auto text-destructive" />
            <h3 className="text-[24px] font-semibold text-destructive">{heading}</h3>
            <p className="text-destructive max-w-md">
              {description ||
                "We couldn't load the attendance records. Please check your connection and try again."}
            </p>
            {onReload && (
              <Button onClick={onReload} className="mt-[16px] gap-[8px]">
                <RefreshCw />
                Retry
              </Button>
            )}
          </div>
        </div>

        <div
          className={cn(
            "sticky top-0 z-10",
            variant === "destructive" ? "bg-destructive/10" : "bg-muted"
          )}
        >
          <div className="p-4 border-b flex justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-[12px]">
                <Skeleton
                  className={cn(
                    "animate-none text-[20px] font-semibold h-[28px] w-[112px]",
                    variant === "destructive" && "bg-destructive/30"
                  )}
                />
                <Skeleton
                  className={cn(
                    "animate-none h-[28px] w-[64px]",
                    variant === "destructive" && "bg-destructive/30"
                  )}
                />
              </div>
              <Skeleton
                className={cn(
                  "animate-none h-[20px] w-[144px]",
                  variant === "destructive" && "bg-destructive/30"
                )}
              />
            </div>

            <Skeleton
              className={cn(
                "animate-none ml-auto gap-1 bg-input h-[32px] w-[96px]",
                variant === "destructive" && "bg-destructive/30"
              )}
            />
          </div>
        </div>

        <Table>
          <TableBody>
            {[...Array(7)].map((_, idx) => (
              <TableRow key={idx} className={idx === 0 && "bg-muted/30 h-[56px]"}>
                <TableCell>
                  <Skeleton
                    className={cn(
                      variant === "destructive" &&
                        "animate-none bg-destructive/30",
                      "h-[28px] min-w-[96px]"
                    )}
                  />
                </TableCell>
                <TableCell>
                  <Skeleton
                    className={cn(
                      variant === "destructive" &&
                        "animate-none bg-destructive/30",
                      "h-[28px] min-w-[96px]"
                    )}
                  />
                </TableCell>
                <TableCell>
                  <Skeleton
                    className={cn(
                      variant === "destructive" &&
                        "animate-none bg-destructive/30",
                      "h-[28px] min-w-[96px]"
                    )}
                  />
                </TableCell>
                <TableCell>
                  <Skeleton
                    className={cn(
                      variant === "destructive" &&
                        "animate-none bg-destructive/30",
                      "h-[28px] min-w-[96px]"
                    )}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default TableError;

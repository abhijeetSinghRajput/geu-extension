"use client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Skeleton } from "../ui/skeleton";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "../ui/button";

const ProfileError = ({
  heading = "Failed to load data",
  description = "Something went wrong",
  onReload,
}) => {
  return (
    <div className="w-full">
      <Card className="relative overflow-hidden bg-destructive/10">
        <div className="absolute inset-0 bg-background/70 flex items-center justify-center">
          <div className="text-center space-y-[16px]">
            <AlertTriangle className="h-[48px] w-[48px] mx-auto text-destructive" />
            <h3 className="text-[30px] font-medium text-destructive">
              {heading}
            </h3>
            <p className="max-w-[380px] text-destructive">{description}</p>
            {onReload && (
              <Button onClick={onReload} className="mt-4 gap-[8px]">
                <RefreshCw />
                Retry
              </Button>
            )}
          </div>
        </div>

        {/* Profile Header */}
        <CardHeader className="px-[32px] py-[24px]">
          <div className="flex flex-col md:flex-row items-center gap-[24px]">
            <Skeleton className="animate-none bg-destructive/30 size-[128px] rounded-full" />

            <div className="text-center md:text-left space-y-[8px]">
              <CardTitle className="text-[30px] font-bold tracking-tight">
                <Skeleton className="animate-none bg-destructive/30 h-[35px]" />
              </CardTitle>
              <div className="text-[18px] font-medium text-muted-foreground">
                <Skeleton className="animate-none bg-destructive/30 h-[24px] w-[250px]" />
              </div>

              <div className="flex flex-wrap justify-center md:justify-start gap-[8px] mt-2">
                <Skeleton className="animate-none bg-destructive/30 h-[20px] w-[48px]" />
                <Skeleton className="animate-none bg-destructive/30 h-[20px] w-[48px]" />
                <Skeleton className="animate-none bg-destructive/30 h-[20px] w-[48px]" />
              </div>
            </div>
          </div>
        </CardHeader>

        {/* Tab Navigation */}
        <div className="border-b bg-destructive/10">
          <div className="flex p-[8px] gap-[8px] justify-center">
            {[...Array(3)].map(() => (
              <Skeleton
                className={
                  "animate-none w-full max-w-[112px] h-[32px] bg-destructive/30"
                }
              />
            ))}
          </div>
        </div>

        <CardContent className="p-0">
          <div className="p-[32px]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-[24px]">
                <div>
                  <Skeleton className="animate-none w-[150px] h-[24px] bg-destructive/30 mb-2" />
                  <dl className="space-y-[16px]">
                    <div className="flex items-start">
                      <dt className="w-[160px] flex-shrink-0 text-[14px] font-medium text-muted-foreground">
                        Enrollment No
                      </dt>
                      <dd className="text-[14px] font-mono">
                        <Skeleton className="animate-none bg-destructive/30 h-[20px] w-[96px]" />
                      </dd>
                    </div>
                    <div className="flex items-start">
                      <dt className="w-[160px] flex-shrink-0 text-[14px] font-medium text-muted-foreground">
                        University Roll No
                      </dt>
                      <dd className="text-s font-mono">
                        <Skeleton className="animate-none bg-destructive/30 h-[20px] w-[96px]" />
                      </dd>
                    </div>
                    <div className="flex items-start">
                      <dt className="w-[160px] flex-shrink-0 text-[14px] font-medium text-muted-foreground">
                        Registration Id
                      </dt>
                      <dd className="text-s font-mono">
                        <Skeleton className="animate-none bg-destructive/30 h-[20px] w-[96px]" />
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>

              <div className="space-y-[24px]">
                <div>
                  <Skeleton className="animate-none w-[150px] h-[24px] bg-destructive/30 mb-2" />
                  <dl className="space-y-[16px]">
                    <div className="flex items-start">
                      <dt className="w-[160px] flex-shrink-0 text-[14px] font-medium text-muted-foreground">
                        Personal Email
                      </dt>
                      <dd className="text-[14px]">
                        <Skeleton className="animate-none bg-destructive/30 h-[20px] w-[200px]" />
                      </dd>
                    </div>
                    <div className="flex items-start">
                      <dt className="w-[160px] flex-shrink-0 text-[14px] font-medium text-muted-foreground">
                        University Email
                      </dt>
                      <dd className="text-[14px]">
                        <Skeleton className="animate-none bg-destructive/30 h-[20px] w-[150px]" />
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileError;

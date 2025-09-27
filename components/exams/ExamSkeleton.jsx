import React from "react";
import { motion } from "framer-motion";
import { Skeleton } from "../ui/skeleton";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import { Card, CardContent, CardHeader } from "../ui/card";

const ExamSkeleton = () => {
  return (
    <div className="w-full">
      {/* Top bar with CGPA */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center gap-2 py-2"
      >
        <Skeleton className="h-[20px] w-[120px]" />
      </motion.div>

      {/* Tabs Skeleton */}
      <Tabs defaultValue="results" className="w-full">
        <TabsList className="grid h-[36px] grid-cols-2 w-max">
          <TabsTrigger value="results" className="h-full">Result</TabsTrigger>
          <TabsTrigger value="backlogs" className="h-full">Backlogs</TabsTrigger>
        </TabsList>

        {/* Results Section */}
        <TabsContent value="results" className="mt-4 space-y-4">
          {[...Array(2)].map((_, index) => (
            <Card key={index} className="rounded-3xl">
              <CardHeader className="pb-0 justify-between items-center flex-row">
                <Skeleton className="h-6 w-[150px]" />
                <Skeleton className="size-8 rounded-full" />
              </CardHeader>
              <CardContent className="flex p-6 justify-between items-start">
                <div className="space-y-2">
                  <Skeleton className="h-5 w-[100px]" />
                  <Skeleton className="h-5 w-[100px]" />
                </div>
                <div className="size-[85px] rounded-full aspect-square border-8 flex items-center justify-center border-muted">
                  <div className="space-y-1 w-1/2">
                    <Skeleton className="h-5" />
                    <Skeleton className="h-3" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Backlogs Section */}
        <TabsContent value="backlogs" className="mt-4 space-y-4">
          {[...Array(1)].map((_, index) => (
            <Card key={index} className="rounded-3xl">
              <CardHeader className="pb-0 justify-between items-center flex-row">
                <Skeleton className="h-6 w-[150px]" />
              </CardHeader>
              <CardContent className="flex p-6 justify-start">
                <Skeleton className="h-5 w-[120px]" />
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ExamSkeleton;

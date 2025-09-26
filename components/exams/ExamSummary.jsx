import { useExamStore } from "@/stores/useExamStore";
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import ExamSkeleton from "./ExamSkeleton";
import ExamError from "./ExamError";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import Result from "./Result";
import Backlogs from "./Backlogs";

const ExamSummary = () => {
  const {
    getExamSummary,
    getBacklogs,
    examSummary,
    backlogs,
    loadingExamSummary,
    errors,
  } = useExamStore();

  useEffect(() => {
    getExamSummary();
    getBacklogs();
  }, []);

  if (loadingExamSummary) {
    return <ExamSkeleton />;
  }

  if (errors.getExamSummary || !Array.isArray(examSummary)) {
    return (
      <ExamError
        description={errors.getExamSummary}
        onReload={getExamSummary}
      />
    );
  }

  return (
    <div className="w-full px-2 sm:px-4 md:px-6 py-2">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center gap-2 py-2"
      >
        {Array.isArray(examSummary) && examSummary[0]?.CGPA && (
          <div className="font-semibold text-[14px]">CGPA {examSummary[0].CGPA}</div>
        )}
      </motion.div>
      <Tabs defaultValue="results" className="w-full">
        <TabsList className="grid h-[36px] grid-cols-2 w-max">
          <TabsTrigger value="results" className="h-full">Result</TabsTrigger>
          <TabsTrigger value="backlogs" className="h-full">Backlogs</TabsTrigger>
        </TabsList>
        <TabsContent value="results">
          <Result examSummary={examSummary} />
        </TabsContent>
        <TabsContent value="backlogs">
          <Backlogs backlogs={backlogs} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ExamSummary;

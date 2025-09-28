"use client";

import { motion } from "framer-motion";
import { Progress } from "../ui/progress";
import { useStudentStore } from "../../stores/useStudentStore";

import { LabelList, PolarAngleAxis, RadialBar, RadialBarChart } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// Chart config for academic performance
const chartConfig = {
  percentage: { label: "Percentage" },
  tenth: { label: "10th Grade", color: "var(--chart-1)" },
  twelfth: { label: "12th Grade", color: "var(--chart-2)" },
  graduation: { label: "Graduation", color: "var(--chart-3)" },
};

// ✅ Academic Radial Chart (only course names inside chart)
function AcademicRadialChart({ chartData }) {
  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto aspect-square max-h-[250px]"
    >
      <RadialBarChart
        data={chartData}
        startAngle={-90}
        endAngle={270}
        innerRadius={30}
        outerRadius={110}
      >
        <PolarAngleAxis
          type="number"
          domain={[0, 100]}
          tick={false}
          axisLine={false}
        />
        <ChartTooltip
          cursor={false}
          content={
            <ChartTooltipContent
              hideLabel
              nameKey="subject"
              style={{ fontSize: "16px", fontWeight: 500 }}
            />
          }
        />
        <RadialBar dataKey="percentage" background cornerRadius={5}>
          {/* Only display course/subject names */}
          <LabelList
            position="insideStart"
            dataKey="subject"
            className="fill-white capitalize mix-blend-luminosity"
            fontSize={12}
          />
        </RadialBar>
      </RadialBarChart>
    </ChartContainer>
  );
}

const EducationTab = ({ tabContentVariants, textVariants }) => {
  const { student } = useStudentStore();

  const chartData = [
    {
      subject: "10th Grade",
      percentage: student["10"],
      fill: "var(--chart-1)",
    },
    {
      subject: "12th Grade",
      percentage: student["10+2"],
      fill: "var(--chart-2)",
    },
    {
      subject: "Graduation",
      percentage: student.Graduation,
      fill: "var(--chart-3)",
    },
  ];

  return (
    <motion.div
      key="education"
      variants={tabContentVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="p-[32px]"
    >
      <div className="space-y-8">
        <motion.div variants={textVariants}>
          <h3 className="p-0 m-0 mb-[16px] text-[14px] font-semibold text-muted-foreground uppercase">
            Academic Performance
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-[16px] items-center">
            {/* Progress Bars (still show percentage) */}
            <div className="space-y-6">
              {chartData.map((item, idx) => (
                <motion.div key={idx} variants={textVariants}>
                  <div className="flex justify-between mb-1">
                    <span className="text-[14px] font-medium">
                      {item.subject}
                    </span>
                    <span className="text-[14px] font-medium">
                      {item.percentage}%
                    </span>
                  </div>
                  <Progress value={item.percentage} />
                </motion.div>
              ))}
            </div>

            {/* Radial Chart (only course names) */}
            <AcademicRadialChart chartData={chartData} />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default EducationTab;

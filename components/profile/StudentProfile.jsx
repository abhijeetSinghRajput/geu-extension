import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookText, UserCircle, GraduationCap, XIcon } from "lucide-react";

import { useStudentStore } from "@/stores/useStudentStore";
import ProfileSkeleton from "./ProfileSkeleton";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import ProfileError from "./ProfileError";
import AcademicTab from "./AcademicTab";
import EducationTab from "./EducationTab";
import PersonalTab from "./PersonalTab";
import ProfileDialog from "./ProfileDialog";
import { Tabs, TabsContent, TabsTrigger } from "../ui/tabs";

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const tabContentVariants = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      ease: "easeInOut",
    },
  },
  exit: {
    opacity: 0,
    x: -30,
    transition: {
      duration: 0.3,
      ease: "easeIn",
    },
  },
};

export function StudentProfile() {
  const [activeTab, setActiveTab] = useState(0);
  const { student, loading, getStudentProfile, errors, getIdCard } = useStudentStore();

  useEffect(() => {
    getStudentProfile();
    getIdCard();
  }, []);

  const TABS = [
    { id: 0, title: "Academic", icon: <GraduationCap className="h-4 w-4" /> },
    { id: 1, title: "Education", icon: <BookText className="h-4 w-4" /> },
    { id: 2, title: "Personal", icon: <UserCircle className="h-4 w-4" /> },
  ];

  if (loading) {
    return <ProfileSkeleton />;
  }

  if (errors.getStudentProfile || !student) {
    return (
      <ProfileError description={errors.getStudentProfile} onReload={getStudentProfile} />
    );
  }

  return (
    <div className="w-full">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.1,
            },
          },
        }}
      >
        <motion.div variants={textVariants}>
          <Card className="overflow-hidden">
            {/* Profile Header */}
            <CardHeader className="px-[32px] py-[24px]">
              <motion.div
                className="flex flex-col md:flex-row items-center gap-[24px]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <ProfileDialog />

                <div className="text-center md:text-left space-y-[8px]">
                  <CardTitle className="text-[30px] font-bold tracking-tight">
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      {student.StudentName}
                    </motion.div>
                  </CardTitle>
                  <motion.div
                    className="text-lg text-left sm:text-left font-medium text-muted-foreground"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    {student.Course}
                  </motion.div>
                  <motion.div
                    className="flex flex-wrap justify-center md:justify-start gap-[8px] mt-[8px]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    <Badge variant="secondary">ID: {student.StudentID}</Badge>
                    <Badge>Semester {student.YearSem}</Badge>
                    <Badge>{student.Section}</Badge>
                  </motion.div>
                </div>
              </motion.div>
            </CardHeader>

            {/* Tab Navigation */}
            <motion.div
              className="border-b bg-muted/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <div className="flex p-[8px] gap-[8px] justify-center">
                {TABS.map((tab) => (
                  <motion.button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`rounded-md px-[12px] text-[14px] py-[8px] font-medium shadow-md flex items-center gap-[8px] ${
                      activeTab === tab.id
                        ? "bg-background text-foreground"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + tab.id * 0.1 }}
                  >
                    {tab.icon}
                    {tab.title}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            <CardContent className="p-0">
              <ScrollArea>
                <AnimatePresence mode="wait">
                  {activeTab === 0 && (
                    <AcademicTab
                      textVariants={textVariants}
                      tabContentVariants={tabContentVariants}
                    />
                  )}
                  {activeTab === 1 && (
                    <EducationTab
                      textVariants={textVariants}
                      tabContentVariants={tabContentVariants}
                    />
                  )}
                  {activeTab === 2 && (
                    <PersonalTab
                      textVariants={textVariants}
                      tabContentVariants={tabContentVariants}
                    />
                  )}
                </AnimatePresence>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}

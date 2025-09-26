import React, { useState } from "react";
import {
  Bell,
  Compass,
  GraduationCap,
  HomeIcon,
  NotebookPen,
  Table,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import AttendanceTable from "./table/AttendanceTable";
import ExamSummary from "./exams/ExamSummary";
import TooltipWrapper from "./TooltipWrapper";
import FeeSubmissions from "./fees/FeeSubmitions";

// Dialog Components
const HomeDialog = () => (
  <DialogContent className="max-w-max">
    <DialogHeader>
      <DialogTitle>Home</DialogTitle>
    </DialogHeader>
    <div>Home content here...</div>
  </DialogContent>
);

const AttendanceDialog = () => (
  <DialogContent className="max-w-max">
    <DialogHeader>
      <DialogTitle className="text-2xl">
        Attendance
      </DialogTitle>
    </DialogHeader>
    <AttendanceTable />
  </DialogContent>
);

const ExamDialog = () => (
  <DialogContent className="max-w-max">
    <DialogHeader>
      <DialogTitle className="text-2xl">
        Exam Summary
      </DialogTitle>
    </DialogHeader>
    <ExamSummary />
  </DialogContent>
);

const FeeDialog = () => (
  <DialogContent className="max-w-max max-h-[90vh]">
    <DialogHeader>
      <DialogTitle className="sr-only text-2xl">
        Fee
      </DialogTitle>
    </DialogHeader>
    <FeeSubmissions />
  </DialogContent>
);

const data = [
  // { title: "Home", icon: HomeIcon, link: "https://student.geu.ac.in/Account/Cyborg_StudentMenu" },
  { title: "Home", icon: HomeIcon, component: HomeDialog },
  { title: "Attendance", icon: Table, component: AttendanceDialog },
  { title: "Exam", icon: NotebookPen, component: ExamDialog },
  { title: "Fee", icon: GraduationCap, component: FeeDialog },
];

const QuickAccessPanel = () => {
  const [activeDialog, setActiveDialog] = useState(null);

  const handleItemClick = (title) => {
    setActiveDialog(title);
  };

  const handleCloseDialog = () => {
    setActiveDialog(null);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            size="lg"
            className="z-[1001] size-[48px] rounded-full text-[16px]"
          >
            <Compass />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="rounded-3xl min-w-max p-2"
          align="end"
          side="left"
        >
          <DropdownMenuGroup className="flex gap-1">
            {data.map((item) => (
              <TooltipWrapper
                key={item.title}
                content={item.title}
                side={"top"}
                className="rounded-full"
              >
                <DropdownMenuItem
                  className="cursor-pointer rounded-full size-[48px] flex items-center justify-center"
                  onClick={() => handleItemClick(item.title)}
                >
                  <item.icon className="h-5 w-5" />
                </DropdownMenuItem>
              </TooltipWrapper>
            ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Dialogs */}
      {data.map((item) => (
        <Dialog
          key={item.title}
          open={activeDialog === item.title}
          onOpenChange={handleCloseDialog}
        >
          <item.component />
        </Dialog>
      ))}
    </>
  );
};

export default QuickAccessPanel;

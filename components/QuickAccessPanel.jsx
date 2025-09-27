import React, { useState } from "react";
import {
  CalendarCheck2,
  IndianRupee,
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
import Notification from "./Notification";


const AttendanceDialog = () => (
  <DialogContent className="max-w-max">
    <DialogHeader>
      <DialogTitle className="text-left text-2xl sm:text-3xl font-bold p-0 my-[16px] text-primary">
        Attendance
      </DialogTitle>
    </DialogHeader>
    <AttendanceTable />
  </DialogContent>
);

const ExamDialog = () => (
  <DialogContent className="max-w-[512px] w-full max-h-[70vh] h-full">
    <DialogHeader>
      <DialogTitle className="text-left text-2xl sm:text-3xl font-bold p-0 my-[16px] text-primary">
        Exam Summary
      </DialogTitle>
    </DialogHeader>
    <ExamSummary />
  </DialogContent>
);

const FeeDialog = () => (
  <DialogContent className="max-w-screen-sm w-full h-[70vh] overflow-auto">
    <DialogHeader>
      <DialogTitle className="sr-only text-2xl">Fee</DialogTitle>
    </DialogHeader>
    <FeeSubmissions />
  </DialogContent>
);

const data = [
  // { title: "Home", icon: HomeIcon, link: "https://student.geu.ac.in/Account/Cyborg_StudentMenu" },
  { title: "Attendance", icon: CalendarCheck2, component: AttendanceDialog },
  { title: "Exam", icon: NotebookPen, component: ExamDialog },
  { title: "Fee", icon: IndianRupee, component: FeeDialog },
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
      <div className="bg-background p-[8px] rounded-[20px] fixed bottom-4 right-4 flex items-center gap-[4px] text-muted-foreground">
        <TooltipWrapper
          content={"Notification"}
          side={"top"}
          className="rounded-full"
          sideOffset={10}
        >
          <Notification
            side="top"
            variant="ghost"
            className={"rounded-[12px] size-[38px]"}
          />
        </TooltipWrapper>
        {data.map((item) => (
          <TooltipWrapper
            key={item.title}
            content={item.title}
            side={"top"}
            className="rounded-full"
            sideOffset={10}
          >
            <Button
              variant="ghost"
              className="rounded-[12px] size-[38px]"
              onClick={() => handleItemClick(item.title)}
            >
              <item.icon className="h-5 w-5" />
            </Button>
          </TooltipWrapper>
        ))}
      </div>

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

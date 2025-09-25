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
      <DialogTitle className="text-2xl sm:text-3xl font-bold mb-2">
        Attendance
      </DialogTitle>
    </DialogHeader>
    <AttendanceTable />
  </DialogContent>
);

const ExamDialog = () => (
  <DialogContent className="max-w-max">
    <DialogHeader>
      <DialogTitle>Exam</DialogTitle>
    </DialogHeader>
    <div>Exam content here...</div>
  </DialogContent>
);

const NotificationsDialog = () => (
  <DialogContent className="max-w-max">
    <DialogHeader>
      <DialogTitle>Notifications</DialogTitle>
    </DialogHeader>
    <div>Notifications content here...</div>
  </DialogContent>
);

const FeeDialog = () => (
  <DialogContent className="max-w-max">
    <DialogHeader>
      <DialogTitle>Fee</DialogTitle>
    </DialogHeader>
    <div>Fee content here...</div>
  </DialogContent>
);

const data = [
  { title: "Home", icon: HomeIcon, component: HomeDialog },
  { title: "Attendance", icon: Table, component: AttendanceDialog },
  { title: "Exam", icon: NotebookPen, component: ExamDialog },
  { title: "Fee", icon: GraduationCap, component: FeeDialog },
  { title: "Notifications", icon: Bell, component: NotificationsDialog },
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
            className="fixed bottom-4 right-4 z-[1001] size-[48px] rounded-full text-[16px] bg-[#171717]"
          >
            <Compass />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="rounded-3xl min-w-max p-2"
          align="end"
          side="top"
        >
          <DropdownMenuGroup className="flex flex-col gap-1">
            {data.map((item) => (
              <DropdownMenuItem
                key={item.title}
                className="cursor-pointer rounded-full size-[48px] flex items-center justify-center"
                onClick={() => handleItemClick(item.title)}
              >
                <item.icon className="h-5 w-5" />
              </DropdownMenuItem>
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

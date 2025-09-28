import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import {
  CalendarCheck2,
  IndianRupee,
  NotebookPen,
  Sparkles,
} from "lucide-react";
import { Button } from "./ui/button";
import TooltipWrapper from "./TooltipWrapper";
import Notification from "./Notification";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import AttendanceTable from "./table/AttendanceTable";
import ExamSummary from "./exams/ExamSummary";
import FeeSubmissions from "./fees/FeeSubmitions";
import Homepage from "./Homepage";

const data = [
  { title: "Attendance", icon: CalendarCheck2, component: AttendanceTable },
  { title: "Exam", icon: NotebookPen, component: ExamSummary },
  { title: "Fee", icon: IndianRupee, component: FeeSubmissions },
  { title: "Enhance", icon: Sparkles, onClick: null }, // will toggle homepage
];

// localStorage key for persistency
const ENHANCE_STORAGE_KEY = "geu-enhanced-homepage";

const QuickAccessPanel = () => {
  const [activeDialog, setActiveDialog] = useState(null);
  const [enhancedHomepage, setEnhancedHomepage] = useState(false);

  // Load enhanced state from localStorage on component mount
  useEffect(() => {
    const savedEnhancedState = localStorage.getItem(ENHANCE_STORAGE_KEY);
    if (savedEnhancedState !== null) {
      const isEnhanced = JSON.parse(savedEnhancedState);
      setEnhancedHomepage(isEnhanced);
      
      // Apply the saved state to the DOM
      if (isEnhanced) {
        applyEnhancedHomepageState(true);
      }
    }
  }, []);

  // Function to apply enhanced homepage state to DOM
  const applyEnhancedHomepageState = (isEnhanced) => {
    const defaultContainer = document.getElementById("body");
    let customContainer = document.getElementById("geu-custom-homepage");

    // Set background color only when enhanced
    if (isEnhanced) {
      document.body.style.backgroundColor = "hsl(var(--background))";
    } else {
      // Reset to original background color when not enhanced
      document.body.style.backgroundColor = "";
    }

    if (customContainer) {
      customContainer.style.display = isEnhanced ? "block" : "none";
      if (defaultContainer) {
        defaultContainer.style.display = isEnhanced ? "none" : "block";
      }
    } else if (isEnhanced) {
      // First time injection
      customContainer = document.createElement("div");
      customContainer.id = "geu-custom-homepage";
      customContainer.style.display = "block";
      if (defaultContainer) {
        defaultContainer.style.display = "none";
      }
      document.body.appendChild(customContainer);

      const root = createRoot(customContainer);
      root.render(<Homepage />);
    }
  };

  const handleEnhanceToggle = () => {
    const newEnhancedState = !enhancedHomepage;
    
    // Update state
    setEnhancedHomepage(newEnhancedState);
    
    // Save to localStorage
    localStorage.setItem(ENHANCE_STORAGE_KEY, JSON.stringify(newEnhancedState));
    
    // Apply to DOM
    applyEnhancedHomepageState(newEnhancedState);
  };

  // Cleanup function for component unmount
  useEffect(() => {
    return () => {
      // Reset background color when component unmounts (optional)
      document.body.style.backgroundColor = "";
    };
  }, []);

  return (
    <>
      {/* Quick Access Buttons */}
      <div className="z-[1001] border bg-background p-[6px] rounded-[20px] fixed bottom-4 right-4 flex gap-2 text-muted-foreground">
        <TooltipWrapper content="Notification" side="top">
          <Notification
            variant="ghost"
            className={"size-[42px] rounded-[16px]"}
          />
        </TooltipWrapper>

        {data.map((item) => (
          <TooltipWrapper key={item.title} content={item.title} side="top">
            <Button
              variant={
                item.title === "Enhance" && enhancedHomepage
                  ? "default"
                  : "ghost"
              }
              className={`size-[42px] rounded-[16px]`}
              onClick={() => {
                if (item.title === "Enhance") {
                  handleEnhanceToggle();
                } else {
                  setActiveDialog(item.title);
                }
              }}
            >
              <item.icon className="h-5 w-5" />
            </Button>
          </TooltipWrapper>
        ))}
      </div>

      {/* Dialogs */}
      {data.map(
        (item) =>
          item.component && (
            <Dialog
              key={item.title}
              open={activeDialog === item.title}
              onOpenChange={() => setActiveDialog(null)}
            >
              <DialogContent className="max-w-[768px] w-s w-full max-h-[70vh] h-max overflow-auto">
                <DialogHeader>
                  <DialogTitle className="sr-only">{item.title}</DialogTitle>
                </DialogHeader>
                <item.component />
              </DialogContent>
            </Dialog>
          )
      )}
    </>
  );
};

export default QuickAccessPanel;
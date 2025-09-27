// content.jsx
import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { Button } from "@/components/ui/button";
import "../entrypoints/popup/style.css";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Activity,
  Component,
  HomeIcon,
  IdCard as IdCardIcon,
  Mail,
  Package,
  ScrollText,
  SunMoon,
} from "lucide-react";
import QuickAccessPanel from "@/components/QuickAccessPanel";
import ProfilePhotoUploader from "@/components/ProfilePhotoUploader";
import { TooltipProvider } from "@/components/ui/tooltip";
import Notification from "@/components/Notification";
import IdCard from "@/components/IdCard";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ThemeProvider } from "@/components/theme-provider";

export default defineContentScript({
  matches: ["*://*.student.geu.ac.in/*", "*://*.student.gehu.ac.in/*"],
  allFrames: true,
  main() {
    console.log("✅ CONTENT SCRIPT IS LOADING ON GEU!");
    waitForProfile();
  },
});

function waitForProfile() {
  const img = document.getElementById("ImgEmp");
  if (img) injectComponents(img);
}

function injectComponents(img) {
  if (document.getElementById("geu-extension-btn")) return;

  // wrapper for positioning
  const wrapper = document.createElement("div");
  wrapper.style.position = "relative";
  wrapper.style.width = "max-content";
  wrapper.style.margin = "auto";
  img.parentElement.insertBefore(wrapper, img);
  wrapper.appendChild(img);

  // container for ProfilePhotoUploader
  const dialogContainer = document.createElement("div");
  dialogContainer.id = "geu-extension-btn";
  dialogContainer.style.position = "absolute";
  dialogContainer.style.bottom = "4px";
  dialogContainer.style.right = "4px";
  wrapper.appendChild(dialogContainer);

  // remove navbar & extras
  document.querySelector(".row.rowgap")?.style &&
    (document.querySelector(".row.rowgap").style.display = "none");
  document.querySelector("#header-navbar.div-only-mobile")?.style &&
    (document.querySelector("#header-navbar.div-only-mobile").style.display =
      "none");

  // container for QuickAccessPanel
  const quickAccess = document.createElement("div");
  quickAccess.id = "geu-quick-access";
  document.body.appendChild(quickAccess);

  // container for IdCardDialog
  const idCardContainer = document.createElement("div");
  idCardContainer.id = "geu-id-card-dialog";
  document.body.appendChild(idCardContainer);

  // React roots
  const dialogRoot = createRoot(dialogContainer);
  const quickAccessRoot = createRoot(quickAccess);
  const idCardRoot = createRoot(idCardContainer);

  // Mount Profile Photo Uploader
  dialogRoot.render(
    <ThemeProvider defaultTheme="dark">
      <TooltipProvider>
        <ProfilePhotoUploader img={img} />
      </TooltipProvider>
    </ThemeProvider>
  );

  // Mount Quick Access Panel
  quickAccessRoot.render(
    <ThemeProvider defaultTheme="dark">
      <TooltipProvider>
          <QuickAccessPanel />
      </TooltipProvider>
    </ThemeProvider>
  );

  // Mount IdCard Dialog
  idCardRoot.render(
    <ThemeProvider defaultTheme="dark">
      <TooltipProvider>
        <IdCardDialog img={img} />
      </TooltipProvider>
    </ThemeProvider>
  );
}

// -------------------
// IdCard Dialog Component
// -------------------
const IdCardDialog = ({ img }) => {
  const [open, setOpen] = useState(false);

  React.useEffect(() => {
    if (!img) return;

    const handleClick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      setOpen(true);
    };

    img.style.cursor = "pointer";
    img.addEventListener("click", handleClick);

    return () => img.removeEventListener("click", handleClick);
  }, [img]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-max">
        <DialogHeader className={"sr-only"}>
          <DialogTitle>Your ID Card</DialogTitle>
        </DialogHeader>
        <IdCard />
      </DialogContent>
    </Dialog>
  );
};

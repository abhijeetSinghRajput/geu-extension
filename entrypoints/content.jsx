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
  Mail,
  Package,
  ScrollText,
  SunMoon,
} from "lucide-react";
import QuickAccessPanel from "@/components/QuickAccessPanel";
import ProfilePhotoUploader from "@/components/ProfilePhotoUploader";
import { TooltipProvider } from "@/components/ui/tooltip";

export default defineContentScript({
  matches: ["*://*.student.geu.ac.in/*"],
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

  // container for React dialog component
  const dialogContainer = document.createElement("div");
  dialogContainer.id = "geu-extension-btn";
  dialogContainer.style.position = "absolute";
  dialogContainer.style.bottom = "4px";
  dialogContainer.style.right = "4px";
  wrapper.appendChild(dialogContainer);

  // removing the navbar and unnecessary fields.
  document.querySelector('.row.rowgap').style.display = "none";
  document.querySelector("#header-navbar.div-only-mobile").style.display = "none";

  // container for dock component
  if (document.getElementById("geu-quick-access")) return;
  const quickAccess = document.createElement("div");
  quickAccess.id = "geu-quick-access";
  document.body.appendChild(quickAccess);

  // React roots
  const dialogRoot = createRoot(dialogContainer);
  const quickAccessRoot = createRoot(quickAccess);

  // Wrap each component with TooltipProvider
  dialogRoot.render(
    <TooltipProvider>
      <ProfilePhotoUploader img={img} />
    </TooltipProvider>
  );
  
  quickAccessRoot.render(
    <TooltipProvider>
      <QuickAccessPanel />
    </TooltipProvider>
  );
}
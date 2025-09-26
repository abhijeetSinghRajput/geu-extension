import React from "react";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
const TooltipWrapper = ({ children, content, side, ...props }) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent side={side} {...props}>
        {content}
      </TooltipContent>
    </Tooltip>
  );
};

export default TooltipWrapper;

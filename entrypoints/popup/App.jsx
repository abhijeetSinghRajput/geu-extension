import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/mode-toggle";
import { TooltipProvider } from "@/components/ui/tooltip";
import TooltipWrapper from "@/components/TooltipWrapper";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { CodeBlock } from "@/components/ui/code-block";
const App = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <TooltipProvider>
        <Card className="w-[400px] bg-zinc outline-none border-none rounded-xl overflow-hidden">
          <CardHeader>
            <CardTitle className="flex items-center justify-between text-2xl font-bold">
              <div>
              <div>Title</div>
              <Avatar >
                <AvatarImage src={"./wxt.svg"} className="object-contain"/>
                <AvatarFallback className="text-sm text-muted-foreground font-medium">AK</AvatarFallback>
              </Avatar>
              </div>
              
                <ModeToggle variant="outline" />
            </CardTitle>
            <CardDescription>description</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <CodeBlock
              filename={"App.jsx"}
              language={"html"}
              code={`<CardHeader>
  <CardTitle className="flex items-center justify-between text-2xl font-bold">
    <div>
      <div>Title</div>
      <Avatar >
        <AvatarImage src={"./wxt.svg"} className="object-contain"/>
        <AvatarFallback className="text-sm text-muted-foreground font-medium">AK</AvatarFallback>
      </Avatar>
    </div>
    
      <ModeToggle variant="outline" />
  </CardTitle>
  <CardDescription>description</CardDescription>
</CardHeader>`}
            />
          </CardContent>
        </Card>
      </TooltipProvider>
    </ThemeProvider>
  );
};

export default App;

import { Moon, Sun } from "lucide-react";
import { Button } from "./ui/button";
import { useTheme } from "./theme-provider";
import { cn } from "../lib/utils";
import TooltipWrapper from "./TooltipWrapper";

export function ModeToggle({ className, ...props }) {
  const { setTheme, theme } = useTheme();
  const toggleMode = () => setTheme(theme === "light" ? "dark" : "light");

  return (
    <TooltipWrapper content={`switch to ${theme === "light" ? "Dark" : "Light"}`}>
      <Button
        variant="default"
        onClick={toggleMode}
        className={cn("h-8", className)}
        {...props}
      >
        {theme === "light" ? <Sun /> : <Moon />}
        <span className="capitalize">{theme}</span>
      </Button>
    </TooltipWrapper>
  );
}

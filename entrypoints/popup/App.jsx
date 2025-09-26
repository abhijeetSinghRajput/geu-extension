import React, { useEffect, useState } from "react";
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
import axios from "axios";
import { ExternalLink } from "lucide-react";

const App = () => {
  const [githubStarsCount, setGithubStarsCount] = useState(null);
  const [loadingStars, setLoadingStars] = useState(true);

  const handleGithubClick = () => {
    window.open("https://github.com/abhijeetsinghrajput/geu-erp", "_blank");
  };

  useEffect(() => {
    const getGithubStarCount = async () => {
      try {
        const { data } = await axios.get(
          "https://api.github.com/repos/abhijeetsinghrajput/geu-erp"
        );
        setGithubStarsCount(data.stargazers_count);
      } catch (error) {
        console.error("Error fetching GitHub stars:", error);
      } finally {
        setLoadingStars(false);
      }
    };
    getGithubStarCount();
  }, []);

  const quickLinks = [
    { label: "Forgot ID", href: "https://geu-erp.onrender.com/forgot-id" },
    {
      label: "Forgot Password",
      href: "https://geu-erp.onrender.com/forgot-password",
    },
    {
      label: "Privacy Policy",
      href: "https://geu-erp.onrender.com/privacy-policy",
    },
    { label: "Docs", href: "https://geu-erp.onrender.com/docs" },
  ];

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <TooltipProvider>
        <Card className="w-[400px] overflow-hidden rounded-2xl shadow-lg border-none border-muted p-2">
          {/* Header */}
          <CardHeader>
            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                <Avatar className="size-9">
                  <AvatarImage src="/icon/256.png" />
                  <AvatarFallback>GE</AvatarFallback>
                </Avatar>
                <CardTitle className="text-xl">GEU quick access</CardTitle>
              </div>
              {/* Actions: GitHub + Theme */}
              <div className="flex items-center gap-2">
                {loadingStars ? (
                  <Skeleton className="h-8 w-16 rounded-md" />
                ) : (
                  <TooltipWrapper content="Star us on GitHub">
                    <Button variant="secondary" onClick={handleGithubClick}>
                      {githubStarsCount}

                      <svg
                        role="img"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <title>GitHub</title>
                        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                      </svg>
                    </Button>
                  </TooltipWrapper>
                )}

                <ModeToggle variant="secondary" className={"size-9"} />
              </div>
            </div>
            <CardDescription>
              Instant access to attendance, results, fees, and notifications.
            </CardDescription>
          </CardHeader>

          {/* Content */}
          <CardContent className="space-y-6">
            {/* Quick Links */}
            <div>
              <div className="grid grid-cols-2 gap-2">
                {quickLinks.map((link, i) => (
                  <Button
                    key={i}
                    variant="secondary"
                    size="sm"
                    className="rounded-lg"
                    onClick={() => window.open(link.href, "_blank")}
                  >
                    {link.label}
                    <ExternalLink  className="text-muted-foreground"/>
                  </Button>
                ))}
              </div>
              <Button className="w-full mt-4">Free trial</Button>
            </div>
          </CardContent>
        </Card>
      </TooltipProvider>
    </ThemeProvider>
  );
};

export default App;

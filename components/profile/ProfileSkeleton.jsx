"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Phone,
  Cake,
  BookText,
  UserCircle,
  Home,
  WalletCards,
  GraduationCap,
} from "lucide-react";
import { useStudentStore } from "@/stores/useStudentStore";
import { Skeleton } from "../ui/skeleton";
import avatar from "../../public/avatar.svg";


const ProfileSkeleton = () => {
  const { student } = useStudentStore();
  const [activeTab, setActiveTab] = useState(0);

  const TABS = [
    { id: 0, title: "Academic", icon: <GraduationCap className="h-[16px] w-[16px]" /> },
    { id: 1, title: "Education", icon: <BookText className="h-[16px] w-[16px]" /> },
    { id: 2, title: "Personal", icon: <UserCircle className="h-[16px] w-[16px]" /> },
  ];

  return (
    <div className="w-full">
      <Card className="overflow-hidden">
        {/* Profile Header */}
        <CardHeader className="px-[32px] py-[24px]">
          <div className="flex flex-col md:flex-row items-center gap-[24px]">
            <div className="size-[128px] rounded-full overflow-hidden animate-pulse">
              <img src={avatar} className="opacity-20" />
            </div>

            <div className="text-center md:text-left space-y-2">
              <CardTitle className="text-[30px] font-bold tracking-tight">
                <Skeleton className="h-[36px" />
              </CardTitle>
              <div className="text-[18px] font-medium text-muted-foreground">
                <Skeleton className="h-[26px] w-[250px]" />
              </div>

              <div className="flex flex-wrap justify-center md:justify-start gap-[8px] mt-[8px]">
                <Skeleton className="h-[20px] w-[48px]" />
                <Skeleton className="h-[20px] w-[48px]" />
                <Skeleton className="h-[20px] w-[48px]" />
              </div>
            </div>
          </div>
        </CardHeader>

        {/* Tab Navigation */}
        <div className="border-b bg-muted/40">
          <div className="flex p-[8px] gap-[8px] justify-center">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`rounded-md px-3 py-2 text-[14px] font-medium flex items-center gap-[8px] ${
                  activeTab === tab.id
                    ? "bg-background text-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {tab.icon}
                {tab.title}
              </button>
            ))}
          </div>
        </div>

        <CardContent className="p-0">
          {/* Academic Tab */}
          {activeTab === 0 && (
            <div className="p-[32px]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-[32px]">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-[14px] font-medium text-muted-foreground uppercase mb-2">
                      Enrollment Details
                    </h3>
                    <dl className="space-y-4">
                      <div className="flex items-start">
                        <dt className="w-[160px] flex-shrink-0 text-[14px] font-medium text-muted-foreground">
                          Enrollment No
                        </dt>
                        <dd className="text-[14px] font-mono">
                          <Skeleton className="h-[20px] w-[96px]" />
                        </dd>
                      </div>
                      <div className="flex items-start">
                        <dt className="w-[160px] flex-shrink-0 text-[14px] font-medium text-muted-foreground">
                          University Roll No
                        </dt>
                        <dd className="text-[14px] font-mono">
                          <Skeleton className="h-[20px] w-[96px]" />
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-[14px] font-medium text-muted-foreground uppercase mb-[8px]">
                      Contact Information
                    </h3>
                    <dl className="space-y-4">
                      <div className="flex items-start">
                        <dt className="w-[160px] flex-shrink-0 text-[14px] font-medium text-muted-foreground">
                          Personal Email
                        </dt>
                        <dd className="text-[14px]">
                          <Skeleton className="h-[20px] w-[200px]" />
                        </dd>
                      </div>
                      <div className="flex items-start">
                        <dt className="w-[160px] flex-shrink-0 text-[14px] font-medium text-muted-foreground">
                          University Email
                        </dt>
                        <dd className="text-[14px]">
                          <Skeleton className="h-[20px] w-[150px]" />
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Education Tab */}
          {activeTab === 1 && (
            <div className="p-[32px]">
              <div className="space-y-8">
                <div>
                  <h3 className="text-[14px] font-medium text-muted-foreground uppercase mb-4">
                    Academic Performance
                  </h3>
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-[14px] font-medium">10th Grade</span>
                        <span className="text-[14px] font-medium">
                          <Skeleton className="h-[20px] w-12" />
                        </span>
                      </div>
                      <Skeleton className={"w-full h-2"} />
                    </div>

                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-[14px] font-medium">12th Grade</span>
                        <span className="text-[14px] font-medium">
                          <Skeleton className="h-[20px] w-12" />
                        </span>
                      </div>
                      <Skeleton className={"w-full h-2"} />
                    </div>

                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-[14px] font-medium">Graduation</span>
                        <span className="text-[14px] font-medium">
                          <Skeleton className="h-[20px] w-12" />
                        </span>
                      </div>
                      <Skeleton className={"w-full h-2"} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Personal Tab */}
          {activeTab === 2 && (
            <div className="p-[32px]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-[32px]">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-[14px] font-medium text-muted-foreground uppercase mb-4">
                      Personal Details
                    </h3>
                    <dl className="space-y-4">
                      <div className="flex items-start">
                        <dt className="w-[160px] flex-shrink-0 text-[14px] font-medium text-muted-foreground">
                          <div className="flex items-center gap-[8px]">
                            <Phone className="h-[16px] w-[16px]" />
                            Mobile
                          </div>
                        </dt>
                        <Skeleton className="h-[20px] w-[80px]" />
                      </div>

                      <div className="flex items-start">
                        <dt className="w-[160px] flex-shrink-0 text-[14px] font-medium text-muted-foreground">
                          <div className="flex items-center gap-[8px]">
                            <Cake className="h-[16px] w-[16px]" />
                            Date of Birth
                          </div>
                        </dt>
                        <Skeleton className="h-[20px] w-[80px]" />
                      </div>

                      <div className="flex items-start">
                        <dt className="w-[160px] flex-shrink-0 text-[14px] font-medium text-muted-foreground">
                          <div className="flex items-center gap-[8px]">
                            <WalletCards className="h-[16px] w-[16px]" />
                            ABC Account
                          </div>
                        </dt>
                        <Skeleton className="h-[20px] w-[96px]" />
                      </div>

                      <div className="flex items-start">
                        <dt className="w-[160px] flex-shrink-0 text-[14px] font-medium text-muted-foreground">
                          <div className="flex items-center gap-[8px]">
                            <Home className="h-[16px] w-[16px]" />
                            Address
                          </div>
                        </dt>
                        <div className="space-y-1 w-full">
                          <Skeleton className="h-[16px] w-full" />
                          <Skeleton className="h-[16px] w-full" />
                          <Skeleton className="h-[16px] w-1/2 max-w-52" />
                        </div>
                      </div>
                    </dl>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-[14px] font-medium text-muted-foreground uppercase mb-4">
                      Family Details
                    </h3>
                    <dl className="space-y-4">
                      <div className="flex items-start">
                        <dt className="w-[160px] flex-shrink-0 text-[14px] font-medium text-muted-foreground">
                          Father's Name
                        </dt>
                        <Skeleton className="h-[20px] w-[80px]" />
                      </div>

                      <div className="flex items-start">
                        <dt className="w-[160px] flex-shrink-0 text-[14px] font-medium text-muted-foreground">
                          Father's Mobile
                        </dt>
                        <Skeleton className="h-[20px] w-[80px]" />
                      </div>

                      <div className="flex items-start">
                        <dt className="w-[160px] flex-shrink-0 text-[14px] font-medium text-muted-foreground">
                          Mother's Name
                        </dt>
                        <Skeleton className="h-[20px] w-[80px]" />
                      </div>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileSkeleton;

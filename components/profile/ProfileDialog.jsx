import React from "react";
import {
  MorphingDialog,
  MorphingDialogTrigger,
  MorphingDialogContainer,
  MorphingDialogContent,
  MorphingDialogClose,
} from "../ui/morphing-dialog";
import { Skeleton } from "../ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useStudentStore } from "../../stores/useStudentStore";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import IdCard from "./IdCard";
import { XIcon } from "lucide-react";
import ProfilePhotoUploader from "./ProfilePhotoUploader";
import avatar from "../../public/avatar.svg";

const ProfileDialog = () => {
  const { student } = useStudentStore();
  const { idCard, loadingIdCard } = useStudentStore();

  return (
    <MorphingDialog
      transition={{
        duration: 0.3,
        ease: "easeInOut",
      }}
    >
      <div className="relative">
        <MorphingDialogTrigger>
          {loadingIdCard ? (
            <div className="size-[128px] rounded-full overflow-hidden animate-pulse">
              <img src={avatar} className="opacity-20" />
            </div>
          ) : (
            <div className="relative">
              <Avatar className="size-[128px]">
                <AvatarImage src={idCard?.Photo} />
                <AvatarFallback className="text-[36px] text-muted-foreground">
                  {student.StudentName[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </div>
          )}
        </MorphingDialogTrigger>
        <ProfilePhotoUploader className={"absolute bottom-0 right-0"} />
      </div>
      <MorphingDialogContainer>
        <MorphingDialogContent
          className="relative rounded-none"
          style={{
            maxWidth: "min(100svw, 70svh)",
          }}
        >
          <ScrollArea>
            {/* <img src={avatarBlobUrl} /> */}
            <IdCard />
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </MorphingDialogContent>
        <MorphingDialogClose
          className="fixed right-[24px] top-[24px] h-fit w-fit rounded-full bg-white p-1"
          variants={{
            initial: { opacity: 0 },
            animate: {
              opacity: 1,
              transition: { delay: 0.3, duration: 0.1 },
            },
            exit: { opacity: 0, transition: { duration: 0 } },
          }}
        >
          <XIcon className="h-[20px] w-[20px] text-zinc-500" />
        </MorphingDialogClose>
      </MorphingDialogContainer>
    </MorphingDialog>
  );
};

export default ProfileDialog;

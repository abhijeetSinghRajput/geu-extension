import { useEffect, useMemo } from "react";
import { useExamStore } from "../stores/useExamStore";
import { useNoticeStore } from "../stores/useNoticeStore";
import { Popover, PopoverTrigger, PopoverContent } from "./ui/popover";
import { Button } from "./ui/button";
import { Bell, Loader2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { cn } from "../lib/utils";

const Notification = ({ variant = "default", className }) => {
  const { getAdmitCard, admitCards, loadingAdmitCard } = useExamStore();
  const { popupCirculars } = useNoticeStore();

  const fetchNotifications = () => {
    ["sessional", "endTerm", "midTerm"].forEach(getAdmitCard);
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  // Prepare admit card notifications
  const admitCardItems = useMemo(() => {
    return Object.entries(admitCards)
      .filter(([_, value]) => value)
      .map(([examType, card]) => ({
        id: `admit-${examType}`,
        type: "admitCard",
        title: `Semester ${card?.YearSem}`,
        subtitle: card?.Course,
        caption: card?.Caption,
        badge: examType,
      }));
  }, [admitCards]);

  // Prepare circular notifications
  const circularItems = useMemo(() => {
    return popupCirculars.map((c) => ({
      id: `circular-${c.CirID}`,
      type: "circular",
      title: `${c.ByDepartment} Department`,
      subtitle: "",
      caption: c.Notice,
    }));
  }, [popupCirculars]);

  const notifications = [...admitCardItems, ...circularItems];
  const hasNotifications = notifications.length > 0;
  const isLoading = loadingAdmitCard;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={variant}
          size="icon"
          className={cn("group relative size-[48px] rounded-full", className)}
        >
          <Bell className="h-5 w-5" />
          {hasNotifications && (
            <Badge className={"rounded-full text-[12px] aspect-square absolute top-0 right-0 bg-red-500 hover:bg-red-500 text-primary-foreground px-2"}>
              {notifications.length > 9 ? "9+" : notifications.length}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent align="end" side="left" className="p-3 rounded-xl w-[288px]">
        <h3 className="font-semibold text-primary/90 mb-3">Notifications</h3>

        {/* Loading state */}
        {isLoading && (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="animate-spin" />
          </div>
        )}

        {/* Empty state */}
        {!isLoading && !hasNotifications && (
          <div className="flex flex-col items-center gap-3 py-8 text-center">
            <p className="text-[14px] text-muted-foreground">
              No notifications
            </p>
            <Button
              onClick={fetchNotifications}
              className="text-[14px] rounded-xl"
            >
              Reload
            </Button>
          </div>
        )}

        {/* Notifications list */}
        {!isLoading && hasNotifications && (
          <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
            {notifications.map((n) => (
              <Card key={n.id} className="bg-input/30 shadow-sm">
                <CardHeader className="flex-row items-center justify-between flex-wrap gap-2 p-3 pb-0">
                  <CardTitle className="text-[14px] font-medium">
                    {n.title}
                  </CardTitle>
                  {n.badge && <Badge className="capitalize">{n.badge}</Badge>}
                </CardHeader>
                <CardContent className="p-[12px] pt-[4px] space-y-1">
                  {n.caption &&
                    (n.type === "circular" ? (
                      <div
                        className="text-[12px] text-muted-foreground"
                        dangerouslySetInnerHTML={{ __html: n.caption }}
                      />
                    ) : (
                      <div className="text-[12px] text-muted-foreground font-semibold">
                        {n.caption}
                      </div>
                    ))}

                  {n.subtitle && (
                    <p className="text-[12px] text-muted-foreground/70">
                      {n.subtitle}
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default Notification;

import React, { useEffect, useState, useMemo } from "react";
import { Calendar } from "@/components/ui/calendar";
import {
  startOfMonth,
  endOfMonth,
  parse,
  startOfWeek,
  endOfWeek,
  addWeeks,
  isSameMonth,
} from "date-fns";
import { CheckCircle, X, Clock, RefreshCw } from "lucide-react";
import CalendarSkeleton from "./CalendarSkeleton";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { useAttendanceStore } from "@/stores/useAttendanceStore";

const AttendanceCalendar = ({ selectedSubject, data }) => {
  const { getAttendanceBySubject, isLoadingSubjectDetails } =
    useAttendanceStore();
  const [date, setDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(startOfMonth(new Date()));
  const [attendanceData, setAttendanceData] = useState(null);
  const { SubjectID, RegID, PeriodAssignID, TTID, LectureTypeID } =
    selectedSubject;

  // 🔁 Memoized map for fast lookup
  const attendanceMap = useMemo(() => {
    if (!attendanceData?.state) return new Map();

    const map = new Map();
    attendanceData.state.forEach((item) => {
      if (item.AttendanceType === "N/A") return;

      const dateKey = parse(
        item.AttendanceDate,
        "dd/MM/yyyy",
        new Date()
      ).getTime();
      map.set(dateKey, item);
    });
    return map;
  }, [attendanceData]);

  const getAttendanceForDate = (date) => {
    return attendanceMap.get(date.getTime());
  };

  const fetchAttendance = async () => {
    if (!selectedSubject) return;

    const visibleStart = startOfWeek(startOfMonth(currentMonth), {
      weekStartsOn: 0,
    });
    const visibleEnd = addWeeks(visibleStart, 6);

    const payload = {
      RegID,
      SubjectID,
      PeriodAssignID,
      TTID,
      LectureTypeID,
      DateFrom: visibleStart.toISOString(),
      DateTo: visibleEnd.toISOString(),
    };

    try {
      const result = await getAttendanceBySubject(SubjectID, payload);
      setAttendanceData(result);
    } catch (error) {
      console.error("Error fetching attendance data:", error);
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, [selectedSubject, SubjectID, getAttendanceBySubject, currentMonth]);

  if (isLoadingSubjectDetails) return <CalendarSkeleton />;

  if (!attendanceData) {
    return (
      <div className="flex flex-col gap-[8px] justify-center items-center h-[256]">
        <p>No attendance data available</p>
        <Button size="sm" onClick={fetchAttendance}>
          <RefreshCw />
          Reload
        </Button>
      </div>
    );
  }

  const todayMonth = startOfMonth(new Date());
  const startMonth = data?.DateFrom
    ? startOfMonth(new Date(data.DateFrom))
    : undefined;
  const endMonth = data?.DateTo ? endOfMonth(new Date(data.DateTo)) : undefined;

  const CustomDay = (props) => {
    const {
      day,
      modifiers,
      onClick,
      onFocus,
      onBlur,
      onKeyDown,
      onKeyUp,
      onMouseEnter,
      onMouseLeave,
    } = props;

    const { disabled, outside, hidden } = modifiers;
    const attendance = getAttendanceForDate(day.date);
    const dateNum = day.date.getDate();

    const baseClasses =
      "p-0 aspect-square flex items-center justify-center h-[36px] w-full rounded-md overflow-hidden";
    const buttonProps = {
      onClick,
      onFocus,
      onBlur,
      onKeyDown,
      onKeyUp,
      onMouseEnter,
      onMouseLeave,
      title: day.date.toDateString(),
    };

    if (!attendance || attendance.AttendanceType === "N/A") {
      return (
        <td className={cn(baseClasses)}>
          <Button
            variant="ghost"
            className={cn("px-[16px] py-[8px] w-full", outside && "opacity-50")}
            {...buttonProps}
          >
            {dateNum}
          </Button>
        </td>
      );
    }

    const statusStyles = {
      P: {
        icon: <CheckCircle strokeWidth={3} className="text-green-500" />,
        bg: "dark:bg-green-800/30 bg-green-500/30",
      },
      A: {
        icon: <X strokeWidth={3} className="text-red-500" />,
        bg: "dark:bg-red-900/30 bg-red-500/30",
      },
      L: {
        icon: <Clock strokeWidth={3} className="text-yellow-500" />,
        bg: "dark:bg-yellow-800/30 bg-yellow-500/30",
      },
    };

    const status = statusStyles[attendance.AttendanceType] || {};

    return (
      <td className={cn("relative", baseClasses)}>
        <Button
          variant="secondary"
          className={cn("w-full block", status.bg, outside && "opacity-50")}
          {...buttonProps}
        >
          <span className="absolute bottom-0.5 right-0.5">{status.icon}</span>
          {dateNum}
        </Button>
      </td>
    );
  };

  return (
    <div className="space-y-4">
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md text-center border w-full bg-input/30"
        month={currentMonth}
        onMonthChange={(month) => {
          setCurrentMonth(startOfMonth(month));
        }}
        components={{ Day: CustomDay }}
        fixedWeeks
        showOutsideDays
        defaultMonth={startMonth || new Date()}
        startMonth={startMonth}
        endMonth={endMonth}
        nextMonthButtonDisabled={isSameMonth(currentMonth, todayMonth)}
      />
    </div>
  );
};

export default AttendanceCalendar;

"use client";
import ActiveWeekDaySchedule from "@/components/client/ActiveWeekDaySchedule";
import MonthScheduleCalendar from "@/components/general/MonthScheduleCalendar";
import { useCalendarStore } from "@/components/ui/calendar/useCalendarStore";
import React, { useEffect } from "react";
import { useShallow } from "zustand/shallow";

export default function SchedulePage() {
  const { setSelectedDate, setInitCalendarDate } = useCalendarStore(
    useShallow((state) => ({
      setInitCalendarDate: state.setInitCalendarDate,
      setSelectedDate: state.setSelectedDate,
    }))
  );

  useEffect(() => {
    setInitCalendarDate(new Date());
    setSelectedDate(new Date());
  }, []);

  return (
    <div className="p-4">
      <MonthScheduleCalendar />
      <div className="mt-8 mb-4">
        <ActiveWeekDaySchedule />
      </div>
    </div>
  );
}

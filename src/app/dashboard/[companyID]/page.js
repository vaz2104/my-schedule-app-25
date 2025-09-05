"use client";
import ActiveWeekDaySchedule from "@/components/admin/ActiveWeekDaySchedule";
import WeekScheduleCalendar from "@/components/general/WeekScheduleCalendar";
import WeekScheduleStatistic from "@/components/admin/WeekScheduleStatistic";
import { useCalendarStore } from "@/components/ui/calendar/useCalendarStore";
import { useEffect, useState } from "react";
import { useShallow } from "zustand/shallow";

export default function DashboardHome() {
  const { setSelectedDate, setInitCalendarDate, setInitWeekDate } =
    useCalendarStore(
      useShallow((state) => ({
        setInitCalendarDate: state.setInitCalendarDate,
        setInitWeekDate: state.setInitWeekDate,
        setSelectedDate: state.setSelectedDate,
      }))
    );

  useEffect(() => {
    setInitCalendarDate(new Date());
    setInitWeekDate(new Date());
    setSelectedDate(new Date());
  }, []);

  return (
    <div className="p-4">
      <WeekScheduleStatistic />
      <div className="mt-6"></div>
      <WeekScheduleCalendar />
      <div className="mt-8 mb-4">
        <ActiveWeekDaySchedule />
      </div>
    </div>
  );
}

"use client";
import ActiveWeekDaySchedule from "@/components/admin/ActiveWeekDaySchedule";
import WeekScheduleCalendar from "@/components/general/WeekScheduleCalendar";
import WeekScheduleStatistic from "@/components/admin/WeekScheduleStatistic";
import { useCalendarStore } from "@/components/ui/calendar/useCalendarStore";
import { useEffect, useState } from "react";
import { useShallow } from "zustand/shallow";

export default function DashboardHome() {
  const { initCalendarDate } = useCalendarStore(
    useShallow((state) => ({
      initCalendarDate: state.initCalendarDate,
    }))
  );

  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    setSelectedDate(initCalendarDate);
  }, [initCalendarDate]);

  return (
    <div className="p-4">
      <WeekScheduleStatistic />
      <div className="mt-6"></div>
      <WeekScheduleCalendar setSelectedDate={setSelectedDate} />
      <div className="mt-8 mb-4">
        <ActiveWeekDaySchedule selectedDate={selectedDate} />
      </div>
    </div>
  );
}

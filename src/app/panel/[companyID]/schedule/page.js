"use client";
import ActiveWeekDaySchedule from "@/components/client/ActiveWeekDaySchedule";
import MonthScheduleCalendar from "@/components/general/MonthScheduleCalendar";
import { useCalendarStore } from "@/components/ui/calendar/useCalendarStore";
import React, { useState } from "react";
import { useShallow } from "zustand/shallow";

export default function SchedulePage() {
  const { initCalendarDate } = useCalendarStore(
    useShallow((state) => ({
      initCalendarDate: state.initCalendarDate,
    }))
  );
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <div className="p-4">
      <MonthScheduleCalendar
        selectedDate={selectedDate}
        initCalendarDate={initCalendarDate}
        setSelectedDate={setSelectedDate}
      />
      <div className="mt-8 mb-4">
        <ActiveWeekDaySchedule selectedDate={selectedDate} />
      </div>
    </div>
  );
}

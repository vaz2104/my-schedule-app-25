"use client";
import ActiveWeekDaySchedule from "@/components/client/ActiveWeekDaySchedule";
import MonthScheduleCalendar from "@/components/general/MonthScheduleCalendar";
import { useCalendarStore } from "@/components/ui/calendar/useCalendarStore";
import { getSelectedDateOnCalendarChange } from "@/lib/schedule-helpers";
import React, { useEffect, useState } from "react";
import { useShallow } from "zustand/shallow";

export default function SchedulePage() {
  const { initCalendarDate, setInitCalendarDate, setSelectedDate } =
    useCalendarStore(
      useShallow((state) => ({
        initCalendarDate: state.initCalendarDate,
        setInitCalendarDate: state.setInitCalendarDate,
        setSelectedDate: state.setSelectedDate,
      }))
    );
  const [selectedCustomDate, setSelectedCustomDate] = useState(new Date());

  useEffect(() => {
    setInitCalendarDate(new Date());
    setSelectedDate(new Date());
  }, []);

  useEffect(() => {
    setSelectedCustomDate(getSelectedDateOnCalendarChange(initCalendarDate));
  }, [initCalendarDate]);

  // console.log(selectedCustomDate);

  return (
    <div className="p-4">
      <MonthScheduleCalendar
        selectedDate={selectedCustomDate}
        initCalendarDate={initCalendarDate}
        setSelectedDate={setSelectedCustomDate}
      />
      <div className="mt-8 mb-4">
        <ActiveWeekDaySchedule selectedDate={selectedCustomDate} />
      </div>
    </div>
  );
}

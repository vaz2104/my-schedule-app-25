"use client";

import { useEffect } from "react";
import ActiveDaySchedule from "./ActiveDaySchedule";
import { useCalendarStore } from "../ui/calendar/useCalendarStore";
import { useShallow } from "zustand/shallow";
import MonthScheduleStatistic from "./MonthScheduleStatistic";
import MonthScheduleCalendar from "../general/MonthScheduleCalendar";
import WorkerStatusControls from "./WorkerStatusControls";

export default function ScheduleSingle() {
  const { initCalendarDate, setSelectedDate, setInitCalendarDate } =
    useCalendarStore(
      useShallow((state) => ({
        initCalendarDate: state.initCalendarDate,
        setSelectedDate: state.setSelectedDate,
        setInitCalendarDate: state.setInitCalendarDate,
        selectedDate: state.selectedDate,
      }))
    );

  function getSelectedDateOnCalendarChange(initDate) {
    return new Date(initDate).getMonth() === new Date().getMonth()
      ? new Date()
      : initDate;
  }

  useEffect(() => {
    setInitCalendarDate(new Date());
    setSelectedDate(new Date());
  }, []);

  useEffect(() => {
    setSelectedDate(getSelectedDateOnCalendarChange(initCalendarDate));
  }, [initCalendarDate]);

  return (
    <div className="p-4 ">
      <WorkerStatusControls />
      <MonthScheduleStatistic />
      <MonthScheduleCalendar />
      <ActiveDaySchedule />
    </div>
  );
}

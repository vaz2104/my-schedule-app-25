"use client";

import { cn } from "@/lib/cn";
import { useEffect, useState } from "react";
import ActiveDaySchedule from "./ActiveDaySchedule";
import { useCalendarStore } from "../ui/calendar/useCalendarStore";
import { useShallow } from "zustand/shallow";
import MonthScheduleStatistic from "./MonthScheduleStatistic";
import Thumbnail from "../ui/Thumbnail";
import MonthScheduleCalendar from "./MonthScheduleCalendar";

export default function ScheduleSingle({ isWorkerSchedule = false }) {
  const { initCalendarDate, setSelectedCalendarDate, setInitCalendarDate } =
    useCalendarStore(
      useShallow((state) => ({
        initCalendarDate: state.initCalendarDate,
        setSelectedCalendarDate: state.setSelectedDate,
        setInitCalendarDate: state.setInitCalendarDate,
      }))
    );
  const [selectedDate, setSelectedDate] = useState(new Date());

  function getSelectedDateOnCalendarChange(initDate) {
    return new Date(initDate).getMonth() === new Date().getMonth()
      ? new Date()
      : initDate;
  }

  useEffect(() => {
    setSelectedDate(getSelectedDateOnCalendarChange(initCalendarDate));
    setSelectedCalendarDate(new Date());
  }, [initCalendarDate]);

  return (
    <div className="p-4">
      {isWorkerSchedule && (
        <div className="mt-1.5 mb-4">
          <div
            className={cn(
              "m-auto w-16 h-16  border-2 border-gray-200 rounded-full"
            )}
          >
            <Thumbnail
              url={
                "https://doodleipsum.com/700x700/avatar?i=310c74837ffe0803164ed110256826e1"
              }
            />
          </div>
          <div className="ms-3 text-sm font-normal text-center mt-2">
            <div className="font-bold text-xl text-gray-900 dark:text-white">
              Bonnie Green
            </div>
          </div>
        </div>
      )}

      <MonthScheduleStatistic selectedDate={initCalendarDate} />
      <MonthScheduleCalendar
        selectedDate={selectedDate}
        initCalendarDate={initCalendarDate}
        setSelectedDate={setSelectedDate}
      />
      <ActiveDaySchedule selectedDate={selectedDate} />
    </div>
  );
}

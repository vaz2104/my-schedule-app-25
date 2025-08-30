"use client";
import ActiveWeekDaySchedule from "@/components/client/ActiveWeekDaySchedule";
import DiscountServices from "@/components/general/DiscountServices";
import WeekScheduleCalendar from "@/components/general/WeekScheduleCalendar";
import { useCalendarStore } from "@/components/ui/calendar/useCalendarStore";
import { useEffect, useState } from "react";
import { useShallow } from "zustand/shallow";

export default function PanelHome() {
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
      <WeekScheduleCalendar setSelectedDate={setSelectedDate} />
      <div className="mt-8 mb-4">
        <ActiveWeekDaySchedule selectedDate={selectedDate} />
      </div>
      <div className="mt-8 mb-4">
        <DiscountServices />
      </div>
    </div>
  );
}

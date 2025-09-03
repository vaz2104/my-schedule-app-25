"use client";
import ActiveWeekDaySchedule from "@/components/client/ActiveWeekDaySchedule";
import BookedAppointments from "@/components/client/BookedAppointments";
import DiscountServices from "@/components/client/DiscountServices";
import WeekScheduleCalendar from "@/components/general/WeekScheduleCalendar";
import { useCalendarStore } from "@/components/ui/calendar/useCalendarStore";
import { useEffect, useState } from "react";
import { useShallow } from "zustand/shallow";

export default function PanelHome() {
  const { initWeekDate, initCalendarDate } = useCalendarStore(
    useShallow((state) => ({
      initCalendarDate: state.initCalendarDate,
      initWeekDate: state.initWeekDate,
    }))
  );

  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    setSelectedDate(initCalendarDate);
  }, [initCalendarDate]);

  useEffect(() => {
    setSelectedDate(new Date(initWeekDate));
  }, [initWeekDate]);

  return (
    <div className="p-4">
      {/* <div className="my-4">
        <BookedAppointments />
      </div> */}

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

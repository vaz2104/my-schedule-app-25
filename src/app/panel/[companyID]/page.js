"use client";
import ActiveWeekDaySchedule from "@/components/client/ActiveWeekDaySchedule";
import BookedAppointments from "@/components/client/BookedAppointments";
import DiscountServices from "@/components/client/DiscountServices";
import WeekScheduleCalendar from "@/components/general/WeekScheduleCalendar";
import { useCalendarStore } from "@/components/ui/calendar/useCalendarStore";
import { useEffect } from "react";
import { useShallow } from "zustand/shallow";

export default function PanelHome() {
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
      {/* <div className="my-4">
        <BookedAppointments />
      </div> */}

      <WeekScheduleCalendar />
      <div className="mt-8 mb-4">
        <ActiveWeekDaySchedule />
      </div>
      <div className="mt-8 mb-4">
        <DiscountServices />
      </div>
    </div>
  );
}

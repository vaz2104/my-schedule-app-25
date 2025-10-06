"use client";
import ActiveWeekDaySchedule from "@/components/client/ActiveWeekDaySchedule";
import AvailableWorkers from "@/components/client/AvailableWorkers";
import BookedAppointments from "@/components/client/BookedAppointments";
import DiscountServices from "@/components/client/DiscountServices";
import WeekScheduleCalendar from "@/components/general/WeekScheduleCalendar";
import { useCalendarStore } from "@/components/ui/calendar/useCalendarStore";
import { useAppStore } from "@/store/useAppStore";
import { useEffect } from "react";
import { useShallow } from "zustand/shallow";

export default function PanelHome() {
  const { companyPlan } = useAppStore();
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
        {companyPlan === "free" || companyPlan === "basic" ? (
          <ActiveWeekDaySchedule />
        ) : (
          <AvailableWorkers />
        )}
      </div>

      <div className="mt-8 mb-4">
        <DiscountServices />
      </div>
    </div>
  );
}

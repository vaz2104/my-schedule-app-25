"use client";
import ActiveWeekDaySchedule from "@/components/admin/ActiveWeekDaySchedule";
import WeekScheduleCalendar from "@/components/general/WeekScheduleCalendar";
import WeekScheduleStatistic from "@/components/admin/WeekScheduleStatistic";
import { useCalendarStore } from "@/components/ui/calendar/useCalendarStore";
import { useEffect } from "react";
import { useShallow } from "zustand/shallow";
import { useAppStore } from "@/store/useAppStore";
import AvailableWorkers from "@/components/admin/AvailableWorkers";

export default function DashboardHome() {
  const { companyPlan, role } = useAppStore();
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
      {companyPlan === "free" ||
      companyPlan === "basic" ||
      role === "worker" ? (
        <div className="mt-8 mb-4">
          <WeekScheduleStatistic />
        </div>
      ) : (
        ""
      )}

      <WeekScheduleCalendar />
      {(companyPlan === "business" || companyPlan === "businessPlus") &&
        role === "admin" && (
          <div className="mt-8 mb-4">
            <AvailableWorkers />
          </div>
        )}

      {(companyPlan === "free" ||
        companyPlan === "basic" ||
        role === "worker") && (
        <div className="mt-8 mb-4">
          <ActiveWeekDaySchedule />
        </div>
      )}
    </div>
  );
}

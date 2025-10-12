"use client";

import Alert from "../ui/Alert";
import Spinner from "../ui/Spinner";
import { ScheduleService } from "@/services/ScheduleService";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { AuthService } from "@/services/AuthService";
import formatDate from "@/lib/formatDate";
import WeekCalendar from "../ui/calendar/WeekCalendar";
import CalendarService from "../ui/calendar/CalendarService";
import { useCalendarStore } from "../ui/calendar/useCalendarStore";
import { useShallow } from "zustand/shallow";
import { getScheduleDays } from "@/lib/schedule-helpers";
import { useAppStore } from "@/store/useAppStore";

export default function WeekScheduleCalendar() {
  const { companyPlan, role } = useAppStore();
  const { initWeekDate } = useCalendarStore(
    useShallow((state) => ({
      initWeekDate: state.initWeekDate,
    }))
  );

  const [schedule, setSchedule] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const params = useParams();

  async function loadFullMonthSchedule() {
    setIsLoading(true);
    const session = await AuthService.getSession();
    const weekPeriod = CalendarService.generateWeekDays(initWeekDate);
    const startDate = formatDate(weekPeriod[0].date);
    const endDate = formatDate(weekPeriod[weekPeriod.length - 1].date);
    const query = {
      botId: params?.companyID,
      startDate,
      endDate,
    };

    if (
      role === "worker" ||
      (companyPlan !== null &&
        companyPlan !== "business" &&
        companyPlan !== "businessPlus")
    ) {
      query.workerId = session?.userId;
    }

    const response = await ScheduleService.getMany(query);

    if (response.status !== 200) {
      setError("Сталася помилка при завантаженні даних");
    } else {
      setSchedule(response.data);
    }

    setIsLoading(false);
  }

  useEffect(() => {
    loadFullMonthSchedule();
  }, [initWeekDate]);

  if (error) {
    return (
      <div className="p-4 flex justify-center items-center">
        <Alert className={"w-full"}>{error}</Alert>
      </div>
    );
  }

  return (
    <div className="relative">
      {isLoading && (
        <div className="bg-white/50 backdrop-blur-xs p-4 flex justify-center items-center absolute -top-1 -right-1 -bottom-1 -left-1 rounded-xl z-20">
          <Spinner />
        </div>
      )}
      <WeekCalendar
        options={{
          markedActiveDays: getScheduleDays(schedule, "daysWithAppointments"),
          markedDisabledDays: getScheduleDays(
            schedule,
            "daysWithNoAppointments"
          ),
        }}
      />
    </div>
  );
}

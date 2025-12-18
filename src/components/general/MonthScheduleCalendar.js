"use client";

import Alert from "../ui/Alert";
import Spinner from "../ui/Spinner";
import { ScheduleService } from "@/services/ScheduleService";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import formatDate from "@/lib/formatDate";
import Calendar from "../ui/calendar/Calendar";
import CalendarService from "../ui/calendar/CalendarService";
import { getScheduleDays } from "@/lib/schedule-helpers";
import { useCalendarStore } from "../ui/calendar/useCalendarStore";
import { useShallow } from "zustand/shallow";
import { CompanyService } from "@/services/CompanyService";
import { useAppStore } from "@/store/useAppStore";

export default function MonthScheduleCalendar({ selectedWorker }) {
  const { companyPlan } = useAppStore();
  const { initCalendarDate } = useCalendarStore(
    useShallow((state) => ({
      initCalendarDate: state.initCalendarDate,
    }))
  );
  const [schedule, setSchedule] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const params = useParams();

  async function loadFullMonthSchedule() {
    setIsLoading(true);

    const calendarPeriod =
      CalendarService.generateCalendarDays(initCalendarDate);
    const startDate = formatDate(calendarPeriod[0].date);
    const endDate = formatDate(calendarPeriod[calendarPeriod.length - 1].date);

    let workerId = null;
    if (selectedWorker) {
      workerId = selectedWorker;
    } else {
      if (params?.specialistID) {
        workerId = params?.specialistID;
      } else {
        if (companyPlan === "free" || companyPlan === "basic") {
          const workersResponse = await CompanyService.getWorkers({
            botId: params?.companyID,
            isBlocked: false,
          });

          if (workersResponse?.data?.length)
            workerId = workersResponse?.data[0]?.workerId?._id;
        }
      }
    }

    const response = await ScheduleService.getMany({
      botId: params?.companyID,
      workerId,
      startDate,
      endDate,
    });

    if (response.status !== 200) {
      setError("Сталася помилка при завантаженні даних");
    } else {
      setSchedule(response.data);
    }

    setIsLoading(false);
  }

  useEffect(() => {
    loadFullMonthSchedule();
  }, [initCalendarDate]);

  if (error) {
    return (
      <div className="p-4 flex justify-center items-center">
        <Alert className={"w-full"}>{error}</Alert>
      </div>
    );
  }

  return (
    <div className="mt-8 relative">
      {isLoading && (
        <div className="bg-white/50 backdrop-blur-xs p-4 flex justify-center items-center absolute -top-1 -right-1 -bottom-1 -left-1 rounded-xl z-20">
          <Spinner />
        </div>
      )}
      <Calendar
        options={{
          markedActiveDays: getScheduleDays(schedule, "daysWithAppointments"),
          markedDisabledDays: getScheduleDays(
            schedule,
            "daysWithNoAppointments"
          ),
          theme: "client",
        }}
      />
    </div>
  );
}

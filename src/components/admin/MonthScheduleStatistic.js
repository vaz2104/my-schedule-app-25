"use client";

import GenerateSchedule from "@/components/admin/GenerateSchedule";
import StatisticWidget from "@/components/admin/StatisticWidget";

import Alert from "../ui/Alert";
import Spinner from "../ui/Spinner";
import { ScheduleService } from "@/services/ScheduleService";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { AuthService } from "@/services/AuthService";
import formatDate from "@/lib/formatDate";
import { monthsFullName } from "@/lib/calendar-vars";
import CalendarService from "../ui/calendar/CalendarService";
import { useCalendarStore } from "../ui/calendar/useCalendarStore";
import { useShallow } from "zustand/shallow";
import { useAppStore } from "@/store/useAppStore";

export default function MonthScheduleStatistic() {
  const { adminId, companyPlan } = useAppStore();

  const { initCalendarDate } = useCalendarStore(
    useShallow((state) => ({
      initCalendarDate: state.initCalendarDate,
    }))
  );

  const [schedule, setSchedule] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditingAllowed, setIsEditingAllowed] = useState(false);
  const params = useParams();

  async function loadFullMonthSchedule() {
    setIsLoading(true);
    const session = await AuthService.getSession();

    const calendarPeriod =
      CalendarService.generateCalendarDays(initCalendarDate);
    const startDate = formatDate(calendarPeriod[0].date);
    const endDate = formatDate(calendarPeriod[calendarPeriod.length - 1].date);

    const response = await ScheduleService.getMany({
      botId: params?.companyID,
      workerId: params?.specialistID ? params?.specialistID : session?.userId,
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

  async function checkIsEditingAllowed() {
    const session = await AuthService.getSession();
    let status = true;
    if (
      companyPlan !== "free" &&
      companyPlan !== "basic" &&
      adminId === session?.userId &&
      adminId !== params?.specialistID
    ) {
      status = false;
    }

    setIsEditingAllowed(status);
  }

  function getScheduleDays(schedule) {
    const days = [];
    schedule.forEach((el) => days.push(formatDate(el?.date)));

    return days;
  }

  function filterScheduleByMonth(activeDate) {
    return schedule.filter(
      (item) =>
        new Date(item.date).getMonth() === new Date(activeDate).getMonth()
    );
  }

  useEffect(() => {
    loadFullMonthSchedule();
    checkIsEditingAllowed();
  }, [initCalendarDate]);

  if (error) {
    return (
      <div className="p-4 flex justify-center items-center">
        <Alert className={"w-full"}>{error}</Alert>
      </div>
    );
  }

  return (
    <div className="relative mt-4">
      {isLoading && (
        <div className="bg-white/50 backdrop-blur-xs p-4 flex justify-center items-center absolute -top-1 -right-1 -bottom-1 -left-1 rounded-xl z-20">
          <Spinner />
        </div>
      )}
      <div className="mb-4">
        <h2 className="font-bold text-lg">
          Завантаженість{" "}
          {monthsFullName[new Date(initCalendarDate).getMonth()].toLowerCase()}
        </h2>
      </div>

      <StatisticWidget schedule={filterScheduleByMonth(initCalendarDate)} />

      {isEditingAllowed && (
        <div className="mt-6">
          <GenerateSchedule
            successHandler={loadFullMonthSchedule}
            disabledDays={getScheduleDays(schedule)}
          />
        </div>
      )}
    </div>
  );
}

"use client";

import Alert from "../ui/Alert";
import Spinner from "../ui/Spinner";
import { ScheduleService } from "@/services/ScheduleService";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { AuthService } from "@/services/AuthService";
import formatDate from "@/lib/formatDate";
import Calendar from "../ui/calendar/Calendar";
import CalendarService from "../ui/calendar/CalendarService";

export default function MonthScheduleCalendar({
  selectedDate,
  setSelectedDate,
  initCalendarDate,
}) {
  const [schedule, setSchedule] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
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
      workerId: session?.userId,
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

  function getScheduleDays(schedule) {
    const days = [];
    schedule.forEach((el) => days.push(formatDate(el?.date)));

    return days;
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
          markedDays: getScheduleDays(schedule),
          customStateValue: selectedDate,
          setCustomStateValue: setSelectedDate,
        }}
      />
    </div>
  );
}

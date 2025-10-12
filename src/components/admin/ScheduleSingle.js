"use client";

import { cn } from "@/lib/cn";
import { useEffect, useState } from "react";
import ActiveDaySchedule from "./ActiveDaySchedule";
import { useCalendarStore } from "../ui/calendar/useCalendarStore";
import { useShallow } from "zustand/shallow";
import MonthScheduleStatistic from "./MonthScheduleStatistic";
import Thumbnail from "../ui/Thumbnail";
import MonthScheduleCalendar from "../general/MonthScheduleCalendar";
import { useParams } from "next/navigation";
import { useAppStore } from "@/store/useAppStore";
import { UserService } from "@/services/UserService";

export default function ScheduleSingle() {
  const [profile, setProfile] = useState(null);
  const { role } = useAppStore();
  const params = useParams();

  const { initCalendarDate, setSelectedDate, setInitCalendarDate } =
    useCalendarStore(
      useShallow((state) => ({
        initCalendarDate: state.initCalendarDate,
        setSelectedDate: state.setSelectedDate,
        setInitCalendarDate: state.setInitCalendarDate,
        selectedDate: state.selectedDate,
      }))
    );

  function getSelectedDateOnCalendarChange(initDate) {
    return new Date(initDate).getMonth() === new Date().getMonth()
      ? new Date()
      : initDate;
  }

  async function getProfileData() {
    if (!params?.specialistID) return false;

    const response = await UserService.getTelegramUser({
      _id: params?.specialistID,
    });

    if (response.status !== 200) {
      setError("Сталася помилка при завантаженні даних");
    } else {
      if (response?.data?.length) {
        setProfile(response?.data[0]);
      }
    }
  }

  useEffect(() => {
    setInitCalendarDate(new Date());
    setSelectedDate(new Date());
    getProfileData();
  }, []);

  useEffect(() => {
    setSelectedDate(getSelectedDateOnCalendarChange(initCalendarDate));
  }, [initCalendarDate]);

  return (
    <div className="p-4">
      {(params?.companyID || role === "worker") && profile && (
        <div className="mt-1.5 mb-4">
          <div className={cn("m-auto size-16 border-gray-200 rounded-full")}>
            <Thumbnail url={profile?.photoUrl} size="lg" />
          </div>
          <div className="text-sm font-normal text-center mt-2">
            <div className="font-bold text-xl text-gray-900 dark:text-white">
              {profile?.firstName || profile?.username}
            </div>
          </div>
        </div>
      )}

      <MonthScheduleStatistic />
      <MonthScheduleCalendar />
      <ActiveDaySchedule />
    </div>
  );
}

"use client";
import ActiveWeekDaySchedule from "@/components/client/ActiveWeekDaySchedule";
import WorkerServices from "@/components/client/WorkerServices";
import MonthScheduleCalendar from "@/components/general/MonthScheduleCalendar";
import { useCalendarStore } from "@/components/ui/calendar/useCalendarStore";
import Thumbnail from "@/components/ui/Thumbnail";
import { cn } from "@/lib/cn";
import { UserService } from "@/services/UserService";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useShallow } from "zustand/shallow";

export default function SchedulePage() {
  const [profile, setProfile] = useState(null);
  const params = useParams();

  const { setSelectedDate, setInitCalendarDate } = useCalendarStore(
    useShallow((state) => ({
      setInitCalendarDate: state.setInitCalendarDate,
      setSelectedDate: state.setSelectedDate,
    }))
  );

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

  return (
    <div className="p-4">
      {params?.companyID && profile && (
        <div className="px-4">
          <div className={"flex justify-center"}>
            <Thumbnail url={profile?.photoUrl} size="lg" />
          </div>
          <div className="text-sm font-normal text-center mt-2">
            <div className="font-bold text-xl text-gray-900 dark:text-white">
              {profile?.firstName || profile?.username}
            </div>
          </div>
        </div>
      )}

      <MonthScheduleCalendar />
      <div className="my-8">
        <ActiveWeekDaySchedule />
      </div>
      <WorkerServices />
    </div>
  );
}

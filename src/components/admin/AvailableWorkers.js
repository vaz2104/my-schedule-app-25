"use client";

import Alert from "../ui/Alert";
import Spinner from "../ui/Spinner";
import { ScheduleService } from "@/services/ScheduleService";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import formatDate from "@/lib/formatDate";
import { monthsFullName } from "@/lib/calendar-vars";
import Link from "next/link";
import { useBaseURL } from "@/hooks/useBaseURL";
import { useCalendarStore } from "../ui/calendar/useCalendarStore";
import { useShallow } from "zustand/shallow";
import WorkerActiveDaySchedule from "./WorkerActiveDaySchedule";
import Thumbnail from "../ui/Thumbnail";
import { useAppStore } from "@/store/useAppStore";

export default function AvailableWorkers() {
  const { adminId } = useAppStore();
  const { selectedDate } = useCalendarStore(
    useShallow((state) => ({
      selectedDate: state.selectedDate,
    }))
  );

  const [workers, setWorkers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const params = useParams();
  const { baseDashboardLink } = useBaseURL();

  const currentMonth = monthsFullName[new Date(selectedDate).getMonth()];

  async function loadSelectedDaySchedule(date) {
    setIsLoading(true);

    const response = await ScheduleService.getMany({
      botId: params?.companyID,
      date: formatDate(date),
    });

    if (response.status !== 200) {
      setError("Сталася помилка при завантаженні даних");
    } else {
      setWorkers(response.data);
    }

    console.log(response.data);

    setIsLoading(false);
  }

  useEffect(() => {
    loadSelectedDaySchedule(selectedDate);
  }, [selectedDate]);

  if (error) {
    return (
      <div className="p-4 flex justify-center items-center h-[calc(100vh-9rem)]">
        <Alert className={"w-full"}>{error}</Alert>
      </div>
    );
  }

  return (
    <div className="relative mt-6 min-h-84">
      {isLoading && (
        <div className="bg-white/50 backdrop-blur-xs p-4 flex justify-center items-center absolute -top-1 -right-1 -bottom-1 -left-1 rounded-xl z-20">
          <Spinner />
        </div>
      )}

      {selectedDate && (
        <div className="mb-4">
          <h2 className="font-bold text-lg text-center">
            Доступні місця на {new Date(selectedDate).getDate()}{" "}
            {currentMonth.toLowerCase()}
          </h2>
        </div>
      )}

      {workers?.length > 0 ? (
        <div>
          {workers.map((worker) => {
            return (
              <div
                className=" bg-gray-100 rounded-xl p-4 mb-4"
                key={`schedule${worker?._id}`}
              >
                <div className="flex items-center justify-between">
                  <Link
                    href={`${baseDashboardLink}/specialists/${worker?.workerId?._id}`}
                    className="flex items-center"
                  >
                    <Thumbnail url={worker?.workerId?.photoUrl} theme="light" />
                    <div className="ms-3 text-sm font-normal">
                      <div className="text-base font-semibold text-gray-900 dark:text-white">
                        {adminId === worker?.workerId?._id ? (
                          <>Ви</>
                        ) : (
                          <>
                            {worker?.workerId?.firstName ||
                              worker?.workerId?.username}
                          </>
                        )}
                      </div>
                    </div>
                  </Link>
                  <div>
                    <Link
                      className="text-sm text-gray-900 underline"
                      href={`${baseDashboardLink}/specialists/${worker?.workerId?._id}`}
                    >
                      Графік на місяць
                    </Link>
                  </div>
                </div>

                <WorkerActiveDaySchedule selectedDaySchedule={worker} />
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center text-gray-400 mt-16">
          <p>Жодних доступних місць для запису</p>
        </div>
      )}
    </div>
  );
}

"use client";
import ScheduleModalForm from "@/components/admin/ScheduleModalForm";
import { TrashIcon } from "@/components/ui/Icons";
import Alert from "../ui/Alert";
import Spinner from "../ui/Spinner";
import { ScheduleService } from "@/services/ScheduleService";
import { useParams } from "next/navigation";
import { Fragment, useEffect, useState } from "react";
import { AuthService } from "@/services/AuthService";
import formatDate from "@/lib/formatDate";
import { monthsFullName } from "@/lib/calendar-vars";

export default function ActiveDaySchedule({ selectedDate }) {
  const [selectedDaySchedule, setSelectedDaySchedule] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const params = useParams();

  const currentMonth = monthsFullName[new Date(selectedDate).getMonth()];

  async function loadSelectedDaySchedule(date) {
    setIsLoading(true);

    const session = await AuthService.getSession();
    const response = await ScheduleService.getMany({
      botId: params?.companyID,
      workerId: session?.userId,
      date: formatDate(date),
    });

    if (response.status !== 200) {
      setError("Сталася помилка при завантаженні даних");
    } else {
      setSelectedDaySchedule(response.data[0]);
    }

    setIsLoading(false);
  }

  useEffect(() => {
    loadSelectedDaySchedule(selectedDate);
  }, [selectedDate]);

  if (isLoading)
    return (
      <div className="py-4 flex justify-center items-center min-h-84">
        <Spinner />
      </div>
    );

  if (error) {
    return (
      <div className="p-4 flex justify-center items-center h-[calc(100vh-9rem)]">
        <Alert className={"w-full"}>{error}</Alert>
      </div>
    );
  }

  return (
    <div className="mt-6 min-h-84">
      <div className="mb-4">
        <h2 className="font-bold text-lg text-center">
          Графік на {new Date(selectedDate).getDate()}{" "}
          {currentMonth.toLowerCase()}
        </h2>
      </div>

      {selectedDaySchedule ? (
        <Fragment>
          <ScheduleModalForm />
          <div className="mt-2">
            {Object.keys(selectedDaySchedule?.schedule).map((itemKey) => {
              return (
                <div
                  className="py-4 relative flex justify-between items-center"
                  key={`schedule-${itemKey}`}
                >
                  <div className="absolute bottom-0 left-2 right-2 border-t border-t-gray-200"></div>
                  <div className="font-bold text-lg ml-2">
                    {selectedDaySchedule?.schedule[itemKey]}
                  </div>
                  <div className="flex-1 ml-4 flex items-center">
                    <p className="text-sm text-gray-500">Запис відсутній</p>
                  </div>
                  <div className="text-right">
                    <div className="flex">
                      <div className="flex justify-center">
                        <button className="button blank !px-2">
                          <TrashIcon className="w-4 text-red-600" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <p className="mt-4 flex justify-center">
            <button className="button dark w-full">Додати графік</button>
          </p>
          <div className="mt-8">
            <p className="text-center text-md font-medium my-12 text-gray-400">
              Часи прийому не вказані
            </p>
          </div>
        </Fragment>
      )}
    </div>
  );
}

"use client";
import Alert from "../ui/Alert";
import Spinner from "../ui/Spinner";
import { ScheduleService } from "@/services/ScheduleService";
import { useParams } from "next/navigation";
import { Fragment, useEffect, useState } from "react";
import formatDate from "@/lib/formatDate";
import { monthsFullName } from "@/lib/calendar-vars";
import CalendarService from "../ui/calendar/CalendarService";
import { cn } from "@/lib/cn";
import AppointmentForm from "./AppointmentForm";
import { useCalendarStore } from "../ui/calendar/useCalendarStore";
import { useShallow } from "zustand/shallow";
import Image from "next/image";
import { useAppStore } from "@/store/useAppStore";
import { CompanyService } from "@/services/CompanyService";

export default function ActiveWeekDaySchedule() {
  const { companyPlan } = useAppStore();
  const { selectedDate } = useCalendarStore(
    useShallow((state) => ({
      selectedDate: state.selectedDate,
    }))
  );
  const [selectedDaySchedule, setSelectedDaySchedule] = useState(null);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const params = useParams();

  const currentMonth = monthsFullName[new Date(selectedDate).getMonth()];

  async function loadSelectedDaySchedule(date) {
    setIsLoading(true);

    let workerId = null;
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

    const response = await ScheduleService.getMany({
      botId: params?.companyID,
      workerId,
      date: formatDate(date),
    });

    if (response.status !== 200) {
      setError("Сталася помилка при завантаженні даних");
    } else {
      setSelectedDaySchedule(response.data[0]);
    }

    setIsLoading(false);
  }

  function registrationHandler(schedule, appointment) {
    setSelectedSchedule(schedule);
    setSelectedAppointment(appointment);
  }

  useEffect(() => {
    loadSelectedDaySchedule(selectedDate);
  }, [selectedDate]);

  if (error) {
    return (
      <div className="p-4 flex justify-center items-center">
        <Alert className={"w-full"}>{error}</Alert>
      </div>
    );
  }

  return (
    <div className="relative mt-6 mb-16">
      {isLoading && (
        <div className="bg-white/50 backdrop-blur-xs p-4 flex justify-center items-center absolute -top-1 -right-1 -bottom-1 -left-1 rounded-xl z-20">
          <Spinner />
        </div>
      )}

      <div className="mb-4">
        <h2 className="font-bold text-lg text-center">
          Розклад на {new Date(selectedDate).getDate()}{" "}
          {currentMonth ? currentMonth.toLowerCase() : ""}
        </h2>
        <p className="text-gray-400 text-xs text-center">
          *Для запису натисніть на бажаний час
        </p>
      </div>

      {selectedDaySchedule &&
      Object.keys(selectedDaySchedule?.schedule).length ? (
        <Fragment>
          <div className="mt-8">
            <ul className="flex flex-wrap -mx-1">
              {Object.keys(selectedDaySchedule?.schedule).map((itemKey) => {
                let isReserved = false;
                selectedDaySchedule.relations.forEach((element) => {
                  if (element.appointmentKey === itemKey) {
                    isReserved = true;
                  }
                });

                const isOldDate = CalendarService.isOldDate(
                  selectedDate,
                  selectedDaySchedule?.schedule[itemKey]
                );

                let activeStateClasses = "border-main bg-main text-white";
                let disabledStateClasses =
                  "border-gray-200 bg-gray-100 text-gray-300";

                const isDisabled = isReserved || isOldDate;

                return (
                  <li
                    className="relative w-1/3 px-1 my-1.5"
                    key={`schedule-${itemKey}`}
                    onClick={() =>
                      !isDisabled
                        ? registrationHandler(selectedDaySchedule, itemKey)
                        : null
                    }
                  >
                    {isReserved && (
                      <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center animate__animated animate__bounceIn">
                        <span
                          className={cn(
                            "absolute top-1/2 left-1/4 w-1/2 h-[1px] block bg-gray-300 rotate-25"
                          )}
                        ></span>
                        <span
                          className={cn(
                            "absolute top-1/2 left-1/4 w-1/2 h-[1px] block bg-gray-300  -rotate-25"
                          )}
                        ></span>
                      </div>
                    )}
                    <span
                      className={cn(
                        "p-2 rounded-3xl text-sm text-center block border",
                        isDisabled ? disabledStateClasses : activeStateClasses
                      )}
                    >
                      {selectedDaySchedule?.schedule[itemKey]}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          {/* <div className="mt-16 mb-24">
            <p className="text-center text-md font-medium my-12 text-gray-400">
              Часи прийому не вказані
            </p>
          </div> */}

          <div className="text-center text-gray-400 mt-16">
            <div className="flex justify-center">
              <Image
                src={"/no-sappointments.png"}
                width={320}
                height={222}
                alt=""
              />
            </div>

            <p className="mt-6">Часи прийому не вказані</p>
          </div>
        </Fragment>
      )}

      <AppointmentForm
        selectedSchedule={selectedSchedule}
        selectedAppointment={selectedAppointment}
        successHandler={() => loadSelectedDaySchedule(selectedDate)}
        closeHandler={() => setSelectedSchedule(null)}
      />
    </div>
  );
}

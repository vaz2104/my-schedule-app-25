"use client";
import { Fragment, useState } from "react";
import CalendarService from "../ui/calendar/CalendarService";
import { cn } from "@/lib/cn";
import AppointmentForm from "./AppointmentForm";
import { useCalendarStore } from "../ui/calendar/useCalendarStore";
import { useShallow } from "zustand/shallow";

export default function WorkerActiveWeekDaySchedule({
  selectedDaySchedule,
  updateScheduleHandler,
}) {
  const { selectedDate } = useCalendarStore(
    useShallow((state) => ({
      selectedDate: state.selectedDate,
    }))
  );

  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  function registrationHandler(schedule, appointment) {
    setSelectedSchedule(schedule);
    setSelectedAppointment(appointment);
  }

  return (
    <div className="relative mt-6">
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
                    className="relative w-1/4 sm:w-1/5 px-1 my-1.5"
                    key={`schedule-${itemKey}`}
                    onClick={() =>
                      !isDisabled
                        ? registrationHandler(selectedDaySchedule, itemKey)
                        : null
                    }
                  >
                    {/* {isReserved && (
                      <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center animate__animated animate__bounceIn">
                        <span
                          className={cn(
                            "absolute top-1/2 left-1/4 w-1/2 h-[1px] block bg-gray-200 rotate-25"
                          )}
                        ></span>
                        <span
                          className={cn(
                            "absolute top-1/2 left-1/4 w-1/2 h-[1px] block bg-gray-200  -rotate-25"
                          )}
                        ></span>
                      </div>
                    )} */}
                    <span
                      className={cn(
                        "p-2 rounded-2xl text-md text-center border h-14 flex items-center justify-center font-bold",
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
          <div className="mt-16 mb-24">
            <p className="text-center text-md font-medium my-12 text-gray-400">
              Часи прийому не вказані
            </p>
          </div>
        </Fragment>
      )}

      <AppointmentForm
        selectedSchedule={selectedSchedule}
        selectedAppointment={selectedAppointment}
        successHandler={() =>
          updateScheduleHandler ? updateScheduleHandler() : null
        }
        closeHandler={() => setSelectedSchedule(null)}
      />
    </div>
  );
}

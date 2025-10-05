"use client";

import { Fragment } from "react";
import CalendarService from "../ui/calendar/CalendarService";
import { cn } from "@/lib/cn";
import { useCalendarStore } from "../ui/calendar/useCalendarStore";
import { useShallow } from "zustand/shallow";

export default function WorkerActiveDaySchedule({ selectedDaySchedule }) {
  const { selectedDate } = useCalendarStore(
    useShallow((state) => ({
      selectedDate: state.selectedDate,
    }))
  );

  if (Object.keys(selectedDaySchedule?.schedule).length == 0) return <></>;

  return (
    <div className="relative mt-2">
      {selectedDaySchedule &&
        Object.keys(selectedDaySchedule?.schedule).length > 0 && (
          <Fragment>
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
                    // onClick={() =>
                    //   !isDisabled
                    //     ? registrationHandler(selectedDaySchedule, itemKey)
                    //     : null
                    // }
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
          </Fragment>
        )}
    </div>
  );
}

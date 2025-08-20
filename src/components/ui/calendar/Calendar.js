"use client";

import CalendarDays from "./CalendarDays";
import { AngleLeftIcon, AngleRightIcon } from "./Icons";
import { months, weekdaysShortName } from "./calendar-vars";
import { useCalendarStore } from "./useCalendarStore";
import { useShallow } from "zustand/shallow";

export default function Calendar({ options = {} }) {
  const { initCalendarDate, setInitCalendarDate } = useCalendarStore(
    useShallow((state) => ({
      initCalendarDate: state.initCalendarDate,
      setInitCalendarDate: state.setInitCalendarDate,
    }))
  );

  function nextMonth(day) {
    setInitCalendarDate(new Date(day.getFullYear(), day.getMonth() + 1, 1));
  }

  function prevMonth(day) {
    setInitCalendarDate(new Date(day.getFullYear(), day.getMonth() - 1, 1));
  }

  return (
    <div>
      <div className="calendar">
        <div className="calendarHeader text-center flex justify-between items-center">
          <button
            onClick={() => prevMonth(initCalendarDate)}
            className="flex justify-center items-center w-10 h-10 bg-mainBlue rounded-full p-1 mx-1"
          >
            <AngleLeftIcon className={"text-white"} />
          </button>
          <h2 className="text-lg font-bold">
            {months[initCalendarDate.getMonth()]}{" "}
            {initCalendarDate.getFullYear()}
          </h2>

          <button
            onClick={() => nextMonth(initCalendarDate)}
            className="flex justify-center items-center w-10 h-10 bg-mainBlue rounded-full p-1 mx-1"
          >
            <AngleRightIcon className={"text-white"} />
          </button>
        </div>
        <div className="calendarBody min-h-80">
          <div className="tableHeader flex mt-4">
            {weekdaysShortName.map((weekday, index) => {
              return (
                <div
                  className="text-sm font-bold text-center"
                  style={{ width: "14.286%" }}
                  key={`weekday-${index}`}
                >
                  <p>{weekday}</p>
                </div>
              );
            })}
          </div>
          <div className="table mt-2">
            <CalendarDays options={options} />
          </div>
        </div>
      </div>
    </div>
  );
}

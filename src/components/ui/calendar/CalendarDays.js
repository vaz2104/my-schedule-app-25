import formatDate from "./formatDate";
import { Fragment, useEffect, useState } from "react";
import CalendarService from "./CalendarService";
import { useCalendarStore } from "./useCalendarStore";
import { useShallow } from "zustand/shallow";
import { cn } from "@/lib/cn";
import { CheckCircleIcon, CircleMinusIcon } from "../Icons";

export default function CalendarDays({ options }) {
  const {
    initCalendarDate,
    setInitWeekDate,
    setSelectedDate,
    selectedDate,
    setInitCalendarDate,
  } = useCalendarStore(
    useShallow((state) => ({
      initCalendarDate: state.initCalendarDate,
      setInitWeekDate: state.setInitWeekDate,
      setSelectedDate: state.setSelectedDate,
      setInitCalendarDate: state.setInitCalendarDate,
      selectedDate: state.selectedDate,
    }))
  );

  const markedDays = options?.markedDays || [];
  const markedActiveDays = options?.markedActiveDays || [];
  const markedDisabledDays = options?.markedDisabledDays || [];
  const disabledDays = options?.disabledDays || [];
  const multiselect = options?.multiselect || false;
  const isDisabledOldDays = options?.disabledOldDays || false;
  const setSelectedDays = options?.setSelectedDays || undefined;
  const customStateValue = options?.customStateValue || null;
  const setCustomStateValue = options?.setCustomStateValue || undefined;
  const theme = options?.theme || undefined;

  const [selected, setSelected] = useState([]);
  const [daysArray, setDaysArray] = useState([]);

  function dayHandler(day) {
    if (setCustomStateValue) {
      setCustomStateValue(day.date);

      if (day.month != new Date(customStateValue).getMonth()) {
        setInitCalendarDate(day.date);
      }
      return;
    }

    if (multiselect) {
      const formatedDate = formatDate(day.date);
      if (selected.includes(formatedDate)) {
        if (setSelectedDays) {
          setSelectedDays((prevDaysState) => {
            return prevDaysState.filter((id) => id !== formatedDate);
          });
        }
        setSelected((prevDaysState) => {
          return prevDaysState.filter((id) => id !== formatedDate);
        });
      } else {
        if (setSelectedDays) {
          setSelectedDays((prevDaysState) => {
            return [...prevDaysState, formatedDate];
          });
        }
        setSelected((prevDaysState) => {
          return [...prevDaysState, formatedDate];
        });
      }
    } else {
      setInitWeekDate(day.date);
      setSelectedDate(day.date);

      if (day.month != new Date(selectedDate).getMonth()) {
        setInitCalendarDate(day.date);
      }
    }
  }

  useEffect(() => {
    const days = CalendarService.generateCalendarDays(initCalendarDate);

    setDaysArray(days);
  }, [initCalendarDate]);

  function isDayOlder(day) {
    return (
      new Date(day).getTime() < new Date().getTime() &&
      new Date(day).getDate() !== new Date().getDate()
    );
  }

  return (
    <div className="table-content">
      <div className="py-1.5 table-content flex flex-wrap bg-gray-100 rounded-xl">
        {daysArray.map((day, index) => {
          let isDisabled =
            disabledDays.includes(formatDate(day.date)) ||
            (isDisabledOldDays && isDayOlder(day.date));

          // let disabledDaysOfMonth = !day.currentMonth;
          let disabledDaysOfMonth = multiselect
            ? new Date(day.date).getMonth() < new Date().getMonth()
            : !day.currentMonth;

          let markerClasses = "";
          let numberClasses = "";

          if (
            formatDate(day.date) === formatDate(selectedDate) ||
            formatDate(day.date) === formatDate(customStateValue) ||
            selected.includes(formatDate(day.date))
          )
            markerClasses += " bg-gray-300 animate__animated animate__bounceIn";

          if (
            day.number === new Date().getDate() &&
            day.month === new Date().getMonth()
          ) {
            markerClasses += " bg-red-200 animate__animated animate__bounceIn";
            numberClasses = " text-red-700";
          }

          if (day.weekDay === 0 || day.weekDay === 6) {
            numberClasses = " text-red-500";
          }

          return (
            <div
              className={`mt-1 flex justify-center calendar-day`}
              style={{ width: "14.286%" }}
              key={`day-${index}`}
            >
              <div
                className={`relative w-11 h-11 flex justify-center items-center`}
                onClick={() => (!isDisabled ? dayHandler(day) : {})}
              >
                <span
                  className={cn(
                    "absolute top-0 left-0 right-0 bottom-0 rounded-full",
                    markerClasses
                  )}
                ></span>

                {selected.includes(formatDate(day.date)) && (
                  <span
                    className={cn(
                      "absolute top-0 right-0 animate__animated animate__bounceIn bg-white w-3.5 h-3.5 rounded-full"
                    )}
                  >
                    <CheckCircleIcon className={"w-3.5 h-3.5 text-green-600"} />
                  </span>
                )}

                {multiselect && (disabledDaysOfMonth || isDisabled) && (
                  <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center animate__animated animate__bounceIn">
                    <span
                      className={cn(" w-1/2 h-[1px] block bg-gray-500")}
                    ></span>
                  </div>
                )}

                <p
                  className={`block relative z-10 text-gray-900 transition-all ${
                    disabledDaysOfMonth || isDisabled ? " opacity-30" : ""
                  } ${numberClasses}`}
                >
                  {day.number}
                </p>

                {markedDays.length > 0 &&
                  markedDays.includes(formatDate(day.date)) && (
                    <span
                      className={`absolute top-1 right-1 w-2 h-2 rounded-full animate__animated animate__bounceIn ${
                        day.currentMonth ? "bg-green-600 " : "bg-gray-400"
                      }`}
                    ></span>
                  )}

                {theme === "client" && (
                  <Fragment>
                    {markedActiveDays.length > 0 &&
                      markedActiveDays.includes(formatDate(day.date)) && (
                        <span
                          className={`absolute top-0.5 right-0.5 w-2.5 h-2.5 rounded-full animate__animated animate__bounceIn ${
                            day.currentMonth ? "bg-green-600 " : "bg-gray-400"
                          }`}
                        ></span>
                      )}
                    {markedDisabledDays.length > 0 &&
                      markedDisabledDays.includes(formatDate(day.date)) && (
                        <CircleMinusIcon
                          className={
                            "absolute top-0.5 right-0.5 w-3.5 h-3.5 rounded-full animate__animated animate__bounceIn text-gray-400"
                          }
                        />
                      )}
                  </Fragment>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

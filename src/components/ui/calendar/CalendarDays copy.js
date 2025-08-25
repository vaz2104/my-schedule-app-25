import formatDate from "./formatDate";
import { useEffect, useState } from "react";
import CalendarService from "./CalendarService";
import { useCalendarStore } from "./useCalendarStore";
import { useShallow } from "zustand/shallow";
import { cn } from "@/lib/cn";

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
  const disabledDays = options?.disabledDays || [];
  const multiselect = options?.multiselect || false;
  const isDisabledOldDays = options?.disabledOldDays || false;
  const setSelectedDays = options?.setSelectedDays || undefined;
  const customStateValue = options?.customStateValue || null;
  const setCustomStateValue = options?.setCustomStateValue || undefined;

  const [selected, setSelected] = useState([]);
  const [daysArray, setDaysArray] = useState([]);

  function dayHandler(day) {
    if (setCustomStateValue) {
      setCustomStateValue(day.date);
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
      // closeModal("modalCalendar");

      if (day.month != new Date(setSelectedDate).getMonth()) {
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

          let disabledDaysOfMonth = !day.currentMonth;
          // multiselect
          //   ? new Date(day.date).getMonth() < new Date().getMonth()
          //   : !day.currentMonth;

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

          return (
            <div
              className={`mt-1 flex justify-center calendar-day ${
                disabledDaysOfMonth || isDisabled
                  ? " text-gray-400"
                  : "text-gray-900"
              }${numberClasses}`}
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

                <p className="block relative z-10">{day.number}</p>

                {markedDays.length > 0 &&
                  markedDays.includes(formatDate(day.date)) && (
                    <span
                      className={`absolute -top-0 -right-0 w-3 h-3 rounded-full animate__animated animate__bounceIn ${
                        day.currentMonth ? "bg-green-600 " : "bg-gray-400"
                      }`}
                    ></span>
                  )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

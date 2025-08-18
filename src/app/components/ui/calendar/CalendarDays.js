import formatDate from "./formatDate";
// import CheckSolidIcon from "./icons/CheckSolid";
// import CheckRegularIcon from "./icons/CheckRegular";
import { useEffect, useState } from "react";
import CalendarService from "./CalendarService";
import { useCalendarStore } from "./useCalendarStore";
import { useShallow } from "zustand/shallow";
import { cn } from "@/app/lib/cn";

export default function CalendarDays({ options }) {
  const {
    initCalendarDate,
    setInitWeekDate,
    setSelectedDate,
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

  const hours = options?.hours || [];
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
      if (setSelectedDays) {
        const formatedDate = formatDate(day.date);
        if (selected.includes(formatedDate)) {
          setSelectedDays((prevDaysState) => {
            return prevDaysState.filter((id) => id !== formatedDate);
          });
          setSelected((prevDaysState) => {
            return prevDaysState.filter((id) => id !== formatedDate);
          });
        } else {
          setSelectedDays((prevDaysState) => {
            return [...prevDaysState, formatedDate];
          });
          setSelected((prevDaysState) => {
            return [...prevDaysState, formatedDate];
          });
        }
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

  return (
    <div className="table-content">
      <div className="py-1.5 table-content flex flex-wrap bg-gray-100 rounded-xl">
        {daysArray.map((day, index) => {
          const today = new Date();
          let schedule = hours[formatDate(day.date)] || [];
          let numberNow = today.getDate();

          let isDisabled = false;

          if (multiselect) {
            isDisabled = disabledDays.includes(formatDate(day.date));
            if (!isDisabled) {
              isDisabled =
                new Date(day.date).getTime() < new Date(today).getTime();
            }
          }

          if (isDisabledOldDays) {
            isDisabled =
              new Date(day.date).getTime() < new Date(today).getTime();
          }

          let classes = "";

          if (day.selected || selected.includes(formatDate(day.date)))
            classes += " selectedWeekDay animate__animated animate__bounceIn";

          if (
            day.number === new Date().getDate() &&
            day.month === new Date().getMonth()
          ) {
            classes += " activeWeekDay animate__animated animate__bounceIn";
          }

          if (formatDate(day.date) == formatDate(new Date(customStateValue)))
            classes += " selectedWeekDay animate__animated animate__bounceIn";

          // FOR DESKTOP
          // if (!isDisabled) {
          //   classes += " hover:bg-slate-200 cursor-pointer";
          // } else {
          //   classes += " !cursor-default";
          // }

          return (
            <div
              className={`mt-1 flex justify-center calendar-day${
                day.currentMonth && !isDisabled ? " current" : ""
              }`}
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
                    classes
                  )}
                ></span>
                <p className="block relative z-20">{day.number}</p>

                {day.currentMonth && schedule.length ? (
                  <>
                    {numberNow >= day.number ? (
                      <span className="absolute -top-0 -right-0 w-3 h-3 text-green-700">
                        {/* <CheckSolidIcon /> */}
                      </span>
                    ) : (
                      <span className="absolute -top-0 -right-0 w-3 h-3 text-black">
                        {/* <CheckRegularIcon /> */}
                      </span>
                    )}
                  </>
                ) : (
                  <></>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

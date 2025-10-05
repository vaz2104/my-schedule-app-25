"use client";
import { useEffect, useState } from "react";
import isToday from "./isToday";
import CalendarService from "./CalendarService";
import { useCalendarStore } from "./useCalendarStore";
import { useShallow } from "zustand/shallow";
import { months } from "./calendar-vars";
import { AngleLeftIcon, AngleRightIcon, CalendarIcon } from "./Icons";
import CalendarModal from "./CalendarModal";
import formatDate from "./formatDate";
import { CircleMinusIcon } from "../Icons";

export default function WeekCalendar({ options }) {
  const markedActiveDays = options?.markedActiveDays || [];
  const markedDisabledDays = options?.markedDisabledDays || [];

  // const setCustomStateValue = options?.setCustomStateValue || [];
  const [isModalCalendar, setIsModalCalendar] = useState(false);
  const {
    initWeekDate,
    selectedDate,
    weekDays,
    setSelectedDate,
    setWeekDays,
    setInitWeekDate,
    setInitCalendarDate,
    initCalendarDate,
  } = useCalendarStore(
    useShallow((state) => ({
      initWeekDate: state.initWeekDate,
      selectedDate: state.selectedDate,
      weekDays: state.weekDays,
      setSelectedDate: state.setSelectedDate,
      setWeekDays: state.setWeekDays,
      setInitWeekDate: state.setInitWeekDate,
      setInitCalendarDate: state.setInitCalendarDate,
      initCalendarDate: state.initCalendarDate,
    }))
  );

  function setNextWeekOptions(date) {
    const nextDate = CalendarService.nextWeekInitDate(date); // returns a Y-m-d format
    setInitWeekDate(new Date(nextDate));
    setSelectedDate(new Date(nextDate));
    setInitCalendarDate(new Date(nextDate)); // convert from format Y-m-d
  }

  function setPreviousWeekOptions(date) {
    const nextDate = CalendarService.previousWeekInitDate(date); // returns a Y-m-d format
    setInitWeekDate(new Date(nextDate));
    setSelectedDate(new Date(nextDate));
    setInitCalendarDate(new Date(nextDate)); // convert from format Y-m-d
  }

  function chooseDateHandler(date) {
    // setInitCalendarDate(date);
    setSelectedDate(date);
  }

  useEffect(() => {
    const calendarPeriod = CalendarService.generateWeekDays(initWeekDate);
    setWeekDays(calendarPeriod);
  }, [initWeekDate]);

  return (
    <>
      <div className=" bg-gray-100 rounded-xl pt-1 pb-3">
        <div className="flex items-center mb-4 w-full p-2">
          <div className="flex-1">
            <h2 className="text-lg leading-none font-bold text-gray-900">
              <span className="">
                {months[new Date(selectedDate).getMonth()]}{" "}
              </span>
              <span className=" mt-0.5">
                {new Date(selectedDate).getFullYear()}
              </span>
            </h2>
          </div>
          <button
            className="mr-4 flex items-center justify-center md:max-w-48 font-medium rounded-lg text-sm px-5 py-2 text-center bg-main hover:bg-mainDark cursor-pointer"
            onClick={() => setIsModalCalendar(true)}
          >
            <CalendarIcon className={"text-white"} />
            {/* <span className="ml-1">Календар</span> */}
          </button>
          <button
            onClick={() => setPreviousWeekOptions(initWeekDate)}
            className="flex justify-center items-center w-10 h-10 bg-main hover:bg-mainDark cursor-pointer rounded-full p-1 mx-1 "
          >
            <AngleLeftIcon className={"text-white"} />
          </button>
          <button
            onClick={() => setNextWeekOptions(initWeekDate)}
            className="flex justify-center items-center w-10 h-10 bg-main hover:bg-mainDark cursor-pointer rounded-full p-1 mx-1"
          >
            <AngleRightIcon className={"text-white"} />
          </button>
        </div>
        <div className="flex flex-1 px-1">
          {weekDays.map((day, index) => {
            return (
              <div
                className={`flex-1 relative text-center p-1 py-2 mx-0.5 rounded week-calendar-day cursor-pointer ${
                  day.weekDay == 6 || day.weekDay == 0 ? "weekend" : ""
                } ${day.currentMonth ? "default" : "disabled"}`}
                onClick={() => chooseDateHandler(day.date)}
                key={`cdl-day-${day.number}`}
              >
                {/* {markedDays.length > 0 &&
                  markedDays.includes(formatDate(day.date)) && (
                    <span
                      className={`absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full animate__animated animate__bounceIn z-10 ${
                        day.currentMonth ? "bg-green-600 " : "bg-gray-400"
                      }`}
                    ></span>
                  )} */}
                {markedActiveDays.length > 0 &&
                  markedActiveDays.includes(formatDate(day.date)) && (
                    <span
                      className={`z-20 absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full animate__animated animate__bounceIn ${
                        day.currentMonth ? "bg-green-600 " : "bg-gray-400"
                      }`}
                    ></span>
                  )}
                {markedDisabledDays.length > 0 &&
                  markedDisabledDays.includes(formatDate(day.date)) && (
                    <CircleMinusIcon
                      className={
                        "z-20 absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full animate__animated animate__bounceIn text-gray-400"
                      }
                    />
                  )}
                {day.number === new Date(selectedDate).getDate() && (
                  <span className="absolute rounded-lg w-full h-full bg-gray-300 top-1 right-0 animate__animated animate__bounceIn z-0"></span>
                )}

                {isToday(day.date) && (
                  <span className="absolute rounded w-full h-1 bg-red-600 -bottom-1 left-0 animate__animated animate__bounceIn"></span>
                )}

                <span
                  className={`relative z-10 block text-xs ${
                    day.weekDay === 0 || day.weekDay === 6
                      ? " text-red-500"
                      : ""
                  }`}
                >
                  {day.day}
                </span>
                <span
                  className={`relative z-10 block font-bold text-xl ${
                    day.weekDay === 0 || day.weekDay === 6
                      ? " text-red-500"
                      : ""
                  }
                  `}
                >
                  {day.number}
                </span>
              </div>
            );
          })}
        </div>
        <CalendarModal
          triger={isModalCalendar}
          closeFn={() => setIsModalCalendar(false)}
        />
      </div>
    </>
  );
}

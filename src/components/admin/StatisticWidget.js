"use client";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function StatisticWidget({ schedule }) {
  function getScheduleData(list, key) {
    if (!list) return 0;

    let bookedAppointments = 0;
    let totalAppointments = 0;
    list.forEach((element) => {
      totalAppointments += Object.keys(element.schedule).length;
      bookedAppointments += element.relations.length;
    });

    const data = { bookedAppointments, totalAppointments };
    return key ? data[key] : data;
  }

  function getActiveRecordsPercentage(total, active) {
    if (!active || !total) return 0;

    if (total && active) {
      return Math.floor((active * 100) / total);
    }
  }

  return (
    <div className="">
      <div className="flex -m-1">
        <div className="w-1/3 rounded-xl bg-gray-100 py-2 mx-1 text-center">
          <div className="flex flex-col items-center justify-center h-full">
            <div className="text-4xl font-bold">
              {getScheduleData(schedule, "bookedAppointments")}
            </div>
            <div className="text-xs mt-2">
              Записані <br />
              на прийом
            </div>
          </div>
        </div>
        <div className="w-1/3 rounded-xl bg-gray-100 py-2 px-1 mx-1 text-center">
          <div className="flex flex-col items-center justify-center h-full">
            <div className="text-4xl font-bold">
              {getScheduleData(schedule, "totalAppointments")}
            </div>
            <div className="text-xs mt-2">
              Загальна <br />
              кількість місць
            </div>
          </div>
        </div>
        <div className="w-1/3 flex flex-col justify-center items-center rounded-xl bg-gray-100 p-4 mx-1">
          <div style={{ width: 100, height: 100 }}>
            <CircularProgressbar
              value={getActiveRecordsPercentage(
                getScheduleData(schedule, "totalAppointments"),
                getScheduleData(schedule, "bookedAppointments")
              )}
              text={`${getActiveRecordsPercentage(
                getScheduleData(schedule, "totalAppointments"),
                getScheduleData(schedule, "bookedAppointments")
              )}%`}
              styles={buildStyles({
                pathColor: `rgba(22, 163, 74, 100)`,
                textColor: "#000",
                trailColor: "#d6d6d6",
                backgroundColor: "#3e98c7",
              })}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

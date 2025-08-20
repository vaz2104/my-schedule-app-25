"use client";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function StatisticWidget() {
  return (
    <div className="">
      <div className="flex -m-1">
        <div className="w-1/3 rounded-xl bg-gray-100 py-2 mx-1 text-center">
          <div className="flex flex-col items-center justify-center h-full">
            <div className="text-4xl font-bold">{12}</div>
            <div className="text-xs mt-2">
              Записані <br />
              на прийом
            </div>
          </div>
        </div>
        <div className="w-1/3 rounded-xl bg-gray-100 py-2 px-1 mx-1 text-center">
          <div className="flex flex-col items-center justify-center h-full">
            <div className="text-4xl font-bold">{22}</div>
            <div className="text-xs mt-2">
              Загальна <br />
              кількість місць
            </div>
          </div>
        </div>
        <div className="w-1/3 flex flex-col justify-center items-center rounded-xl bg-gray-100 p-4 mx-1">
          <div style={{ width: 100, height: 100 }}>
            <CircularProgressbar
              value={90}
              text={`${"90"}%`}
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

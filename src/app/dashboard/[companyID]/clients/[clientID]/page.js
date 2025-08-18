import { cn } from "@/app/lib/cn";
import React from "react";

export default function ClientSingle() {
  return (
    <div className="p-4">
      <div className="mt-1.5">
        <div
          className={cn(
            "m-auto w-16 h-16  border-2 border-gray-200 rounded-full"
          )}
        >
          <img
            src={
              "https://doodleipsum.com/700x700/avatar?i=310c74837ffe0803164ed110256826e1"
            }
            className="w-16 h-16 rounded-full"
            alt="Jese Leos image"
          />
        </div>
        <div className="ms-3 text-sm font-normal text-center mt-2">
          <div className="font-bold text-xl text-gray-900 dark:text-white">
            Bonnie Green
          </div>
        </div>
      </div>
      <div className="mt-4 mb-4">
        <h2 className="font-bold text-lg text-center">Історія записів</h2>
      </div>
      <div className="">
        <div className="py-6 flex justify-between border-b border-gray-200">
          <div className="flex items-center">
            <div
              className={cn(
                "m-auto w-8 h-8  border-1 border-gray-300 rounded-full"
              )}
            >
              <img
                src={
                  "https://doodleipsum.com/700x700/avatar?i=310c74837ffe0803164ed110256826e1"
                }
                className="w-8 h-8 rounded-full"
                alt="Jese Leos image"
              />
            </div>
            <span className="ml-2 font-bold ">Bonnie Green</span>
          </div>
          <div className="flex justify-center items-center font-bold text-sm px-3 rounded-full bg-mainBlue text-white">
            28-01-2025 в 17:00
          </div>
        </div>
        <div className="py-6 flex justify-between border-b border-gray-200">
          <div className="flex items-center">
            <div
              className={cn(
                "m-auto w-8 h-8  border-1 border-gray-300 rounded-full"
              )}
            >
              <img
                src={
                  "https://doodleipsum.com/700x700/avatar?i=310c74837ffe0803164ed110256826e1"
                }
                className="w-8 h-8 rounded-full"
                alt="Jese Leos image"
              />
            </div>
            <span className="ml-2 font-bold ">Bonnie Green</span>
          </div>
          <div className="flex justify-center items-center font-bold text-sm px-3 rounded-full bg-mainBlue text-white">
            28-01-2025 в 09:00
          </div>
        </div>
      </div>
    </div>
  );
}

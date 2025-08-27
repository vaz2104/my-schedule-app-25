import { cn } from "@/lib/cn";
import Link from "next/link";
import React from "react";

export default function WorkerAppointmentsList() {
  return (
    <div className="w-full bg-gray-100 mb-4 p-4 text-gray-900 rounded-lg ">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div
            className={cn(
              "w-12 h-12  border-2 border-gray-200 rounded-full bg-white"
            )}
          >
            <img
              src={
                "https://doodleipsum.com/700x700/avatar?i=310c74837ffe0803164ed110256826e1"
              }
              className="w-12 h-12 rounded-full"
              alt="Jese Leos image"
            />
          </div>
          <div className="ml-2 text-base font-normal text-center">
            <div className="text-base font-semibold text-gray-900 dark:text-white">
              Bonnie Green
            </div>
          </div>
        </div>
        <Link href={""} className="button !py-2 !px-4">
          весь графік
        </Link>
      </div>
      <div className="mt-4">
        <ul className="flex flex-wrap -mx-1">
          <li className="w-1/4 px-1 my-1.5">
            <span className="p-2 rounded-3xl bg-white text-gray-700 text-sm text-center block border border-gray-200">
              09:00
            </span>
          </li>
          <li className="w-1/4 px-1 my-1.5">
            <span className="p-2 rounded-3xl bg-white text-gray-700 text-sm text-center block border border-gray-200">
              09:40
            </span>
          </li>
          <li className="w-1/4 px-1 my-1.5">
            <span className="p-2 rounded-3xl bg-white text-gray-700 text-sm text-center block border border-gray-200">
              11:20
            </span>
          </li>
          <li className="w-1/4 px-1 my-1.5">
            <span className="p-2 rounded-3xl text-gray-400 text-sm text-center block">
              12:50
            </span>
          </li>
          <li className="w-1/4 px-1 my-1.5">
            <span className="p-2 rounded-3xl bg-white text-gray-700 text-sm text-center block border border-gray-200">
              14:40
            </span>
          </li>

          <li className="w-1/4 px-1 my-1.5">
            <span className="p-2 rounded-3xl bg-white text-gray-700 text-sm text-center block border border-gray-200">
              16:30
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}

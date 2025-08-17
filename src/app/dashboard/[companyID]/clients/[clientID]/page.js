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
    </div>
  );
}

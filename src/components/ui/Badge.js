import { cn } from "@/lib/cn";
import React from "react";

export default function Badge({ children, scheme }) {
  let colorScheme = "";
  switch (scheme) {
    case "green":
      colorScheme =
        "bg-green-200 text-green-800 dark:bg-green-900 dark:text-green-300";
      break;
    case "yellow":
      colorScheme =
        "bg-yellow-200 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      break;
    case "blue":
      colorScheme =
        "bg-blue-200 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      break;
    case "red":
      colorScheme = "bg-red-200 text-red-800 dark:bg-red-900 dark:text-red-300";
      break;
    default:
      colorScheme =
        "bg-gray-200 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
      break;
  }
  return (
    <div
      className={cn(
        "flex justify-center items-center text-xs font-medium px-2 py-0.5 rounded-full",
        colorScheme
      )}
    >
      {children}
    </div>
  );
}

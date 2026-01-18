import { cn } from "@/lib/cn";
import React from "react";

export default function Badge({ children, scheme }) {
  let colorScheme = "";
  switch (scheme) {
    case "green":
      colorScheme = "bg-green-200 text-green-800";
      break;
    case "yellow":
      colorScheme = "bg-yellow-200 text-yellow-800";
      break;
    case "blue":
      colorScheme = "bg-blue-200 text-blue-800";
      break;
    case "red":
      colorScheme = "bg-red-200 text-red-800";
      break;
    default:
      colorScheme = "bg-gray-200 text-gray-800";
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

import React from "react";
import { CheckCircleIcon, MinusCircleIcon } from "../ui/Icons";
import { cn } from "@/lib/cn";

export default function ClientSettings({ clientSettings }) {
  return (
    <div className="mt-8">
      <div className="mb-1">
        <h2 className="font-bold text-lg">Налаштування профілю</h2>
      </div>
      <div className="flex justify-between items-center py-4 border-b border-gray-200">
        <span className="block mr-3 text-base font-medium text-gray-500  flex-1">
          Сповіщення, про нові знижки та послуги
        </span>
        <div className="flex items-center ml-2">
          <span
            className={cn(
              "mr-1",
              !clientSettings?.salesHintEnabled
                ? "text-red-400"
                : "text-green-600",
            )}
          >
            {!clientSettings?.salesHintEnabled ? "Вимкнено" : "Увімкнено"}
          </span>
          <span className="relative w-5 h-5 block">
            {!clientSettings?.salesHintEnabled ? (
              <MinusCircleIcon className={cn("w-5 h-5 text-red-400")} />
            ) : (
              <CheckCircleIcon
                className={cn(
                  "w-5 h-5 text-green-600",
                  true && "animate__animated animate__bounceIn",
                )}
              />
            )}
          </span>
        </div>
      </div>
      <div className="flex justify-between items-center py-4 border-b border-gray-200">
        <span className="block mr-3 text-base font-medium text-gray-500  flex-1">
          Сповіщення, про зміни в розкладі
        </span>
        <div className="flex items-center ml-2">
          <span
            className={cn(
              "mr-1",
              !clientSettings?.scheduleChangesHintEnabled
                ? "text-red-400"
                : "text-green-600",
            )}
          >
            {!clientSettings?.scheduleChangesHintEnabled
              ? "Вимкнено"
              : "Увімкнено"}
          </span>

          <span className="relative w-5 h-5 block">
            {!clientSettings?.scheduleChangesHintEnabled ? (
              <MinusCircleIcon className={cn("w-5 h-5 text-red-400")} />
            ) : (
              <CheckCircleIcon
                className={cn(
                  "w-5 h-5 text-green-600",
                  true && "animate__animated animate__bounceIn",
                )}
              />
            )}
          </span>
        </div>
      </div>
      <div className="flex justify-between items-center py-4 border-b border-gray-200">
        <span className="block mr-3 text-base font-medium text-gray-500  flex-1">
          Сповіщення із нагадуванням про запис на прийом
        </span>
        <div className="flex items-center ml-2">
          <span
            className={cn(
              "mr-1",
              !clientSettings?.appointmentReminderHintEnabled
                ? "text-red-400"
                : "text-green-600",
            )}
          >
            {!clientSettings?.appointmentReminderHintEnabled
              ? "Вимкнено"
              : "Увімкнено"}
          </span>
          <span className="relative w-5 h-5 block">
            {!clientSettings?.appointmentReminderHintEnabled ? (
              <MinusCircleIcon className={cn("w-5 h-5 text-red-400")} />
            ) : (
              <CheckCircleIcon
                className={cn(
                  "w-5 h-5 text-green-600",
                  true && "animate__animated animate__bounceIn",
                )}
              />
            )}
          </span>
        </div>
      </div>
    </div>
  );
}

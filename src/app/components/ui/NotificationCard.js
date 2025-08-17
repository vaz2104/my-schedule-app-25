import { cn } from "@/app/lib/cn";
import { CheckCircleIcon, ExclamationCircleIcon } from "./Icons";

export default function NotificationCard({ type }) {
  return (
    <div>
      <div className="w-full mb-4 p-4 text-gray-900 rounded-lg shadow-sm bg-gray-50 bg-white border border-gray-50">
        <div className="flex">
          <div
            className={cn(
              "relative inline-block shrink-0 w-12 h-12  border-2 border-gray-200 rounded-full",
              type === "subscribe" && "border-green-500",
              type === "unsubscribe" && "border-red-500"
            )}
          >
            <img
              src={
                "https://doodleipsum.com/700x700/avatar?i=310c74837ffe0803164ed110256826e1"
              }
              className="w-12 h-12 rounded-full"
              alt="Jese Leos image"
            />

            <span
              className={cn(
                "absolute bottom-0 right-0 -mr-0.5 -mb-0.5 inline-flex items-center justify-center w-6 h-6 rounded-full",
                type === "subscribe" && "text-green-500 bg-green-100",
                type === "unsubscribe" && "text-red-500 bg-red-100"
              )}
            >
              {type === "subscribe" && <CheckCircleIcon className="w-6 h-6" />}
              {type === "unsubscribe" && (
                <ExclamationCircleIcon className="w-6 h-6" />
              )}
            </span>
          </div>
          <div className="ms-3 text-sm font-normal">
            <div className="text-sm font-semibold text-gray-900 dark:text-white">
              Bonnie Green
            </div>
            <p className="text-xs text-gray-400">2025-01-28 в 17:26</p>
            <div className="text-sm font-normal">Скасовано запис</div>
            <div className="text-sm font-normal">Оформлення запису</div>
          </div>
        </div>
      </div>
    </div>
  );
}

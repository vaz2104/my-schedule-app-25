import { cn } from "@/lib/cn";
import { CheckCircleIcon, ExclamationCircleIcon } from "./Icons";
import pringDate from "@/lib/pringDate";
import formatDate from "@/lib/formatDate";
import Badge from "./Badge";

export default function NotificationCard({ dataObject }) {
  const { notification, createdAt, isOpened } = dataObject;
  const { message, metadata, author } = notification;
  const parsedMetadata = JSON.parse(metadata);
  const type = parsedMetadata?.notificationType;

  return (
    <div>
      <div
        className={cn(
          `w-full mb-4 p-4 text-gray-900 rounded-lg shadow-sm bg-white border border-gray-50`,
          !isOpened && "bg-gray-100 border-gray-200"
        )}
      >
        <div className="flex">
          <div
            className={cn(
              "relative inline-block shrink-0 w-12 h-12  border-2 border-gray-200 rounded-full",
              type === "subscribe" && "border-green-600",
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
                "absolute bottom-0 right-0 -mr-1 -mb-1 inline-flex items-center justify-center rounded-full",
                type === "clientNewAppointment" && "text-green-600 ",
                type === "clientCancelAppointment" && "text-red-500 "
              )}
            >
              {type === "clientNewAppointment" && (
                <CheckCircleIcon className="w-6 h-6" />
              )}
              {type === "clientCancelAppointment" && (
                <ExclamationCircleIcon className="w-7 h-7" />
              )}
            </span>
          </div>
          <div className="ms-3 text-sm font-normal">
            <div className="text-sm font-semibold text-gray-900 dark:text-white">
              {author?.firstName || author?.username}
            </div>
            <p className="text-xs text-gray-400">{pringDate(createdAt)}</p>
            <div className="text-sm font-normal">{message}</div>
            <div className="flex mt-1">
              <div>
                <Badge scheme={type === "clientCancelAppointment" && "red"}>
                  {formatDate(parsedMetadata?.messageOptions?.date, "ui")}
                </Badge>
              </div>

              <div className="ml-2">
                <Badge scheme={type === "clientCancelAppointment" && "red"}>
                  {parsedMetadata?.messageOptions?.time}
                </Badge>
              </div>
            </div>

            {parsedMetadata?.messageOptions?.service && (
              <div className="mt-2">
                <div className="font-bold">Обрана послуга:</div>

                <div className="mt-1 flex flex-start">
                  <Badge scheme={type === "clientCancelAppointment" && "red"}>
                    {parsedMetadata?.messageOptions?.service}
                  </Badge>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

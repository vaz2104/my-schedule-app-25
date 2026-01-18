import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Spinner from "../ui/Spinner";
import Alert from "../ui/Alert";
import { AuthService } from "@/services/AuthService";
import { CompanyService } from "@/services/CompanyService";
import { CheckCircleIcon, MinusCircleIcon } from "../ui/Icons";
import { cn } from "@/lib/cn";

export default function ClientSettings() {
  const [clientSettings, setClientSettings] = useState(null);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const params = useParams();

  async function getClientSettings() {
    const session = await AuthService.getSession();
    const clientsResponse = await CompanyService.getClients({
      botId: params?.companyID,
      telegramUserId: session?.userId,
    });

    if (clientsResponse.status !== 200) {
      setError("Сталася помилка при завантаженні даних");
    } else {
      setClientSettings(clientsResponse.data[0]);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    getClientSettings();
  }, []);

  if (isLoading)
    return (
      <div className="py-4 flex justify-center items-center h-[calc(100vh-9rem)]">
        <Spinner />
      </div>
    );

  if (error) {
    return (
      <div className="p-4 flex justify-center items-center h-[calc(100vh-9rem)]">
        <Alert className={"w-full"}>{error}</Alert>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center py-4 border-b border-gray-200">
        <span className="block mr-3 text-base font-medium text-gray-600  flex-1">
          Сповіщення, про нові знижки та послуги
        </span>
        <div className="ml-2">
          <span className="relative w-6 h-6 block">
            {!clientSettings?.salesHintEnabled ? (
              <MinusCircleIcon className={cn("w-6 h-6 text-red-400")} />
            ) : (
              <CheckCircleIcon
                className={cn(
                  "w-6 h-6 text-green-600",
                  true && "animate__animated animate__bounceIn"
                )}
              />
            )}
          </span>
        </div>
      </div>
      <div className="flex justify-between items-center py-4 border-b border-gray-200">
        <span className="block mr-3 text-base font-medium text-gray-600  flex-1">
          Сповіщення, про зміни в розкладі
        </span>
        <div className="ml-2">
          <span className="relative w-6 h-6 block">
            {!clientSettings?.scheduleChangesHintEnabled ? (
              <MinusCircleIcon className={cn("w-6 h-6 text-red-400")} />
            ) : (
              <CheckCircleIcon
                className={cn(
                  "w-6 h-6 text-green-600",
                  true && "animate__animated animate__bounceIn"
                )}
              />
            )}
          </span>
        </div>
      </div>
      <div className="flex justify-between items-center py-4 border-b border-gray-200">
        <span className="block mr-3 text-base font-medium text-gray-600  flex-1">
          Сповіщення із нагадуванням про запис на прийом
        </span>
        <div className="ml-2">
          <span className="relative w-6 h-6 block">
            {!clientSettings?.appointmentReminderHintEnabled ? (
              <MinusCircleIcon className={cn("w-6 h-6 text-red-400")} />
            ) : (
              <CheckCircleIcon
                className={cn(
                  "w-6 h-6 text-green-600",
                  true && "animate__animated animate__bounceIn"
                )}
              />
            )}
          </span>
        </div>
      </div>
    </div>
  );
}

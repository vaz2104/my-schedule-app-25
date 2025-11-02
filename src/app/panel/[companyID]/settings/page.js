"use client";
import Alert from "@/components/ui/Alert";
import Spinner from "@/components/ui/Spinner";
import { AuthService } from "@/services/AuthService";
import { CompanyService } from "@/services/CompanyService";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function SettingsPage() {
  const [clientSettings, setClientSettings] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState(null);
  const params = useParams();

  const [salesHintEnabled, setSalesHintEnabled] = useState(null);
  const [scheduleChangesHintEnabled, setScheduleChangesHintEnabled] =
    useState(null);
  const [appointmentReminderHintEnabled, setAppointmentReminderHintEnabled] =
    useState(null);

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
      setSalesHintEnabled(clientsResponse?.data[0]?.salesHintEnabled);
      setScheduleChangesHintEnabled(
        clientsResponse?.data[0]?.scheduleChangesHintEnabled
      );

      setAppointmentReminderHintEnabled(
        clientsResponse?.data[0]?.appointmentReminderHintEnabled
      );
    }
  }

  async function loadClientData() {
    setIsLoading(true);
    await getClientSettings();
    setIsLoading(false);
  }

  async function updateClientSettings(key, value) {
    setIsUpdating(true);
    let query = {};
    query[key] = value;

    const updatedResponse = await CompanyService.updateClientRelation(
      clientSettings?._id,
      query
    );

    if (updatedResponse.status !== 200) {
      setError("Сталася помилка при завантаженні даних");
    } else {
      await getClientSettings();
    }

    setIsUpdating(false);
  }

  useEffect(() => {
    loadClientData();
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
    <div className="p-4 relative">
      {isUpdating && (
        <div className="bg-white/10 backdrop-blur-xs p-4 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0 rounded-xl z-20">
          <Spinner />
        </div>
      )}
      <div className="mb-8 mt-4 text-center">
        <h2 className="font-bold text-xl">Налаштування</h2>
      </div>
      <div className="py-6 border-b border-gray-200">
        <label className="flex items-center cursor-pointer">
          <span className="block mr-3 text-base font-medium text-gray-600 dark:text-white flex-1">
            Відправляти мені сповіщення, про нові знижки та послуги
          </span>
          <input
            type="checkbox"
            value={salesHintEnabled}
            onChange={() =>
              updateClientSettings("salesHintEnabled", !salesHintEnabled)
            }
            className="sr-only peer"
            checked={salesHintEnabled}
          />
          <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-main "></div>
        </label>
      </div>
      <div className="py-6 border-b border-gray-200">
        <label className="flex items-center cursor-pointer">
          <span className="block mr-3 text-base font-medium text-gray-600 dark:text-white flex-1">
            Відправляти мені сповіщення, про зміни в розкладі
          </span>
          <input
            type="checkbox"
            value={scheduleChangesHintEnabled}
            onChange={() =>
              updateClientSettings(
                "scheduleChangesHintEnabled",
                !scheduleChangesHintEnabled
              )
            }
            className="sr-only peer"
            checked={scheduleChangesHintEnabled}
          />
          <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-main "></div>
        </label>
      </div>
      <div className="py-6 border-b border-gray-200">
        <label className="flex items-center cursor-pointer">
          <span className="block mr-3 text-base font-medium text-gray-600 dark:text-white flex-1">
            Відправляти мені сповіщення із нагадуванням про запис на прийом
          </span>
          <input
            type="checkbox"
            value={appointmentReminderHintEnabled}
            onChange={() =>
              updateClientSettings(
                "appointmentReminderHintEnabled",
                !appointmentReminderHintEnabled
              )
            }
            className="sr-only peer"
            checked={appointmentReminderHintEnabled}
          />
          <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-main "></div>
        </label>
      </div>
    </div>
  );
}

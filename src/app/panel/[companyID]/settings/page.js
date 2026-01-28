"use client";
import Alert from "@/components/ui/Alert";
import Spinner from "@/components/ui/Spinner";
import Thumbnail from "@/components/ui/Thumbnail";
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
        clientsResponse?.data[0]?.scheduleChangesHintEnabled,
      );

      setAppointmentReminderHintEnabled(
        clientsResponse?.data[0]?.appointmentReminderHintEnabled,
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
      query,
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

      <div className="px-4">
        <div className={"flex justify-center"}>
          <Thumbnail url={clientSettings?.telegramUserId?.photoUrl} size="lg" />
        </div>
        <div className="text-sm font-normal text-center mt-2">
          <div className="font-bold text-xl text-gray-900 ">
            {clientSettings?.telegramUserId?.firstName ||
              clientSettings?.telegramUserId?.username}
          </div>
        </div>
      </div>
      <div className="mt-4 mb-4">
        <h2 className="font-bold text-xl text-center">Ваші налаштування</h2>
      </div>
      <div className="py-6 border-b border-gray-200">
        <label className="flex items-center cursor-pointer">
          <span className="block mr-3 text-base font-medium text-gray-600  flex-1">
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
          <span className="block mr-3 text-base font-medium text-gray-600  flex-1">
            Відправляти мені сповіщення, про зміни в розкладі
          </span>
          <input
            type="checkbox"
            value={scheduleChangesHintEnabled}
            onChange={() =>
              updateClientSettings(
                "scheduleChangesHintEnabled",
                !scheduleChangesHintEnabled,
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
          <span className="block mr-3 text-base font-medium text-gray-600  flex-1">
            Відправляти мені сповіщення із нагадуванням про запис на прийом
          </span>
          <input
            type="checkbox"
            value={appointmentReminderHintEnabled}
            onChange={() =>
              updateClientSettings(
                "appointmentReminderHintEnabled",
                !appointmentReminderHintEnabled,
              )
            }
            className="sr-only peer"
            checked={appointmentReminderHintEnabled}
          />
          <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-main "></div>
        </label>
      </div>

      <div className="mt-16">
        <div class="flex shadow-xs rounded-base -space-x-0.5">
          <input
            type="text"
            class="px-3 py-2.5 bg-neutral-secondary-medium border border-default-medium text-heading text-sm focus:ring-brand focus:border-brand block w-full placeholder:text-body"
            placeholder="Search for products"
            required
          />
          <button
            type="button"
            class="inline-flex items-center  text-white bg-brand hover:bg-brand-strong box-border border border-transparent focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-e-base text-sm px-4 py-2.5 focus:outline-none"
          >
            <svg
              class="w-4 h-4 me-1.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="2"
                d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
              />
            </svg>
            Search
          </button>
        </div>
      </div>
    </div>
  );
}

"use client";
import AppointmentsList from "@/components/admin/AppointmentsList";
import ClientSettings from "@/components/admin/ClientSettings";
import Alert from "@/components/ui/Alert";
import Badge from "@/components/ui/Badge";
import Spinner from "@/components/ui/Spinner";
import Thumbnail from "@/components/ui/Thumbnail";
import { CompanyService } from "@/services/CompanyService";
import { UserService } from "@/services/UserService";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ClientSingle() {
  const [clientSettings, setClientSettings] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const params = useParams();

  async function getClientSettings() {
    const clientsResponse = await CompanyService.getClients({
      botId: params?.companyID,
      telegramUserId: params?.clientID,
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
    <div className="p-4">
      <div className="mt-1.5">
        <div className={"flex justify-center"}>
          <Thumbnail url={clientSettings?.telegramUserId?.photoUrl} size="lg" />
        </div>
        <div className="text-sm font-normal text-center mt-2">
          <div className="font-bold text-xl text-gray-900">
            {clientSettings?.firstName} {clientSettings?.lastName}
          </div>
        </div>
        {clientSettings?.telegramUserId?.username && (
          <div className="mt-4 flex justify-center">
            <a
              href={`https://t.me/${clientSettings?.telegramUserId?.username}`}
              target="_blunk"
              className="text-main hover:underline"
            >
              @{clientSettings?.telegramUserId?.username}
            </a>
          </div>
        )}
        {clientSettings?.phoneNumber ? (
          <div className="mt-4 flex justify-center">
            <a
              href={`https://t.me/${clientSettings?.telegramUserId?.username}`}
              target="_blunk"
              className="text-main hover:underline"
            >
              @{clientSettings?.telegramUserId?.username}
            </a>
          </div>
        ) : (
          <div className="mt-4 ">
            <Alert type="default">Номер телефону не вказано</Alert>
          </div>
        )}
      </div>

      <ClientSettings clientSettings={clientSettings} />

      <div className="mt-16 mb-4">
        <h2 className="font-bold text-lg text-center">Історія записів</h2>
      </div>
      <div className="px-4">
        <AppointmentsList />
      </div>
    </div>
  );
}

"use client";
import AppointmentsList from "@/components/admin/AppointmentsList";
import ClientSettings from "@/components/admin/ClientSettings";
import Alert from "@/components/ui/Alert";
import Spinner from "@/components/ui/Spinner";
import Thumbnail from "@/components/ui/Thumbnail";
import { UserService } from "@/services/UserService";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ClientSingle() {
  const [client, setClient] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const params = useParams();

  async function loadClientData() {
    setIsLoading(true);

    const clientDataResponse = await UserService.getTelegramUser(
      params?.clientID,
      {
        companyID: params?.companyID,
      },
    );

    if (clientDataResponse?.status !== 200) {
      setError("Сталася помилка при завантаженні даних");
    } else {
      setClient(clientDataResponse.data);
    }

    setIsLoading(false);
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
    <div className="p-4">
      <div className="mt-1.5">
        <div className={"flex justify-center"}>
          <Thumbnail url={client?.photoUrl} size="lg" />
        </div>
        <div className="text-sm font-normal text-center mt-2">
          <div className="font-bold text-xl text-gray-900">
            {client?.firstName} {client?.lastName}
          </div>
        </div>
      </div>

      <ClientSettings />

      <div className="mt-16 mb-4">
        <h2 className="font-bold text-lg text-center">Історія записів</h2>
      </div>
      <div className="px-4">
        <AppointmentsList />
      </div>
    </div>
  );
}

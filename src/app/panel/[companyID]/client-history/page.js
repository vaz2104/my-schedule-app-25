"use client";
import AppointmentsHistoryList from "@/components/client/AppointmentsHistoryList";
import Alert from "@/components/ui/Alert";
import Spinner from "@/components/ui/Spinner";
import Thumbnail from "@/components/ui/Thumbnail";
import { AuthService } from "@/services/AuthService";
import { UserService } from "@/services/UserService";
import { useEffect, useState } from "react";

export default function HistoryPage() {
  const [client, setClient] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  async function loadClientData() {
    setIsLoading(true);
    const session = await AuthService.getSession();
    const clientDataResponse = await UserService.getSingle(session?.userId);

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
      <div className="px-4">
        <div className={"flex justify-center"}>
          <Thumbnail url={client?.photoUrl} size="lg" />
        </div>
        <div className="text-sm font-normal text-center mt-2">
          <div className="font-bold text-xl text-gray-900">
            {client?.firstName || client?.username}
          </div>
        </div>
      </div>
      <div className="mt-4 mb-8">
        <h2 className="font-bold text-xl text-center">Ваша історія записів</h2>
      </div>
      <div className="">
        <AppointmentsHistoryList />
      </div>
    </div>
  );
}

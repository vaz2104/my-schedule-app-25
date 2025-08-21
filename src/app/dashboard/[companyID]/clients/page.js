"use client";
import ClientsList from "@/components/admin/ClientsList";
import ClientsWidget from "@/components/admin/ClientsWidget";
import Alert from "@/components/ui/Alert";
import Spinner from "@/components/ui/Spinner";
import { CompanyService } from "@/services/CompanyService";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Clients() {
  const [clients, setClients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const params = useParams();

  async function loadClients() {
    const clientsResponse = await CompanyService.getClients({
      botId: params?.companyID,
    });

    if (clientsResponse.status !== 200) {
      setError("Сталася помилка при завантаженні даних");
    } else {
      setClients(clientsResponse.data);
    }

    setIsLoading(false);
  }

  useEffect(() => {
    loadClients();
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
      <div className="mb-8 mt-4 text-center">
        <h2 className="font-bold text-xl">Клієнти</h2>
      </div>
      <div className="mb-8 ">
        <ClientsWidget
          botId={params?.companyID}
          totalNumber={clients?.length}
        />
      </div>
      <div className="mb-8">
        {/* <h2 className="font-bold text-xl">Всі клієнти</h2> */}
        <ClientsList clients={clients} />
      </div>
    </div>
  );
}

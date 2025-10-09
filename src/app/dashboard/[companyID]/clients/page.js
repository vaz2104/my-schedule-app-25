"use client";
import ClientsList from "@/components/admin/ClientsList";
import ClientsWidget from "@/components/admin/ClientsWidget";
import Alert from "@/components/ui/Alert";
import Spinner from "@/components/ui/Spinner";
import { cn } from "@/lib/cn";
import { AppointmentService } from "@/services/AppointmentService";
import { AuthService } from "@/services/AuthService";
import { CompanyService } from "@/services/CompanyService";
import { useAppStore } from "@/store/useAppStore";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Clients() {
  const { role } = useAppStore();

  const [allClients, setAllClients] = useState([]);
  const [clients, setClients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isTabLoading, setIsTabLoading] = useState(false);
  const [error, setError] = useState(null);
  const [tabId, setTabId] = useState("related");
  const params = useParams();

  async function getAllClients() {
    const clientsResponse = await CompanyService.getClients({
      botId: params?.companyID,
    });
    const clientsList = [];

    if (clientsResponse.status !== 200) {
      setError("Сталася помилка при завантаженні даних");
    } else {
      clientsResponse.data.forEach((client) => {
        clientsList.push({ clientId: client?.telegramUserId });
      });
    }
    return clientsList;
  }

  async function getRelatedClients() {
    const session = await AuthService.getSession();
    const clientsResponse = await AppointmentService.getClients({
      botId: params?.companyID,
      workerId: session?.userId,
    });

    if (clientsResponse.status !== 200) {
      setError("Сталася помилка при завантаженні даних");
      return [];
    }

    return clientsResponse.data;
  }

  async function loadAllClients() {
    setIsLoading(true);
    const clientsResponseData = await getAllClients();
    setAllClients(clientsResponseData);
    setIsLoading(false);
  }

  async function loadClientsCategory(id) {
    setIsTabLoading(true);
    setTabId(id);
    switch (id) {
      case "all":
        setClients(await getAllClients());
        break;
      case "related":
        setClients(await getRelatedClients());
        break;
    }
    setIsTabLoading(false);
  }

  useEffect(() => {
    loadAllClients();
    loadClientsCategory(tabId);
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
          label={
            role !== "admin" ? "Ваші клієнти" : "Клієнти, що користуються ботом"
          }
          totalNumber={role === "admin" ? allClients?.length : clients?.length}
        />
      </div>
      <div className="mb-8">
        {role === "admin" && (
          <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
            <ul className="flex flex-wrap -mb-px text-sm font-medium text-center">
              <li className="me-2" role="presentation">
                <button
                  className={cn(
                    "inline-block p-4",
                    tabId === "related" && "border-b-2 rounded-t-lg"
                  )}
                  type="button"
                  onClick={() => loadClientsCategory("related")}
                >
                  Ваші клієнти
                </button>
              </li>
              <li className="me-2" role="presentation">
                <button
                  className={cn(
                    "inline-block p-4",
                    tabId === "all" && "border-b-2 rounded-t-lg"
                  )}
                  type="button"
                  onClick={() => loadClientsCategory("all")}
                >
                  Всі клієнти
                </button>
              </li>
            </ul>
          </div>
        )}

        <ClientsList clients={clients} isLoading={isTabLoading} />
      </div>
    </div>
  );
}

"use client";

import Alert from "@/components/ui/Alert";
import Spinner from "@/components/ui/Spinner";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ServicesService } from "@/services/ServicesService";
import { cn } from "@/lib/cn";
import { WorkerService } from "@/services/WorkerService";
import { AuthService } from "@/services/AuthService";
import { useAppStore } from "@/store/useAppStore";

export default function WorkerServices() {
  const { adminId } = useAppStore();
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedServices, setSelectedServices] = useState([]);

  const [error, setError] = useState(null);
  const params = useParams();

  async function loadServices() {
    setIsLoading(true);
    const servicesResponse = await ServicesService.getMany({
      botId: params?.companyID,
    });

    if (servicesResponse.status !== 200) {
      setError("Сталася помилка при завантаженні даних");
    } else {
      setServices(servicesResponse.data);
    }

    setIsLoading(false);
  }

  async function loadWorkerServices() {
    setIsLoading(true);
    const session = await AuthService.getSession();
    const servicesResponse = await WorkerService.getServices({
      botId: params?.companyID,
      workerId: params?.specialistID ? params?.specialistID : session?.userId,
    });

    if (servicesResponse.status !== 200) {
      setError("Сталася помилка при завантаженні даних");
    } else {
      let servicesIds = [];
      servicesResponse.data?.services.forEach((object) =>
        servicesIds.push(object?._id)
      );

      setSelectedServices(servicesIds);
    }

    setIsLoading(false);
  }

  useEffect(() => {
    loadServices();
    loadWorkerServices();
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
    <div className="relative">
      <div className="mb-4">
        <h2 className="font-bold text-lg">Послуги</h2>
        <p className="text-sm text-gray-400">
          Послуги, які працівник може надавати
        </p>
      </div>
      {services?.length > 0 ? (
        <>
          <div className="bg-gray-100">
            {services.map((service) => {
              return (
                <div
                  className="flex justify-between items-center p-4 border-b border-gray-200"
                  key={service?._id}
                >
                  <div className={cn("text-gray-900")}>{service?.service}</div>
                  <div className="ml-2">за</div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <>
          <div className="text-center text-gray-400 mt-16">
            <p>Жодних доступних місць для запису</p>
          </div>
        </>
      )}
    </div>
  );
}

"use client";

import Alert from "@/components/ui/Alert";
import Spinner from "@/components/ui/Spinner";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ServicesService } from "@/services/ServicesService";
import { CheckCircleIcon, MinusCircleIcon } from "../ui/Icons";
import { cn } from "@/lib/cn";
import { WorkerService } from "@/services/WorkerService";
import { AuthService } from "@/services/AuthService";

export default function WorkerServices() {
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
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
      setSelectedServices(servicesResponse.data);
    }

    setIsLoading(false);
  }

  async function assignService(serviceId) {
    setIsUpdating(true);
    let newServicesState = [];
    if (selectedServices.includes(serviceId)) {
      newServicesState = selectedServices.filter((id) => id !== serviceId);
    } else {
      newServicesState = [...selectedServices, serviceId];
    }

    const session = await AuthService.getSession();
    const query = {
      botId: params?.companyID,
      workerId: params?.specialistID ? params?.specialistID : session?.userId,
      services: newServicesState,
    };

    const response = await WorkerService.setServices(query);
    if (response.status !== 200) {
      setError("Сталася помилка при завантаженні даних");
    } else {
      setSelectedServices(response.data);
    }
    setIsUpdating(false);
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
    <div className="p-4 relative">
      {isUpdating && (
        <div className="bg-white/10 backdrop-blur-xs p-4 flex justify-center items-center absolute -top-1 -right-1 -bottom-1 -left-1 rounded-xl z-20">
          <Spinner />
        </div>
      )}
      <div className="mb-4">
        <h2 className="font-bold text-lg">Послуги</h2>
        <p className="text-sm text-gray-400">
          *Вкажіть послуги, які працівник може надавати клієнтам
        </p>
      </div>
      <div className="bg-gray-100">
        {services.map((service) => {
          return (
            <div
              className="flex justify-between items-center p-4 border-b border-gray-200"
              key={service?._id}
              onClick={() => assignService(service?._id)}
            >
              <div className="text-gray-900">{service?.service}</div>
              <div className="ml-2">
                <span className="relative w-6 h-6 block">
                  {selectedServices.includes(service?._id) ? (
                    <CheckCircleIcon
                      className={cn(
                        "w-6 h-6 text-green-600",
                        true && "animate__animated animate__bounceIn"
                      )}
                    />
                  ) : (
                    <MinusCircleIcon className={cn("w-6 h-6 text-red-400")} />
                  )}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

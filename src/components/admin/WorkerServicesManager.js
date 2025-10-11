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

export default function WorkerServicesManager() {
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [selectedServices, setSelectedServices] = useState([]);
  const [disabledServices, setDisabledServices] = useState([]);
  const [error, setError] = useState(null);
  const params = useParams();

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
      console.log(servicesResponse.data);

      setSelectedServices(servicesResponse.data?.services);
      setDisabledServices(servicesResponse.data?.disabledServices);
    }

    setIsLoading(false);
  }

  async function toggleServiceVisibility(serviceId) {
    setIsUpdating(true);
    let newServicesState = [];
    if (disabledServices.includes(serviceId)) {
      newServicesState = disabledServices.filter((id) => id !== serviceId);
    } else {
      newServicesState = [...disabledServices, serviceId];
    }

    const session = await AuthService.getSession();
    const query = {
      botId: params?.companyID,
      workerId: params?.specialistID ? params?.specialistID : session?.userId,
      disabledServices: newServicesState,
    };

    const response = await WorkerService.setServices(query);
    if (response.status !== 200) {
      setError("Сталася помилка при завантаженні даних");
    } else {
      setSelectedServices(response.data?.services);
      setDisabledServices(response.data?.disabledServices);
    }
    setIsUpdating(false);
  }

  useEffect(() => {
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
    <div className="p-4 pt-0 relative">
      {isUpdating && (
        <div className="bg-white/10 backdrop-blur-xs p-4 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0 rounded-xl z-20">
          <Spinner />
        </div>
      )}
      <div className="mb-4">
        <p className="text-sm text-gray-400">
          *Приховуйте та відображайте в своєму профілі послуги, які Ви може
          надавати клієнтам
        </p>
      </div>
      {selectedServices?.length > 0 ? (
        <>
          <div className="bg-gray-100">
            {selectedServices.map((service) => {
              return (
                <div
                  className="flex justify-between items-center p-4 border-b border-gray-200"
                  key={service?._id}
                  onClick={() => toggleServiceVisibility(service?._id)}
                >
                  <div
                    className={cn(
                      "text-gray-900",
                      disabledServices.includes(service?._id) && "text-gray-400"
                    )}
                  >
                    {service?.service}
                  </div>
                  <div className="ml-2">
                    <span className="relative w-6 h-6 block">
                      {disabledServices.includes(service?._id) ? (
                        <MinusCircleIcon
                          className={cn("w-6 h-6 text-red-400")}
                        />
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

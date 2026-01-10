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
import { FireIcon } from "../ui/Icons";
import formatDate from "@/lib/formatDate";
import ServiceAppointmentForm from "./ServiceAppointmentForm";

export default function WorkerServices() {
  const { adminId } = useAppStore();
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);

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
      let filteredServices = [];

      const { disabledServices } = servicesResponse.data;
      servicesResponse.data?.services.forEach((object) => {
        if (
          Array.isArray(disabledServices) &&
          !disabledServices.includes(object?._id)
        ) {
          filteredServices.push(object);
        }
      });

      setServices(filteredServices);
    }

    setIsLoading(false);
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

  if (!services?.length) return <></>;

  return (
    <div className="relative bg-gray-50 rounded-xl p-4 pb-8">
      <div className="mb-4">
        <h2 className="font-bold text-lg text-center">Послуги</h2>
        <p className="text-xs text-gray-400 text-center">
          *Послуги, які працівник може надавати
        </p>
      </div>
      <div className="">
        {services.map((service) => {
          return (
            <div
              className="flex justify-between items-center py-4 border-b border-gray-200"
              key={service?._id}
            >
              <div>
                <div className="font-bold">{service?.service}</div>
                {service?.saleEndDay && (
                  <div>
                    <span className="mr-1 translate-y-1 inline-block">
                      <FireIcon className={"text-red-500"} />
                    </span>
                    <span className="text-red-500 text-sm">
                      знижка діє до {formatDate(service?.saleEndDay, "ui")}
                    </span>
                  </div>
                )}

                <div className="text-gray-500">
                  {service?.priceWithSale && (
                    <span className="text-red-600">
                      {service?.priceWithSale} грн.
                    </span>
                  )}

                  {service?.price && (
                    <span
                      className={cn(
                        service?.priceWithSale && "ml-2 line-through"
                      )}
                    >
                      {service?.price} грн.
                    </span>
                  )}
                </div>
              </div>
              <div className="ml-2">
                <button
                  className="button"
                  onClick={() => setSelectedService(service)}
                >
                  Записатися
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <ServiceAppointmentForm
        selectedService={selectedService}
        successHandler={loadWorkerServices}
        closeHandler={() => setSelectedService(null)}
      />
    </div>
  );
}

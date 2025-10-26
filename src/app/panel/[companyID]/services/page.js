"use client";

import Alert from "@/components/ui/Alert";
import Spinner from "@/components/ui/Spinner";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ServicesService } from "@/services/ServicesService";
import ServicesList from "@/components/client/ServicesList";
import { WorkerService } from "@/services/WorkerService";

export default function Services() {
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const params = useParams();

  async function loadServices() {
    setIsLoading(true);
    const servicesResponse = await ServicesService.getMany({
      botId: params?.companyID,
    });

    let allServices = [];
    let filteredServices = [];
    if (servicesResponse.status !== 200) {
      setError("Сталася помилка при завантаженні даних");
    } else {
      allServices = [...servicesResponse.data];
    }

    try {
      await Promise.all(
        allServices.map(async (service) => {
          const workersResponse = await WorkerService.getByService({
            botId: params?.companyID,
            serviceId: [service?._id],
          });
          if (workersResponse?.data?.length) filteredServices.push(service);
        })
      ).then(() => {
        setServices(filteredServices);
      });
    } catch (error) {
      setError("Сталася помилка при завантаженні даних");
    }

    setIsLoading(false);
  }

  useEffect(() => {
    loadServices();
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
        <h2 className="font-bold text-xl">Всі послуги</h2>
      </div>
      <div className="">
        <ServicesList updateListHandler={loadServices} services={services} />
      </div>
    </div>
  );
}

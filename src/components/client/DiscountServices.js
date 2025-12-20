"use client";

import Alert from "@/components/ui/Alert";
import Spinner from "@/components/ui/Spinner";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ServicesService } from "@/services/ServicesService";
import ServicesList from "@/components/client/ServicesList";
import { FireIcon } from "../ui/Icons";
import Link from "next/link";
import { useBaseURL } from "@/hooks/useBaseURL";
import { WorkerService } from "@/services/WorkerService";
import { useAppStore } from "@/store/useAppStore";

export default function DiscountServices() {
  const { companyPlan } = useAppStore();
  const { basePlatformLink } = useBaseURL();
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const params = useParams();

  async function loadServices() {
    setIsLoading(true);
    const servicesResponse = await ServicesService.getMany({
      botId: params?.companyID,
    });

    let servicesWithDiscount = [];
    let filteredServices = [];
    if (servicesResponse.status !== 200) {
      setError("Сталася помилка при завантаженні даних");
    } else {
      servicesWithDiscount = servicesResponse.data.filter(
        (service) => service?.priceWithSale && service?.saleEndDay
      );
    }

    if (companyPlan === "free") {
      setServices(servicesWithDiscount);
    } else {
      try {
        await Promise.all(
          servicesWithDiscount.map(async (service) => {
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

  if (!services?.length) return <></>;

  return (
    <div className="bg-gray-100 p-4 rounded-xl mt-16">
      <div className="mb-8 mt-4">
        <h2 className="font-bold text-lg text-center">
          {" "}
          <span className="translate-y-1 inline-block">
            <FireIcon className={"text-red-500 w-6 h-6"} />
          </span>{" "}
          Акційні послуги
        </h2>
      </div>
      <div className="">
        <ServicesList updateListHandler={loadServices} services={services} />
      </div>
      <div className="mt-8">
        <Link
          href={`${basePlatformLink}/services`}
          className="button dark min-w-54 m-auto"
        >
          Переглянути всі послуги
        </Link>
      </div>
    </div>
  );
}

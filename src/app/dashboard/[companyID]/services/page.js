"use client";
import NewServiceForm from "@/components/admin/NewServiceForm";

import Alert from "@/components/ui/Alert";
import Spinner from "@/components/ui/Spinner";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ServicesService } from "@/services/ServicesService";
import ServicesList from "@/components/admin/ServicesList";
import { useCalendarStore } from "@/components/ui/calendar/useCalendarStore";
import { useShallow } from "zustand/shallow";
import { useAppStore } from "@/store/useAppStore";

export default function Services() {
  const { role } = useAppStore();
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const params = useParams();

  const { setSelectedDate } = useCalendarStore(
    useShallow((state) => ({
      setSelectedDate: state.setSelectedDate,
    }))
  );

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

  useEffect(() => {
    loadServices();
    setSelectedDate(new Date());
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
        <h2 className="font-bold text-xl">Послуги</h2>
      </div>
      {role === "admin" && (
        <div className="mb-6">
          <NewServiceForm successHandler={loadServices} />
        </div>
      )}

      <div className="">
        <ServicesList updateListHandler={loadServices} services={services} />
      </div>
    </div>
  );
}

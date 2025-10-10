"use client";

import Alert from "@/components/ui/Alert";
import Spinner from "@/components/ui/Spinner";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ServicesService } from "@/services/ServicesService";

export default function WorkerServices() {
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
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
      <div className="mb-4">
        <h2 className="font-bold text-lg">Послуги</h2>
        <p className="text-sm text-gray-400">
          *Вкажіть послуги, які працівник буде надавати клієнтам
        </p>
      </div>
      <div className="bg-gray-100">
        {services.map((service) => {
          return (
            <div
              className="flex justify-between items-center p-4 text-gray-900 border-b border-gray-200"
              key={service?._id}
            >
              <div className="">{service?.service}</div>
              <div className="ml-2">
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    //   value={isSale}
                    //   onChange={() => selectSale(isSale)}
                    className="sr-only peer"
                    //   checked={isSale}
                  />
                  <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-main "></div>
                </label>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

"use client";
import { FireIcon } from "@/components/ui/Icons";
import { cn } from "@/lib/cn";
import formatDate from "@/lib/formatDate";
import Alert from "../ui/Alert";
import ServiceAppointmentForm from "./ServiceAppointmentForm";
import { useState } from "react";

export default function ServiceCard({
  id,
  service,
  price,
  priceWithSale,
  saleEndDay,
  updateListHandler,
  mapItem,
}) {
  const [selectedService, setSelectedService] = useState(null);

  if (!service)
    return (
      <div className="my-4">
        <Alert type="default">Помилка! Відсутні дані!</Alert>
      </div>
    );

  return (
    <div className="md:flex justify-between items-start py-4 text-gray-900 border-b border-gray-200">
      <div>
        <div className="font-bold">{service}</div>
        {saleEndDay && (
          <div>
            <span className="mr-1 translate-y-1 inline-block">
              <FireIcon className={"text-red-500"} />
            </span>
            <span className="text-red-500 text-sm">
              знижка діє до {formatDate(saleEndDay, "ui")}
            </span>
          </div>
        )}

        <div className="text-gray-500">
          {priceWithSale && (
            <span className="text-red-600">{priceWithSale} грн.</span>
          )}

          {price && (
            <span className={cn(priceWithSale && "ml-2 line-through")}>
              {price} грн.
            </span>
          )}
        </div>
      </div>
      <div className="mt-4">
        <button
          className="button w-full gray"
          onClick={() => setSelectedService(mapItem)}
        >
          Записатися
        </button>
      </div>

      <ServiceAppointmentForm
        selectedService={selectedService}
        successHandler={updateListHandler}
        closeHandler={() => setSelectedService(null)}
      />
    </div>
  );
}

"use client";
import { FireIcon, PencilIcon, TrashIcon } from "@/components/ui/Icons";
import { cn } from "@/lib/cn";
import formatDate from "@/lib/formatDate";
import Alert from "../ui/Alert";
import ConfirmModal from "../ui/ConfirmModal";
import { useContext, useState } from "react";
import { ServicesService } from "@/services/ServicesService ";
import { ThemeContext } from "@/context/ThemeContext";

export default function ServiceCard({
  id,
  service,
  price,
  priceWithSale,
  saleEndDay,
  updateListHandler,
}) {
  const [editServiceId, setEditServiceId] = useState(null);
  const [deleteServiceId, setDeleteServiceId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { setWarningError } = useContext(ThemeContext);

  async function deleteService() {
    setIsLoading(true);
    const servicesResponse = await ServicesService.delete(deleteServiceId);

    if (servicesResponse.status !== 200) {
      setDeleteServiceId(null);
      setWarningError("Сталася помилка при виконанні запиту");
    } else {
      if (updateListHandler) updateListHandler();
    }

    setIsLoading(false);
  }

  if (!service)
    return (
      <div className="my-4">
        <Alert type="default">Помилка! Відсутні дані!</Alert>
      </div>
    );

  console.log(deleteServiceId);

  return (
    <div className="flex justify-between items-center py-4 text-gray-900 border-b border-gray-200">
      <div>
        <div className="font-bold">{service}</div>
        {saleEndDay && (
          <div>
            <span className="mr-1 translate-y-1 inline-block">
              <FireIcon className={"text-red-500"} />
            </span>
            <span className="text-red-500 text-sm">
              знижка діє до {formatDate(saleEndDay)}
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
      <div className="flex">
        <div className="mr-4">
          <button
            className="button blank !px-2"
            onClick={() => setEditServiceId(id)}
          >
            <PencilIcon className="w-4 text-black" />
          </button>
        </div>
        <div className="">
          <button
            className="button blank !px-2"
            onClick={() => setDeleteServiceId(id)}
          >
            <TrashIcon className="w-4 text-red-600" />
          </button>
        </div>
      </div>

      <ConfirmModal
        triger={deleteServiceId}
        cancelFn={() => setDeleteServiceId(null)}
        confirmFn={deleteService}
        title={`Ви дійсно бажаєте видалити дану послугу?`}
        loading={isLoading}
      />
    </div>
  );
}

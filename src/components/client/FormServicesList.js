import { cn } from "@/lib/cn";
import { CheckCircleIcon } from "../ui/Icons";

export default function FormServicesList({
  services,
  selectedService,
  selectHandler,
}) {
  if (!services || !services?.length) {
    return (
      <div className="p-4">
        <div className="text-center text-gray-400 mt-16">
          <p>Відсутня інформація про послуги</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-4">
      <ul className="space-y-1 text-gray-500 list-inside">
        {services.map((service) => {
          return (
            <li
              className="flex items-center py-3 border-b border-gray-200"
              key={service?._id}
              onClick={() => selectHandler(service?._id)}
            >
              {selectedService === service?._id ? (
                <CheckCircleIcon
                  className={
                    "w-4 h-4 text-green-500 animate__animated animate__bounceIn"
                  }
                />
              ) : (
                <div className="w-4 h-4 rounded-full border-2 border-gray-400"></div>
              )}

              <div className="flex-1 ml-4">
                <div>{service.service}</div>
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
            </li>
          );
        })}
      </ul>
    </div>
  );
}

"use client";
import { CheckCircleIcon } from "../ui/Icons";
import BaseModal from "../ui/BaseModal";
import { useContext, useState } from "react";
import { ServicesService } from "@/services/ServicesService";
import { useParams } from "next/navigation";
import { monthsFullName } from "../ui/calendar/calendar-vars";
import { cn } from "@/lib/cn";
import { AppointmentService } from "@/services/AppointmentService";
import { AuthService } from "@/services/AuthService";
import { ThemeContext } from "@/context/ThemeContext";
import { NotificationService } from "@/services/NotificatoinsServices";

export default function AppointmentForm({
  selectedSchedule,
  selectedAppointment,
  successHandler,
  closeHandler,
}) {
  const { setSuccessMessage } = useContext(ThemeContext);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [services, setServices] = useState([]);
  const [isService, setIsService] = useState(false);
  const [error, setError] = useState(null);
  const params = useParams();

  function closeModal() {
    setIsLoading(false);
    setIsService(false);
    setSelectedService(null);
    setServices([]);
    if (closeHandler) closeHandler();
  }

  async function loadServices() {
    setIsLoading(true);
    const servicesResponse = await ServicesService.getMany({
      botId: params?.companyID,
    });

    // console.log(servicesResponse);

    if (servicesResponse.status !== 200) {
      setError("Сталася помилка при завантаженні даних");
    } else {
      setServices(servicesResponse.data);
    }

    setIsLoading(false);
  }

  async function createService() {
    setIsLoading(true);
    const session = await AuthService.getSession();

    const query = {
      botId: params?.companyID,
      clientId: session?.userId,
      scheduleId: selectedSchedule?._id,
      appointmentKey: selectedAppointment,
      serviceId: selectedService,
      timestamp: Date.now(),
    };

    const response = await AppointmentService.create(query);

    if (response.status !== 200) {
      setError("Сталася помилка при завантаженні даних");
      setIsLoading(false);
    } else {
      closeModal();
      const session = await AuthService.getSession();
      await NotificationService.createNotification({
        notification: {
          botId: params?.companyID,
          author: session?.userId,
        },
        recipientRole: "admin",
        type: "clientNewAppointment",
        meta: response?.data,
      });
      if (successHandler) successHandler();
      setSuccessMessage("Вітаємо! Даний час успішно зарезервовано за Вами");
    }
  }

  async function selectService(status) {
    setIsService(status);

    if (!status) {
      setSelectedService(null);
    } else {
      await loadServices();
    }
  }

  if (!selectedSchedule) return <></>;

  return (
    <BaseModal
      title={"Новий запис на прийом"}
      triger={selectedSchedule}
      cancelFn={closeHandler}
      confirmFn={createService}
      error={error}
      hideErrorFn={() => setError(null)}
      loading={isLoading}
    >
      <div className="">
        <div className="my-8 text-center">
          <div className="text-lg text-gray-500">Обрана Вами дата та час</div>
          <div className="mt-2 text-2xl font-bold">
            {" "}
            {new Date(selectedSchedule?.date).getDate()}{" "}
            {monthsFullName[
              new Date(selectedSchedule?.date).getMonth()
            ].toLowerCase()}
            ,
            <span className="ml-1">
              {Object.keys(selectedSchedule?.schedule).map((itemKey) => {
                if (itemKey === selectedAppointment) {
                  return (
                    <span key={`${itemKey}`}>
                      {selectedSchedule?.schedule[itemKey]}
                    </span>
                  );
                }
              })}
            </span>
          </div>
        </div>
        <div className="mt-10">
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              value={isService}
              onChange={() => selectService(!isService)}
              className="sr-only peer"
            />
            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-mainBlue "></div>
            <span className="block ms-2 text-sm font-medium text-gray-900 dark:text-white">
              Обрати послугу{" "}
              <span className="text-gray-400">(не обов`язково)</span>
            </span>
          </label>

          {isService && services?.length > 0 && (
            <div className="mt-4">
              {services.map((service) => {
                return (
                  <li
                    className="flex items-center py-4 border-b border-gray-200"
                    key={service?._id}
                    onClick={() => setSelectedService(service?._id)}
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
              <ul className="max-w-md space-y-1 text-gray-500 list-inside dark:text-gray-400"></ul>
            </div>
          )}
        </div>
      </div>
    </BaseModal>
  );
}

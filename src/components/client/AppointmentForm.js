"use client";
import BaseModal from "../ui/BaseModal";
import { useContext, useEffect, useState } from "react";
import { ServicesService } from "@/services/ServicesService";
import { useParams } from "next/navigation";
import { monthsFullName } from "../ui/calendar/calendar-vars";
import { AppointmentService } from "@/services/AppointmentService";
import { AuthService } from "@/services/AuthService";
import { ThemeContext } from "@/context/ThemeContext";
import { NotificationService } from "@/services/NotificatoinsServices";
import { WorkerService } from "@/services/WorkerService";
import { useAppStore } from "@/store/useAppStore";
import FormServicesList from "./FormServicesList";
import { CompanyService } from "@/services/CompanyService";

export default function AppointmentForm({
  selectedSchedule,
  selectedAppointment,
  successHandler,
  closeHandler,
}) {
  const { companyPlan } = useAppStore();
  const { setSuccessMessage, setWarningError } = useContext(ThemeContext);
  const [clientSettings, setClientSettings] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");
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
    const query = {
      botId: params?.companyID,
    };

    if (companyPlan === "free" || companyPlan === "basic") {
      const companyServicesResponse = await ServicesService.getMany(query);
      if (companyServicesResponse.status !== 200) {
        setError("Сталася помилка при завантаженні даних");
      } else {
        setServices(companyServicesResponse?.data);
      }
    } else {
      query.workerId = selectedSchedule?.workerId?._id;
      const workerServicesResponse = await WorkerService.getServices(query);
      if (workerServicesResponse.status !== 200) {
        setError("Сталася помилка при завантаженні даних");
      } else {
        let filteredServices = [];
        if (workerServicesResponse?.data?.services?.length > 0) {
          const { disabledServices } = workerServicesResponse?.data;
          workerServicesResponse?.data?.services.forEach((object) => {
            if (
              Array.isArray(disabledServices) &&
              !disabledServices.includes(object?._id)
            ) {
              filteredServices.push(object);
            }
          });
        }
        setServices(filteredServices);
      }
    }

    setIsLoading(false);
  }

  async function createAppointment() {
    if (!clientSettings?.phoneNumber) {
      const regexp = /^(\+38)?0(39|50|63|66|67|68|73|89|9[1-9])[0-9]{7}$/;

      if (phoneNumber === "" || !regexp.test(phoneNumber)) {
        setWarningError("Будь ласка, вкажіть коректний номер телефону!");
        setIsLoading(false);
        return;
      }

      await savePhoneNumber();
    }

    setIsLoading(true);
    const session = await AuthService.getSession();

    const query = {
      botId: params?.companyID,
      clientId: session?.userId,
      scheduleId: selectedSchedule?._id,
      workerId: selectedSchedule?.workerId?._id,
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

      await NotificationService.createNotification({
        notification: {
          botId: params?.companyID,
          author: session?.userId,
        },
        recipientRole: "admin",
        recipient: [selectedSchedule?.workerId?._id],
        type: "clientNewAppointment",
        meta: response?.data,
      });
      if (successHandler) successHandler();
      setSuccessMessage("Вітаємо! Даний час успішно зарезервовано за Вами");
    }
  }

  async function getClientSettings() {
    setIsLoading(true);
    const session = await AuthService.getSession();
    const clientsResponse = await CompanyService.getClients({
      botId: params?.companyID,
      telegramUserId: session?.userId,
    });

    if (clientsResponse.status !== 200) {
      setError("Сталася помилка при завантаженні даних");
    } else {
      setClientSettings(clientsResponse.data[0]);
    }
    setIsLoading(false);
  }

  async function savePhoneNumber() {
    setIsLoading(true);

    let query = {
      phoneNumber: phoneNumber,
    };

    const updatedResponse = await CompanyService.updateClientRelation(
      clientSettings?._id,
      query,
    );

    if (updatedResponse.status !== 200) {
      setError("Сталася помилка при обробці даних");
      setIsLoading(false);
      return;
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

  useEffect(() => {
    getClientSettings();
  }, []);

  if (!selectedSchedule) return <></>;

  return (
    <BaseModal
      title={"Новий запис на прийом"}
      triger={selectedSchedule}
      cancelFn={closeModal}
      confirmFn={createAppointment}
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
        <div>
          {!clientSettings?.phoneNumber && (
            <div className="pt-0.5">
              <div className="text-sm text-gray-400">
                Будь ласка, вкажіть свій номер телефону, аби ми могли зв`язатися
                з Вами в разі чого
              </div>
              <div className="mt-2">
                <div className="mt-4 mb-8">
                  <input
                    type="text"
                    className="input"
                    placeholder="Введіть тут"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="mt-10">
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              value={isService}
              onChange={() => selectService(!isService)}
              className="sr-only peer"
            />
            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-main "></div>
            <span className="block ms-2 text-sm font-medium text-gray-900">
              Обрати послугу{" "}
              <span className="text-gray-400">(не обов`язково)</span>
            </span>
          </label>

          {isService && (
            <FormServicesList
              services={services}
              selectedService={selectedService}
              selectHandler={setSelectedService}
            />
          )}
        </div>
      </div>
    </BaseModal>
  );
}

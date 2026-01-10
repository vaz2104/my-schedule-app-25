"use client";
import { CheckCircleIcon, MinusCircleIcon, TrashIcon } from "../ui/Icons";
import BaseModal from "../ui/BaseModal";
import { useContext, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { monthsFullName } from "../ui/calendar/calendar-vars";
import { cn } from "@/lib/cn";
import { AppointmentService } from "@/services/AppointmentService";
import { AuthService } from "@/services/AuthService";
import { ThemeContext } from "@/context/ThemeContext";
import { useCalendarStore } from "../ui/calendar/useCalendarStore";
import { useShallow } from "zustand/shallow";
import MonthScheduleCalendar from "../general/MonthScheduleCalendar";
import ActiveWeekScheduleNoForm from "./ActiveWeekScheduleNoForm";
import { getSelectedDateOnCalendarChange } from "@/lib/schedule-helpers";
import { WorkerService } from "@/services/WorkerService";
import Thumbnail from "../ui/Thumbnail";
import { useBaseURL } from "@/hooks/useBaseURL";
import { useAppStore } from "@/store/useAppStore";

export default function ServiceAppointmentForm({
  selectedService,
  successHandler,
  closeHandler,
}) {
  const { companyPlan } = useAppStore();
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [workers, setWorkers] = useState([]);
  const [selectedWorker, setSelectedWorker] = useState(null);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const { setSuccessMessage } = useContext(ThemeContext);
  const [isLoading, setIsLoading] = useState(false);
  const { basePlatformLink } = useBaseURL();

  const [error, setError] = useState(null);
  const params = useParams();
  const { initCalendarDate, selectedDate, setSelectedDate } = useCalendarStore(
    useShallow((state) => ({
      initCalendarDate: state.initCalendarDate,
      selectedDate: state.selectedDate,
      setSelectedDate: state.setSelectedDate,
    }))
  );

  function closeModal() {
    setIsLoading(false);
    setSelectedSchedule(false);
    setSelectedAppointment(null);
    if (closeHandler) closeHandler();
  }

  async function bookAppointment() {
    if (
      !selectedAppointment ||
      !selectedSchedule?._id ||
      selectedService?._id
    ) {
      setError("Будь ласка, оберіть дату та час прийому!");
      return;
    }
    setIsLoading(true);
    const session = await AuthService.getSession();
    const query = {
      botId: params?.companyID,
      clientId: session?.userId,
      scheduleId: selectedSchedule?._id,
      appointmentKey: selectedAppointment,
      serviceId: selectedService?._id,
      timestamp: Date.now(),
      workerId: selectedWorker
        ? selectedWorker
        : selectedSchedule?.workerId?._id,
    };

    const response = await AppointmentService.create(query);
    console.log(response);

    if (response.status !== 200) {
      setError("Сталася помилка при завантаженні даних");
      setIsLoading(false);
    } else {
      closeModal();
      setSuccessMessage("Вітаємо! Даний час успішно зарезервовано за Вами");
      if (successHandler) successHandler();
    }
  }

  async function loadServiceWorkers() {
    if (
      params?.specialistID ||
      !selectedService?._id ||
      companyPlan === "free" ||
      companyPlan === "basic"
    )
      return;
    setIsLoading(true);

    const servicesResponse = await WorkerService.getByService({
      botId: params?.companyID,
      serviceId: [selectedService?._id],
    });

    if (servicesResponse.status !== 200) {
      setError("Сталася помилка при завантаженні даних");
    } else {
      if (servicesResponse?.data?.length === 1) {
        setSelectedWorker(servicesResponse?.data[0]?.workerId?._id);
      }
      setWorkers(servicesResponse?.data);
    }

    setIsLoading(false);
  }

  function closeCalendar() {
    setSelectedAppointment(null);
    setIsCalendarOpen(false);
    setSelectedDate(new Date());
  }

  useEffect(() => {
    setSelectedDate(getSelectedDateOnCalendarChange(initCalendarDate));
  }, [initCalendarDate]);

  useEffect(() => {
    loadServiceWorkers();
  }, [selectedService]);

  if (!selectedService) return <></>;

  return (
    <BaseModal
      title={"Новий запис на прийом"}
      triger={selectedService}
      cancelFn={closeModal}
      confirmFn={bookAppointment}
      error={error}
      hideErrorFn={() => setError(null)}
      loading={isLoading}
    >
      <div className="">
        <div className="mt-8">
          <ol className="relative text-gray-500 border-s border-gray-200 dark:border-gray-700 dark:text-gray-400 ml-3">
            <li className="mb-10 ms-6">
              <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
                1
              </span>
              <div className="pt-0.5">
                <div className="text-lg text-gray-500">Обрана послуга</div>
                <div className="mt-2">
                  <div className="text-gray-500 font-bold">
                    {selectedService?.service}
                  </div>
                  <div className="text-gray-500">
                    {selectedService?.priceWithSale && (
                      <span className="text-red-600">
                        {selectedService?.priceWithSale} грн.
                      </span>
                    )}

                    {selectedService?.price && (
                      <span
                        className={cn(
                          selectedService?.priceWithSale && "ml-2 line-through"
                        )}
                      >
                        {selectedService?.price} грн.
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </li>
            {!params?.specialistID &&
              companyPlan !== "free" &&
              companyPlan !== "basic" && (
                <li className="mb-10 ms-6">
                  <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
                    2
                  </span>
                  <div className="pt-0.5">
                    <div className="text-lg text-gray-500">
                      Оберіть працівника
                    </div>
                    <div className="mt-2">
                      <p className="mb-4 text-gray-400 text-sm">
                        {workers?.length == 1 &&
                          "Для даної послуги доступний лише один фахівець"}
                      </p>
                      {workers.map((worker) => {
                        return (
                          <div key={worker?._id}>
                            <div
                              href={`${basePlatformLink}/specialists/${worker?.workerId?._id}`}
                              className="w-full mb-4 p-4 py-3 text-gray-900 rounded-lg shadow-sm bg-white border border-gray-50 flex items-center"
                              onClick={() =>
                                setSelectedWorker(worker?.workerId?._id)
                              }
                            >
                              <Thumbnail url={worker?.workerId?.photoUrl} />
                              <div className="ms-3 text-sm font-normal flex-1 ">
                                <div className="text-base font-semibold text-gray-900 dark:text-white">
                                  <>
                                    {worker?.workerId?.firstName ||
                                      worker?.workerId?.username}
                                  </>
                                </div>
                              </div>
                              <div className="ml-2">
                                <span className="relative w-6 h-6 block">
                                  {selectedWorker === worker?.workerId?._id ? (
                                    <CheckCircleIcon
                                      className={cn(
                                        "w-6 h-6 text-green-600",
                                        true &&
                                          "animate__animated animate__bounceIn"
                                      )}
                                    />
                                  ) : (
                                    <div className="w-5.5 h-5.5 rounded-full border-2 border-gray-400"></div>
                                  )}
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </li>
              )}

            <li className={cn("mb-10 ms-6")}>
              <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
                {!params?.specialistID &&
                companyPlan !== "free" &&
                companyPlan !== "basic" &&
                workers?.length >= 2
                  ? 3
                  : 2}
              </span>
              <div className="pt-0.5">
                <div className="text-lg text-gray-500">Обрана дата та час</div>
                <div className="mt-4">
                  {selectedAppointment ? (
                    <div className="flex items-center mt-2 text-gray-500 font-bold">
                      {new Date(selectedSchedule?.date).getDate()}{" "}
                      {monthsFullName[
                        new Date(selectedSchedule?.date).getMonth()
                      ].toLowerCase()}
                      ,
                      <span className="ml-1">
                        {Object.keys(selectedSchedule?.schedule).map(
                          (itemKey) => {
                            if (itemKey === selectedAppointment) {
                              return (
                                <span key={`${itemKey}`}>
                                  {selectedSchedule?.schedule[itemKey]}
                                </span>
                              );
                            }
                          }
                        )}
                      </span>
                      <button onClick={() => setSelectedAppointment(null)}>
                        <TrashIcon className={"ml-2 text-red-500"} />
                      </button>
                    </div>
                  ) : (
                    <button
                      className={cn(
                        "button w-full",
                        workers?.length >= 2 && !selectedWorker && "gray"
                      )}
                      onClick={() => setIsCalendarOpen(true)}
                      disabled={workers?.length >= 2 && !selectedWorker}
                    >
                      Обрати
                    </button>
                  )}
                </div>
              </div>
            </li>
          </ol>
        </div>

        {isCalendarOpen && (
          <div
            id="popup-modal"
            className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 bottom-0 z-50 justify-center items-center w-full h-screen"
          >
            <div className="relative p-4 w-full max-w-md max-h-full">
              <div className="py-8 bg-white rounded-lg w-full">
                <div className="px-4">
                  <MonthScheduleCalendar
                    selectedWorker={
                      params?.specialistID
                        ? params?.specialistID
                        : selectedWorker
                    }
                  />
                  <div className="mt-8 mb-4">
                    <ActiveWeekScheduleNoForm
                      selectedDate={selectedDate}
                      setSelectedSchedule={setSelectedSchedule}
                      setSelectedAppointment={setSelectedAppointment}
                      selectedSchedule={selectedSchedule}
                      selectedAppointment={selectedAppointment}
                      selectedWorker={
                        params?.specialistID
                          ? params?.specialistID
                          : selectedWorker
                      }
                    />
                  </div>
                </div>
                <div className="mt-8 flex px-4 -mx-1">
                  <button
                    type="button"
                    className="button mx-1 w-full"
                    onClick={() => setIsCalendarOpen(false)}
                    // disabled={loading}
                  >
                    OK
                  </button>
                  <button
                    type="button"
                    className="button mx-1 dark w-full"
                    onClick={() => closeCalendar()}
                  >
                    Відмінити
                  </button>
                </div>
              </div>
              <div className="h-4"></div>
            </div>
          </div>
        )}
      </div>
    </BaseModal>
  );
}

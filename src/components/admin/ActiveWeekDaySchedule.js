"use client";
import Alert from "../ui/Alert";
import Spinner from "../ui/Spinner";
import { ScheduleService } from "@/services/ScheduleService";
import { useParams } from "next/navigation";
import { Fragment, useEffect, useState } from "react";
import { AuthService } from "@/services/AuthService";
import formatDate from "@/lib/formatDate";
import { monthsFullName } from "@/lib/calendar-vars";
import CalendarService from "../ui/calendar/CalendarService";
import Link from "next/link";
import { useBaseURL } from "@/hooks/useBaseURL";
import { FireIcon, PhoneSolidIcon, PlusIcon, TrashIcon } from "../ui/Icons";
import { cn } from "@/lib/cn";
import { useCalendarStore } from "../ui/calendar/useCalendarStore";
import { useShallow } from "zustand/shallow";
import ConfirmModal from "../ui/ConfirmModal";
import { AppointmentService } from "@/services/AppointmentService";
import NoSchedule from "./NoSchedule";
import CancelAppointmentForm from "./CancelAppointmentForm";
import Thumbnail from "../ui/Thumbnail";
import NewAppointmentForm from "./NewAppointmentForm";
import { useAppStore } from "@/store/useAppStore";

export default function ActiveWeekDaySchedule() {
  const { adminId, companyPlan } = useAppStore();
  const { selectedDate } = useCalendarStore(
    useShallow((state) => ({
      selectedDate: state.selectedDate,
    })),
  );

  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [selectedDaySchedule, setSelectedDaySchedule] = useState(null);
  const [selectedScheduleItem, setSelectedScheduleItem] = useState(null);
  const [relationToDelete, setRelationToDelete] = useState(null);
  const [confirmMessage, setConfirmMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditingAllowed, setIsEditingAllowed] = useState(false);
  const [error, setError] = useState(null);
  const params = useParams();
  const { baseDashboardLink } = useBaseURL();

  const currentMonth = monthsFullName[new Date(selectedDate).getMonth()];

  async function loadSelectedDaySchedule(date) {
    setIsLoading(true);

    const session = await AuthService.getSession();
    const response = await ScheduleService.getMany({
      botId: params?.companyID,
      workerId: session?.userId,
      date: formatDate(date),
    });

    if (response.status !== 200) {
      setError("Сталася помилка при завантаженні даних");
    } else {
      setSelectedDaySchedule(response.data[0]);
    }

    setIsLoading(false);
  }

  function initDeletingHandler(appointmentKey, relation) {
    console.log(appointmentKey, relation);
    setSelectedScheduleItem(appointmentKey);
    setRelationToDelete(relation);
    const message = relation
      ? "Даний час заброньовано клієнтом! Дійсно бажаєте скасувати бронювання та видалити обраний час з Вашого графіку?"
      : "Дійсно бажаєте видалити даний час з Вашого графіку?";
    setConfirmMessage(message);
  }

  function cancelDeleting() {
    setSelectedScheduleItem(null);
    setConfirmMessage(null);
    setRelationToDelete(null);
  }

  async function deleteHandler() {
    setIsLoading(true);

    const newSchedule = {};
    Object.keys(selectedDaySchedule?.schedule).forEach((key) => {
      if (key !== selectedScheduleItem)
        newSchedule[key] = selectedDaySchedule?.schedule[key];
    });

    if (relationToDelete) {
      const deleteAppointmentResponse = await AppointmentService.delete(
        relationToDelete?._id,
      );

      if (deleteAppointmentResponse.status !== 200) {
        setError("Сталася помилка при виконанні запиту");
        return false;
      }
    }

    let updateScheduleResponse = null;
    if (!Object.keys(newSchedule).length) {
      updateScheduleResponse = await ScheduleService.delete(
        selectedDaySchedule?._id,
      );
    } else {
      updateScheduleResponse = await ScheduleService.update(
        selectedDaySchedule?._id,
        {
          schedule: newSchedule,
        },
      );
    }

    if (updateScheduleResponse.status !== 200) {
      setError("Сталася помилка при виконанні запиту");
    } else {
      await loadSelectedDaySchedule(selectedDate);
      cancelDeleting();
      setIsLoading(false);
    }
  }

  function registrationHandler(schedule, appointment) {
    setSelectedSchedule(schedule);
    setSelectedAppointment(appointment);
  }

  async function checkIsEditingAllowed() {
    const session = await AuthService.getSession();

    let status = true;
    if (
      companyPlan !== "free" &&
      companyPlan !== "basic" &&
      adminId === session?.userId &&
      adminId !== params?.specialistID
    ) {
      status = false;
    }

    setIsEditingAllowed(status);
  }

  useEffect(() => {
    loadSelectedDaySchedule(selectedDate);
    checkIsEditingAllowed();
  }, [selectedDate]);

  if (error) {
    return (
      <div className="p-4 flex justify-center items-center h-[calc(100vh-9rem)]">
        <Alert className={"w-full"}>{error}</Alert>
      </div>
    );
  }

  return (
    <div className="relative mt-6 min-h-84">
      {isLoading && (
        <div className="bg-white/50 backdrop-blur-xs p-4 flex justify-center items-center absolute -top-1 -right-1 -bottom-1 -left-1 rounded-xl z-20">
          <Spinner />
        </div>
      )}
      <div className="mb-4">
        <h2 className="font-bold text-lg text-center">
          Записи на {new Date(selectedDate).getDate()}{" "}
          {currentMonth ? currentMonth.toLowerCase() : ""}
        </h2>
      </div>
      {selectedDaySchedule &&
      Object.keys(selectedDaySchedule?.schedule).length ? (
        <Fragment>
          <div className="mt-2 ">
            {Object.keys(selectedDaySchedule?.schedule).map((itemKey) => {
              const isOldDate = CalendarService.isOldDate(
                selectedDate,
                selectedDaySchedule?.schedule[itemKey],
              );

              let bookedAppointment = null;

              selectedDaySchedule.relations.forEach((relation) => {
                if (relation?.appointmentKey === itemKey) {
                  bookedAppointment = relation;
                }
              });

              return (
                <div
                  className={cn(
                    "my-4 rounded-xl overflow-hidden shadow-md",
                    isOldDate && "opacity-55",
                  )}
                  key={`schedule-${itemKey}`}
                >
                  <div className="relative flex items-center justify-between flex-wrap p-4 text-gray-900 bg-gray-100 ">
                    <div className="font-bold text-xl pt-0.5">
                      {selectedDaySchedule?.schedule[itemKey]}
                    </div>

                    {!isOldDate && isEditingAllowed && (
                      <div className="text-right order-2 sm:order-3">
                        <div className="flex">
                          <div className="flex justify-center">
                            <button
                              className="button blank medium !px-2 md:!max-w-54"
                              onClick={() =>
                                initDeletingHandler(itemKey, bookedAppointment)
                              }
                            >
                              <span className="text-red-600">
                                Видалити час з графіку
                              </span>
                              <TrashIcon className="ml-2 w-4 text-red-600" />
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                    <div className="absolute bottom-0 left-0 right-0 border-t border-t-gray-200"></div>
                  </div>

                  {bookedAppointment ? (
                    <>
                      {bookedAppointment?.clientId?._id && (
                        <div className="mt-2 p-4">
                          <div className="flex items-center justify-between">
                            <Link
                              href={`${baseDashboardLink}/clients/${bookedAppointment?.clientId?._id}`}
                              className="flex items-center"
                            >
                              <div>
                                <Thumbnail
                                  url={bookedAppointment?.clientId?.photoUrl}
                                />
                              </div>
                              <div className="font-bold text-gray-500 underline ml-4">
                                {bookedAppointment?.clientId?.firstName ||
                                  bookedAppointment?.clientId?.username}
                              </div>
                            </Link>
                            {!isOldDate && isEditingAllowed && (
                              <div className="ml-2">
                                <CancelAppointmentForm
                                  mapItemId={bookedAppointment?._id}
                                  successHandler={() =>
                                    loadSelectedDaySchedule(selectedDate)
                                  }
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                      {bookedAppointment?.customClientId?._id && (
                        <>
                          <div className="mt-2 p-4">
                            <div className="sm:flex sm:justify-between">
                              <div>
                                <div className="font-bold text-gray-700">
                                  {bookedAppointment?.customClientId
                                    ?.firstName ||
                                    bookedAppointment?.customClientId?.lastName}
                                </div>
                                <div className="mt-1">
                                  <a
                                    href={`tel:${
                                      bookedAppointment?.customClientId
                                        ?.phoneNumber
                                    }`}
                                    className="flex items-center text-main"
                                  >
                                    <PhoneSolidIcon
                                      className={"w-5 h-5 text-gray-500"}
                                    />
                                    <span className="ml-0.5 text-lg text-gray-500">
                                      {
                                        bookedAppointment?.customClientId
                                          ?.phoneNumber
                                      }
                                    </span>
                                  </a>
                                </div>

                                <div className="mt-1">
                                  <div className="font-bold">
                                    {bookedAppointment?.serviceId?.service}
                                  </div>
                                  {bookedAppointment?.serviceId?.saleEndDay && (
                                    <div>
                                      <span className="mr-1 translate-y-1 inline-block">
                                        <FireIcon className={"text-red-500"} />
                                      </span>
                                      <span className="text-red-500 text-sm">
                                        знижка діє до{" "}
                                        {formatDate(
                                          bookedAppointment?.serviceId
                                            ?.saleEndDay,
                                          "ui",
                                        )}
                                      </span>
                                    </div>
                                  )}

                                  <div className="text-gray-500">
                                    {bookedAppointment?.serviceId
                                      ?.priceWithSale && (
                                      <span className="text-red-600">
                                        {
                                          bookedAppointment?.serviceId
                                            ?.priceWithSale
                                        }{" "}
                                        грн.
                                      </span>
                                    )}

                                    {bookedAppointment?.serviceId?.price && (
                                      <span
                                        className={cn(
                                          bookedAppointment?.serviceId
                                            ?.priceWithSale &&
                                            "ml-2 line-through",
                                        )}
                                      >
                                        {bookedAppointment?.serviceId?.price}{" "}
                                        грн.
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>

                              {!isOldDate && isEditingAllowed && (
                                <div className="mt-4 sm:ml-2 sm:mt-0">
                                  <CancelAppointmentForm
                                    mapItemId={bookedAppointment?._id}
                                    successHandler={() =>
                                      loadSelectedDaySchedule(selectedDate)
                                    }
                                  />
                                </div>
                              )}
                            </div>
                          </div>
                        </>
                      )}
                    </>
                  ) : (
                    <div
                      className={cn(
                        "mt-2  flex items-center w-full",
                        isOldDate
                          ? "justify-center p-6"
                          : "justify-between p-4",
                      )}
                    >
                      <p className="text-sm text-gray-500">Запис відсутній</p>
                      {!isOldDate && isEditingAllowed && (
                        <div>
                          <button
                            className="button medium"
                            onClick={() =>
                              registrationHandler(selectedDaySchedule, itemKey)
                            }
                          >
                            <PlusIcon className="w-4 text-white" />
                            <span className="ml-1 text-white">Додати</span>
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </Fragment>
      ) : (
        <NoSchedule />
      )}
      <ConfirmModal
        triger={confirmMessage}
        title={confirmMessage}
        cancelFn={cancelDeleting}
        confirmFn={deleteHandler}
        loading={isLoading}
      />

      <NewAppointmentForm
        selectedSchedule={selectedSchedule}
        selectedAppointment={selectedAppointment}
        successHandler={() => loadSelectedDaySchedule(selectedDate)}
        closeHandler={() => setSelectedSchedule(null)}
      />
    </div>
  );
}

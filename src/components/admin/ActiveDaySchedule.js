"use client";
import DayScheduleModalForm from "@/components/admin/DayScheduleModalForm";
import { TrashIcon } from "@/components/ui/Icons";
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
import { cn } from "@/lib/cn";
import { useCalendarStore } from "../ui/calendar/useCalendarStore";
import { useShallow } from "zustand/shallow";
import ConfirmModal from "../ui/ConfirmModal";
import { NotificationService } from "@/services/NotificatoinsServices";
import { AppointmentService } from "@/services/AppointmentService";
import { useAppStore } from "@/store/useAppStore";
import NoSchedule from "./NoSchedule";
import Thumbnail from "../ui/Thumbnail";
import CancelAppointmentForm from "./CancelAppointmentForm";

export default function ActiveDaySchedule() {
  const { adminId, companyPlan } = useAppStore();
  const { selectedDate } = useCalendarStore(
    useShallow((state) => ({
      selectedDate: state.selectedDate,
    }))
  );

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
      workerId: params?.specialistID ? params?.specialistID : session?.userId,
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
      const appointmentResponse = await AppointmentService.getSingle(
        relationToDelete?._id
      );

      const deleteAppointmentResponse = await AppointmentService.delete(
        relationToDelete?._id
      );

      if (deleteAppointmentResponse.status !== 200) {
        setError("Сталася помилка при виконанні запиту");
        return false;
      } else {
        const session = await AuthService.getSession();
        await NotificationService.createNotification({
          notification: {
            botId: params?.companyID,
            author: session?.userId,
          },
          recipient: [appointmentResponse?.data?.clientId?._id],
          recipientRole: "client",
          type: "adminCancelAppointment",
          meta: appointmentResponse?.data,
        });
      }
    }

    let updateScheduleResponse = null;
    if (!Object.keys(newSchedule).length) {
      updateScheduleResponse = await ScheduleService.delete(
        selectedDaySchedule?._id
      );
    } else {
      updateScheduleResponse = await ScheduleService.update(
        selectedDaySchedule?._id,
        {
          schedule: newSchedule,
        }
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
    <div className="relative mt-6 min-h-54">
      {isLoading && (
        <div className="bg-white/50 backdrop-blur-xs p-4 flex justify-center items-center absolute -top-1 -right-1 -bottom-1 -left-1 rounded-xl z-20">
          <Spinner />
        </div>
      )}

      {selectedDate && (
        <div className="mb-4">
          <h2 className="font-bold text-lg text-center">
            Графік на {new Date(selectedDate).getDate()}{" "}
            {currentMonth ? currentMonth.toLowerCase() : ""}
          </h2>
        </div>
      )}

      {selectedDaySchedule &&
      Object.keys(selectedDaySchedule?.schedule).length ? (
        <>
          {!CalendarService.isOldDate(
            new Date(selectedDaySchedule?.date),
            selectedDaySchedule?.schedule[
              Object.keys(selectedDaySchedule?.schedule)[
                Object.keys(selectedDaySchedule?.schedule).length - 1
              ]
            ]
          ) &&
            isEditingAllowed && (
              <DayScheduleModalForm
                activeSchedule={selectedDaySchedule}
                selectedDate={selectedDate}
              />
            )}
        </>
      ) : (
        <>
          {!CalendarService.isOldDay(selectedDate) && isEditingAllowed && (
            <DayScheduleModalForm
              activeSchedule={selectedDaySchedule}
              selectedDate={selectedDate}
            />
          )}
        </>
      )}

      {selectedDaySchedule &&
      Object.keys(selectedDaySchedule?.schedule).length ? (
        <Fragment>
          <div className="mt-2 ">
            {Object.keys(selectedDaySchedule?.schedule).map((itemKey) => {
              const isOldDate = CalendarService.isOldDate(
                selectedDate,
                selectedDaySchedule?.schedule[itemKey]
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
                    isOldDate && "opacity-45"
                  )}
                  key={`schedule-${itemKey}`}
                >
                  <div className="relative flex items-center justify-between flex-wrap p-4 text-gray-900 bg-gray-100 ">
                    <div className="font-bold text-xl pt-0.5">
                      {selectedDaySchedule?.schedule[itemKey]}
                    </div>

                    {!isOldDate && (
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
                        {!isOldDate && (
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
                  ) : (
                    <div className="mt-2 py-6 flex items-center justify-center w-full">
                      <p className="text-sm text-gray-500">Запис відсутній</p>
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
    </div>
  );
}

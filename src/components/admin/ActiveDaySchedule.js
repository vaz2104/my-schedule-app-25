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

export default function ActiveDaySchedule() {
  const { adminId } = useAppStore();
  const { selectedDate } = useCalendarStore(
    useShallow((state) => ({
      selectedDate: state.selectedDate,
    }))
  );

  const [selectedDaySchedule, setSelectedDaySchedule] = useState(null);
  const [selectedScheduleItem, setSelectedScheduleItem] = useState(null);
  const [relationToDelete, setRelationToDelete] = useState(null);
  const [confirmMessage, setConfirmMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
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
    if (adminId === session?.userId && adminId !== params?.specialistID) {
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
            {currentMonth.toLowerCase()}
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
          <div className="mt-2">
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
                    "py-4 relative flex justify-between items-center",
                    isOldDate && "opacity-45"
                  )}
                  key={`schedule-${itemKey}`}
                >
                  <div className="absolute bottom-0 left-2 right-2 border-t border-t-gray-200"></div>
                  <div className="font-bold text-lg ml-2 py-1">
                    {selectedDaySchedule?.schedule[itemKey]}
                  </div>
                  {bookedAppointment ? (
                    <div className="flex-1 ml-4 flex items-center">
                      <Link
                        href={`${baseDashboardLink}/clients/${bookedAppointment?.clientId?._id}`}
                        className="text-sm text-gray-500"
                      >
                        {bookedAppointment?.clientId?.firstName ||
                          bookedAppointment?.clientId?.username}
                      </Link>
                    </div>
                  ) : (
                    <div className="flex-1 ml-4 flex items-center">
                      <p className="text-sm text-gray-500">Запис відсутній</p>
                    </div>
                  )}

                  {!isOldDate && isEditingAllowed && (
                    <div className="text-right">
                      <div className="flex">
                        <div className="flex justify-center">
                          <button
                            className="button blank !px-2"
                            onClick={() =>
                              initDeletingHandler(itemKey, bookedAppointment)
                            }
                          >
                            <TrashIcon className="w-4 text-red-600" />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <div className="min-h-42 flex items-center">
            <p className="w-full text-center text-md font-medium text-gray-400">
              Часи прийому не вказані
            </p>
          </div>
        </Fragment>
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

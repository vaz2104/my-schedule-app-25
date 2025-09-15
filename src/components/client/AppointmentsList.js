"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Alert from "../ui/Alert";
import Spinner from "../ui/Spinner";
import { AuthService } from "@/services/AuthService";

import { AppointmentService } from "@/services/AppointmentService";
import CancelAppointmentForm from "../client/CancelAppointmentForm";
import CalendarService from "../ui/calendar/CalendarService";
import { filterAppointments, printDateWithMonth } from "@/lib/schedule-helpers";
import { cn } from "@/lib/cn";
import { CalendarIcon, ClockIcon } from "../ui/Icons";

export default function AppointmentsList() {
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const params = useParams();

  async function loadAppointments() {
    setIsLoading(true);
    const session = await AuthService.getSession();
    const appointmentsResponse = await AppointmentService.getMany({
      botId: params?.companyID,
      clientId: session?.userId,
    });

    // console.log(appointmentsResponse);

    if (appointmentsResponse.status !== 200) {
      setError("Сталася помилка при завантаженні даних");
    } else {
      setAppointments(filterAppointments(appointmentsResponse.data));
    }

    setIsLoading(false);
  }

  useEffect(() => {
    loadAppointments();
  }, []);

  if (isLoading)
    return (
      <div className="py-4 flex justify-center items-center">
        <Spinner />
      </div>
    );

  if (error) {
    return (
      <div className="p-4 flex justify-center items-center">
        <Alert className={"w-full"}>{error}</Alert>
      </div>
    );
  }

  if (!appointments?.length)
    return (
      <div className="p-4">
        <div className="text-center text-gray-400 mt-16">
          <p>Записи відсутні</p>
        </div>
      </div>
    );

  return (
    <div>
      {appointments.map((appointment) => {
        const idDateDisabled = CalendarService.isOldDate(
          new Date(appointment?.scheduleId?.date),
          appointment?.scheduleId?.schedule[appointment?.appointmentKey]
        );

        return (
          <div
            className={cn(
              "py-6 flex justify-between items-center border-b border-gray-200",
              idDateDisabled && "text-gray-400"
            )}
            key={appointment?._id}
          >
            <div className="flex items-center">
              <CalendarIcon />
              <div className="lowercase text-nowrap ml-0.5">
                {printDateWithMonth(appointment?.scheduleId?.date)}
              </div>
            </div>
            <div className="flex items-center pl-4">
              <ClockIcon className={""} />
              <div className="ml-0.5">
                {appointment?.scheduleId?.schedule[appointment?.appointmentKey]}
              </div>
            </div>
            {!idDateDisabled && (
              <div className="ml-2 flex-1 flex justify-end">
                <CancelAppointmentForm
                  mapItemId={appointment?._id}
                  successHandler={loadAppointments}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

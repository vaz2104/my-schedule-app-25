"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Alert from "../ui/Alert";
import Spinner from "../ui/Spinner";
import { AuthService } from "@/services/AuthService";

import { AppointmentService } from "@/services/AppointmentService";
import formatDate from "@/lib/formatDate";
import CancelAppointmentForm from "../client/CancelAppointmentForm";

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
      setAppointments(appointmentsResponse.data);
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
        // console.log(appointment);

        return (
          <div
            className="py-6 flex justify-between items-center border-b border-gray-200"
            key={appointment?._id}
          >
            <div className="flex-1">
              {formatDate(appointment?.scheduleId?.date)}
            </div>
            <div>
              <div>
                {appointment?.scheduleId?.schedule[appointment?.appointmentKey]}
              </div>
            </div>
            <div className="ml-2">
              <CancelAppointmentForm
                mapItemId={appointment?._id}
                successHandler={loadAppointments}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

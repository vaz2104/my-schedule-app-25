"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Alert from "../ui/Alert";
import Spinner from "../ui/Spinner";
import { AuthService } from "@/services/AuthService";

import { AppointmentService } from "@/services/AppointmentService";
import CancelAppointmentForm from "./CancelAppointmentForm";
import CalendarService from "../ui/calendar/CalendarService";
import { filterAppointments, printDateWithMonth } from "@/lib/schedule-helpers";
import { cn } from "@/lib/cn";
import {
  CalendarIcon,
  CheckCircleIcon,
  ClockIcon,
  RocketIcon,
} from "../ui/Icons";
import Thumbnail from "../ui/Thumbnail";
import { useAppStore } from "@/store/useAppStore";
import Badge from "../ui/Badge";

export default function AppointmentsHistoryList() {
  const { companyPlan } = useAppStore();
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
    <div className="">
      <ol className="relative text-gray-500 border-s border-gray-200 ml-3">
        {appointments.map((appointment) => {
          // console.log(appointment);

          const idDateDisabled = CalendarService.isOldDate(
            new Date(appointment?.scheduleId?.date),
            appointment?.scheduleId?.schedule[appointment?.appointmentKey]
          );

          return (
            <li
              className={cn("mb-10 ms-8", idDateDisabled && "")}
              key={appointment?._id}
            >
              {/* //   className={cn(
          //     "py-6 flex justify-between items-center border-b border-gray-200",
          //     idDateDisabled && "text-gray-400"
          //   )} */}

              <span
                className={cn(
                  "absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -start-4 ring-4 ring-white",
                  !idDateDisabled && "bg-main"
                )}
              >
                <span className="">
                  {idDateDisabled ? (
                    <CheckCircleIcon
                      className={cn(
                        "w-8 h-8 text-green-600 animate__animated animate__bounceIn"
                      )}
                    />
                  ) : (
                    <RocketIcon
                      className={cn(
                        "w-6 h-6 text-white animate__animated animate__bounceIn"
                      )}
                    />
                  )}
                </span>
              </span>
              <div className="pt-1 sm:flex sm:items-start">
                <div>
                  <div className="flex items-center">
                    <div className="flex items-center">
                      <CalendarIcon />
                      <div className="lowercase text-nowrap ml-0.5">
                        {printDateWithMonth(appointment?.scheduleId?.date)}
                      </div>
                    </div>
                    <div className="flex items-center pl-4">
                      <ClockIcon className={""} />
                      <div className="ml-0.5">
                        {
                          appointment?.scheduleId?.schedule[
                            appointment?.appointmentKey
                          ]
                        }
                      </div>
                    </div>
                  </div>

                  {appointment?.serviceId?._id && (
                    <div className="mt-4">
                      <div className="flex flex-start">
                        <Badge>Обрана послуга</Badge>
                      </div>
                      <div className="mt-1 pl-2 text-sm">
                        {appointment?.serviceId?.service}
                      </div>
                    </div>
                  )}

                  {companyPlan !== "free" && companyPlan !== "basic" && (
                    <div className="mt-4 ">
                      <div className="flex flex-start">
                        <Badge>Обраний працівник</Badge>
                      </div>
                      <div className="pl-2 mt-2 flex items-center">
                        <Thumbnail
                          url={appointment?.workerId?.photoUrl}
                          size="xs"
                        />
                        <div className="ms-2 text-sm font-normal flex-1">
                          <div className="">
                            <>
                              {appointment?.workerId?.firstName ||
                                appointment?.workerId?.username}
                            </>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {!idDateDisabled && (
                  <div className="mt-4 sm:-mt-1 sm:ml-2 sm:flex-1 sm:flex sm:justify-end">
                    <CancelAppointmentForm
                      mapItemId={appointment?._id}
                      successHandler={loadAppointments}
                    />
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

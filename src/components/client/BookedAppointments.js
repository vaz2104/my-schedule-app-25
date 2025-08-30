"use client";
import AppointmentsList from "@/components/admin/AppointmentsList";
import Alert from "@/components/ui/Alert";
import Spinner from "@/components/ui/Spinner";
import formatDate from "@/lib/formatDate";
import { AppointmentService } from "@/services/AppointmentService";
import { AuthService } from "@/services/AuthService";
import { useEffect, useState } from "react";

export default function BookedAppointments() {
  const [appointments, setAppointments] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  async function loadClientData() {
    setIsLoading(true);
    const session = await AuthService.getSession();
    const response = await AppointmentService.getMany({
      clientId: session?.userId,
    });

    console.log(response);

    if (response.status !== 200) {
      setError("Сталася помилка при завантаженні даних");
    } else {
      setAppointments(response.data);
    }

    setIsLoading(false);
  }

  useEffect(() => {
    loadClientData();
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

  return (
    <div className="p-4">
      {/* <div className="mt-4 mb-4">
        <h2 className="font-bold text-lg text-center">Історія записів</h2>
      </div>
      <div className="">
        <AppointmentsList />
      </div>  */}
    </div>
  );
}

"use client";
import NotificationCard from "@/components/ui/NotificationCard";
import Alert from "@/components/ui/Alert";
import Spinner from "@/components/ui/Spinner";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { NotificationService } from "@/services/NotificatoinsServices";
import { AuthService } from "@/services/AuthService";
import NoNotifications from "@/components/admin/NoNotifications";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const params = useParams();

  async function loadEvents() {
    setIsLoading(true);
    const session = await AuthService.getSession();
    const response = await NotificationService.getMany({
      recipient: session?.userId,
      recipientRole: "admin",
      botId: params?.companyID,
    });

    if (response.status !== 200) {
      setError("Сталася помилка при завантаженні даних");
    } else {
      setEvents(response.data);
    }

    setIsLoading(false);
  }

  useEffect(() => {
    loadEvents();
  }, []);

  if (isLoading)
    return (
      <div className="py-4 flex justify-center items-center h-[calc(100vh-9rem)]">
        <Spinner />
      </div>
    );

  if (error) {
    return (
      <div className="p-4 flex justify-center items-center h-[calc(100vh-9rem)]">
        <Alert className={"w-full"}>{error}</Alert>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="mb-8 mt-4 text-center">
        <h2 className="font-bold text-xl">Події</h2>
      </div>
      <div>
        {events?.length ? (
          <NoNotifications />
        ) : (
          <>
            {events.map((event, index) => {
              return (
                <NotificationCard dataObject={event} key={`event${index}`} />
              );
            })}
          </>
        )}

        {/* <NotificationCard type={"subscribe"} />
        <NotificationCard type={"unsubscribe"} /> */}
      </div>
    </div>
  );
}

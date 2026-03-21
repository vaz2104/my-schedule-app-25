"use client";
import Footer from "@/components/client/Footer";
import Header from "@/components/client/Header";
import NoAccess from "@/components/client/NoAccess";
import StatusBar from "@/components/client/StatusBar";
import Alert from "@/components/ui/Alert";
import Spinner from "@/components/ui/Spinner";
import { SubscriptionsService } from "@/services/SubscriptionsService";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardCompanyLayout({ children }) {
  const [isBlocked, setIsBlocked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const params = useParams();

  async function checkPanelStatus() {
    const response = await SubscriptionsService.getMany({
      botId: params?.companyID,
    });
    if (response?.status !== 200) {
      setError("Сталася помилка при завантаженні даних");
      return;
    }

    const subscription = response.data[0];
    const subscriptionEndDate = new Date(subscription.planEndDate); // Current date and time
    const timestampEndDate = subscriptionEndDate.getTime();

    if (Date.now() > timestampEndDate) {
      setIsBlocked(true);
    }

    setIsLoading(false);
  }

  useEffect(() => {
    checkPanelStatus();
  }, []);

  if (isBlocked)
    return (
      <div className="py-4 flex justify-center items-center h-[100vh]">
        <NoAccess />
      </div>
    );

  if (isLoading)
    return (
      <div className="py-4 flex justify-center items-center h-[100vh]">
        <Spinner />
      </div>
    );

  if (error) {
    return (
      <div className="p-4 flex justify-center items-center h-[100vh]">
        <Alert className={"w-full"}>{error}</Alert>
      </div>
    );
  }

  return (
    <div className="ms-full-creen relative z-10">
      <Header />
      <StatusBar />
      <main className="flex-1 pb-22">{children}</main>
      <Footer />
    </div>
  );
}

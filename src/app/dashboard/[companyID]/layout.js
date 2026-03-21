"use client";
import Footer from "@/components/admin/Footer";
import Header from "@/components/admin/Header";
import StatusBar from "@/components/admin/StatusBar";
import Alert from "@/components/ui/Alert";
import Spinner from "@/components/ui/Spinner";
import { AuthService } from "@/services/AuthService";
import { CompanyService } from "@/services/CompanyService";
import { SubscriptionsService } from "@/services/SubscriptionsService";
import { useAppStore } from "@/store/useAppStore";
import { useTheme } from "next-themes";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardCompanyLayout({ children }) {
  const {
    setCompanyPlan,
    setBotName,
    setThemePalette,
    setAdminId,
    setRole,
    setBotThumbnail,
    setSubscriptionStatus,
    setSubscriptionEndDate,
  } = useAppStore();
  const { setTheme } = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const params = useParams();

  async function loadCompanyData() {
    if (!params?.companyID) return false;

    setIsLoading(true);
    const session = await AuthService.getSession();
    const companyDataResponse = await CompanyService.getBot(params?.companyID);

    if (companyDataResponse.status !== 200) {
      setError("Сталася помилка при завантаженні даних");
    } else {
      console.log("companyData =>", companyDataResponse.data);

      setTheme(companyDataResponse.data?.themePalette);
      setThemePalette(companyDataResponse.data?.themePalette);
      setBotName(companyDataResponse.data?.first_name);
      setBotThumbnail(companyDataResponse.data?.avatar);
      setAdminId(companyDataResponse.data?.adminId);
      setRole(
        companyDataResponse.data?.adminId === session?.userId
          ? "admin"
          : "worker",
      );
    }

    await checkSubscriptionStatus();

    setIsLoading(false);
  }

  async function checkSubscriptionStatus() {
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

    // console.log("subscription =>", subscription);

    const perion = Math.ceil(
      (timestampEndDate - new Date().getTime()) / 86400000,
    );

    // console.log("subscription perion =>", perion > 0);
    setCompanyPlan(subscription?.plan);
    setSubscriptionStatus(perion > 0);
    setSubscriptionEndDate(subscription?.planEndDate);
  }

  useEffect(() => {
    loadCompanyData();
  }, [params?.companyID]);

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
    <div className="ms-full-creen relative z-10 pt-15">
      <Header />
      <StatusBar />
      <main className="flex-1 pb-22">{children}</main>
      <Footer />
    </div>
  );
}

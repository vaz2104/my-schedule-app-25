"use client";
import Footer from "@/components/admin/Footer";
import Header from "@/components/admin/Header";
import Alert from "@/components/ui/Alert";
import Spinner from "@/components/ui/Spinner";
import { AuthService } from "@/services/AuthService";
import { CompanyService } from "@/services/CompanyService";
import { useAppStore } from "@/store/useAppStore";
import { useTheme } from "next-themes";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardCompanyLayout({ children }) {
  const { setCompanyPlan, setbBotName, setThemePalette, setAdminId, setRole } =
    useAppStore();
  const { setTheme } = useTheme();
  const [isLoading, setIsLoading] = useState(false);
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
      // console.log(companyDataResponse.data);

      setTheme(companyDataResponse.data?.themePalette);
      setThemePalette(companyDataResponse.data?.themePalette);
      setCompanyPlan(companyDataResponse.data?.plan);
      setbBotName(companyDataResponse.data?.username);
      setAdminId(companyDataResponse.data?.adminId);
      setRole(
        companyDataResponse.data?.adminId === session?.userId
          ? "admin"
          : "worker"
      );
    }

    setIsLoading(false);
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
    <div className="ms-full-creen relative z-10">
      <Header />
      <main className="flex-1 pt-16 pb-22">{children}</main>
      <Footer />
    </div>
  );
}

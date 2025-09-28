"use client";
import FooterDashboard from "@/components/admin/FooterDashboard";
import HeaderDashboard from "@/components/admin/HeaderDashboard";
import Alert from "@/components/ui/Alert";
import Spinner from "@/components/ui/Spinner";
import { ThemeProvider } from "@/context/ThemeContext";
import { CompanyService } from "@/services/CompanyService";
import { useAppStore } from "@/store/useAppStore";
import { useTheme } from "next-themes";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardLayout({ children }) {
  const { setCompanyPlan, setbBotName, setThemePalette } = useAppStore();
  const { setTheme } = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const params = useParams();

  async function loadCompanyData() {
    if (!params?.companyID) return false;

    setIsLoading(true);
    const companyDataResponse = await CompanyService.getBot(params?.companyID);

    if (companyDataResponse.status !== 200) {
      setError("Сталася помилка при завантаженні даних");
    } else {
      console.log(companyDataResponse.data);

      setTheme(companyDataResponse.data?.themePalette);
      setThemePalette(companyDataResponse.data?.themePalette);
      setCompanyPlan(companyDataResponse.data?.plan);
      setbBotName(companyDataResponse.data?.username);
    }

    setIsLoading(false);
  }

  useEffect(() => {
    loadCompanyData();
  }, []);

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
    <ThemeProvider>
      {!params?.companyID && <HeaderDashboard />}
      <div className="ms-full-creen mx-auto max-w-3xl">{children}</div>
      {!params?.companyID && <FooterDashboard />}
    </ThemeProvider>
  );
}

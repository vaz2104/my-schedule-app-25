"use client";
import Alert from "@/components/ui/Alert";
import Spinner from "@/components/ui/Spinner";
import { ThemeProvider } from "@/context/ThemeContext";
import { updateUserSessionID } from "@/lib/updateUserSessionID";
import { CompanyService } from "@/services/CompanyService";
import { useAppStore } from "@/store/useAppStore";
import { useTheme } from "next-themes";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function PanelLayout({ children }) {
  const { setCompanyPlan, setBotName, setThemePalette } = useAppStore();
  const { setTheme } = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const params = useParams();

  async function loadCompanyData() {
    const companyDataResponse = await CompanyService.getBot(params?.companyID);

    if (companyDataResponse.status !== 200) {
      setError("Сталася помилка при завантаженні даних");
    } else {
      setTheme(companyDataResponse.data?.themePalette);
      setThemePalette(companyDataResponse.data?.themePalette);
      setCompanyPlan(companyDataResponse.data?.plan);
      setBotName(companyDataResponse.data?.first_name);
    }
  }

  async function pageRendering() {
    setIsLoading(true);
    await updateUserSessionID();
    await loadCompanyData();
    setIsLoading(false);
  }

  useEffect(() => {
    pageRendering();
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
      <div className="ms-full-creen mx-auto max-w-3xl">{children}</div>
    </ThemeProvider>
  );
}

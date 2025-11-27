"use client";
import Alert from "@/components/ui/Alert";
import Spinner from "@/components/ui/Spinner";
import { ThemeProvider } from "@/context/ThemeContext";
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

  async function miniAppEvents() {
    if (typeof window !== "undefined") {
      window.addEventListener("beforeunload", function () {
        // localStorage.removeItem("your_key");
        // Or clear all local storage: localStorage.clear();
        console.log("app closed");
        // localStorage.removeItem("activePanel");
        // localStorage.addItem("activePanel");
        localStorage.setItem("activePanel2", "botId");
      });
    }
  }

  async function loadCompanyData() {
    setIsLoading(true);
    const companyDataResponse = await CompanyService.getBot(params?.companyID);

    if (companyDataResponse.status !== 200) {
      setError("Сталася помилка при завантаженні даних");
    } else {
      setTheme(companyDataResponse.data?.themePalette);
      setThemePalette(companyDataResponse.data?.themePalette);
      setCompanyPlan(companyDataResponse.data?.plan);
      setBotName(companyDataResponse.data?.first_name);
    }

    setIsLoading(false);
  }

  useEffect(() => {
    loadCompanyData();
    miniAppEvents();
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

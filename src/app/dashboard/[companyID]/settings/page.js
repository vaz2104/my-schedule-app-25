"use client";
import ThemePalette from "@/components/admin/ThemePalette";
import Alert from "@/components/ui/Alert";
import PlanBase from "@/components/ui/PlanBase";
import PlanBusiness from "@/components/ui/PlanBusiness";
import PlanBusinessPlus from "@/components/ui/PlanBusinessPlus";
import PlanFree from "@/components/ui/PlanFree";
import Spinner from "@/components/ui/Spinner";
import { useBaseURL } from "@/hooks/useBaseURL";
import { CompanyService } from "@/services/CompanyService";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SettingsPage() {
  const { baseDashboardLink } = useBaseURL();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [company, setCompany] = useState(null);
  const params = useParams();

  async function loadCompanyData() {
    setIsLoading(true);
    const companyDataResponse = await CompanyService.getBot(params?.companyID);

    if (companyDataResponse.status !== 200) {
      setError("Сталася помилка при завантаженні даних");
    } else {
      setCompany(companyDataResponse.data);
    }

    setIsLoading(false);
  }

  useEffect(() => {
    loadCompanyData();
  }, []);

  if (isLoading)
    return (
      <div className="fixed bottom-0 left-0 z-20 w-full px-4 py-4 bg-white flex justify-center items-center">
        <Spinner />
      </div>
    );

  if (error) {
    return (
      <div className="fixed bottom-0 left-0 z-20 w-full px-4 py-4 bg-white flex justify-center items-center">
        <Alert className={"w-full"}>{error}</Alert>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="mb-8 mt-4 text-center">
        <h2 className="font-bold text-xl">Мої налаштування</h2>
      </div>
      <div className="mb-8">
        <div className="mb-2">
          <h2 className="font-bold text-lg">Ваш тарифний план</h2>
        </div>
        {company?.plan === "free" && <PlanFree activePlan={company?.plan} />}
        {company?.plan === "base" && <PlanBase activePlan={company?.plan} />}
        {company?.plan === "business" && (
          <PlanBusiness activePlan={company?.plan} />
        )}
        {company?.plan === "businessPlus" && (
          <PlanBusinessPlus activePlan={company?.plan} />
        )}

        <div className="mt-4">
          <Link href={`${baseDashboardLink}/pricing`} className="button w-full">
            Переглянути інші плани
          </Link>
        </div>
      </div>
      <div className="mb-8">
        <div className="mb-4">
          <h2 className="font-bold text-lg">Тема вашої панелі</h2>
        </div>
        <ThemePalette />
      </div>
    </div>
  );
}

"use client";
import ThemePalette from "@/components/admin/ThemePalette";
import Alert from "@/components/ui/Alert";
import PlanBase from "@/components/ui/PlanBase";
import PlanBusiness from "@/components/ui/PlanBusiness";
import PlanBusinessPlus from "@/components/ui/PlanBusinessPlus";
import PlanFree from "@/components/ui/PlanFree";
import Spinner from "@/components/ui/Spinner";
import { useBaseURL } from "@/hooks/useBaseURL";
import { useAppStore } from "@/store/useAppStore";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function SettingsPage() {
  const { themePalette, companyPlan } = useAppStore();
  const { baseDashboardLink } = useBaseURL();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [exchange, setExchange] = useState(0);

  async function getExchangeData() {
    const url =
      "https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json";
    try {
      const response = await fetch(url);
      if (!response.ok) {
        setError("Сталася помилка при виконанні запиту");
        setIsLoading(false);
        return;
      }

      const result = await response.json();

      result.forEach((element) => {
        if (element?.cc === "EUR") setExchange(element?.rate);
      });
      setIsLoading(false);
    } catch (error) {
      console.error(error.message);
      setError("Сталася помилка при виконанні запиту");
      setIsLoading(false);
      return;
    }
  }

  function selectPlanHandler(plan) {
    localStorage.setItem("plan", plan);
    redirect("/login");
  }

  useEffect(() => {
    getExchangeData();
  });

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
        <h2 className="font-bold text-xl">Мої налаштування</h2>
      </div>
      <div className="mb-12">
        <div className="mb-2">
          <h2 className="font-bold text-lg">Ваш тарифний план</h2>
        </div>
        {companyPlan === "free" && <PlanFree activePlan={companyPlan} />}
        {companyPlan === "basic" && (
          <PlanBase
            selectHandler={() => selectPlanHandler("basic")}
            exchange={exchange}
            price={process.env.NEXT_PUBLIC_PLAN_BASE || 0}
            salePrice={process.env.NEXT_PUBLIC_PLAN_BASE_SALE || null}
            activePlan={companyPlan}
          />
        )}
        {companyPlan === "business" && (
          <PlanBusiness
            selectHandler={() => selectPlanHandler("business")}
            exchange={exchange}
            price={process.env.NEXT_PUBLIC_PLAN_BUSINESS || 0}
            salePrice={process.env.NEXT_PUBLIC_PLAN_BUSINESS_SALE || null}
            activePlan={companyPlan}
          />
        )}
        {companyPlan === "businessPlus" && (
          <PlanBusinessPlus
            selectHandler={() => selectPlanHandler("businessPlus")}
            exchange={exchange}
            price={process.env.NEXT_PUBLIC_PLAN_BUSINESS_PLUS || 0}
            salePrice={process.env.NEXT_PUBLIC_PLAN_BUSINESS_PLUS_SALE || null}
            activePlan={companyPlan}
          />
        )}

        <div className="mt-4 flex justify-center">
          <Link
            href={`${baseDashboardLink}/pricing`}
            className="button w-full !max-w-62"
          >
            Переглянути інші плани
          </Link>
        </div>
      </div>

      <div className="mb-12">
        <div className="mb-1">
          <h2 className="font-bold text-lg">Налаштування видимості</h2>
        </div>
        <div className="mb-4 m-auto">
          <p className="text-gray-500 text-base">
            Ви можете тимчасово обмежити доступ клієнтів до Вашого графіку
          </p>
        </div>
        <div className="py-6 bg-gray-50 p-4 pb-8">
          <label className="flex items-center cursor-pointer">
            <span className="block mr-3 text-base font-medium text-gray-600 dark:text-white flex-1">
              Закрити бот для відвідувачів
            </span>
            <input
              type="checkbox"
              // value={appointmentReminderHintEnabled}
              // onChange={() =>
              //   updateClientSettings(
              //     "appointmentReminderHintEnabled",
              //     !appointmentReminderHintEnabled
              //   )
              // }
              className="sr-only peer"
              // checked={appointmentReminderHintEnabled}
            />
            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-main "></div>
          </label>

          <div className="mt-4">
            <label htmlFor="password" className="input-label">
              Повідомлення, яке будуть бачити користувачі
            </label>
            <textarea
              type="text"
              id="password"
              placeholder="Введіть повідомлення..."
              className="input !bg-white"
              rows="4"
              // onChange={(e) => setPass(e.target.value)}
              // value={pass}
            ></textarea>
          </div>
        </div>
      </div>

      <div className="mb-12">
        <div className="mb-4">
          <h2 className="font-bold text-lg">Тема вашої панелі</h2>
        </div>
        <ThemePalette activePalette={themePalette || "blue"} />
      </div>
    </div>
  );
}

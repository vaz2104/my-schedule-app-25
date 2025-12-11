"use client";
import ThemePalette from "@/components/admin/ThemePalette";
import PlanBase from "@/components/ui/PlanBase";
import PlanBusiness from "@/components/ui/PlanBusiness";
import PlanBusinessPlus from "@/components/ui/PlanBusinessPlus";
import PlanFree from "@/components/ui/PlanFree";
import { useBaseURL } from "@/hooks/useBaseURL";
import { useAppStore } from "@/store/useAppStore";
import Link from "next/link";

export default function SettingsPage() {
  const { themePalette, companyPlan } = useAppStore();
  const { baseDashboardLink } = useBaseURL();

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
        {companyPlan === "basic" && <PlanBase activePlan={companyPlan} />}
        {companyPlan === "business" && (
          <PlanBusiness activePlan={companyPlan} />
        )}
        {companyPlan === "businessPlus" && (
          <PlanBusinessPlus activePlan={companyPlan} />
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

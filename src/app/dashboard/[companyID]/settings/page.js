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
      <div className="mb-8">
        <div className="mb-2">
          <h2 className="font-bold text-lg">Ваш тарифний план</h2>
        </div>
        {companyPlan === "free" && <PlanFree activePlan={companyPlan} />}
        {companyPlan === "base" && <PlanBase activePlan={companyPlan} />}
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
      <div className="mb-8">
        <div className="mb-4">
          <h2 className="font-bold text-lg">Тема вашої панелі</h2>
        </div>
        <ThemePalette activePalette={themePalette || "blue"} />
      </div>
    </div>
  );
}

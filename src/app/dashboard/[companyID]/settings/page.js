import Plans from "@/app/components/admin/Plans";
import ThemePalette from "@/app/components/admin/ThemePalette";
import PlanFree from "@/app/components/ui/PlanFree";
import Link from "next/link";

export default function SettingsPage() {
  return (
    <div className="p-4">
      <div className="mb-8 mt-4 text-center">
        <h2 className="font-bold text-xl">Мої налаштування</h2>
      </div>
      <div className="mb-8">
        <div className="mb-2">
          <h2 className="font-bold text-lg">Ваш тарифний план</h2>
        </div>
        <PlanFree />
        <div className="mt-4">
          <Link href="/dashboard/3/pricing" className="button w-full">
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

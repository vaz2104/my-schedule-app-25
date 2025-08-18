import ThemePalette from "@/app/components/admin/ThemePalette";

export default function SettingsPage() {
  return (
    <div className="p-4">
      <div>
        <div className="mb-4">
          <h2 className="font-bold text-lg">Тема вашої панелі</h2>
        </div>
        <ThemePalette />
      </div>
    </div>
  );
}

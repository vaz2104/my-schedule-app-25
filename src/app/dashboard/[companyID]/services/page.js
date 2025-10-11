"use client";
import { useAppStore } from "@/store/useAppStore";
import WorkerServicesManager from "@/components/admin/WorkerServicesManager";
import AdminServicesManager from "@/components/admin/AdminServicesManager";

export default function Services() {
  const { role } = useAppStore();

  return (
    <div className="">
      <div className="mb-8 mt-4 text-center">
        <h2 className="font-bold text-xl">Послуги</h2>
      </div>
      {role === "admin" ? <AdminServicesManager /> : <WorkerServicesManager />}
    </div>
  );
}

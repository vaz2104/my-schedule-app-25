"use client";
import InviteWorker from "@/components/admin/InviteWorker";
import WorkersList from "@/components/admin/WorkersList";
import Alert from "@/components/ui/Alert";
import Spinner from "@/components/ui/Spinner";
import { useBaseURL } from "@/hooks/useBaseURL";
import { CompanyService } from "@/services/CompanyService";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Specialists() {
  const [workers, setWorkers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const params = useParams();
  const { baseDashboardLink } = useBaseURL();

  async function loadWorkers() {
    setIsLoading(true);
    const workersResponse = await CompanyService.getWorkers({
      botId: params?.companyID,
    });

    if (workersResponse.status !== 200) {
      setError("Сталася помилка при завантаженні даних");
    } else {
      setWorkers(workersResponse.data);
    }

    setIsLoading(false);
  }

  useEffect(() => {
    loadWorkers();
  }, []);

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
        <h2 className="font-bold text-xl">Працівники</h2>
      </div>
      <div className="mb-6">
        <InviteWorker />
      </div>
      <div>
        <WorkersList workers={workers} baseURL={baseDashboardLink} />
      </div>
    </div>
  );
}

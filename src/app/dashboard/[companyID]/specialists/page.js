"use client";
import InviteWorker from "@/components/admin/InviteWorker";
import WorkersList from "@/components/admin/WorkersList";
import Alert from "@/components/ui/Alert";
import Spinner from "@/components/ui/Spinner";
import { useBaseURL } from "@/hooks/useBaseURL";
import { CompanyService } from "@/services/CompanyService";
import { useAppStore } from "@/store/useAppStore";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Specialists() {
  const { companyPlan } = useAppStore();
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

  function checkLimits() {
    let isOverLimit = false;
    switch (companyPlan) {
      case "free":
        isOverLimit = workers.length === 1;
        break;
      case "basic":
        isOverLimit = workers.length === 1;
        break;
      case "business":
        isOverLimit = workers.length === 3;
        break;
    }

    return isOverLimit;
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
      {
        <div className="my-4">
          <Alert type="default">
            <div className="">
              <p>Ви більше не можете додавати працівників!</p>
              <p>
                Ваш тарифний план <span className="font-bold">"Business"</span>,
                максимальна кількість працівників в цьому плані -{" "}
                <span className="font-bold">3</span>
              </p>
              <p>
                Аби додати більше працівників заблокуйте, чи видаліть наявних,
                або змініть тарифний план на{" "}
                <span className="font-bold">"Business Plus"</span>
              </p>
            </div>
          </Alert>
        </div>
      }
      <div className="mb-6">
        <InviteWorker isButtonDisabled={checkLimits()} />
      </div>
      <div>
        <WorkersList workers={workers} baseURL={baseDashboardLink} />
      </div>
    </div>
  );
}

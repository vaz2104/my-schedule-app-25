"use client";
import InviteWorker from "@/components/admin/InviteWorker";
import WorkersList from "@/components/admin/WorkersList";
import Alert from "@/components/ui/Alert";
import Spinner from "@/components/ui/Spinner";
import { useBaseURL } from "@/hooks/useBaseURL";
import { CompanyService } from "@/services/CompanyService";
import { useAppStore } from "@/store/useAppStore";
import Link from "next/link";
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

    const planPositions =
      companyPlan === "basic" || companyPlan === "free"
        ? 1
        : companyPlan === "business"
        ? 3
        : 10000;

    let activeWorkers = 0;

    workers.map((workerItem) => {
      if (!workerItem?.isBlocked) activeWorkers += 1;
    });

    const availablePositions = planPositions - activeWorkers;

    if (availablePositions <= 0) {
      isOverLimit = true;
    }

    return isOverLimit;
  }

  function workersNumber(plan) {
    let wokersNumber = 1;

    if (plan == "business") wokersNumber = 3;
    if (plan == "businessPlus") wokersNumber = "більше 3-x";

    return wokersNumber;
  }

  function planLabel(plan) {
    let title = "";

    switch (plan) {
      case "free":
        title = "Безкоштовний";
        break;
      case "basic":
        title = "Базовий";
        break;
      case "business":
        title = "Бізнес";
        break;
      case "businessPlus":
        title = "Бізнес Plus";
        break;
    }

    return title;
  }

  function nextPlan(plan) {
    const plans = ["basic", "business", "businessPlus"];
    const activePlanIndex = plans.indexOf(plan);
    if (activePlanIndex != -1) {
      return planLabel(plans[activePlanIndex + 1]);
    }
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
    <div className="p-4 block">
      <div className="mb-8 mt-4 text-center">
        <h2 className="font-bold text-xl">Працівники</h2>
      </div>
      {checkLimits() && (
        <div className="my-4">
          <Alert type="warning">
            <div className="">
              <p>Досягнуто ліміту активних працівників!</p>
              <p className="mt-1.5">
                Ваш тарифний план{" "}
                <span className="font-bold">
                  &quot;{planLabel(companyPlan)}&quot;
                </span>
                , максимальна кількість активних працівників в цьому плані -{" "}
                <span className="font-bold">{workersNumber(companyPlan)}</span>
              </p>
              <p className="mt-1.5">
                Аби додати більше працівників заблокуйте, чи видаліть наявних,
                або змініть тарифний план на{" "}
                <span className="font-bold">
                  &quot;{nextPlan(companyPlan)}&quot;
                </span>
              </p>
              <p className="mt-1.5">
                <Link
                  href={`${baseDashboardLink}/pricing`}
                  className="underline"
                >
                  Переглянути тарифні плани
                </Link>
              </p>
            </div>
          </Alert>
        </div>
      )}
      <div className="mb-6">
        <InviteWorker isButtonDisabled={isLoading} />
      </div>
      <div>
        <WorkersList workers={workers} baseURL={baseDashboardLink} />
      </div>
    </div>
  );
}

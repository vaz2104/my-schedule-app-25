"use client";

import Alert from "@/components/ui/Alert";
import Spinner from "@/components/ui/Spinner";
import { useParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import {
  BanIcon,
  CheckCircleIcon,
  CheckIcon,
  ExclamationCircleIcon,
} from "../ui/Icons";
import { cn } from "@/lib/cn";
import { useAppStore } from "@/store/useAppStore";
import Thumbnail from "../ui/Thumbnail";
import { UserService } from "@/services/UserService";
import { CompanyService } from "@/services/CompanyService";
import { ThemeContext } from "@/context/ThemeContext";

export default function WorkerStatusControls() {
  const { setWarningError } = useContext(ThemeContext);
  const [profile, setProfile] = useState(null);
  const [relation, setRelation] = useState(null);
  const { role, companyPlan } = useAppStore();
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState(null);
  const params = useParams();

  async function profileDataQuery() {
    if (!params?.specialistID) return false;

    const response = await UserService.getTelegramUser({
      _id: params?.specialistID,
    });

    if (response.status !== 200) {
      setError("Сталася помилка при завантаженні даних");
    } else {
      if (response?.data?.length) {
        setProfile(response?.data[0]);
      }
    }

    const workersResponse = await CompanyService.getWorkers({
      botId: params?.companyID,
      workerId: params?.specialistID,
    });

    if (workersResponse.status !== 200) {
      setError("Сталася помилка при завантаженні даних");
    } else {
      if (workersResponse?.data?.length) {
        setRelation(workersResponse?.data[0]);
      }
    }
  }

  async function getProfileData() {
    setIsLoading(true);
    await profileDataQuery();
    setIsLoading(false);
  }

  async function updateWorkerStatus(disableStatus) {
    setIsUpdating(true);

    const workersResponse = await CompanyService.getWorkers({
      botId: params?.companyID,
    });

    if (workersResponse.status !== 200) {
      setError("Сталася помилка при завантаженні даних");
    }

    // console.log(companyPlan);

    const planPositions =
      companyPlan === "basic" || companyPlan === "free"
        ? 1
        : companyPlan === "business"
        ? 3
        : 10000;

    let activeWorkers = 0;

    // console.log("planPositions", planPositions);

    workersResponse.data.map((workerItem) => {
      if (!workerItem?.isBlocked) activeWorkers += 1;
    });

    const availablePositions = planPositions - activeWorkers;

    // console.log("activeWorkers", activeWorkers);
    // console.log("availablePositions", availablePositions);

    if (disableStatus === false && availablePositions <= 0) {
      setWarningError(
        "Активація не можлива! Досягнуто ліміт активних працівників. Змініть план на інший аби збільшити кількість активних працівників!"
      );
      setIsUpdating(false);
      return;
    }

    // console.log(relation?._id, { isBlocked: status });

    const updatingResponse = await CompanyService.updateWorkerRelation(
      relation?._id,
      { isBlocked: disableStatus }
    );

    // console.log(updatingResponse);

    if (updatingResponse.status !== 200) {
      setError("Сталася помилка при завантаженні даних");
    } else {
      await profileDataQuery();
    }

    setIsUpdating(false);
  }

  useEffect(() => {
    getProfileData();
  }, []);

  if (companyPlan === "free") return <></>;

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
    <div className="relative">
      {isUpdating && (
        <div className="bg-white/10 backdrop-blur-xs p-4 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0 rounded-xl z-20">
          <Spinner />
        </div>
      )}

      {role !== "worker" && profile && (
        <div className="flex justify-between pb-4">
          {relation?.isBlocked ? (
            <>
              <div className=" flex items-center rounded-lg py-1 text-sm font-medium text-red-600 ">
                <ExclamationCircleIcon className={"size-6 text-red-500"} />
                <span className="text-sm ml-1 text-red-500">Заблоковано</span>
              </div>
              <div>
                <button
                  className="button dark"
                  onClick={() => updateWorkerStatus(!relation?.isBlocked)}
                >
                  <span className="mr-1 flex-1 whitespace-nowrap">
                    Розблокувати
                  </span>
                  <CheckIcon className={"size-5 text-white"} />
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center rounded-lg py-1 text-sm font-medium text-green-600 ">
                <CheckCircleIcon className={"size-6 text-green-600"} />
                <span className="text-sm ml-1 text-green-700">Активний</span>
              </div>
              <div>
                <button
                  className="button dark"
                  onClick={() => updateWorkerStatus(!relation?.isBlocked)}
                >
                  <span className="mr-1 flex-1 whitespace-nowrap">
                    Заблокувати
                  </span>
                  <BanIcon className={"size-5 text-white"} />
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {(params?.companyID || role === "worker") && profile && (
        <div>
          <div className="mt-1.5 mb-4">
            <div className={cn("m-auto size-16 border-gray-200 rounded-full")}>
              <Thumbnail url={profile?.photoUrl} size="lg" />
            </div>
            <div className="text-sm font-normal text-center mt-2">
              <div className="font-bold text-xl text-gray-900">
                {profile?.firstName || profile?.username}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

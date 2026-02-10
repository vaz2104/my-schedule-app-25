"use client";
import { useBaseURL } from "@/hooks/useBaseURL";
import Link from "next/link";
import { useAppStore } from "@/store/useAppStore";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { CompanyService } from "@/services/CompanyService";
import Spinner from "../ui/Spinner";
import Alert from "../ui/Alert";
import { BotHintsService } from "@/services/BotHintsService";
import { AuthService } from "@/services/AuthService";

export default function StatusBar() {
  const [visibleHints, setVisibleHints] = useState([]);
  const [dbHints, setdDbHints] = useState([]);
  const { botName, companyPlan } = useAppStore();
  const { baseDashboardLink } = useBaseURL();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [companyData, setCompanyData] = useState(null);
  const params = useParams();
  const [isUpdating, setIsUpdating] = useState(false);

  async function checkHints(value, hintKey, activeHints) {
    let isHintsClosed = false;
    let isHintsCreated = false;
    let hintId = null;

    if (activeHints && activeHints?.length) {
      activeHints.map((item) => {
        if (item.hintType === hintKey) {
          isHintsClosed = item.isClosed;
          isHintsCreated = true;
          hintId = item?._id;
        }
      });
    }

    if (value && isHintsCreated && !isHintsClosed) {
      await closeHint(hintId, hintKey, true);
    }

    if (!value && !isHintsClosed) {
      setVisibleHints((prevHintsState) => [...prevHintsState, hintKey]);
      if (!isHintsCreated) await createHint(hintKey);
    }
  }

  async function createHint(type) {
    setIsLoading(true);

    const session = await AuthService.getSession();
    const options = {
      botId: params?.companyID,
      adminId: session?.userId,
      hintType: type,
    };

    const response = await BotHintsService.create(options);
    if (response?.status !== 200) {
      setError("Сталася помилка при завантаженні даних");
    } else {
      setVisibleHints((prevHintsState) => [...prevHintsState, type]);
    }

    setIsLoading(false);
  }

  async function closeHint(hintId, type, status) {
    setIsUpdating(true);

    const options = {
      isClosed: status,
    };

    const response = await BotHintsService.update(hintId, options);
    if (response?.status !== 200) {
      setError("Сталася помилка при завантаженні даних");
    } else {
      setVisibleHints((prevHintsState) =>
        prevHintsState.filter((hintKey) => hintKey !== type),
      );
    }

    setIsUpdating(false);
  }

  async function hideHintHandler(hintKey) {
    let hintId = null;

    if (dbHints && dbHints?.length) {
      dbHints.map((item) => {
        if (item.hintType === hintKey) hintId = item?._id;
      });
    }

    await closeHint(hintId, hintKey, true);
  }

  async function loadData() {
    setIsLoading(true);

    const session = await AuthService.getSession();
    const responseBotData = await CompanyService.getBot(params?.companyID);
    const responseQueryHints = await BotHintsService.getMany({
      botId: params?.companyID,
      adminId: session?.userId,
    });

    if (responseBotData?.status !== 200) {
      setError("Сталася помилка при завантаженні даних");
      setIsLoading(false);
      return;
    }

    if (responseQueryHints?.status !== 200) {
      setError("Сталася помилка при завантаженні даних");
      setIsLoading(false);
      return;
    }

    await checkHints(
      responseBotData.data?.address,
      "address",
      responseQueryHints.data,
    );
    await checkHints(
      responseBotData.data?.phoneNumbers?.length,
      "phoneNumbers",
      responseQueryHints.data,
    );

    setCompanyData(responseBotData.data);
    setdDbHints(responseQueryHints.data);

    setIsLoading(false);
  }

  useEffect(() => {
    loadData();
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

  if (visibleHints?.length === 0) return <></>;

  return (
    <div className="p-4 relative">
      {isUpdating && (
        <div className="bg-white/5 backdrop-blur-xs p-4 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0 z-20">
          <Spinner />
        </div>
      )}
      <div className="mb-2">
        <h2 className="font-bold text-lg">Важливі повідомлення</h2>
      </div>
      <div className="mt-4">
        {visibleHints.includes("address") && (
          <Alert type="warning">
            <p className="mb-4">
              Додайте адресу, щоб Ваші клієнти могли легко Вас знайшли
            </p>
            <button
              className="button yellow middle"
              onClick={() => hideHintHandler("address")}
            >
              Приховати
            </button>
          </Alert>
        )}
      </div>
      <div className="mt-2">
        {visibleHints.includes("phoneNumbers") && (
          <Alert type="warning">
            <p className="mb-4">
              Додайте номер телефону, щоб Ваші клієнти могли зв&apos;язатися з
              Вами напряму
            </p>
            <button
              className="button yellow middle"
              onClick={() => hideHintHandler("phoneNumbers")}
            >
              Приховати
            </button>
          </Alert>
        )}
      </div>
    </div>
  );
}

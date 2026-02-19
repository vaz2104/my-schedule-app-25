"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { CompanyService } from "@/services/CompanyService";
import Spinner from "../ui/Spinner";
import Alert from "../ui/Alert";
import { AuthService } from "@/services/AuthService";
import BaseModal from "../ui/BaseModal";
import { UserHintsService } from "@/services/UserHintsService";
import poster from "/public/welcome-poster.svg";
import Image from "next/image";

export default function StatusBar() {
  const [clientSettings, setClientSettings] = useState(null);
  const [visibleHints, setVisibleHints] = useState([]);
  const [dbHints, setdDbHints] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const params = useParams();
  const [isUpdating, setIsUpdating] = useState(false);

  async function getClientSettings() {
    const session = await AuthService.getSession();
    const clientsResponse = await CompanyService.getClients({
      botId: params?.companyID,
      telegramUserId: session?.userId,
    });

    if (clientsResponse.status !== 200) {
      setError("Сталася помилка при завантаженні даних");
    } else {
      setClientSettings(clientsResponse.data[0]);
    }
  }

  async function checkHint(hints, hintKey) {
    let hintId = null;

    hints.map((item) => {
      if (item.hintType === hintKey) hintId = item._id;
    });

    if (!hintId) await createHint(hintKey);
  }

  async function createHint(type) {
    setIsLoading(true);

    const session = await AuthService.getSession();
    const options = {
      botId: params?.companyID,
      userId: session?.userId,
      hintType: type,
    };

    const response = await UserHintsService.create(options);
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

    const response = await UserHintsService.update(hintId, options);
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
    const responseQueryHints = await UserHintsService.getMany({
      botId: params?.companyID,
      userId: session?.userId,
    });

    if (responseQueryHints?.status !== 200) {
      setError("Сталася помилка при завантаженні даних");
      setIsLoading(false);
      return;
    }

    checkVisibleHints(responseQueryHints.data);
    setdDbHints(responseQueryHints.data);
    await checkHint(responseQueryHints.data, "welcome");
    await getClientSettings();

    setIsLoading(false);
  }

  function checkVisibleHints(dbHints) {
    let activeHints = [];
    dbHints.map((item) => {
      if (!item.isClosed) activeHints.push(item.hintType);
    });

    setVisibleHints((prevHintsState) => [...prevHintsState, ...activeHints]);
  }

  async function closeWelcomeHint() {
    setIsUpdating(true);
    await hideHintHandler("welcome");
    setIsUpdating(false);
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
      {/* <div className="mb-2">
        <h2 className="font-bold text-lg">Важливі повідомлення</h2>
      </div> */}

      {/* <div className="mt-4">
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
      </div> */}

      <BaseModal
        triger={visibleHints.includes("welcome")}
        closeFn={closeWelcomeHint}
      >
        <div className="mt-4 mb-8 px-4">
          <div className="flex justify-center bg-white">
            <Image
              src={poster}
              alt="NoNotifications"
              width={320}
              height={320}
              className="w-xs"
            />
          </div>
          <p className="text-center text-2xl text-gray-700">
            Вітаємо
            {`${clientSettings?.firstName || clientSettings?.lastName ? `, ${clientSettings?.firstName} ${clientSettings?.lastName}` : clientSettings?.telegramUserId?.username ? `, ${clientSettings?.telegramUserId?.username}` : ``}`}
            !
          </p>

          <p className="text-center text-gray-500 mt-4">
            {`${
              clientSettings?.firstName || clientSettings?.lastName
                ? `Дані про Ваші прізвище та ім'я взято з телеграм акаунта. При бажанні
            Ви можете змінити їх в налаштуваннях`
                : `Будь ласка, при нагоді перейдіть в налаштування і додайте Ваші реальні прізвище та ім'я, щоб в разі потреби ми знали, як до Вас звертатися`
            }`}
          </p>
          <p className="text-center text-gray-500"></p>
        </div>
      </BaseModal>
    </div>
  );
}

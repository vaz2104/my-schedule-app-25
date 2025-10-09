"use client";
import { useEffect, useState } from "react";
import CopyToClipboard from "../ui/CopyToClipboard";
import { LinkIcon } from "../ui/Icons";
import { useParams } from "next/navigation";
import { CompanyService } from "@/services/CompanyService";
import Spinner from "../ui/Spinner";
import Alert from "../ui/Alert";

export default function BotWidget() {
  const [botData, setBotData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const params = useParams();

  async function loadBotInfo() {
    const botDataResponse = await CompanyService.getBot(params?.companyID);

    if (botDataResponse.status !== 200) {
      setError("Сталася помилка при завантаженні даних");
    } else {
      setBotData(botDataResponse.data);
    }

    setIsLoading(false);
  }

  useEffect(() => {
    loadBotInfo();
  }, []);

  return (
    <div className="rounded-xl bg-gray-100 p-4 text-center h-full flex justify-center items-center">
      {isLoading && (
        <div className="py-4 flex justify-center items-center">
          <Spinner />
        </div>
      )}

      {error && (
        <div className="py-1 flex justify-center items-center">
          <Alert className={"w-full"}>{error}</Alert>
        </div>
      )}

      {botData && (
        <div>
          <div className="flex justify-center items-center">
            <LinkIcon className={`h-4`} />
            <div className="text-md font-bold ml-0.5 overflow-hidden text-ellipsis">
              t.me/{botData?.username}
            </div>
          </div>
          <div className="text-xs mt-2">
            <p>
              Поширюйте це посилання та залучайте більше людей до користування
              Вашим ботом.
            </p>
          </div>
          <div className="flex justify-center">
            <CopyToClipboard text={`https://t.me/${botData?.username}`} />
          </div>
        </div>
      )}
    </div>
  );
}

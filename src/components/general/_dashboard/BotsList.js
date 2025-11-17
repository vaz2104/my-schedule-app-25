"use client";

import { useEffect, useState } from "react";
import Thumbnail from "../../ui/Thumbnail";
import Spinner from "@/components/ui/Spinner";
import { CompanyService } from "@/services/CompanyService";
import { AuthService } from "@/services/AuthService";
import { redirect } from "next/navigation";
import Alert from "@/components/ui/Alert";
import { WorkerService } from "@/services/WorkerService";

export default function BotsList() {
  const [bots, setBots] = useState([]);
  const [relatedBots, setRelatedBots] = useState([]);
  const [isLoader, setIsLoader] = useState(true);
  const [error, setError] = useState(null);

  async function goToBotDashboard(botId, role) {
    localStorage.removeItem("activePanel");
    localStorage.setItem("activePanel", botId);

    redirect(`/dashboard/${botId}`);
  }

  async function loadBots() {
    const session = await AuthService.getSession();
    const botsListResponse = await CompanyService.getBots({
      adminId: session.userId,
    });

    const relatedBotsResponse = await WorkerService.getRelatedBots(
      session.userId
    );

    if (botsListResponse.status !== 200 || relatedBotsResponse.status !== 200) {
      setError("Сталася помилка при завантаженні даних");
    }

    setBots(botsListResponse.data);

    let filteredRelated = [];
    relatedBotsResponse.data.map((relatedBotItem) => {
      botsListResponse.data.map((botItem) => {
        let isAdminBot = false;
        if (relatedBotItem?._id === botItem?._id) {
          isAdminBot = true;
        }

        if (!isAdminBot) filteredRelated.push(relatedBotItem);
      });
    });

    setRelatedBots(filteredRelated);

    setIsLoader(false);
  }

  useEffect(() => {
    loadBots();
  }, []);

  if (isLoader)
    return (
      <div className="my-4 flex justify-center items-center">
        <Spinner />
      </div>
    );

  if (error) {
    return <Alert className={"mt-4"}>{error}</Alert>;
  }

  if (!bots?.length && !relatedBots?.length)
    return (
      <div className="text-center text-gray-400 mt-4">
        <p>У Вас поки немає жодного бота доданого до системи</p>
      </div>
    );

  return (
    <div className="max-w-80 mx-auto">
      {bots?.length > 0 && (
        <div>
          {relatedBots?.length > 0 && (
            <div className=" text-gray-400 mt-4">
              <p>Боти створені вами</p>
            </div>
          )}
          {bots.map((bot) => {
            return (
              <div className="my-4" key={bot._id}>
                <div className="my-4">
                  <button
                    className="w-full flex items-center border border-gray-100 rounded-md bg-gray-50 hover:bg-gray-100 px-4 py-2 lg:max-w-80 mx-auto transition-all"
                    onClick={() => goToBotDashboard(bot._id)}
                  >
                    <Thumbnail url={bot.avatar} size={"xs"} />
                    <span className="ml-4 font-bold">{bot.first_name}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {relatedBots?.length > 0 && (
        <div>
          <div className=" text-gray-400 mt-4">
            <p>Боти де Ви є працівником</p>
          </div>
          {relatedBots.map((bot) => {
            return (
              <div className="my-4" key={bot._id}>
                <div className="my-4">
                  <button
                    className="w-full flex items-center border border-gray-100 rounded-md bg-gray-50 hover:bg-gray-100 px-4 py-2 lg:max-w-80 mx-auto transition-all"
                    onClick={() => goToBotDashboard(bot._id)}
                  >
                    <Thumbnail url={bot.avatar} size={"xs"} />
                    <span className="ml-4 font-bold">{bot.first_name}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

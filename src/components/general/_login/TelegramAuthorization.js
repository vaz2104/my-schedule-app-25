"use client";
import { useContext, useEffect, useState } from "react";
import FullScreenLoader from "../../ui/FullScreenLoader";
import { UserService } from "@/services/UserService";
import { redirect, useParams, useSearchParams } from "next/navigation";
import { ThemeContext } from "@/context/ThemeContext";
import { CompanyService } from "@/services/CompanyService";

export default function TelegramAuthorization({ telegramUserID }) {
  const { setCriticallError } = useContext(ThemeContext);
  const [clientRelationError, setClientRelationError] = useState(false);
  const [adminRelationError, setAdminRelationError] = useState(false);
  const searchParams = useSearchParams();
  const panelID = searchParams.get("panelID");
  const role = searchParams.get("role");

  async function loadUserInfo() {
    const platformUserResponse = await UserService.getTelegramUsers({
      userId: telegramUserID,
    });

    if (platformUserResponse.status !== 200) {
      setCriticallError("При завантаженні даних сталася помилка!");
      return;
    }

    if (!platformUserResponse?.data?.length) {
      setCriticallError("При завантаженні даних сталася помилка!");
      return;
    }

    const platformUser = platformUserResponse?.data[0];

    // if(role === "admin" && platformUserResponse?.data)

    if (role === "client" && panelID) {
      const clientRelationResponse = await CompanyService.getClients({
        botId: panelID,
        telegramUserId: platformUser?._id,
      });

      if (clientRelationResponse.status !== 200) {
        setCriticallError("При завантаженні даних сталася помилка!");
        return;
      }

      if (!clientRelationResponse?.data?.length) {
        setClientRelationError(true);
        return;
      }
    }

    const sessionQuery = {
      userId: platformUser?._id,
      role,
    };

    if (panelID) {
      sessionQuery.panel = panelID;
    }
    const newSession = await fetch("/api/session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(sessionQuery),
    });

    if (newSession) {
      if (role === "client") {
        localStorage.removeItem("activePanel");
        localStorage.setItem("activePanel", panelID);
      }
      redirect(role === "client" ? `/panel/${panelID}` : "/dashboard");
    }
  }

  useEffect(() => {
    loadUserInfo();
  }, []);

  if (clientRelationError) {
    return (
      <div className="p-4 flex justify-center items-center h-[calc(100vh-9rem)]">
        <p className="text-center text-gray-500 text-lg">
          Вибачте, сталась помилка!
        </p>
        <p className="text-center text-gray-500 mt-4">
          Спочатку перейдіть в бот та натисніть кнокпу &quot;Розпочати&quot;
        </p>
      </div>
    );
  }

  return <FullScreenLoader />;
}

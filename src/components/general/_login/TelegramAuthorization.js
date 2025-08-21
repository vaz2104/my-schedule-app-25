"use client";
import { useContext, useEffect } from "react";
import FullScreenLoader from "../../ui/FullScreenLoader";
import { UserService } from "@/services/UserService";
import { redirect, useSearchParams } from "next/navigation";
import { ThemeContext } from "@/context/ThemeContext";

export default function TelegramAuthorization({ telegramUserID }) {
  const { setCriticallError } = useContext(ThemeContext);
  const searchParams = useSearchParams();
  const panelID = searchParams.get("panelID");
  const role = searchParams.get("role");

  async function loadUserInfo() {
    const platformUserResponse = await UserService.getTelegramUser({
      userId: telegramUserID,
    });

    if (
      platformUserResponse.status !== 200 ||
      !platformUserResponse?.data?.length
    ) {
      setCriticallError("При завантаженні даних сталася помилка!");
      return;
    }

    const platformUser = platformUserResponse?.data[0];

    const newSession = await fetch("/api/session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: platformUser?._id,
        role,
      }),
    });

    if (newSession) {
      redirect(
        role === "client" ? `/panel/${panelID}` : "/dashboard/presentation"
      );
    }
  }

  useEffect(() => {
    loadUserInfo();
  }, []);

  return <FullScreenLoader />;
}

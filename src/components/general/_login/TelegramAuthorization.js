"use client";
import { useEffect } from "react";
import FullScreenLoader from "../../ui/FullScreenLoader";
import { UserService } from "@/services/UserService";
import { redirect, useSearchParams } from "next/navigation";

export default function TelegramAuthorization({ telegramUserID }) {
  const searchParams = useSearchParams();
  const panelID = searchParams.get("panelID");
  const role = searchParams.get("role");

  async function loadUserInfo() {
    const platformUser = await UserService.getTelegramUser({
      userId: telegramUserID,
    });

    if (!platformUser?.length) {
      redirect(`/`);
    }

    const newSession = await fetch("/api/session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: platformUser[0]?._id,
        role,
      }),
    });

    if (!newSession) {
      redirect(`/`);
    }

    redirect(role === "client" ? `/panel/${panelID}` : "/dashboard");
  }

  useEffect(() => {
    loadUserInfo();
  }, []);

  return <FullScreenLoader />;
}

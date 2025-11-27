"use client";
import { useEffect, useState } from "react";
import TelegramAuthorization from "./TelegramAuthorization";
import FormAuthorization from "./FormAuthorization";
import FullScreenLoader from "../../ui/FullScreenLoader";
// import { AuthService } from "@/services/AuthService";

export default function LoginLayout() {
  const [telegramUserID, setTelegramUserID] = useState(null);
  const [isLoader, setIsLoader] = useState(true);

  async function checkTelegramUser() {
    if (typeof window !== "undefined") {
      const userID = window.Telegram?.WebApp?.initDataUnsafe?.user?.id;

      // if (userID) {
      //   await AuthService.destroySession();
      //   localStorage.removeItem("activePanel");
      // }

      setTelegramUserID(userID);
      setIsLoader(false);
    }
  }

  useEffect(() => {
    checkTelegramUser();
  }, []);

  if (isLoader) return <FullScreenLoader />;

  return telegramUserID ? (
    <TelegramAuthorization telegramUserID={telegramUserID} />
  ) : (
    <FormAuthorization />
  );
}

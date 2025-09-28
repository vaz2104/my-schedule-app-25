"use client";
import { useEffect, useState } from "react";
import TelegramAuthorization from "./TelegramAuthorization";
import FormAuthorization from "./FormAuthorization";
import FullScreenLoader from "../../ui/FullScreenLoader";

export default function LoginLayout() {
  const [telegramUserID, setTelegramUserID] = useState(null);
  const [isLoader, setIsLoader] = useState(true);

  function checkTelegramUser() {
    if (typeof window !== "undefined") {
      const userID =
        window.Telegram?.WebApp?.initDataUnsafe?.user?.id || "433252938";
      // console.log("check telegram user ID", userID);

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

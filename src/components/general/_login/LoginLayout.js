"use client";
import { useEffect, useState } from "react";
import Header from "@/components/general/Header";
import Footer from "@/components/general/Footer";

import TelegramAuthorization from "./TelegramAuthorization";
import FormAuthorization from "./FormAuthorization";
import FullScreenLoader from "../../ui/FullScreenLoader";

export default function LoginLayout() {
  const [telegramUserID, setTelegramUserID] = useState(null);
  const [isLoader, setIsLoader] = useState(true);

  async function checkTelegramUser() {
    if (typeof window !== "undefined") {
      const userID = window.Telegram?.WebApp?.initDataUnsafe?.user?.id; // 6683083958; //

      setTelegramUserID(userID);
      setIsLoader(false);
    }
  }

  useEffect(() => {
    checkTelegramUser();
  }, []);

  if (isLoader) return <FullScreenLoader />;

  return telegramUserID ? (
    <div className="ms-full-creen p-4">
      <div className="flex-1">
        <TelegramAuthorization telegramUserID={telegramUserID} />
      </div>
    </div>
  ) : (
    <div className="ms-full-creen p-4">
      <Header />
      <div className="flex-1">
        <FormAuthorization />
      </div>
      <Footer />
    </div>
  );
}

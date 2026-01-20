"use client";

import Link from "next/link";
import BotsList from "./BotsList";
import NewBotButton from "./NewBotButton";

export default function BotsPanel() {
  return (
    <div className="flex-1 flex flex-col justify-center items-center">
      <NewBotButton />
      <div className="text-center w-xs">
        <Link
          href="/dashboard/create-bot-manual"
          className="underline text-sm text-red-600"
        >
          Ще немає бота?
        </Link>
      </div>

      <div className="my-4 border-t border-gray-100 max-w-40 mx-auto w-full border-dashedbox-content"></div>

      <div className="ms-container">
        <BotsList />
      </div>
    </div>
  );
}

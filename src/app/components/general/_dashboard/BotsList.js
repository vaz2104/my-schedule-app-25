"use client";

import Thumbnail from "../../ui/Thumbnail";

export default function BotsList({ bots }) {
  function goToBotDashboard() {}

  if (!bots)
    return (
      <div className="text-center text-gray-400 mt-4">
        <p>У Вас поки немає жодного бота доданого до системи</p>
      </div>
    );

  return (
    <div className="max-w-80 mx-auto">
      <div className="my-4">
        <button
          className="w-full flex items-center border px-4 py-2 transition-all button-bg-dark rounded-md"
          onClick={() => goToBotDashboard()}
        >
          <Thumbnail />
          <span className="ml-4 font-bold">{"Bot name"}</span>
        </button>
      </div>
    </div>
  );
}

import BotWidget from "./BotWidget";

export default function ClientsWidget({ totalNumber }) {
  return (
    <div className="mb-6">
      <div className="flex -mx-1">
        <div className="w-2/3 px-1">
          <BotWidget />
        </div>

        <div className="w-1/3 px-1">
          <div className="h-full rounded-xl bg-gray-100 p-4 text-center">
            <div className="flex flex-col items-center justify-center h-full">
              <div className="text-4xl font-bold">{totalNumber}</div>
              <div className="text-xs mt-2">Клієнти, що користуються ботом</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

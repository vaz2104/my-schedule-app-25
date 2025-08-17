import { BadgeCheckIcon, LogOutIcon } from "../ui/Icons";
import Thumbnail from "../ui/Thumbnail";

export default function Header() {
  return (
    <div className="fixed top-0 left-0 w-full px-4 bg-gray-50 z-10">
      <div className="flex justify-between items-center py-3">
        <div className="flex items-center">
          <div className="relative">
            <div className="absolute -top-2 -right-2">
              <BadgeCheckIcon className={"size-6 text-yellow-500"} />
            </div>
            <Thumbnail size="xs" theme="light" />
          </div>

          <div className="ml-2 text-md font-bold">BotName</div>
        </div>
        {/* <div className="flex items-center">
          <BadgeCheckIcon className={"size-9 text-yellow-400"} />
          <div className="text-gray-800">
            <div className="ml-1 text-sm translate-y-0.5">Premium</div>
            <div className="ml-1 text-sm -translate-y-0.5">Bussines</div>
            
          </div>
        </div> */}
        {/* <div className="ml-1 text-sm -translate-y-0.5">Lite</div>  */}
        <button
          className="ml-3 group flex items-center rounded-lg px-2 pr-1 py-1 text-sm font-medium text-red-600 bg-red-100"
          //   onClick={logout}
        >
          <span className="mr-1 flex-1 whitespace-nowrap">Завершити</span>
          <LogOutIcon className={"size-5 text-red-600"} />
        </button>
      </div>
      {/* <div className="border-b border-gray-100"></div> */}
    </div>
  );
}

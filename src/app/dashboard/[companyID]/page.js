import StatisticWidget from "@/app/components/admin/StatisticWidget";
import WeekCalendar from "@/app/components/ui/calendar/WeekCalendar";
import { CheckCircleIcon } from "@/app/components/ui/Icons";
import { cn } from "@/app/lib/cn";
import Link from "next/link";

export default function DashboardHome() {
  return (
    <div className="p-4">
      <div>
        <div className="mb-4">
          <h2 className="font-bold text-lg">Завантаженість цього тижня</h2>
        </div>
        <StatisticWidget />
      </div>
      <div className="mt-6">
        <WeekCalendar />
      </div>
      <div className="mt-8 mb-4">
        <h2 className="font-bold text-lg">
          {/* {today.getDate() ===
                        new Date(selectedDate).getDate() ? (
                            <>Cьогоднішні візити</>
                        ) : (
                            <>Візити цього дня</>
                        )} */}
          {/* <>Cьогоднішні візити</> */}
          <>Візити цього дня</>
        </h2>
      </div>
      <div className="mt-4">
        <div className="w-full bg-gray-100 mb-4 p-4 text-gray-900 rounded-lg ">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div
                className={cn(
                  "w-12 h-12  border-2 border-gray-200 rounded-full bg-white"
                )}
              >
                <img
                  src={
                    "https://doodleipsum.com/700x700/avatar?i=310c74837ffe0803164ed110256826e1"
                  }
                  className="w-12 h-12 rounded-full"
                  alt="Jese Leos image"
                />
              </div>
              <div className="ml-2 text-base font-normal text-center">
                <div className="text-base font-semibold text-gray-900 dark:text-white">
                  Bonnie Green
                </div>
              </div>
            </div>
            <Link href={""} className="button !py-2 !px-4">
              весь графік
            </Link>
          </div>
          <div className="mt-4">
            <ul className="">
              <li className=" flex py-3 border-b border-t border-gray-200 items-center">
                <CheckCircleIcon className={"w-4 h-4 text-green-600"} />
                <span className=" text-gray-600 text-lg text-center block font-bold ml-2">
                  09:00
                </span>

                <Link
                  href={""}
                  className="ml-4 text-sm text-gray-800 font-bold"
                >
                  Bonnie Green
                </Link>
              </li>

              <li className=" flex py-3 border-b border-gray-200 items-center">
                <span className="box-border w-4 h-4 rounded-full border border-gray-500"></span>
                <span className=" text-gray-600 text-lg text-center block font-bold ml-2">
                  11:20
                </span>
                <span className="ml-4 text-sm text-gray-500">
                  доступний запис
                </span>
              </li>
              <li className=" flex py-3 border-b border-gray-200 items-center">
                <span className="box-border w-4 h-4 rounded-full border border-gray-500"></span>
                <span className=" text-gray-600 text-lg text-center block font-bold ml-2">
                  12:50
                </span>
                <span className="ml-4 text-sm text-gray-500">
                  доступний запис
                </span>
              </li>
              <li className=" flex py-3 border-b border-gray-200 items-center">
                <span className="box-border w-4 h-4 rounded-full border border-gray-500"></span>
                <span className=" text-gray-600 text-lg text-center block font-bold ml-2">
                  14:40
                </span>
                <span className="ml-4 text-sm text-gray-500">
                  доступний запис
                </span>
              </li>

              <li className=" flex py-3 border-b border-gray-200 items-center">
                <span className="box-border w-4 h-4 rounded-full border border-gray-500"></span>
                <span className=" text-gray-600 text-lg text-center block font-bold ml-2">
                  16:30
                </span>
                <span className="ml-4 text-sm text-gray-500">
                  доступний запис
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="w-full bg-gray-100 mb-4 p-4 text-gray-900 rounded-lg ">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div
                className={cn(
                  "w-12 h-12  border-2 border-gray-200 rounded-full bg-white"
                )}
              >
                <img
                  src={
                    "https://doodleipsum.com/700x700/avatar?i=310c74837ffe0803164ed110256826e1"
                  }
                  className="w-12 h-12 rounded-full"
                  alt="Jese Leos image"
                />
              </div>
              <div className="ml-2 text-base font-normal text-center">
                <div className="text-base font-semibold text-gray-900 dark:text-white">
                  Bonnie Green
                </div>
              </div>
            </div>
            <Link href={""} className="button !py-2 !px-4">
              весь графік
            </Link>
          </div>
          <div className="mt-4">
            <ul className="flex flex-wrap -mx-1">
              <li className="w-1/4 px-1 my-1.5">
                <span className="p-2 rounded-3xl bg-white text-gray-700 text-sm text-center block border border-gray-200">
                  09:00
                </span>
              </li>
              <li className="w-1/4 px-1 my-1.5">
                <span className="p-2 rounded-3xl bg-white text-gray-700 text-sm text-center block border border-gray-200">
                  09:40
                </span>
              </li>
              <li className="w-1/4 px-1 my-1.5">
                <span className="p-2 rounded-3xl bg-white text-gray-700 text-sm text-center block border border-gray-200">
                  11:20
                </span>
              </li>
              <li className="w-1/4 px-1 my-1.5">
                <span className="p-2 rounded-3xl text-gray-400 text-sm text-center block">
                  12:50
                </span>
              </li>
              <li className="w-1/4 px-1 my-1.5">
                <span className="p-2 rounded-3xl bg-white text-gray-700 text-sm text-center block border border-gray-200">
                  14:40
                </span>
              </li>

              <li className="w-1/4 px-1 my-1.5">
                <span className="p-2 rounded-3xl bg-white text-gray-700 text-sm text-center block border border-gray-200">
                  16:30
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div className="w-full bg-gray-100 mb-4 p-4 text-gray-900 rounded-lg ">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div
                className={cn(
                  "w-12 h-12  border-2 border-gray-200 rounded-full bg-white"
                )}
              >
                <img
                  src={
                    "https://doodleipsum.com/700x700/avatar?i=310c74837ffe0803164ed110256826e1"
                  }
                  className="w-12 h-12 rounded-full"
                  alt="Jese Leos image"
                />
              </div>
              <div className="ml-2 text-base font-normal text-center">
                <div className="text-base font-semibold text-gray-900 dark:text-white">
                  Bonnie Green
                </div>
              </div>
            </div>
            <Link href={""} className="button !py-2 !px-4">
              весь графік
            </Link>
          </div>
          <div className="mt-4">
            <ul className="flex flex-wrap -mx-1">
              <li className="w-1/4 px-1 my-1.5">
                <span className="p-2 rounded-3xl bg-white text-gray-700 text-sm text-center block border border-gray-200">
                  09:00
                </span>
              </li>
              <li className="w-1/4 px-1 my-1.5">
                <span className="p-2 rounded-3xl bg-white text-gray-700 text-sm text-center block border border-gray-200">
                  09:40
                </span>
              </li>
              <li className="w-1/4 px-1 my-1.5">
                <span className="p-2 rounded-3xl bg-white text-gray-700 text-sm text-center block border border-gray-200">
                  11:20
                </span>
              </li>
              <li className="w-1/4 px-1 my-1.5">
                <span className="p-2 rounded-3xl text-gray-400 text-sm text-center block">
                  12:50
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

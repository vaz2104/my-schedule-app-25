import ScheduleModalForm from "@/app/components/admin/ScheduleModalForm";
import GenerateSchedule from "@/app/components/admin/GenerateSchedule";
import StatisticWidget from "@/app/components/admin/StatisticWidget";
import Calendar from "@/app/components/ui/calendar/Calendar";
import { PlusIcon, TrashIcon } from "@/app/components/ui/Icons";
import { cn } from "@/app/lib/cn";

export default function SpecialistSingle() {
  return (
    <div className="p-4">
      <div className="mt-1.5">
        <div
          className={cn(
            "m-auto w-16 h-16  border-2 border-gray-200 rounded-full"
          )}
        >
          <img
            src={
              "https://doodleipsum.com/700x700/avatar?i=310c74837ffe0803164ed110256826e1"
            }
            className="w-16 h-16 rounded-full"
            alt="Jese Leos image"
          />
        </div>
        <div className="ms-3 text-sm font-normal text-center mt-2">
          <div className="font-bold text-xl text-gray-900 dark:text-white">
            Bonnie Green
          </div>
        </div>
      </div>
      <div className="mt-4">
        <div className="mb-4">
          <h2 className="font-bold text-lg text-center">
            Завантаженість цього місяця
          </h2>
        </div>
        <StatisticWidget />
        <div className="mt-6">
          <GenerateSchedule />
        </div>
      </div>

      <div className="mt-8">
        <Calendar />
      </div>
      {/* <div className="mt-6">
        <p className="mt-4 flex justify-center">
          <button className="button dark w-full">Додати графік</button>
        </p>
        <div className="mt-8">
          <p className="text-center text-md font-medium my-12 text-gray-400">
            Часи прийому не вказані
          </p>
        </div>
      </div> */}
      <div className="mt-6">
        <div className="mb-4">
          <h2 className="font-bold text-lg text-center">Графік на 17 серпня</h2>
        </div>

        <ScheduleModalForm />
        <div className="mt-2">
          <div className="py-4 relative flex justify-between items-center">
            <div className="absolute bottom-0 left-2 right-2 border-t border-t-gray-200"></div>
            <div className="font-bold text-lg ml-2">10:00</div>
            <div className="flex-1 ml-4 flex items-center">
              <p className="text-sm text-gray-500">Запис відсутній</p>
            </div>
            <div className="text-right">
              <div className="flex">
                <div className="flex justify-center">
                  <button className="button blank !px-2">
                    <TrashIcon className="w-4 text-red-600" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="py-4 relative flex justify-between items-center">
            <div className="absolute bottom-0 left-2 right-2 border-t border-t-gray-200"></div>
            <div className="font-bold text-lg ml-2">10:40</div>
            <div className="flex-1 ml-4 flex items-center">
              <p className="text-sm text-gray-500">Запис відсутній</p>
            </div>
            <div className="text-right">
              <div className="flex">
                <div className="flex justify-center">
                  <button className="button blank !px-2">
                    <TrashIcon className="w-4 text-red-600" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

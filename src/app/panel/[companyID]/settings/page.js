import React from "react";

export default function SettingsPage() {
  return (
    <div className="p-4">
      <div className="mb-8 mt-4 text-center">
        <h2 className="font-bold text-xl">Налаштування</h2>
      </div>
      <div className="py-6 border-b border-gray-200">
        <label className="flex items-center cursor-pointer">
          <span className="block mr-3 text-base font-medium text-gray-600 dark:text-white flex-1">
            Відправляти мені сповіщення, про нові знижки та послуги
          </span>
          <input
            type="checkbox"
            // value={sentNotification}
            // onChange={() => setSentNotification(!sentNotification)}
            className="sr-only peer"
            // checked={sentNotification}
          />
          <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-main "></div>
        </label>
      </div>
      <div className="py-6 border-b border-gray-200">
        <label className="flex items-center cursor-pointer">
          <span className="block mr-3 text-base font-medium text-gray-600 dark:text-white flex-1">
            Відправляти мені сповіщення, про зміни в розкладі
          </span>
          <input
            type="checkbox"
            // value={sentNotification}
            // onChange={() => setSentNotification(!sentNotification)}
            className="sr-only peer"
            // checked={sentNotification}
          />
          <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-main "></div>
        </label>
      </div>
      <div className="py-6 border-b border-gray-200">
        <label className="flex items-center cursor-pointer">
          <span className="block mr-3 text-base font-medium text-gray-600 dark:text-white flex-1">
            Відправляти мені сповіщення із нагадуванням про запис на прийом
          </span>
          <input
            type="checkbox"
            // value={sentNotification}
            // onChange={() => setSentNotification(!sentNotification)}
            className="sr-only peer"
            // checked={sentNotification}
          />
          <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-main "></div>
        </label>
      </div>
    </div>
  );
}

import CopyToClipboard from "@/components/ui/CopyToClipboard";
import React from "react";

export default function Step3({ botData }) {
  return (
    <div>
      <p className="mt-6 text-left font-bold text-sm">
        Для зручності Ваших клієнтів, налаштуйте меню у Вашому боті
      </p>
      <p className="mt-1 mb-6 font-light text-left text-gray-500 text-sm">
        Для цього скопіюйте посилання та виконайте інструкцію нижче
      </p>

      <p className="text-ellipsis overflow-hidden bg-slate-200 p-2 rounded text-center">
        {process.env.NEXT_PUBLIC_APP_URL}/panel/{botData?._id}
      </p>
      <div className="flex justify-center mt-1">
        <CopyToClipboard
          text={`${process.env.NEXT_PUBLIC_APP_URL}/panel/${botData?._id}`}
        />
      </div>

      <div className="mt-8">
        <ol className="relative text-gray-500 border-s border-gray-200 dark:border-gray-700 dark:text-gray-400 ml-3">
          <li className="mb-10 ms-6">
            <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
              1
            </span>
            <div className="pt-1.5">
              <p className="font-light text-left text-gray-500 text-sm">
                Відкрийте
                <a
                  target="_blunk"
                  href="https://t.me/botfather"
                  className="text-mainBlueDark font-bold underline mx-1"
                >
                  @BotFather
                </a>
                та перейдіть по наступних кроках: <br />
                <span className="font-bold">/mybots</span> {`>`}{" "}
                <span className="font-bold">
                  {`"`}Назва Вашого бота{`"`}
                </span>{" "}
                {` > `} <span className="font-bold">Bot Settings</span>
                {` > `} <span className="font-bold">Menu Button</span> {` > `}
                <span className="font-bold">Configure menu button</span>
              </p>
            </div>
          </li>
          <li className="mb-10 ms-6">
            <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
              2
            </span>
            <div className="pt-1.5">
              <p className="font-light text-left text-gray-500 text-sm">
                Вставте в поле посилання та відправте
              </p>
            </div>
          </li>
          <li className="mb-10 ms-6">
            <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
              3
            </span>
            <div className="pt-1.5">
              <p className="font-light text-left text-gray-500 text-sm">
                Напишіть назву, яка буде відображатися на кнопці. Наприклад:{" "}
                <span className="font-bold">
                  {`"`}Відкрити графік{`"`}
                </span>
              </p>
            </div>
          </li>
        </ol>
      </div>
    </div>
  );
}

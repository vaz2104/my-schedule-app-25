"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import CopyToClipboard from "@/app/lib/CopyToClipboard";
import BackButton from "@/app/components/ui/BackButton";

export default function InitNewBot() {
  const [activeStep, setActiveStep] = useState(4);
  //   const [botToken, setBotToken] = useState("");

  //   const [copied, setCopied] = useState(false);
  //   const [bot, setBot] = useState(null);
  //   const [loading, setLoading] = useState(false);
  //   const [isWrongToken, setIsWrongToken] = useState(false);

  //   function clearInputStatus() {
  //     setIsWrongToken(false);
  //   }

  //   async function nextStep(step) {
  //     if (activeStep === 1 && botToken === "") return false;

  //     if (botToken !== "") {
  //       setLoading(true);

  //       const botData = await CompanyService.getBotInfo(botToken);

  //       // console.log(botData);

  //       if (!botData) {
  //         setIsWrongToken(true);
  //         setLoading(false);
  //         return;
  //       }

  //       const session = await AuthService.getSession();

  //       if (!session.userId) redirect("/login");

  //       const newBot = await CompanyService.saveNewBot(session.userId, botToken);

  //       console.log(newBot);

  //       if (newBot) {
  //         setBot(newBot);
  //         setActiveStep(step);
  //         setBotToken("");
  //         setLoading(false);
  //       }
  //     } else {
  //       setActiveStep(step);
  //       setCopied(false);
  //     }
  //   }

  // useEffect(() => {
  //   session
  // }, [])

  return (
    <div className="ms-container py-10">
      <BackButton url={"/dashboard"} label={"Назад"} />
      <div className="">
        <div className="text-xl font-semibold mt-6 text-center">
          Пройдіть всього 3 кроки та отримайте власний телеграм бот з Вашим
          графіком роботи
        </div>
        <div className="flex items-center mt-10">
          <div
            className={`step ${
              activeStep === 1
                ? "stepActive"
                : activeStep > 1
                ? "stepFinished"
                : ""
            }`}
          >
            <span>1</span>
          </div>
          <div
            className={`stepSeparator ${
              activeStep > 1 ? "stepSeparatorFinished" : ""
            }`}
          >
            <div></div>
          </div>
          <div
            className={`step ${
              activeStep === 2
                ? "stepActive"
                : activeStep > 2
                ? "stepFinished"
                : ""
            }`}
          >
            <span>2</span>
          </div>
          <div
            className={`stepSeparator ${
              activeStep > 2 ? "stepSeparatorFinished" : ""
            }`}
          >
            <div></div>
          </div>
          <div
            className={`step ${
              activeStep === 3
                ? "stepActive"
                : activeStep > 3
                ? "stepFinished"
                : ""
            }`}
          >
            <span>3</span>
          </div>
          <div
            className={`stepSeparator ${
              activeStep > 3 ? "stepSeparatorFinished" : ""
            }`}
          >
            <div></div>
          </div>
          <div className={`step ${activeStep === 4 ? "stepActive" : ""}`}>
            <span>🎉</span>
          </div>
        </div>

        <div className="my-6 text-xl font-semibold">Крок {activeStep}</div>

        {/* step 1 */}

        {activeStep === 1 && (
          <div>
            <div>
              <p className="my-1 font-light text-gray-500">
                1. Зайдіть в телеграм та знайдіть в пошуку
                <a
                  target="_blunk"
                  href="https://t.me/botfather"
                  className="text-mainBlue font-bold underline mx-1"
                >
                  @BotFather
                </a>
                (або перейдіть за цим посиланням)
              </p>
              <div className="shadow-md my-4">
                <Image
                  src={"/init-1-steps/init-step-1.png"}
                  width={609}
                  height={144}
                  className="m-auto"
                  alt=""
                />
              </div>
            </div>

            <div>
              <p className="my-1 font-light text-gray-500">
                2. Відкрийте бот, натисніть в меню команду{" "}
                <span className="text-black font-bold">/newbot</span>
              </p>
              <div className="my-4">
                <div className="shadow-md">
                  <Image
                    src={"/init-1-steps/init-step-2.png"}
                    width={609}
                    height={144}
                    className="m-auto"
                    alt=""
                  />
                </div>
                <p className="text-center font-bold my-3">або</p>
                <div className="shadow-md">
                  <Image
                    src={"/init-1-steps/init-step-22.png"}
                    width={609}
                    height={144}
                    className="m-auto"
                    alt=""
                  />
                </div>
              </div>
            </div>

            <div>
              <p className="my-1 font-light text-gray-500">
                3. Придумайте назву для свого бота <br />
              </p>
              <div className="my-4 shadow-md">
                <Image
                  src={"/init-1-steps/init-step-3.png"}
                  width={609}
                  height={144}
                  className="m-auto"
                  alt=""
                />
              </div>
            </div>

            <div>
              <p className="my-1 font-light text-gray-500">
                4. Придумайте{" "}
                <span className="text-black font-bold">username</span> (має
                закінчуватися словом{" "}
                <span className="text-black font-bold">‘bot’</span>) <br />
              </p>
              <div className="my-4 shadow-md">
                <Image
                  src={"/init-1-steps/init-step-4.png"}
                  width={609}
                  height={144}
                  className="m-auto"
                  alt=""
                />
              </div>
            </div>

            <div>
              <p className="font-light text-gray-500">
                5. Скопіюйте ваш персональний ключ (виділений червоним) в поле,
                яке знаходиться нижче
              </p>
              <div className="my-4 shadow-md">
                <Image
                  src={"/init-1-steps/init-step-5.png"}
                  width={609}
                  height={144}
                  className="m-auto"
                  alt=""
                />
              </div>
            </div>

            <div className="w-full mt-8">
              <label htmlFor="token" className="input-label !font-bold">
                Введіть Ваш токен
              </label>
              <input
                type="text"
                id="token"
                className="input"
                placeholder="Введіть тут..."
                //   onChange={(event) => setBotToken(event.target.value)}
                //   onKeyUp={() => clearInputStatus()}
              />
            </div>
          </div>
        )}

        {/* step 2 */}
        {activeStep === 2 && (
          <div>
            <p className="my-6 font-light text-left text-gray-500">
              Аби підєднати бот до нашої панелі, скопіюйте Ваше персональне
              посилання та виконайте інструкцію нижче
            </p>

            <p className="text-ellipsis overflow-hidden bg-slate-200 p-2 rounded text-center">
              {process.env.NEXT_PUBLIC_APP_URL}/panel/{""}
            </p>
            <div className="flex justify-center mt-3 mb-4">
              <CopyToClipboard
                text={`${process.env.NEXT_PUBLIC_APP_URL}/panel/${""}`}
              />
            </div>

            <p className="mt-4 font-light text-left text-gray-500">
              1. Відкрийте
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
              {` > `} <span className="font-bold">Configure Mini App</span>{" "}
              {` > `}
              <span className="font-bold">Enable Mini App</span>
            </p>
            <p className="my-1 font-light text-left text-gray-500">
              2. Вставте в поле Ваше персональне посилання та відправте
            </p>
          </div>
        )}

        {/* step 3 */}
        {activeStep === 3 && (
          <div>
            <p className="mt-6 text-left font-bold ">
              Для зручності Ваших клієнтів, налаштуйте меню у Вашому боті
            </p>
            <p className="mt-1 mb-6 font-light text-left text-gray-500">
              Для цього скопіюйте посилання та виконайте інструкцію нижче
            </p>

            <p className="text-ellipsis overflow-hidden bg-slate-200 p-2 rounded text-center">
              {process.env.NEXT_PUBLIC_APP_URL}/panel/{""}
            </p>
            <div className="flex justify-center mt-3 mb-4">
              <CopyToClipboard
                text={`${process.env.NEXT_PUBLIC_APP_URL}/panel/${""}`}
              />
            </div>

            <p className="mt-4 font-light text-left text-gray-500">
              1. Відкрийте
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
            <p className="my-1 font-light text-left text-gray-500">
              2. Вставте в поле посилання та відправте
            </p>
            <p className="my-1 font-light text-left text-gray-500">
              3. Напишіть назву, яка буде відображатися на кнопці. Наприклад:{" "}
              <span className="font-bold">
                {`"`}Відкрити графік{`"`}
              </span>
            </p>
          </div>
        )}

        {activeStep === 4 && (
          <div>
            <p className="my-1 font-bold">Вітаємо! Ваш бот налаштовано!</p>
            <p className="my-1 font-light text-gray-500">
              Переходьте в панель та заповнюйте свій робочий графік
            </p>
          </div>
        )}

        <div className="flex justify-center mt-10">
          {activeStep > 1 && (
            <div className={`mx-1`}>
              <button
                className={`button gray `}
                onClick={() => nextStep(activeStep - 1)}
              >
                Повернутися
              </button>
            </div>
          )}

          {activeStep < 4 && (
            <div className="mx-1">
              <button
                className={`button`}
                onClick={() => nextStep(activeStep + 1)}
              >
                Далі
              </button>
            </div>
          )}

          {activeStep === 4 && (
            <Link href={`/dashboard/${""}`} className={`button`}>
              Розпочати роботу
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

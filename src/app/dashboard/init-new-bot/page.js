"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import BackButton from "@/app/components/ui/BackButton";
import CopyToClipboard from "@/app/components/ui/CopyToClipboard";
import { CheckCircleIcon } from "@/app/components/ui/Icons";
import { cn } from "@/app/lib/cn";
import Lottie from "lottie-react";
import successAnimation from "@/app/lib/success-animation.json";

export default function InitNewBot() {
  const [activeStep, setActiveStep] = useState(1);
  const [isHintChecked, setIsHintChecked] = useState(false);
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
  const lottieRef = useRef();
  function saveSchedule() {
    setActiveStep(activeStep + 1);
    // lottieRef.current.destroy();
    // lottieRef.current.play();
  }

  if (!isHintChecked) {
    return (
      <div className="ms-container">
        <div className=" p-4 h-screen flex flex-col justify-center">
          <Image
            src={"/init-new-bot-poster.png"}
            width={650}
            height={500}
            className="animate__animated animate__fadeIn"
            alt=""
          />
          <div className="text-gray-700 my-6 text-center animate__animated animate__fadeIn">
            Пройдіть лише 3 кроки та отримайте власний телеграм бот з
            персональним графіком роботи
          </div>
          <div className="flex justify-center w-full py-6">
            <div className="w-full animate__animated animate__slideInUp">
              <button
                className="button w-full"
                onClick={() => setIsHintChecked(true)}
              >
                Розпочати
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="ms-container py-10">
      <BackButton url={"/dashboard"} label={"Назад"} />
      <div className="">
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
            <span className="">
              <CheckCircleIcon
                className={cn(
                  "w-6 h-6 text-gray-400",
                  activeStep === 4 &&
                    "text-white animate__animated animate__bounceIn"
                )}
              />
            </span>
          </div>
        </div>

        {activeStep < 4 && (
          <div className="my-6 text-xl font-semibold text-center">
            Крок {activeStep}
          </div>
        )}

        {/* step 1 */}

        {activeStep === 1 && (
          <div>
            <ol className="relative text-gray-500 border-s border-gray-200 dark:border-gray-700 dark:text-gray-400 ml-3">
              <li className="mb-10 ms-6">
                <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
                  1
                </span>
                <div className="pt-0.5">
                  <p className="my-1 font-light text-gray-500 text-sm">
                    Зайдіть в телеграм та знайдіть в пошуку
                    <a
                      target="_blunk"
                      href="https://t.me/botfather"
                      className="text-mainBlue font-bold underline mx-1"
                    >
                      @BotFather
                    </a>
                    (або перейдіть за цим посиланням)
                  </p>
                  <div className="shadow-md my-4 border border-gray-100 rounded-sm overflow-hidden">
                    <Image
                      src={"/init-1-steps/init-step-1.png"}
                      width={609}
                      height={144}
                      className="m-auto"
                      alt=""
                    />
                  </div>
                </div>
              </li>
              <li className="mb-10 ms-6">
                <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
                  2
                </span>
                <div className="pt-0.5">
                  <p className="my-1 font-light text-gray-500 text-sm">
                    Відкрийте бот, виберіть зі списку, або натисніть в меню
                    команду{" "}
                    <span className="text-black font-bold">/newbot</span>
                  </p>
                  <div className="my-4">
                    <div className="shadow-md border border-gray-100 rounded-sm overflow-hidden">
                      <Image
                        src={"/init-1-steps/init-step-2.png"}
                        width={609}
                        height={144}
                        className="m-auto"
                        alt=""
                      />
                    </div>
                    <p className="text-center font-bold my-3 text-sm">або</p>
                    <div className="shadow-md border border-gray-100 rounded-sm overflow-hidden">
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
              </li>
              <li className="mb-10 ms-6">
                <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
                  3
                </span>
                <div className="pt-0.5">
                  <p className="my-1 font-light text-gray-500 text-sm">
                    Придумайте назву для свого бота <br />
                  </p>
                  <div className="my-4 shadow-md border border-gray-100 rounded-sm overflow-hidden">
                    <Image
                      src={"/init-1-steps/init-step-3.png"}
                      width={609}
                      height={144}
                      className="m-auto"
                      alt=""
                    />
                  </div>
                </div>
              </li>
              <li className="mb-10 ms-6">
                <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
                  4
                </span>
                <div className="pt-0.5">
                  <p className="my-1 font-light text-gray-500 text-sm">
                    Придумайте{" "}
                    <span className="text-black font-bold">username</span> (має
                    закінчуватися словом{" "}
                    <span className="text-black font-bold">‘bot’</span>) <br />
                  </p>
                  <div className="my-4 shadow-md border border-gray-100 rounded-sm overflow-hidden">
                    <Image
                      src={"/init-1-steps/init-step-4.png"}
                      width={609}
                      height={144}
                      className="m-auto"
                      alt=""
                    />
                  </div>
                </div>
              </li>
              <li className="ms-6">
                <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
                  5
                </span>
                <div className="pt-1.5">
                  <p className="font-light text-gray-500 text-sm">
                    Скопіюйте ваш персональний ключ (виділений червоним) в поле,
                    яке знаходиться нижче
                  </p>
                  <div className="my-4 shadow-md border border-gray-100 rounded-sm overflow-hidden">
                    <Image
                      src={"/init-1-steps/init-step-5.png"}
                      width={609}
                      height={144}
                      className="m-auto"
                      alt=""
                    />
                  </div>
                </div>
              </li>
            </ol>

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
            <p className="my-6 font-light text-left text-gray-500 text-sm">
              Аби підєднати бот до нашої панелі, скопіюйте Ваше персональне
              посилання та виконайте інструкцію нижче
            </p>

            <p className="text-ellipsis overflow-hidden bg-slate-200 p-2 rounded text-center">
              {process.env.NEXT_PUBLIC_APP_URL}/panel/{""}
            </p>
            <div className="flex justify-center mt-1">
              <CopyToClipboard
                text={`${process.env.NEXT_PUBLIC_APP_URL}/panel/${""}`}
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
                      {` > `}{" "}
                      <span className="font-bold">Configure Mini App</span>{" "}
                      {` > `}
                      <span className="font-bold">Enable Mini App</span>
                    </p>
                  </div>
                </li>
                <li className="mb-10 ms-6">
                  <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
                    2
                  </span>
                  <div className="pt-0.5">
                    <p className="my-1 font-light text-left text-gray-500 text-sm">
                      Вставте в поле Ваше персональне посилання та відправте
                    </p>
                  </div>
                </li>
              </ol>
            </div>
          </div>
        )}

        {/* step 3 */}
        {activeStep === 3 && (
          <div>
            <p className="mt-6 text-left font-bold text-sm">
              Для зручності Ваших клієнтів, налаштуйте меню у Вашому боті
            </p>
            <p className="mt-1 mb-6 font-light text-left text-gray-500 text-sm">
              Для цього скопіюйте посилання та виконайте інструкцію нижче
            </p>

            <p className="text-ellipsis overflow-hidden bg-slate-200 p-2 rounded text-center">
              {process.env.NEXT_PUBLIC_APP_URL}/panel/{""}
            </p>
            <div className="flex justify-center mt-1">
              <CopyToClipboard
                text={`${process.env.NEXT_PUBLIC_APP_URL}/panel/${""}`}
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
                      {` > `} <span className="font-bold">Menu Button</span>{" "}
                      {` > `}
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
                      Напишіть назву, яка буде відображатися на кнопці.
                      Наприклад:{" "}
                      <span className="font-bold">
                        {`"`}Відкрити графік{`"`}
                      </span>
                    </p>
                  </div>
                </li>
              </ol>
            </div>
          </div>
        )}

        {activeStep === 4 && (
          <div className="mt-6">
            <div className="max-w-48 m-auto">
              <Lottie
                lottieRef={lottieRef}
                animationData={successAnimation}
                loop={false}
                // autoplay={false}
              />
            </div>
            <p className="mt-4 text-2xl text-gray-700 px-4 text-center">
              Вітаємо!
            </p>
            <p className="mt-1 text-gray-700 px-4 text-center">
              Ваш бот налаштовано!
            </p>
            <p className="mt-2 text-gray-400 px-4 text-center">
              Переходьте в панель та заповнюйте свій робочий графік
            </p>
          </div>
        )}

        <div className="flex justify-center mt-10">
          {activeStep > 1 && activeStep < 4 && (
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
            <Link href={`/dashboard/`} className={`button`}>
              Розпочати роботу
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

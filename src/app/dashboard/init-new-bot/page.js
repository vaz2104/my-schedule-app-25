"use client";

import Link from "next/link";
import { useState, useRef, useContext } from "react";
import BackButton from "@/components/ui/BackButton";

import Spinner from "@/components/ui/Spinner";
import Steps from "./Steps";
import Step1 from "./Step1";
import Presentation from "./Presentation";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import { CompanyService } from "@/services/CompanyService";
import ConfirmProccessModal from "@/components/ui/ConfirmProccessModal";
import { AuthService } from "@/services/AuthService";
import BotCard from "@/components/admin/BotCard";
import { ThemeContext } from "@/context/ThemeContext";

export default function InitNewBot() {
  const { setWarningError } = useContext(ThemeContext);
  const [activeStep, setActiveStep] = useState(1);
  const [isHintChecked, setIsHintChecked] = useState(false);
  const [botToken, setBotToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [telegramBotData, setTelegramBotData] = useState(null);
  const [bot, setBot] = useState({ _id: "68a621163e4da7cf817c8775" });

  async function nextStep(step) {
    if (activeStep === 1 && botToken === "") {
      setWarningError(
        "Щоб продовжити, введіть токен вашого бота у відповідне поле"
      );
      return false;
    }

    if (activeStep === 1) {
      setLoading(true);

      const botInfoResponse = await CompanyService.getBotInfo(botToken);

      if (botInfoResponse?.status === 200) {
        setTelegramBotData(botInfoResponse?.data);
      } else {
        setWarningError(
          "Cхоже, Ви ввели невірний токен! Система не може знайти Ваший бот!"
        );
      }
      setLoading(false);
      return false;
    } else {
      setActiveStep(step);
    }
  }

  const lottieRef = useRef();

  async function saveBot() {
    setLoading(true);

    const session = await AuthService.getSession();

    const newBotResponse = await CompanyService.saveNewBot(
      session.userId,
      botToken
    );

    if (newBotResponse?.status === 200) {
      setBot(newBotResponse?.data);
      setActiveStep(activeStep + 1);
    } else {
      setWarningError("Бот з даним токеном вже зареєстрований в системі!");
    }

    clearStepOneState();
  }

  function clearStepOneState() {
    setTelegramBotData(null);
    setBotToken("");
    setLoading(false);
  }

  if (!isHintChecked)
    return <Presentation toggleHint={() => setIsHintChecked(true)} />;

  return (
    <div>
      <div className="px-4 mt-4">
        <BackButton url={"/dashboard"} label={"Назад"} />
      </div>
      <div className="ms-container pb-10">
        <div className="">
          <Steps activeStep={activeStep} />

          {activeStep < 4 && (
            <div className="my-6 text-xl font-semibold text-center">
              Крок {activeStep}
            </div>
          )}

          {/* step 1 */}
          {activeStep === 1 && (
            <Step1 toket={botToken} setToken={setBotToken} />
          )}

          {/* step 2 */}
          {activeStep === 2 && <Step2 botData={bot} />}

          {/* step 3 */}
          {activeStep === 3 && <Step3 botData={bot} />}

          {/* step 4 */}
          {activeStep === 4 && <Step4 lottieRef={lottieRef} />}

          <div className="flex justify-center mt-10">
            {activeStep > 2 && activeStep < 4 && (
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
                  className={`button min-w-48`}
                  onClick={() => nextStep(activeStep + 1)}
                  disabled={loading}
                >
                  {loading ? (
                    <Spinner size="sm" className={"text-mainDark fill-white"} />
                  ) : (
                    "Далі"
                  )}
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

        <ConfirmProccessModal
          triger={telegramBotData}
          confirmFn={saveBot}
          cancelFn={clearStepOneState}
          loading={loading}
        >
          <div className="py-4">
            <BotCard
              name={telegramBotData?.first_name}
              thumbnail={telegramBotData?.avatar}
            />
            <div className="text-gray-500 mt-6 text-center animate__animated animate__fadeIn">
              Це дійсно Ваш бот і Ви хочете додати його до системи?
            </div>
          </div>
        </ConfirmProccessModal>
      </div>
    </div>
  );
}

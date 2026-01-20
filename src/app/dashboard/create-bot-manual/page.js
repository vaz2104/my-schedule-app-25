"use client";
import BackButton from "@/components/ui/BackButton";
import Image from "next/image";
import { useState } from "react";
import Steps from "./Steps";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import Step5 from "./Step5";
import Step6 from "./Step6";
import Step7 from "./Step7";

export default function CreateBotManual() {
  const [activeStep, setActiveStep] = useState(1);
  return (
    <div className="">
      <div className="px-4 mt-4">
        <BackButton url={"/dashboard"} label={"Назад"} />
      </div>
      <div>
        <h1 className="my-6 text-xl font-semibold text-center">
          Дотримуйтесь декількох кроків нашої інструкції та <br />
          створіть бот прямо зараз
        </h1>
      </div>
      <div className="ms-container pb-10">
        <div className="mb-8">
          <Steps activeStep={activeStep} />
        </div>
        <div>{activeStep === 1 && <Step1 />}</div>
        <div>{activeStep === 2 && <Step2 />}</div>
        <div>{activeStep === 3 && <Step3 />}</div>
        <div>{activeStep === 4 && <Step4 />}</div>
        <div>{activeStep === 5 && <Step5 />}</div>
        <div>{activeStep === 6 && <Step6 />}</div>
        <div>{activeStep === 7 && <Step7 />}</div>

        <div className="flex justify-center mt-8">
          {activeStep > 1 && (
            <button
              className="button mx-1 dark"
              onClick={() => setActiveStep(activeStep - 1)}
            >
              Попередній крок
            </button>
          )}
          {activeStep < 7 && (
            <button
              className="button mx-1"
              onClick={() => setActiveStep(activeStep + 1)}
            >
              Далі
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

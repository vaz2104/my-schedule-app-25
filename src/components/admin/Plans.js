"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { CompanyService } from "@/services/CompanyService";
import { useParams } from "next/navigation";
import formatDate from "@/lib/formatDate";
import { useContext, useEffect, useState } from "react";
import Spinner from "../ui/Spinner";
import { ThemeContext } from "@/context/ThemeContext";
import { printDateWithMonth } from "@/lib/schedule-helpers";
import PlanFree from "../ui/PlanFree";
import PlanBase from "../ui/PlanBase";
import PlanBusiness from "../ui/PlanBusiness";
import PlanBusinessPlus from "../ui/PlanBusinessPlus";
import { useAppStore } from "@/store/useAppStore";
import Alert from "../ui/Alert";

export default function Plans() {
  const { setCompanyPlan, companyPlan } = useAppStore();
  const { setSuccessMessage, setWarningError } = useContext(ThemeContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [exchange, setExchange] = useState(0);
  const params = useParams();

  async function getExchangeData() {
    const url =
      "https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json";
    try {
      const response = await fetch(url);
      if (!response.ok) {
        setError("Сталася помилка при виконанні запиту");
        return;
      }

      const result = await response.json();

      result.forEach((element) => {
        if (element?.cc === "EUR") setExchange(element?.rate);
      });
    } catch (error) {
      console.error(error.message);
      setError("Сталася помилка при виконанні запиту");
      return;
    }
  }

  async function selectPlanHandler(type) {
    setIsLoading(true);
    const currentDate = new Date();
    const nextMonthDate = new Date(currentDate);
    nextMonthDate.setMonth(currentDate.getMonth() + 1);

    const response = await CompanyService.update(params?.companyID, {
      plan: type,
      planEndDay: `${formatDate(nextMonthDate)}T00:00:00.000Z`,
    });

    if (response.status !== 200) {
      setWarningError("Сталася помилка при виконанні запиту");
    } else {
      setCompanyPlan(type);
      setSuccessMessage(
        `Вітаємо! Ваш план оновлено та діятиме до <span className="font-bold">${printDateWithMonth(
          nextMonthDate
        )}</span>`
      );
    }

    setIsLoading(false);
  }

  // free | basic | business | businessPlus

  useEffect(() => {
    getExchangeData();
  });

  if (isLoading)
    return (
      <div className="py-4 flex justify-center items-center h-[calc(100vh-9rem)]">
        <Spinner />
      </div>
    );

  if (error) {
    return (
      <div className="p-4 flex justify-center items-center h-[calc(100vh-9rem)]">
        <Alert className={"w-full"}>{error}</Alert>
      </div>
    );
  }

  return (
    <div className="relative -mx-4">
      {isLoading && (
        <div className="bg-white/50 backdrop-blur-xs p-4 flex justify-center items-center absolute -top-1 -right-1 -bottom-1 -left-1 rounded-xl z-20">
          <Spinner />
        </div>
      )}
      <Swiper
        modules={[Pagination]}
        spaceBetween={5}
        slidesPerView={1}
        pagination={{ clickable: true }}
        // onSlideChange={() => console.log("slide change")}
        // onSwiper={(swiper) => console.log(swiper)}
      >
        <SwiperSlide>
          <div className="px-4 py-2 h-full">
            <PlanFree
              activePlan={companyPlan}
              selectHandler={() => selectPlanHandler("free")}
              exchange={exchange}
              price={0}
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="px-4 py-2 h-full">
            <PlanBase
              activePlan={companyPlan}
              selectHandler={() => selectPlanHandler("basic")}
              exchange={exchange}
              price={15}
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="px-4 py-2 h-full">
            <PlanBusiness
              activePlan={companyPlan}
              selectHandler={() => selectPlanHandler("business")}
              exchange={exchange}
              price={29}
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="px-4 py-2 h-full">
            <PlanBusinessPlus
              activePlan={companyPlan}
              selectHandler={() => selectPlanHandler("businessPlus")}
              exchange={exchange}
              price={69}
            />
          </div>
        </SwiperSlide>
      </Swiper>
      <div className="text-sm text-gray-500 text-center px-4 pb-0 pt-2">
        *ціни вказані в євро на місяць відповідно до офіційного курсу гривні
        Національного банку України
      </div>
    </div>
  );
}

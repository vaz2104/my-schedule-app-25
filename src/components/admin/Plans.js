"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { CompanyService } from "@/services/CompanyService";
import { useParams } from "next/navigation";
import formatDate from "@/lib/formatDate";
import { useContext, useState } from "react";
import Spinner from "../ui/Spinner";
import { ThemeContext } from "@/context/ThemeContext";
import { printDateWithMonth } from "@/lib/schedule-helpers";
import PlanFree from "../ui/PlanFree";
import PlanBase from "../ui/PlanBase";
import PlanBusiness from "../ui/PlanBusiness";
import PlanBusinessPlus from "../ui/PlanBusinessPlus";
import { useAppStore } from "@/store/useAppStore";

export default function Plans() {
  const { setCompanyPlan, companyPlan } = useAppStore();
  const { setSuccessMessage, setWarningError } = useContext(ThemeContext);
  const [isLoading, setIsLoading] = useState(false);
  const params = useParams();

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
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="px-4 py-2 h-full">
            <PlanBase
              activePlan={companyPlan}
              selectHandler={() => selectPlanHandler("basic")}
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="px-4 py-2 h-full">
            <PlanBusiness
              activePlan={companyPlan}
              selectHandler={() => selectPlanHandler("business")}
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="px-4 py-2 h-full">
            <PlanBusinessPlus
              activePlan={companyPlan}
              selectHandler={() => selectPlanHandler("businessPlus")}
            />
          </div>
        </SwiperSlide>
      </Swiper>
      <div className="text-sm text-gray-500 text-center px-4 pb-0 pt-2">
        *ціни вказані в євро на місяць без урахування податків та знижок
      </div>
    </div>
  );
}

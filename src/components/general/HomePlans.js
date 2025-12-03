"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import PlanFree from "../ui/PlanFree";
import PlanBase from "../ui/PlanBase";
import PlanBusiness from "../ui/PlanBusiness";
import PlanBusinessPlus from "../ui/PlanBusinessPlus";
import { redirect } from "next/navigation";
import Spinner from "../ui/Spinner";
import Alert from "../ui/Alert";
import { useEffect, useState } from "react";

export default function HomePlans() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [exchange, setExchange] = useState(0);

  async function getExchangeData() {
    const url =
      "https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json";
    try {
      const response = await fetch(url);
      if (!response.ok) {
        setError("Сталася помилка при виконанні запиту");
        setIsLoading(false);
        return;
      }

      const result = await response.json();

      result.forEach((element) => {
        if (element?.cc === "EUR") setExchange(element?.rate);
      });
      setIsLoading(false);
    } catch (error) {
      console.error(error.message);
      setError("Сталася помилка при виконанні запиту");
      setIsLoading(false);
      return;
    }
  }

  function selectPlanHandler(plan) {
    localStorage.setItem("plan", plan);
    redirect("/login");
  }

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
    <div className="relative -mx-4 md:mx-0">
      <Swiper
        modules={[Pagination]}
        // spaceBetween={5}
        slidesPerView={4}
        pagination={{ clickable: true }}
        breakpoints={{
          // when window width is >= 320px
          320: {
            slidesPerView: 1,
            // spaceBetween: 5,
          },
          // when window width is >= 480px
          480: {
            slidesPerView: 1,
            // spaceBetween: 5,
          },
          // when window width is >= 640px
          640: {
            slidesPerView: 2,
            // spaceBetween: 5,
          },
          // When window width is >= 768px
          768: {
            slidesPerView: 2,
            // spaceBetween: 5,
          },
          // When window width is >= 1024px
          920: {
            slidesPerView: 3,
            // spaceBetween: 5,
          },
          // When window width is >= 1024px
          1200: {
            slidesPerView: 4,
            // spaceBetween: 5,
          },
        }}
        // onSlideChange={() => console.log("slide change")}
        // onSwiper={(swiper) => console.log(swiper)}
      >
        <SwiperSlide>
          <div className="px-4 py-2 h-full">
            <PlanFree
              selectHandler={() => selectPlanHandler("free")}
              exchange={exchange}
              price={0}
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="px-4 py-2 h-full">
            <PlanBase
              selectHandler={() => selectPlanHandler("basic")}
              exchange={exchange}
              price={15}
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="px-4 py-2 h-full">
            <PlanBusiness
              selectHandler={() => selectPlanHandler("business")}
              exchange={exchange}
              price={29}
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="px-4 py-2 h-full">
            <PlanBusinessPlus
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

"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import PlanFree from "../ui/PlanFree";
import PlanBase from "../ui/PlanBase";
import PlanBusiness from "../ui/PlanBusiness";
import PlanBusinessPlus from "../ui/PlanBusinessPlus";

export default function HomePlans() {
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
            // selectHandler={() => selectPlanHandler("free")}
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="px-4 py-2 h-full">
            <PlanBase
            // selectHandler={() => selectPlanHandler("basic")}
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="px-4 py-2 h-full">
            <PlanBusiness
            // selectHandler={() => selectPlanHandler("business")}
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="px-4 py-2 h-full">
            <PlanBusinessPlus
            // selectHandler={() => selectPlanHandler("businessPlus")}
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

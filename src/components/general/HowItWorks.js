"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import {
  CalendarPlusIcon,
  CirclePlusIcon,
  LinkPlusIcon,
  ResultIcon,
} from "../ui/Icons";

export default function HowItWorks() {
  return (
    <div className="">
      <div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-12 px-4 ">
        <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
          Як це працює?
        </h2>
        <p className="mb-5 font-light text-gray-500 sm:text-xl dark:text-gray-400">
          Всього кілька кроків, які потрібно пройти, аби отримати персональний
          бот з Вашим графіком роботи
        </p>
      </div>
      <div className="mx-auto max-w-6xl">
        <Swiper
          //   spaceBetween={50}
          slidesPerView={3}
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true }}
          breakpoints={{
            // when window width is >= 320px
            320: {
              slidesPerView: 1,
              // spaceBetween: 5,
            },
            // When window width is >= 1024px
            920: {
              slidesPerView: 2,
              // spaceBetween: 5,
            },
            // When window width is >= 1024px
            1024: {
              slidesPerView: 4,
              // spaceBetween: 5,
            },
          }}
          autoplay={{
            delay: 9000,
          }}
        >
          <SwiperSlide>
            <div className="">
              <div className="text-center mx-2">
                <div className="flex justify-center">
                  <CirclePlusIcon className={"size-16 text-mainBlue"} />
                </div>
                <div className="font-bold text-lg mt-4 mb-2 text-gray-900">
                  Крок 1
                </div>
                <div className="max-w-80 m-auto text-gray-500">
                  Створіть бот в Telegram, дотримуючись простих покрокових
                  інструкцій
                </div>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="">
              <div className="text-center mx-2">
                <div className="flex justify-center">
                  <LinkPlusIcon className={"size-16 text-mainBlue"} />
                </div>
                <div className="font-bold text-lg mt-4 mb-2 text-gray-900">
                  Крок 2
                </div>
                <div className="max-w-80 m-auto text-gray-500">
                  Підключіть бот до нашої адміністративної панелі
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="">
              <div className="text-center mx-2">
                <div className="flex justify-center">
                  <CalendarPlusIcon className={"size-16 text-mainBlue"} />
                </div>
                <div className="font-bold text-lg mt-4 mb-2 text-gray-900">
                  Крок 3
                </div>
                <div className="max-w-80 m-auto text-gray-500">
                  Створіть власний графік роботи, запросіть клієнтів до свого
                  бота
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="">
              <div className="text-center mx-2">
                <div className="flex justify-center">
                  <ResultIcon className={"size-16 text-mainBlue"} />
                </div>
                <div className="font-bold text-lg mt-4 mb-2 text-gray-900">
                  Крок 4
                </div>
                <div className="max-w-80 m-auto text-gray-500">
                  Результат - інтерактивна панель, яка спростить життя Вам та
                  додасть зручності Вашим клієнтам
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}

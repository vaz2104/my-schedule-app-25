"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { CheckCircleIcon } from "../ui/Icons";

export default function Plans() {
  return (
    <div className="-mx-4">
      <Swiper
        modules={[Pagination]}
        spaceBetween={5}
        slidesPerView={1}
        pagination={{ clickable: true }}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
      >
        <SwiperSlide>
          <div className="px-4 py-2 h-full">
            <div className="bg-gray-50 shadow-sm p-4 rounded-xl h-full">
              <div className="mb-4 mt-4 text-center">
                <h2 className="font-bold text-2xl text-gray-700">
                  Безкоштовний
                </h2>
              </div>
              <div className="flex justify-center items-baseline text-gray-900 dark:text-white">
                <span className="text-3xl font-semibold">€</span>
                <span className="text-5xl font-extrabold tracking-tight">
                  0
                </span>
                <span className="ms-1 text-xl font-normal text-gray-500 dark:text-gray-400">
                  /міс
                </span>
              </div>
              <div className="mt-2 text-center text-gray-400">0 ₴ /місяць</div>
              <div className="mt-4 max-w-xs m-auto">
                <p className="text-gray-500 text-base text-center">
                  План дозволить Вам зекономити кошти, зможете освоїти платформу
                  та дізнатися, чи дійсно вона підійде Вашій компанії
                </p>
              </div>

              <div className="mt-4">
                <ul className="max-w-md space-y-1 text-gray-500 list-inside dark:text-gray-400">
                  <li className="flex items-center">
                    <CheckCircleIcon className={"w-4 h-4 text-green-600"} />
                    <p className="ml-2">1 співробітник</p>
                  </li>
                  <li className="flex items-center">
                    <CheckCircleIcon className={"w-4 h-4 text-red-400"} />
                    <p className="ml-2 text-red-400">
                      Доступні <span className="font-bold">лише 3</span> записи
                      на день
                    </p>
                  </li>
                  <li className="flex items-center">
                    <CheckCircleIcon className={"w-4 h-4 text-red-400"} />
                    <p className="ml-2 text-red-400">
                      <span className="font-bold ">Тільки 5</span> клієнтів
                      мають доступ
                    </p>
                  </li>
                </ul>
              </div>
              <div className="mt-8">
                {/* <button className="button w-full"></button> */}
                <div className="flex items-center justify-center">
                  <CheckCircleIcon className={"w-8 h-8 text-mainBlue"} />
                  <span className="text-gray-700 font-bold ml-2">
                    Ваш поточний план
                  </span>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="px-4 py-2 h-full">
            <div className="bg-gray-50 shadow-sm p-4 rounded-xl h-full">
              <div className="mb-4 mt-4 text-center">
                <h2 className="font-bold text-2xl text-gray-700">Базовий</h2>
              </div>
              <div className="flex justify-center items-baseline text-gray-900 dark:text-white">
                <span className="text-3xl font-semibold">€</span>
                <span className="text-5xl font-extrabold tracking-tight">
                  15
                </span>
                <span className="ms-1 text-xl font-normal text-gray-500 dark:text-gray-400">
                  /міс
                </span>
              </div>
              <div className="mt-2 text-center text-gray-400">
                725 ₴ /місяць
              </div>
              <div className="mt-4 max-w-xs m-auto">
                <p className="text-gray-500 text-base text-center">
                  План підходить для самозайнятих осіб, або бізнесів з одним
                  працівником
                </p>
              </div>

              <div className="mt-4">
                <ul className="max-w-md space-y-1 text-gray-500 list-inside dark:text-gray-400">
                  <li className="flex items-center">
                    <CheckCircleIcon className={"w-4 h-4 text-green-600"} />
                    <p className="ml-2">1 співробітник</p>
                  </li>
                  <li className="flex items-center">
                    <CheckCircleIcon className={"w-4 h-4 text-green-600"} />
                    <p className="ml-2 flex-1">
                      Жодних лімітів та обмежень по записах та клієнтах
                    </p>
                  </li>
                </ul>
              </div>
              <div className="mt-8">
                <button className="button w-full">Обрати план</button>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="px-4 py-2 h-full">
            <div className="bg-gray-50 shadow-sm p-4 rounded-xl h-full">
              <div className="mb-4 mt-4 text-center">
                <h2 className="font-bold text-2xl text-gray-700">Бізнес</h2>
              </div>
              <div className="flex justify-center items-baseline text-gray-900 dark:text-white">
                <span className="text-3xl font-semibold">€</span>
                <span className="text-5xl font-extrabold tracking-tight">
                  29
                </span>
                <span className="ms-1 text-xl font-normal text-gray-500 dark:text-gray-400">
                  /міс
                </span>
              </div>
              <div className="mt-2 text-center text-gray-400">
                1401 ₴ /місяць
              </div>
              <div className="mt-4 max-w-xs m-auto">
                <p className="text-gray-500 text-base text-center">
                  План чудово підходить для малих бізнесів з кількома
                  працівниками
                </p>
              </div>

              <div className="mt-4">
                <ul className="max-w-md space-y-1 text-gray-500 list-inside dark:text-gray-400">
                  <li className="flex items-center">
                    <CheckCircleIcon className={"w-4 h-4 text-green-600"} />
                    <p className="ml-2">3 співробітники включно</p>
                  </li>
                  <li className="flex items-center">
                    <CheckCircleIcon className={"w-4 h-4 text-green-600"} />
                    <p className="ml-2 flex-1">
                      Жодних лімітів та обмежень по записах та клієнтах
                    </p>
                  </li>
                </ul>
              </div>
              <div className="mt-8">
                <button className="button w-full">Обрати план</button>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="px-4 py-2 h-full">
            <div className="bg-gray-50 shadow-sm p-4 rounded-xl h-full">
              <div className="mb-4 mt-4 text-center">
                <h2 className="font-bold text-2xl text-gray-700">
                  Бізнес Plus
                </h2>
              </div>
              <div className="flex justify-center items-baseline text-gray-900 dark:text-white">
                <span className="text-3xl font-semibold">€</span>
                <span className="text-5xl font-extrabold tracking-tight">
                  69
                </span>
                <span className="ms-1 text-xl font-normal text-gray-500 dark:text-gray-400">
                  /міс
                </span>
              </div>
              <div className="mt-2 text-center text-gray-400">
                3333 ₴ /місяць
              </div>
              <div className="mt-4 max-w-xs m-auto">
                <p className="text-gray-500 text-base text-center">
                  План без жодних обмежень включаючи працівників
                </p>
              </div>

              <div className="mt-4">
                <ul className="max-w-md space-y-1 text-gray-500 list-inside dark:text-gray-400">
                  <li className="flex items-center">
                    <CheckCircleIcon className={"w-4 h-4 text-green-600"} />
                    <p className="ml-2">3 співробітники та більше</p>
                  </li>
                  <li className="flex items-center">
                    <CheckCircleIcon className={"w-4 h-4 text-green-600"} />
                    <p className="ml-2 flex-1">
                      Жодних лімітів та обмежень по записах та клієнтах
                    </p>
                  </li>
                </ul>
              </div>
              <div className="mt-8">
                <button className="button w-full">Обрати план</button>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
      <div className="text-sm text-gray-500 text-center px-4 pb-0 pt-2">
        *ціни вказані в євро на місяць без урахування податків та знижок
      </div>
    </div>
  );
}

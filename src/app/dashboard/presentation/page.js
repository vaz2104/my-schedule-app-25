"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="h-screen flex flex-col justify-center align-middle">
      <div className="text-center p-4">
        <div className="text-2xl mb-6 text-gray-700 animate__animated animate__slideInDown">
          Автоматизуйте свій бізнес разом з{" "}
          <span className="font-semibold inline-block">MYSCHEDULE</span>
        </div>
        <div className="-mx-4">
          <Swiper
            spaceBetween={50}
            slidesPerView={1}
            modules={[Pagination, Autoplay]}
            pagination={{ clickable: true }}
            autoplay={{
              delay: 9000,
            }}
          >
            <SwiperSlide>
              <div className="px-4">
                <div>
                  <Image
                    src={"/presentation/why-we_1.png"}
                    width={280}
                    height={280}
                    className="m-auto"
                    alt=""
                  />
                </div>
                <div className=" text-gray-500 my-4 max-w-80 m-auto">
                  Дозвольте клієнтам без особливих зусиль бронювати, переносити
                  або скасовувати зустрічі
                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="px-4">
                <div>
                  <Image
                    src={"/presentation/why-we_2.png"}
                    width={280}
                    height={280}
                    className="m-auto"
                    alt=""
                  />
                </div>
                <div className=" text-gray-500 my-4 px-4 max-w-80 m-auto">
                  Нехай самостійно обирають зручний день, час та записуються на
                  прийом
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="px-4">
                <div>
                  <Image
                    src={"/presentation/why-we_3.png"}
                    width={280}
                    height={280}
                    className="m-auto"
                    alt=""
                  />
                </div>
                <div className=" text-gray-500 my-4 max-w-96 m-auto">
                  Перестаньте витрачати час на телефонні розмови та записники,
                  просто отримуй звіт по своєму графіку
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>

        <div className="flex justify-center w-full mt-6">
          <div className="w-full animate__animated animate__slideInUp">
            <Link href="/dashboard" className="button m-auto">
              Розпочати
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

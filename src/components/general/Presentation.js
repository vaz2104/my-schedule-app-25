"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import Image from "next/image";

export default function Presentation() {
  return (
    <div className="px-4 -mx-4">
      <div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
        <h2 className="text-center mb-4 text-4xl tracking-tight font-extrabold text-gray-900">
          Автоматизуйте свій бізнес разом з MYSCHEDULE
        </h2>
        <p className="mb-5 font-light text-gray-500 sm:text-xl">
          та отримайте переваги, які дійсно виведуть Ваш сервіс на новий рівень
        </p>
      </div>
      <div className="-mx-4">
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
              slidesPerView: 3,
              // spaceBetween: 5,
            },
          }}
          autoplay={{
            delay: 9000,
          }}
        >
          <SwiperSlide>
            <div className="px-4">
              <div>
                <Image
                  src={"/presentation/why-we_1.png"}
                  width={240}
                  height={240}
                  className="m-auto"
                  alt=""
                />
              </div>
              <div className="text-center max-w-80 my-4 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl mx-auto">
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
                  width={240}
                  height={240}
                  className="m-auto"
                  alt=""
                />
              </div>
              <div className="text-center max-w-80 my-4 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl mx-auto">
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
                  width={240}
                  height={240}
                  className="m-auto"
                  alt=""
                />
              </div>
              <div className="text-center max-w-80 my-4 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl mx-auto">
                Перестаньте витрачати час на телефонні розмови та записники,
                просто отримуй звіт по своєму графіку
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}

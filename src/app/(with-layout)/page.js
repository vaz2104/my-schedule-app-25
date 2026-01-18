"use client";

import FaqAccordion from "@/components/general/FaqAccordion";
// import FaqAccordion from "@/components/general/faqAccordion";
import HomePlans from "@/components/general/HomePlans";
import HowItWorks from "@/components/general/HowItWorks";
import Presentation from "@/components/general/Presentation";
import Link from "next/link";
import { Link as ScrollLink, Element } from "react-scroll";

export default function Home() {
  return (
    <div>
      <div>
        <section className="bg-white min-h-[calc(100vh-7rem)]">
          <div className="grid max-w-screen-xl py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
            <div className="flex justify-center lg:mt-0 lg:col-span-5 lg:order-2">
              <img
                src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/hero/phone-mockup.png"
                alt="mockup"
                className="animate__animated animate__slideInRight max-w-md w-full"
              />
            </div>
            <div className="m-auto lg:mr-auto place-self-center lg:col-span-7 lg:order-1 text-center lg:text-left">
              <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl animate__animated animate__fadeIn">
                Ваш графік роботи у власному Telegram боті
              </h1>
              <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl animate__animated animate__fadeIn">
                Повноцінне рішення для роботи з розкладом з будь-якої точки, що
                дозволяє точно і швидко скласти Ваш графік та надати доступ
                клієнтам
              </p>
              <div className="flex justify-center lg:justify-start animate__animated animate__slideInUp">
                <ScrollLink
                  to="whyWeSection"
                  smooth={true}
                  duration={500}
                  className="button !max-w-none cursor-pointer"
                >
                  Чому MYSCHEDULE?
                  <svg
                    className="w-5 h-5 ml-2 -mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </ScrollLink>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className="mt-8">
        <Element name="whyWeSection">
          <div className="max-w-6xl m-auto">
            <Presentation />
          </div>

          <div className="flex justify-center w-full mt-4">
            <div className="w-full animate__animated animate__slideInUp">
              <Link href="/dashboard" className="button m-auto">
                Розпочати
              </Link>
            </div>
          </div>
        </Element>
      </div>

      <div className="mt-24">
        <div className="bg-gray-50 py-12 -mx-4 md:px-4">
          <HowItWorks />
        </div>
      </div>

      <div className="mt-24">
        <div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 ">
            Розроблено для таких бізнес-команд, як Ваша
          </h2>
          <p className="mb-5 font-light text-gray-500 sm:text-xl">
            Незалежно від того, чи Ви самозайнята особа з невеликим офісом, чи
            компанія з командою спеціалістів, тут Ви можете обрати тарифний
            план, який ідеально підходить саме Вам
          </p>
        </div>
        <HomePlans />
      </div>

      <div className="py-12">
        <div className="mx-auto max-w-screen-md text-center">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900">
            Демо-версії ботів
          </h2>
          <p className="mb-5 font-light text-gray-500 sm:text-xl">
            Щоб краще зрозуміти, що Ви отримаєте в результаті, ми створили для
            Вас тестові версії ботів, підключені до нашої адміністративної
            панелі, які Ви можете відкрити та ознайомитися з функціоналом
          </p>
          <div className="flex justify-center">
            <div className="mx-4">
              <div className="font-bold text-lg mt-4 mb-2 text-gray-900">
                Бот з планом Безкоштовний або Базовий
              </div>
              <img
                src="demo-single-schedule.png"
                className="m-auto w-80 mt-8"
                alt="demo-free"
              />
              <p className="mt-4">
                <a
                  href="https://t.me/MySchedule24DevBot"
                  target="_blunk"
                  className="text-main hover:underline"
                >
                  @MySchedule24DevBot
                </a>
              </p>
            </div>
            <div className="mx-4">
              <div className="font-bold text-lg mt-4 mb-2 text-gray-900">
                Бот з планом Бізнес або Бізнес Plus
              </div>
              <img
                src="demo-single-schedule.png"
                className="m-auto w-80 mt-8"
                alt="demo-free"
              />
              <p className="mt-4">
                <a
                  href="https://t.me/MySchedule24DevBot"
                  target="_blunk"
                  className="text-main hover:underline"
                >
                  @MySchedule24DevBot
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="">
        <div className="bg-gray-50 py-12 px-4 -mx-4">
          <div className="mx-auto max-w-screen-md text-center">
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900">
              Доступ до адмінпанелі будь-де завдяки Telegram
            </h2>
            <p className="mb-5 font-light text-gray-500 sm:text-xl">
              Керуйте своїм графіком з телефону. Панель адміністратора доступна
              в нашому Telegram-боті, що дозволить Вам отримувати сповіщення та
              завжди мати доступ до свого розкладу
            </p>
            <img
              src="telegram-dashboard-qr.png"
              className="m-auto w-32 mt-8"
              alt="qr code"
            />
            {process.env.NEXT_PUBLIC_BOT_USERNAME && (
              <p className="mt-4">
                <a
                  href={`https://t.me/${process.env.NEXT_PUBLIC_BOT_USERNAME}`}
                  target="_blunk"
                  className="text-main hover:underline"
                >
                  {`@${process.env.NEXT_PUBLIC_BOT_USERNAME}`}
                </a>
              </p>
            )}
          </div>
        </div>
      </div>

      {/* <div className="max-w-6xl m-auto my-12">
        <div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 ">
            Часто задавані питання
          </h2>
          <p className="mb-5 font-light text-gray-500 sm:text-xl dark:text-gray-400">
            Набір поширених запитань та відповідей, які виникають в користувачів
            платформи
          </p>
        </div>
        <FaqAccordion />
      </div> */}
    </div>
  );
}

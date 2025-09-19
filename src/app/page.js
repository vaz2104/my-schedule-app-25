"use client";
// import FaqAccordion from "@/components/general/faqAccordion";
import HomePlans from "@/components/general/HomePlans";
import HowItWorks from "@/components/general/HowItWorks";
import Presentation from "@/components/general/Presentation";
import { EnvelopeIcon, LockIcon, PhoneIcon } from "@/components/ui/Icons";
import Link from "next/link";
import { Link as ScrollLink, Element } from "react-scroll";

export default function Home() {
  return (
    <div className="ms-full-creen p-4">
      <div>
        <header>
          <nav className="bg-white border-gray-200 lg:px-6 py-2.5 dark:bg-gray-800">
            <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
              <Link href="/" className="flex items-center">
                <img
                  src="https://flowbite.com/docs/images/logo.svg"
                  className="mr-3 h-6 sm:h-9"
                  alt="Flowbite Logo"
                />
                <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                  MYSCHEDULE
                </span>
              </Link>
              <div className="flex items-center lg:order-2">
                <a
                  href="/login"
                  className="flex items-center text-gray-800 dark:text-white bg-gray-50 hover:bg-gray-200 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
                >
                  Log in
                  <LockIcon className={"text-mainBlue ml-1"} />
                </a>
              </div>
            </div>
          </nav>
        </header>
      </div>
      <div>
        <section className="bg-white dark:bg-gray-900 min-h-[calc(100vh-7rem)]">
          <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
            <div className="flex lg:mt-0 lg:col-span-5 lg:order-2">
              <img
                src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/hero/phone-mockup.png"
                alt="mockup"
                className="animate__animated animate__slideInRight"
              />
            </div>
            <div className="mr-auto place-self-center lg:col-span-7 lg:order-1">
              <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white animate__animated animate__fadeIn">
                Графік роботи онлайн для всіх сфер послуг
              </h1>
              <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400 animate__animated animate__fadeIn">
                Повноцінне рішення для роботи з розкладом з будь-якої точки, що
                дозволяє точно і швидко скласти Ваш графік
              </p>
              <div className="flex animate__animated animate__slideInUp">
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
          {/* <div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
              Як це працює?
            </h2>
            <p className="mb-5 font-light text-gray-500 sm:text-xl dark:text-gray-400">
              Всього кілька кроків, які потрібно пройти, аби отримати
              персональний бот з Вашим графіком роботи
            </p>
          </div> */}
          {/* <div className="mx-auto max-w-6xl w-full px-4 flex">
            <div className="w-1/4">
              <div className="text-center px-2">
                <div className="flex justify-center">
                  <CirclePlusIcon className={"size-12 text-mainBlue"} />
                </div>
                <div className="font-bold text-lg mt-4 mb-2 text-gray-900">
                  Крок 1
                </div>
                <div className="max-w-64 m-auto text-gray-500">
                  Створіть бот в Telegram, дотримуючись простих покрокових
                  інструкцій
                </div>
              </div>
            </div>
            <div className="w-1/4">
              <div className="text-center px-2">
                <div className="flex justify-center">
                  <LinkPlusIcon className={"size-12 text-mainBlue"} />
                </div>
                <div className="font-bold text-lg mt-4 mb-2 text-gray-900">
                  Крок 2
                </div>
                <div className="max-w-64 m-auto text-gray-500">
                  Підключіть бот до нашої адміністративної панелі
                </div>
              </div>
            </div>
            <div className="w-1/4">
              <div className="text-center px-2">
                <div className="flex justify-center">
                  <CalendarPlusIcon className={"size-12 text-mainBlue"} />
                </div>
                <div className="font-bold text-lg mt-4 mb-2 text-gray-900">
                  Крок 3
                </div>
                <div className="max-w-64 m-auto text-gray-500">
                  Створіть власний графік роботи, запросіть клієнтів до свого
                  бота
                </div>
              </div>
            </div>
            <div className="w-1/4">
              <div className="text-center px-2">
                <div className="flex justify-center">
                  <ResultIcon className={"size-12 text-mainBlue"} />
                </div>
                <div className="font-bold text-lg mt-4 mb-2 text-gray-900">
                  Крок 4
                </div>
                <div className="max-w-64 m-auto text-gray-500">
                  Результат - інтерактивна панель, яка спростить життя Вам та
                  додать зручності Вашим клієнтам
                </div>
              </div>
            </div>
          </div> */}
          <HowItWorks />
        </div>
      </div>

      <div className="mt-24">
        <div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
            Розроблено для таких бізнес-команд, як Ваша
          </h2>
          <p className="mb-5 font-light text-gray-500 sm:text-xl dark:text-gray-400">
            Незалежно від того, чи Ви самозайнята особа з невеликим офісом, чи
            компанія з командою спеціалістів, тут Ви можете обрати тарифний
            план, який ідеально підходить саме Вам
          </p>
        </div>
        <HomePlans />
      </div>

      <div className="py-12">
        <div className="mx-auto max-w-screen-md text-center">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
            Демо-версії ботів
          </h2>
          <p className="mb-5 font-light text-gray-500 sm:text-xl dark:text-gray-400">
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
                  className="text-mainBlue hover:underline"
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
                  className="text-mainBlue hover:underline"
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
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
              Доступ до адмінпанелі будь-де завдяки Telegram
            </h2>
            <p className="mb-5 font-light text-gray-500 sm:text-xl dark:text-gray-400">
              Керуйте своїм графіком з телефону. Панель адміністратора доступна
              в нашому Telegram-боті, що дозволить Вам отримувати сповіщення та
              завжди мати доступ до свого розкладу
            </p>
            <img
              src="telegram-dashboard-qr.png"
              className="m-auto w-32 mt-8"
              alt="qr code"
            />
            <p className="mt-4">
              <a
                href="https://t.me/MySchedule24DevBot"
                target="_blunk"
                className="text-mainBlue hover:underline"
              >
                @MySchedule24DevBot
              </a>
            </p>
          </div>
        </div>
      </div>
      {/* 
      <div className="max-w-6xl m-auto my-12">
        <div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
            Часто задавані питання
          </h2>
          <p className="mb-5 font-light text-gray-500 sm:text-xl dark:text-gray-400">
            Набір поширених запитань та відповідей, які виникають в користувачів
            платформи
          </p>
        </div>
        <FaqAccordion />
      </div> */}

      <div>
        <footer className="p-4 bg-white md:p-8 dark:bg-gray-800">
          <div className="mx-auto max-w-screen-xl text-center">
            <a
              href="#"
              className="flex justify-center items-center text-2xl font-semibold text-gray-900 dark:text-white"
            >
              MYSCHEDULE
            </a>
            <p className=" text-gray-500 dark:text-gray-400">
              Графік роботи онлайн для українських бізнес-команд
            </p>
            <ul className="flex flex-wrap justify-center items-center my-6 text-mainBlue dark:text-white">
              <li>
                <Link
                  href="tel:0987766155"
                  className="mr-4 hover:underline md:mr-6 flex items-center"
                >
                  <PhoneIcon className={"mr-1 text-mainBlue size-6"} />
                  <span>0987766155</span>
                </Link>
              </li>
              <li>
                <Link
                  href="mailto:myschedule@gmail.com"
                  className="mr-4 hover:underline md:mr-6 flex items-center"
                >
                  <EnvelopeIcon className={"mr-1 text-mainBlue size-6"} />
                  <span>myschedule@gmail.com</span>
                </Link>
              </li>
            </ul>
            <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
              © 2025{" "}
              <Link href="/" className="hover:underline">
                MYSCHEDULE
              </Link>
              {/* . All Rights Reserved. */}
            </span>
          </div>
        </footer>
      </div>
    </div>
  );
}

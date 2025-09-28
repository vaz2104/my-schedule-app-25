"use client";

import Link from "next/link";
import { CalendarPlusIcon, LockIcon } from "../ui/Icons";

export default function Header() {
  return (
    <header>
      <nav className="bg-white border-gray-200 lg:px-6 py-2.5 dark:bg-gray-800">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <Link href="/" className="flex items-center">
            {/* <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="mr-3 h-6 sm:h-9"
              alt="Flowbite Logo"
            /> */}
            <CalendarPlusIcon
              className={"mr-2 size-6 sm:size-9 text-main mb-0.5"}
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
              Увійти
              <LockIcon className={"text-main ml-1"} />
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}

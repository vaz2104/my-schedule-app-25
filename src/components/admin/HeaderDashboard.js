"use client";

import Link from "next/link";
import { CalendarPlusIcon, LogOutIcon } from "../ui/Icons";
import { AuthService } from "@/services/AuthService";

export default function HeaderDashboard() {
  async function logout() {
    if (typeof window !== "undefined") {
      localStorage.removeItem("activePanel");
    }
    await AuthService.destroySession();
    setIsLoading(false);
  }

  return (
    <header>
      <nav className="bg-white border-gray-200 lg:px-6 py-2.5 dark:bg-gray-800 max-w-3xl mx-auto">
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
            <button
              className="ml-3 group flex items-center rounded-lg px-2 pr-1 py-1 text-sm font-medium text-red-600 bg-red-100 cursor-pointer"
              onClick={logout}
            >
              <span className="mr-1 flex-1 whitespace-nowrap">Вийти</span>
              <LogOutIcon className={"size-5 text-red-600"} />
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}

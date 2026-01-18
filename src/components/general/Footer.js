"use client";

import { Link } from "react-scroll";
import { EnvelopeIcon, PhoneIcon } from "../ui/Icons";

export default function Footer() {
  return (
    <footer className="p-4 bg-white md:p-8">
      <div className="mx-auto max-w-screen-xl text-center">
        <a
          href="#"
          className="flex justify-center items-center text-2xl font-semibold text-gray-900"
        >
          MYSCHEDULE
        </a>
        <p className=" text-gray-500">
          Графік роботи онлайн для українських бізнес-команд
        </p>
        <ul className="flex flex-wrap justify-center items-center my-6 text-main">
          <li>
            <Link
              href="tel:0987766155"
              className="mr-4 hover:underline md:mr-6 flex items-center"
            >
              <PhoneIcon className={"mr-1 text-main size-6"} />
              <span>0987766155</span>
            </Link>
          </li>
          <li>
            <Link
              href="mailto:myschedule@gmail.com"
              className="mr-4 hover:underline md:mr-6 flex items-center"
            >
              <EnvelopeIcon className={"mr-1 text-main size-6"} />
              <span>myschedule@gmail.com</span>
            </Link>
          </li>
        </ul>
        <span className="text-sm text-gray-500 sm:text-center">
          © {new Date().getFullYear()}{" "}
          <Link href="/" className="hover:underline">
            MYSCHEDULE
          </Link>
          {/* . All Rights Reserved. */}
        </span>
      </div>
    </footer>
  );
}

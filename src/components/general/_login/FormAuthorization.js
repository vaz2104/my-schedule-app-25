import Image from "next/image";
import Link from "next/link";
import React from "react";
import LogInForm from "./LogInForm";

export default function FormAuthorization() {
  return (
    <div className="md:flex md:px-4 mx-auto max-w-5xl min-h-[calc(100vh-5rem)] border-b border-gray-100">
      <div className="md:w-1/2">
        <div className="flex flex-col h-full justify-center items-center">
          <Image
            src={"/login-poster.png"}
            width={500}
            height={500}
            alt="login poster"
            className="w-64"
          />
          <div className="mt-8 font-light text-gray-500 sm:text-xl px-8 text-center">
            Для входу перейдіть в телеграм бот та згенеруйте пароль для доступу
          </div>
          <div className="mt-8">
            <Link
              href={`https://t.me/${process.env.NEXT_PUBLIC_BOT_USERNAME}?start=generateAuthData`}
              className="button"
              target="_blunk"
            >
              Перейти в бот
            </Link>
          </div>
        </div>
      </div>
      <div className="my-6 md:my-0 md:w-1/2">
        {" "}
        <LogInForm />
      </div>
    </div>
  );
}

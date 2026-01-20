import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Step7({ toket, setToken }) {
  return (
    <div>
      <div className="mb-4">
        <p className="my-1 font-light text-gray-500 text-sm">
          Вітаємо, Ваш бот створено!
        </p>
        <p className="my-1 font-light text-gray-500 text-sm">
          Тепер можете переходити на сторінку підключення боту до нашої панелі.{" "}
        </p>
        <p className="my-4 font-light text-gray-500 text-sm">
          <Link href="/dashboard/init-new-bot" className="button">
            Підключити бот
          </Link>
        </p>
      </div>
      <div className="">
        <Image
          src={"/manual-steps/manual-step-7.png"}
          width={609}
          height={144}
          className="m-auto"
          alt=""
        />
      </div>
    </div>
  );
}
